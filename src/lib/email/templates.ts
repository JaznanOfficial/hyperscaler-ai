const emailFooter = `
<tr>
  <td style="padding:40px;background:#F5F7FA;border-top:1px solid #D1D1D1;">
    <table role="presentation" width="100%">
      <tr>
        <td align="center" style="padding-bottom:16px;">
          <img src="https://i.ibb.co.com/V05VJ694/Logo-and-Title.png" alt="Hyperscaler" width="150" style="max-width:100%;height:auto;">
        </td>
      </tr>
      <tr>
        <td align="center" style="padding-bottom:8px;">
          <p style="font-size:14px;color:#414851;margin:0;">Building the future of workflow automation</p>
          <p style="font-size:12px;color:#515A65;margin:4px 0 0;">Manhattan, New York</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:16px 0;">
          <a href="https://calendly.com/ujjwalroy/meet-ujjwal" style="color:#414851;text-decoration:none;font-size:12px;font-weight:500;margin:0 12px;">Consultation</a>
          <a href="https://scalebuild.ai/privacy-and-policy" style="color:#414851;text-decoration:none;font-size:12px;font-weight:500;margin:0 12px;">Privacy Policy</a>
          <a href="https://scalebuild.ai/terms-of-service" style="color:#414851;text-decoration:none;font-size:12px;font-weight:500;margin:0 12px;">Terms of Service</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="font-size:12px;color:#1A1A1A;">© 2025 Hyperscaler. All rights reserved.</td>
      </tr>
    </table>
  </td>
</tr>
`;

export function welcomeEmail(userName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Welcome to Hyperscaler</title></head>
<body style="margin:0;padding:0;background-color:#F3F4F6;font-family:'Inter',Arial,sans-serif;">
<table role="presentation" width="100%" bgcolor="#F3F4F6" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.05);" cellpadding="0" cellspacing="0">
<tr><td style="padding:40px 40px 0px;">
<table role="presentation" width="100%">
<tr><td style="padding-bottom:24px;"><img src="https://i.ibb.co.com/V05VJ694/Logo-and-Title.png" alt="Hyperscaler" width="180" style="max-width:100%;height:auto;"></td></tr>
<tr><td><h1 style="font-family:'Outfit','Inter',Arial,sans-serif;font-size:28px;font-weight:600;color:#1A1A1A;margin:0 0 8px;">Welcome to Hyperscaler!</h1>
<p style="font-size:16px;color:#414851;margin:0;">Stop being the bottleneck in your own company's growth.</p></td></tr>
</table></td></tr>
<tr><td style="padding:40px;">
<table role="presentation" width="100%">
<tr><td style="font-size:16px;color:#1A1A1A;font-weight:500;padding-bottom:8px;">Hey <strong>${userName}</strong>,</td></tr>
<tr><td><p style="font-size:16px;line-height:22px;color:#515A65;margin:0 0 12px;">Welcome to <strong>Hyperscaler</strong>! Your account is now active and ready to use.</p>
<p style="font-size:16px;line-height:22px;color:#515A65;margin:0 0 12px;">We're excited to have you on board. If you have any questions or need assistance getting started, just reply to this email—we're here to help.</p>
<p style="font-size:16px;line-height:22px;color:#515A65;margin:0;">Let's build something great together.</p></td></tr>
</table></td></tr>
${emailFooter}
</table></td></tr>
</table></body></html>`;
}

export function employeeCreatedEmail(
  userName: string,
  email: string,
  password: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Employee Profile Created</title></head>
<body style="margin:0;padding:0;background-color:#F3F4F6;font-family:'Inter',Arial,sans-serif;">
<table role="presentation" width="100%" bgcolor="#F3F4F6" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.05);" cellpadding="0" cellspacing="0">
<tr><td style="padding:40px 40px 0px;">
<table role="presentation" width="100%">
<tr><td style="padding-bottom:24px;"><img src="https://i.ibb.co.com/V05VJ694/Logo-and-Title.png" alt="Hyperscaler" width="180" style="max-width:100%;height:auto;"></td></tr>
<tr><td><h1 style="font-family:'Outfit','Inter',Arial,sans-serif;font-size:28px;font-weight:600;color:#1A1A1A;margin:0 0 8px;">Profile Created</h1>
<p style="font-size:16px;color:#414851;margin:0;">Welcome to Hyperscaler!</p></td></tr>
</table></td></tr>
<tr><td style="padding:40px;">
<table role="presentation" width="100%">
<tr><td style="font-size:16px;color:#1A1A1A;font-weight:500;padding-bottom:8px;">Hey <strong>${userName}</strong> 👋</td></tr>
<tr><td><p style="font-size:16px;line-height:22px;color:#515A65;margin:0 0 8px;">Welcome aboard! We've created your employee profile in Hyperscaler. Use the credentials below to sign in. Keep it secret!</p>
<ul style="margin:0 0 16px 18px;padding:0;">
<li style="font-size:16px;line-height:22px;color:#515A65;margin-bottom:8px;">Email: <strong style="color:#1A1A1A;">${email}</strong></li>
<li style="font-size:16px;line-height:22px;color:#515A65;">Password: <strong style="color:#1A1A1A;">${password}</strong></li>
</ul></td></tr>
</table></td></tr>
${emailFooter}
</table></td></tr>
</table></body></html>`;
}

