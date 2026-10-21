import "server-only";

/** Config de correo (solo servidor). Falta cualquiera → formularios no envían. */
export type EmailEnv =
  | { ok: true; apiKey: string; to: string[]; from: string }
  | { ok: false };

export function getEmailEnv(): EmailEnv {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toRaw = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !toRaw || !from) return { ok: false };

  const to = toRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!to.length) return { ok: false };

  return { ok: true, apiKey, to, from };
}
