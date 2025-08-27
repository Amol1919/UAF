// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

console.log("[ENV CHECK]", {
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_APP_PASSWORD ? "****" : "MISSING",
});

// ---- Use ONE transporter (Gmail + app password) ----
const transporter = nodemailer.createTransport(
  {
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  },
  // optional: enable Nodemailer logs for debugging
  { logger: true, debug: true }
);

// Verify the SAME transporter
transporter.verify((err) => {
  if (err) {
    console.error("[MAILER verify] ", err.message);
  } else {
    console.log("[MAILER verify]  SMTP ready");
  }
});

// ---- Simple random template ----
function randomTemplate({ name, application, serverName }) {
  const t = [
    () => ({
      subject: `Access Update • ${application}`,
      html: `<h2>Hello ${name},</h2><p>Your request for <b>${application}</b> is in progress.</p><p>— UAF Bot</p>`,
    }),
    () => ({
      subject: `Server Access Test: ${serverName}`,
      html: `<h2>Hi ${name},</h2><p>This is a test notification for server <b>${serverName}</b>.</p><p>— UAF Bot</p>`,
    }),
    () => ({
      subject: `UAF Pilot Test`,
      html: `<h2>Hey ${name},</h2><p>This is a random template test email from UAF.</p><p>Everything looks good!</p>`,
    }),
  ];
  return t[Math.floor(Math.random() * t.length)]();
}

// ---- API route ----
app.post("/api/send-test-email", async (req, res) => {
  try {
    const { to, name = "User", application = "Application", serverName = "N/A" } = req.body || {};
    if (!to) return res.status(400).json({ error: 'Missing "to" email' });

    const { subject, html } = randomTemplate({ name, application, serverName });

     // debug log 
    console.log('[SEND DEBUG]', {
      hasUser: !!process.env.GMAIL_USER,
      hasPass: !!process.env.GMAIL_APP_PASSWORD,
      from: process.env.GMAIL_USER,
      to
    });

    // send using the SAME transporter
    const info = await transporter.sendMail({
      from: `"UAF Pilot" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return res.status(202).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error("[send-test-email error]", err);
    return res.status(500).json({ error: err.message || "Email send failed" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Mailer API running on :${port}`));
