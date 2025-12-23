import formData from "form-data";
import Mailgun from "mailgun.js"; //https://www.npmjs.com/package/mailgun.js?utm_source=recordnotfound.com

const mailgun = new Mailgun(formData);

export const sendMailgunEmail = async ({
  subject,
  html,
  text,
  to,
  from,
  replyTo,
  domain,
  apiKey,
  apiUrl = "https://api.eu.mailgun.net",
}) => {
  const mg = mailgun.client({
    username: "api",
    key: apiKey,
    url: apiUrl,
  });

  const recipients = Array.isArray(to) ? to : [to];

  try {
    await mg.messages.create(domain, {
      from,
      to: recipients,
      subject,
      html,
      text,
      ...(replyTo ? { "h:Reply-To": replyTo } : {}),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
