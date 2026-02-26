import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const data = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "noreply@hyperscaler.scalebuild.ai",
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.log("Email send error:", error);
    return { success: false, error };
  }
}
