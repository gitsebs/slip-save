import { google } from "googleapis";
import fs from "fs/promises";
import path from "path";
import { Credentials } from "google-auth-library/build/src/auth/credentials";

const { client_secret, client_id, redirect_uris } =
  require("../credentials.json").installed;

const tokenPath = path.join(__dirname, "../", "tokens.json");

export const auth = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

export const getGmailService = async () => {
  const token = await fs.readFile(tokenPath, "utf8");
  auth.on("tokens", saveTokens);
  auth.setCredentials(JSON.parse(token));
  const gmail = google.gmail({ version: "v1", auth: auth });
  return gmail;
};

export async function saveTokens(token: Credentials) {
  await fs.writeFile(tokenPath, JSON.stringify(token));
  console.log("Access token and refresh token stored to token.json");
}
