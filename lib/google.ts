import { google } from "googleapis";
import fs from "fs/promises";
import path from "path";
import { Credentials } from "google-auth-library/build/src/auth/credentials";

const { client_secret, client_id, redirect_uris } =
  require("../credentials.json").installed;

export const auth = new google.auth.OAuth2({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uris[0],
});

const TOKEN_FILE = path.join(__dirname, "../", "tokens.json");

export const getGmailService = async () => {
  const token = await fs.readFile(TOKEN_FILE, "utf8");
  auth.on("tokens", saveTokens);
  auth.setCredentials(JSON.parse(token));
  const gmail = google.gmail({ version: "v1", auth: auth });
  return gmail;
};

export async function saveTokens(token: Credentials) {
  await fs.writeFile(TOKEN_FILE, JSON.stringify(token));
  console.log("Access token and refresh token stored to token.json");
}
