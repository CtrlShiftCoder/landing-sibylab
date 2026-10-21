import "server-only";
import { siteConfig } from "@/config/site";
import { escapeHtml } from "@/lib/email";

/** Paleta Sibylab (alineada a globals.css) — colores en hex para clientes de correo. */
const brand = {
  purple: "#71388f",
  purpleLight: "#9b42ab",
  purpleDeep: "#5c1f6d",
  teal: "#0f6b6b",
  tealBright: "#3fbfb2",
  dark: "#150c1d",
  lavender: "#f3f0f8",
  surface: "#ffffff",
  ink: "#0f0f1e",
  ink2: "#444468",
  ink3: "#6e6e92",
  border: "#e6dfee",
} as const;

function logoBlock() {
  const logoUrl = `${siteConfig.url.replace(/\/$/, "")}/brand/logo.png`;
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="left" style="vertical-align:middle;">
          <img src="${logoUrl}" alt="Sibylab" width="40" height="40" style="display:block;border:0;border-radius:10px;" />
        </td>
        <td align="left" style="padding-left:12px;vertical-align:middle;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;line-height:1.2;">Sibylab</div>
          <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.tealBright};margin-top:2px;">${escapeHtml(siteConfig.slogan)}</div>
        </td>
      </tr>
    </table>`;
}

function layout(opts: { preheader: string; title: string; subtitle?: string; bodyHtml: string }) {
  const year = new Date().getFullYear();
  const site = siteConfig.url.replace(/\/$/, "");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(opts.title)}</title>
  <!--[if mso]><style>body,table,td{font-family:Arial,Helvetica,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background:${brand.lavender};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${brand.lavender};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background:${brand.surface};border-radius:20px;overflow:hidden;border:1px solid ${brand.border};box-shadow:0 18px 48px rgba(123,45,139,0.10);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,${brand.dark} 0%,${brand.purpleDeep} 55%,${brand.purple} 100%);padding:28px 32px;">
              ${logoBlock()}
              <div style="height:1px;background:linear-gradient(90deg,transparent,${brand.purpleLight},${brand.tealBright},transparent);margin:20px 0 18px;opacity:0.7;"></div>
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:${brand.tealBright};margin-bottom:8px;">Lead desde la web</div>
              <h1 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:24px;line-height:1.25;font-weight:800;color:#f6f1fa;letter-spacing:-0.02em;">${escapeHtml(opts.title)}</h1>
              ${
                opts.subtitle
                  ? `<p style="margin:10px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:rgba(246,241,250,0.72);">${escapeHtml(opts.subtitle)}</p>`
                  : ""
              }
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${brand.ink};">
              ${opts.bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:8px 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${brand.border};">
                <tr>
                  <td style="padding-top:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:${brand.ink3};">
                    Enviado automáticamente desde <a href="${site}" style="color:${brand.purple};text-decoration:none;font-weight:600;">sibylab.com</a><br />
                    © ${year} Sibylab · ${escapeHtml(siteConfig.slogan)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(label: string, value: string, opts?: { multiline?: boolean; accent?: boolean }) {
  const valueStyle = opts?.multiline
    ? `white-space:pre-wrap;line-height:1.55;`
    : `line-height:1.4;`;
  const valueColor = opts?.accent ? brand.purple : brand.ink;
  return `
    <tr>
      <td style="padding:0 0 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${brand.lavender};border-radius:14px;border:1px solid ${brand.border};">
          <tr>
            <td style="padding:14px 16px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${brand.ink3};margin-bottom:6px;">${escapeHtml(label)}</div>
              <div style="font-size:15px;font-weight:600;color:${valueColor};${valueStyle}">${escapeHtml(value)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

export function contactLeadEmailHtml(input: {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  interesLabel: string;
  mensaje: string;
  attribution?: string;
}) {
  const mailto = `mailto:${encodeURIComponent(input.correo)}?subject=${encodeURIComponent(`Re: tu consulta en Sibylab`)}`;
  const body = `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.55;color:${brand.ink2};">
      Llegó un nuevo contacto. Puedes responder directo a este correo (Reply-To = el lead).
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${fieldRow("Nombre", input.nombre)}
      ${fieldRow("Empresa", input.empresa)}
      ${fieldRow("Correo", input.correo, { accent: true })}
      ${fieldRow("Teléfono", input.telefono || "—")}
      ${fieldRow("Interés", input.interesLabel, { accent: true })}
      ${fieldRow("Mensaje", input.mensaje, { multiline: true })}
      ${input.attribution ? fieldRow("Atribución", input.attribution) : ""}
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 20px;">
      <tr>
        <td style="border-radius:999px;background:linear-gradient(90deg,${brand.purpleLight},${brand.teal});">
          <a href="${mailto}" style="display:inline-block;padding:12px 22px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">Responder al lead</a>
        </td>
      </tr>
    </table>`;

  return layout({
    preheader: `${input.nombre} de ${input.empresa} · ${input.interesLabel}`,
    title: "Nuevo contacto",
    subtitle: `${input.nombre} · ${input.empresa}`,
    bodyHtml: body,
  });
}

export function waitlistEmailHtml(correo: string) {
  const body = `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.55;color:${brand.ink2};">
      Alguien se sumó a la lista de espera de productos SaaS.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${fieldRow("Correo", correo, { accent: true })}
    </table>`;

  return layout({
    preheader: `Lista de espera: ${correo}`,
    title: "Nuevo en lista de espera",
    subtitle: "Productos SaaS",
    bodyHtml: body,
  });
}