export function feedbackEmail(userName: string, feedbackLink: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Admin Feedback</title></head>
<body style="margin:0;padding:0;background-color:#F3F4F6;font-family:'Inter',Arial,sans-serif;">
<table role="presentation" width="100%" bgcolor="#F3F4F6" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.05);" cellpadding="0" cellspacing="0">
<tr><td style="padding:40px 40px 0px;">
<table role="presentation" width="100%">
<tr><td style="padding-bottom:24px;"><img src="https://i.ibb.co.com/V05VJ694/Logo-and-Title.png" alt="Hyperscaler" width="180" style="max-width:100%;height:auto;"></td></tr>
<tr><td><h1 style="font-family:'Outfit','Inter',Arial,sans-serif;font-size:28px;font-weight:600;color:#1A1A1A;margin:0 0 8px;">Feedback From Admin</h1>
<p style="font-size:16px;color:#414851;margin:0;">You've received feedback from the admin regarding your account or recent activity.</p></td></tr>
</table></td></tr>
<tr><td style="padding:40px;">
<table role="presentation" width="100%">
<tr><td style="font-size:16px;color:#1A1A1A;font-weight:500;padding-bottom:8px;">Hey <strong>${userName}</strong> 👋</td></tr>
<tr><td><p style="font-size:16px;line-height:22px;color:#515A65;margin:0 0 12px;">Please review the details carefully and take any necessary action if required.</p>
<p style="font-size:16px;line-height:22px;color:#515A65;margin:0 0 20px;">Click the button below to check the feedback.</p></td></tr>
<tr><td style="padding-bottom:24px;"><a href="${feedbackLink}" style="background:linear-gradient(296deg,#D946EF 0%,#5B21B6 100%);border-radius:8px;color:#FFFFFF;text-decoration:none;font-weight:600;font-size:14px;padding:16px 24px;display:inline-block;">See all feedbacks</a></td></tr>
</table></td></tr>
${emailFooter}
</table></td></tr>
</table></body></html>`;
}

export function passwordResetEmail(
  userName: string,
  resetLink: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Password Reset</title></head>
<body style="margin:0;padding:0;background-color:#F3F4F6;font-family:'Inter',Arial,sans-serif;">
<table role="presentation" width="100%" bgcolor="#F3F4F6" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.05);" cellpadding="0" cellspacing="0">
<tr><td style="padding:40px 40px 0px;">
<table role="presentation" width="100%">
<tr><td style="padding-bottom:24px;"><img src="https://i.ibb.co.com/V05VJ694/Logo-and-Title.png" alt="Hyperscaler" width="180" style="max-width:100%;height:auto;"></td></tr>
<tr><td><h1 style="font-family:'Outfit','Inter',Arial,sans-serif;font-size:28px;font-weight:600;color:#1A1A1A;margin:0 0 8px;">Reset Your Password</h1>
<p style="font-size:16px;color:#414851;margin:0;">We've got you covered in just a few clicks</p></td></tr>
</table></td></tr>
<tr><td style="padding:40px;">
<table role="presentation" width="100%">
<tr><td style="font-size:16px;color:#1A1A1A;font-weight:500;padding-bottom:8px;">Hey <strong>${userName}</strong> 👋</td></tr>
<tr><td><p style="font-size:16px;line-height:22px;color:#515A65;margin:0 0 12px;">We received a request to reset your password for your Hyperscaler account. No worries — happens to the best of us!</p>
<p style="font-size:16px;line-height:22px;color:#515A65;margin:0 0 20px;">Click the button below to create a new password. This link will be active for the next 24 hours.</p></td></tr>
<tr><td style="padding-bottom:24px;"><a href="${resetLink}" style="background:linear-gradient(296deg,#D946EF 0%,#5B21B6 100%);border-radius:8px;color:#FFFFFF;text-decoration:none;font-weight:600;font-size:14px;padding:16px 24px;display:inline-block;">Reset My Password</a></td></tr>
<tr><td><p style="font-size:16px;line-height:22px;color:#515A65;margin:0 0 12px;">Didn't request this password reset? No worries — your account is completely safe. Just ignore this email.</p></td></tr>
</table></td></tr>
${emailFooter}
</table></td></tr>
</table></body></html>`;
}

export function purchaseConfirmationEmail(
  userName: string,
  packageName: string,
  amount: number
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Purchase Confirmation</title></head>
<body style="margin:0;padding:0;background-color:#F3F4F6;font-family:'Inter',Arial,sans-serif;">
<table role="presentation" width="100%" bgcolor="#F3F4F6" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.05);" cellpadding="0" cellspacing="0">
<tr><td style="padding:40px 40px 0px;">
<table role="presentation" width="100%">
<tr><td style="padding-bottom:24px;"><img src="https://i.ibb.co.com/V05VJ694/Logo-and-Title.png" alt="Hyperscaler" width="180" style="max-width:100%;height:auto;"></td></tr>
<tr><td><h1 style="font-family:'Outfit','Inter',Arial,sans-serif;font-size:28px;font-weight:600;color:#1A1A1A;margin:0 0 8px;">Purchase Confirmation</h1>
<p style="font-size:16px;color:#414851;margin:0;">Thank you for your purchase!</p></td></tr>
</table></td></tr>
<tr><td style="padding:40px;">
<table role="presentation" width="100%">
<tr><td style="font-size:16px;color:#1A1A1A;font-weight:500;padding-bottom:8px;">Hey <strong>${userName}</strong> 👋</td></tr>
<tr><td><p style="font-size:16px;line-height:22px;color:#515A65;margin:0 0 8px;">Thank you for your purchase! We've received your order and are processing it now.</p>
<ul style="margin:0 0 16px 18px;padding:0;">
<li style="font-size:16px;line-height:22px;color:#515A65;margin-bottom:8px;">Package: <strong style="color:#1A1A1A;">${packageName}</strong></li>
<li style="font-size:16px;line-height:22px;color:#515A65;">Total: <strong style="color:#1A1A1A;">$${(amount / 100).toFixed(2)}/month</strong></li>
</ul></td></tr>
</table></td></tr>
${emailFooter}
</table></td></tr>
</table></body></html>`;
}
