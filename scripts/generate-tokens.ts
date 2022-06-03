import { auth, saveTokens } from "../lib/google";
import http from "http";
const code = process.env.CODE;

async function generateTokens() {
  if (code) {
    const { tokens } = await auth.getToken(code);
    await saveTokens(tokens);
  } else {
    console.log("No code provided in .env file");
    const authUrl = auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["https://www.googleapis.com/auth/gmail.readonly"],
    });
    console.log("Authorize this app by visiting this url:");
    console.log(authUrl);

    const server = http
      .createServer(async (req, res) => {
        const url = new URL(req.url!, "http://localhost");
        const code = url.searchParams.get("code");

        res.writeHead(200);

        if (code) {
          const { tokens } = await auth.getToken(code);
          await saveTokens(tokens);
          res.end("Tokens saved");
        } else {
          res.end("No code provided");
        }
        process.exit();
      })
      .listen(8080, () => {
        console.log("Waiting for response on port 8080");
      });
  }
}

generateTokens().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
