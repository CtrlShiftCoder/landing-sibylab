import "server-only";
import { Resend } from "resend";

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type SendArgs = { subject: string; html: string; text: string; replyTo?: string };

export async function sendEmail({ subject, html, text, replyTo }: SendArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[email] Faltan RESEND_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL");
    return { ok: false as const, reason: "config" as const };
  }
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      subject,
      html,
      text,
      replyTo,
    });
    if (error) {
      console.error("[email] Resend error", error);
      return { ok: false as const, reason: "send" as const };
    }
    return { ok: true as const };
  } catch (e) {
    console.error("[email] Excepción", e);
    return { ok: false as const, reason: "send" as const };
  }
}
