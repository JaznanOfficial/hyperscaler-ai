import { sendEmail } from "./send-email";
import {
  welcomeEmail,
  employeeCreatedEmail,
  feedbackEmail,
  passwordResetEmail,
  purchaseConfirmationEmail,
} from "./templates";

export async function sendWelcomeEmail(to: string, userName: string) {
  return sendEmail({
    to,
    subject: "Welcome to Hyperscaler!",
    html: welcomeEmail(userName),
  });
}

export async function sendEmployeeCreatedEmail(
  to: string,
  userName: string,
  email: string,
  password: string
) {
  return sendEmail({
    to,
    subject: "Your Hyperscaler Employee Account",
    html: employeeCreatedEmail(userName, email, password),
  });
}

export async function sendFeedbackEmail(
  to: string,
  userName: string,
  feedbackLink: string
) {
  return sendEmail({
    to,
    subject: "New Feedback from Admin",
    html: feedbackEmail(userName, feedbackLink),
  });
}

export async function sendPasswordResetEmail(
  to: string,
  userName: string,
  resetLink: string
) {
  return sendEmail({
    to,
    subject: "Reset Your Hyperscaler Password",
    html: passwordResetEmail(userName, resetLink),
  });
}

export async function sendPurchaseConfirmationEmail(
  to: string,
  userName: string,
  packageName: string,
  amount: number
) {
  return sendEmail({
    to,
    subject: "Purchase Confirmation - Hyperscaler",
    html: purchaseConfirmationEmail(userName, packageName, amount),
  });
}
