import nodemailer from "nodemailer";

export async function sendAdminNotification(email: string, name: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const from = process.env.EMAIL_FROM || "hello@pamojalifeministy.org";
  const subject = "New membership request received";
  const text = `${name} (${email}) submitted a new membership request. Check the admin dashboard for details.`;

  await transporter.sendMail({ from, to: process.env.ADMIN_EMAILS || from, subject, text });
}
