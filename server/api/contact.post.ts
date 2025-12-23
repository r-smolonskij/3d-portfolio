import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js";

const escapeHtml = (value = "") =>
  value
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: config.mailgunApiKey as string,
  });
  try {
    const body = await readBody<{
      name?: string;
      email?: string;
      message?: string;
    }>(event);

    const name = body?.name?.trim();
    const email = body?.email?.trim();
    const message = body?.message?.trim();

    if (!name || !email || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing name, email, or message",
      });
    }
    const html = `
      <p><strong>Vārds:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-pasts:</strong> ${escapeHtml(email)}</p>
      <p><strong>Vēstule:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    const data = await mg.messages.create(
      "sandbox73162e71006e42b2b095283792a1ae1c.mailgun.org",
      {
        from: "BN <info@bnsystems.lv>",
        to: ["mobwebtech.latvia@gmail.com"],
        subject: "Ziņa no MobWebTech.eu",
        html,
      }
    );

    return { ok: true };
  } catch (error) {
    console.log(error); //logs any error
  }
});
