require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendMail(email, subject, text, html) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // 587 (TLS) or 465 (SSL)
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      bcc: process.env.BCC_EMAIL, // 👈 CC emails (comma separated)
      subject: subject,
      text: text,
      html: html,
    });

    // console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

module.exports = sendMail;
