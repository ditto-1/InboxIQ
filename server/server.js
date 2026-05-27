import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const app = express();
let savedtokens = null;

app.use(cors());

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:3000/auth/google/callback"
);

app.get("/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/gmail.readonly"],
  });

  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  try {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);
    savedtokens = tokens;
    res.send("Login successful!");
  } catch (error) {
    console.error(error);
    res.send("Authentication failed");
  }
});

app.get("/emails", async(req, res) => {
  try {

      if (!savedtokens){
          return res.send("Please login first");
      }

      oauth2Client.setCredentials(savedtokens);

      const gmail = google.gmail({
          version: "v1",
          auth: oauth2Client,
      });
      const response = await gmail.users.messages.list({
          userId: "me",
          maxResults: 10,
      });

      const messages = response.data.messages || [];
      const email_data = [];
      for (const message of messages){
          const email = await gmail.users.messages.get({
              userId: "me",
              id: message.id,
          });

          const headers = email.data.payload.headers;
          const subject =
              headers.find((header) => header.name === "Subject")?.value
              || "No subject";
          const sender =
              headers.find((header) => header.name === "From")?.value
              || "Unknown sender";
          const snippet = email.data.snippet;

          email_data.push({
              sender,
              subject,
              snippet
          });
      }

      res.json(email_data);

  } catch (error) {

      console.error(error);
      res.send("Failed to fetch emails");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});