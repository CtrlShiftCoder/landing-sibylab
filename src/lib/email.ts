import "server-only";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import { getEmailEnv } from "@/lib/env";

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type SendArgs = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  /** Prefijo para idempotencia (ej. contact / waitlist). */
  kind: "contact" | "waitlist";
  /** Material estable para evitar dobles envíos (mismo lead en 24h). */
  idempotencySeed: string;
  tags?: { name: string; value: string }[];
};

let resend: Resend | null = null;

function getClient(apiKey: string) {
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

function idempotencyKey(kind: string, seed: string) {
  const hash = createHash("sha256").update(seed).digest("hex").slice(0, 32);
  return `${kind}/${hash}`.slice(0, 256);
}

export async function sendEmail({
  subject,
  html,
  text,
  replyTo,
  kind,
  idempotencySeed,
  tags,
}: SendArgs) {
  const env = getEmailEnv();
  if (!env.ok) {
    console.error("[email] Faltan RESEND_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL");
    return { ok: false as const, reason: "config" as const };
  }

  const { data, error } = await getClient(env.apiKey).emails.send(
    {
      from: env.from,
      to: env.to,
      subject,
      html,
      text,
      replyTo,
      tags: [{ name: "source", value: "landing" }, { name: "kind", value: kind }, ...(tags ?? [])],
    },
    { idempotencyKey: idempotencyKey(kind, idempotencySeed) },
  );

  if (error) {
    console.error("[email] Resend error", error);
    return { ok: false as const, reason: "send" as const };
  }

  return { ok: true as const, id: data?.id };
}
