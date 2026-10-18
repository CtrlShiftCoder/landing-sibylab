import { z } from "zod";
import { contactServiceValues } from "@/lib/services";

export const contactIntent = z.enum(contactServiceValues);

export const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre").max(100),
  empresa: z.string().trim().min(2, "Ingresa tu empresa").max(120),
  correo: z.email("Correo inválido").max(160),
  telefono: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+\d\s()-]*$/, "Teléfono inválido")
    .optional()
    .or(z.literal("")),
  interes: contactIntent.default("automatizacion"),
  mensaje: z.string().trim().min(10, "Cuéntanos un poco más (mín. 10 caracteres)").max(3000),
});

export const waitlistSchema = z.object({
  correo: z.email("Correo inválido").max(160),
});

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
  values?: Record<string, string>;
};
