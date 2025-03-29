// server.js (Node.js + Express)

import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
import { configDotenv } from "dotenv";

const app = express();
app.use(cors());
app.use(bodyParser.json());

configDotenv();

app.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.VITE_GMAILUSER,
      pass: process.env.VITE_GMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.VITE_GMAILUSER,
    to: process.env.VITE_GMAILTO,
    subject: "Contact Form Message",
    text: `You received a new message from ${name} (${email}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Email sent successfully");
  });
});

app.get("/", (req, res) => {
  res.send("server is running");
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
