export const sendEmail = async ({ to, subject, body }) => {
  // integrate nodemailer / SES / SendGrid later
  console.log("📧 EMAIL SENT", { to, subject, body });
};