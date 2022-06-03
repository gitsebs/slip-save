import { getAuth } from "../lib/google";

const url = getAuth().generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/gmail.readonly"],
});

console.log("Authorize this app by visiting this url:", url);
