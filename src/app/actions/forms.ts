"use server";

import { headers } from "next/headers";
import { contactSchema, waitlistSchema, type FormState } from "@/lib/schemas";
import { contactServiceLabelsEs } from "@/lib/services";
import { escapeHtml, sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const configError =
  "El formulario aún no está configurado. Escríbenos directamente por correo.";
const sendError = "No pudimos enviar tu mensaje. Inténtalo nuevamente en unos minutos.";
const rateError = "Enviaste varios mensajes seguidos. Espera un momento e inténtalo de nuevo.";

function formValues(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v === "string" && k !== "website") out[k] = v;
  }
  return out;
}

async function clientKey(prefix: string) {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  return `${prefix}:${ip}`;
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  // Honeypot: los bots llenan este campo; respondemos OK sin enviar.
  if (formData.get("website")) return { status: "success", message: "¡Gracias! Te contactaremos pronto." };

  const limited = rateLimit(await clientKey("contact"), { limit: 5, windowMs: 10 * 60_000 });
  if (!limited.ok) {
    return { status: "error", message: rateError, values };
  }

  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }
  const d = parsed.data;
  const interesLabel =
    contactServiceLabelsEs[d.interes as keyof typeof contactServiceLabelsEs] ?? d.interes;
  const utmBits = [
    values.utm_source && `utm_source=${values.utm_source}`,
    values.utm_medium && `utm_medium=${values.utm_medium}`,
    values.utm_campaign && `utm_campaign=${values.utm_campaign}`,
    values.gclid && `gclid=${values.gclid}`,
    values.referrer && `referrer=${values.referrer}`,
  ].filter(Boolean);

  const rows: [string, string][] = [
    ["Nombre", d.nombre],
    ["Empresa", d.empresa],
    ["Correo", d.correo],
    ["Teléfono", d.telefono || "—"],
    ["Interés", interesLabel],
    ["Mensaje", d.mensaje],
  ];
  if (utmBits.length) rows.push(["Atribución", utmBits.join(" | ")]);

  const res = await sendEmail({
    kind: "contact",
    idempotencySeed: `${d.correo}|${d.interes}|${d.mensaje}`,
    subject: `Lead web [${interesLabel}]: ${d.nombre} (${d.empresa})`,
    replyTo: d.correo,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<h2>Nuevo contacto desde Sibylab</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><b>${k}</b></td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
      .join("")}</table>`,
    tags: [{ name: "interest", value: d.interes.slice(0, 256) }],
  });
  if (!res.ok) {
    return {
      status: "error",
      message: res.reason === "config" ? configError : sendError,
      values,
    };
  }
  return {
    status: "success",
    message: "¡Gracias! Recibimos tu mensaje y te contactaremos dentro de 24 horas hábiles.",
  };
}

export async function submitWaitlist(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  if (formData.get("website")) return { status: "success", message: "¡Listo! Te avisaremos." };

  const limited = rateLimit(await clientKey("waitlist"), { limit: 8, windowMs: 10 * 60_000 });
  if (!limited.ok) {
    return { status: "error", message: rateError, values };
  }

  const parsed = waitlistSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Ingresa un correo válido.",
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }
  const res = await sendEmail({
    kind: "waitlist",
    idempotencySeed: parsed.data.correo.toLowerCase(),
    subject: `Lista de espera SaaS: ${parsed.data.correo}`,
    replyTo: parsed.data.correo,
    text: `Nuevo registro en lista de espera: ${parsed.data.correo}`,
    html: `<p>Nuevo registro en lista de espera de productos SaaS: <b>${escapeHtml(parsed.data.correo)}</b></p>`,
  });
  if (!res.ok) {
    return {
      status: "error",
      message: res.reason === "config" ? configError : sendError,
      values,
    };
  }
  return { status: "success", message: "¡Listo! Serás de los primeros en conocer nuestros productos." };
}
