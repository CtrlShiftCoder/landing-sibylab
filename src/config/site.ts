// ⚠️ Configuración central del sitio. Los valores marcados como PLACEHOLDER
// deben reemplazarse por los datos reales (o definirse vía variables de entorno).
export const siteConfig = {
  name: "Sibylab",
  slogan: "We Build What’s Next.",
  description:
    "Sibylab es un laboratorio de tecnología e inteligencia artificial en Chile: desarrollo a medida, automatización con IA, productos SaaS y asesoría estratégica para ahorrar tiempo y eliminar el trabajo repetitivo.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sibylab.cl",
  // PLACEHOLDER: correo público de contacto
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@sibylab.cl",
  // PLACEHOLDER: WhatsApp en formato internacional sin "+" ni espacios
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "56900000000",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+56 9 0000 0000",
  // PLACEHOLDER: link de agenda (Calendly, Google Calendar, etc.)
  scheduleUrl: process.env.NEXT_PUBLIC_SCHEDULE_URL ?? "https://calendly.com/sibylab/reunion",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
} as const;

export const whatsappLink = (text = "Hola Sibylab, quiero agendar mi primera reunión gratis.") =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
