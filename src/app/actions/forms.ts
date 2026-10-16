"use server";

import { contactSchema, waitlistSchema, type FormState } from "@/lib/schemas";
import { escapeHtml, sendEmail } from "@/lib/email";

const configError =
  "El formulario aún no está configurado. Escríbenos directamente por correo o WhatsApp.";
const sendError = "No pudimos enviar tu mensaje. Inténtalo nuevamente en unos minutos.";

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot: los humanos no ven este campo
  if (formData.get("website")) return { status: "success", message: "¡Gracias! Te contactaremos pronto." };

  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: "Revisa los campos marcados.", errors: parsed.error.flatten().fieldErrors };
  }
  const d = parsed.data;
  const rows: [string, string][] = [
    ["Nombre", d.nombre],
    ["Empresa", d.empresa],
    ["Correo", d.correo],
    ["Teléfono", d.telefono || "—"],
    ["Mensaje", d.mensaje],
  ];
  const res = await sendEmail({
    subject: `Nuevo contacto web: ${d.nombre} (${d.empresa})`,
    replyTo: d.correo,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<h2>Nuevo contacto desde sibylab</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><b>${k}</b></td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
      .join("")}</table>`,
  });
  if (!res.ok) return { status: "error", message: res.reason === "config" ? configError : sendError };
  return { status: "success", message: "¡Gracias! Recibimos tu mensaje y te contactaremos dentro de 24 horas hábiles." };
}

export async function submitWaitlist(_prev: FormState, formData: FormData): Promise<FormState> {
  if (formData.get("website")) return { status: "success", message: "¡Listo! Te avisaremos." };
  const parsed = waitlistSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: "Ingresa un correo válido.", errors: parsed.error.flatten().fieldErrors };
  }
  const res = await sendEmail({
    subject: `Lista de espera SaaS: ${parsed.data.correo}`,
    replyTo: parsed.data.correo,
    text: `Nuevo registro en lista de espera: ${parsed.data.correo}`,
    html: `<p>Nuevo registro en lista de espera de productos SaaS: <b>${escapeHtml(parsed.data.correo)}</b></p>`,
  });
  if (!res.ok) return { status: "error", message: res.reason === "config" ? configError : sendError };
  return { status: "success", message: "¡Listo! Serás de los primeros en conocer nuestros productos." };
}
