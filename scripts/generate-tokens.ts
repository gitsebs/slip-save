import { auth, saveTokens } from "../lib/google";

const code = process.env.CODE;

async function generateTokens() {
  if (code) {
    const { tokens } = await auth.getToken(code);
    await saveTokens(tokens);
  } else {
    console.log("No code provided in .env file");
    const url = auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["https://www.googleapis.com/auth/gmail.readonly"],
    });
    console.log("Authorize this app by visiting this url:");
    console.log(url);
  }
}

generateTokens().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
