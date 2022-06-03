import { google } from "googleapis";
import fs from "fs/promises";

const credentials = require("../credentials.json");

export const getGmailService = async () => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  const token = await fs.readFile("./token.json", "utf8");
  oAuth2Client.setCredentials(JSON.parse(token));
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  return gmail;
};

export const getAuth = () => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  return oAuth2Client;
};
