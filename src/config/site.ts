// ⚠️ Configuración central del sitio. Los valores marcados como PLACEHOLDER
// deben reemplazarse por los datos reales (o definirse vía variables de entorno).
export const siteConfig = {
  name: "Sibylab",
  slogan: "We Build What’s Next.",
  /** Meta description (~155 chars): beneficio + oferta + geo. */
  description:
    "Automatizamos procesos con IA y software a medida en Chile. Agentes inteligentes, integraciones y asesoría para que tu equipo recupere tiempo.",
  /** Title corto para SERP (~50–60 chars). */
  title: "Sibylab | IA y software a medida en Chile",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sibylab.com",
  // PLACEHOLDER: correo público de contacto
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@sibylab.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
} as const;
