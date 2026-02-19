import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    console.log("Attempting to send email to:", to);
    console.log("Subject:", subject);
    console.log("Resend API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("Sender email:", process.env.SENDER_EMAIL);

    const data = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "noreply@scalebuild.ai",
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
