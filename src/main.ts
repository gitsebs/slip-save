import debug from "debug";
import fs from "fs/promises";
import { getGmailService } from "../lib/google";
import dayjs from "dayjs";

const log = debug("main:");

export async function main() {
  const dir = "./payslips";
  await ensureDir(dir);

  const gmail = await getGmailService();

  const qFrom = "noreply@post.xero.com";
  const qSubject = "Payslip for Jan Scholten for Week ending";
  const qAfter = `2019/01/01`;
  const qBefore = `2023/01/01`;

  log(`Querying for messages: %O`, {
    qFrom,
    qSubject,
    qAfter,
    qBefore,
  });

  const messages = await gmail.users.messages.list({
    userId: "me",
    q: `from:(${qFrom}) to:me subject:(${qSubject}) has:attachment after:${qAfter} before:${qBefore}`,
    maxResults: 200,
  });

  log(`Found ${messages.data.resultSizeEstimate} messages`);

  let fileCount = 0;

  for await (const _message of messages.data.messages || []) {
    log("\n\nmessage id: %s", _message.id);
    const message = await gmail.users.messages.get({
      userId: "me",
      id: _message.id,
    });

    const subject = message.data.payload?.headers?.find(
      (header) => header.name === "Subject"
    )?.value;

    if (!subject) {
      throw new Error(`No subject found for message ${_message.id}`);
    }

    log("subject: %s", subject);

    const date = getDateFromSubject(subject);

    log("date: %s", date);

    const pdfs =
      message.data.payload?.parts?.filter(
        (part) => part.mimeType === "application/pdf"
      ) || [];

    log("pdfs: %d", pdfs.length);

    for await (const pdf of pdfs) {
      const fileName = `${date} ${pdf.filename}`;
      const path = `${dir}/${fileName}`;
      const exists = await fileExists(path);
      const attachmentId = pdf.body?.attachmentId;

      if (exists) {
        log("skipping... file exists: %s", path);
      } else if (!attachmentId) {
        log("skipping... no attachmentId");
      } else {
        const attachment = await gmail.users.messages.attachments.get({
          userId: "me",
          id: pdf.body?.attachmentId,
          messageId: _message.id,
        });

        const fileData = attachment.data.data;

        if (!fileData) {
          throw new Error(
            `No file data found for attachment ${attachment.data.attachmentId}`
          );
        }

        log("writing file: %s", path);
        await fs.writeFile(path, fileData, "base64");
        fileCount++;
        log("saved file: %s", path);
      }
    }
  }

  log(`Saved ${fileCount} files`);
}

const ensureDir = async (dir: string) => {
  try {
    await fs.mkdir(dir);
  } catch (err: any) {
    if (err?.code !== "EEXIST") {
      throw err;
    }
  }
};

const fileExists = async (fileName: string) => {
  try {
    await fs.access(fileName);
    return true;
  } catch (err) {
    return false;
  }
};

const getDateFromSubject = (subject: string) => {
  const dateString = subject.replace(
    "Payslip for Jan Scholten for Week ending ",
    ""
  );
  const date = dayjs(dateString, "DD MMM YYYY");
  return date.format("YYYY-MM-DD");
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
