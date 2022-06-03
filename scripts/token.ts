import "dotenv/config";
import path from "path";
import fs from "fs/promises";
import { getAuth } from "../lib/google";

const code = process.env.CODE!;

if (!code) {
  console.error("No code provided in .env file");
  process.exit(1);
}

const auth = getAuth();

auth.getToken(code).then(async ({ tokens }) => {
  const tokenPath = path.join(__dirname, "token.json");
  await fs.writeFile(tokenPath, JSON.stringify(tokens));
  console.log("Access token and refresh token stored to token.json");
});
