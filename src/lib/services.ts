/** Valores de interés del formulario (labels vía i18n). */
export const contactServiceValues = [
  "automatizacion",
  "agentes",
  "chatbots",
  "rag",
  "documentos",
  "copiloto",
  "prediccion",
  "vision",
  "voz",
  "software",
  "web_mobile",
  "integraciones",
  "asesoria",
  "diagnostico",
  "roadmap",
  "otro",
] as const;

export type ContactServiceValue = (typeof contactServiceValues)[number];

/** Labels ES para emails (el servidor no tiene i18n de UI). */
export const contactServiceLabelsEs: Record<ContactServiceValue, string> = {
  automatizacion: "Automatización con IA",
  agentes: "Agentes de IA para el negocio",
  chatbots: "Chatbots y asistentes conversacionales",
  rag: "RAG / bases de conocimiento con IA",
  documentos: "Procesamiento inteligente de documentos (OCR + IA)",
  copiloto: "Copilotos internos para tu equipo",
  prediccion: "Analítica predictiva y forecasting",
  vision: "Visión artificial / computer vision",
  voz: "IA de voz y atención telefónica",
  software: "Software a medida",
  web_mobile: "Aplicaciones web y móviles",
  integraciones: "Integración de sistemas y APIs",
  asesoria: "Asesoría / CTO fraccional",
  diagnostico: "Diagnóstico tecnológico",
  roadmap: "Roadmap de transformación con IA",
  otro: "Aún no lo tengo claro",
};
