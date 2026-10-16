"use client";

import { useActionState } from "react";
import { submitContact, submitWaitlist } from "@/app/actions/forms";
import type { FormState } from "@/lib/schemas";

const initial: FormState = { status: "idle" };

function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>No llenar <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-fgd placeholder:text-fgd/40 outline-none transition focus:border-tld focus:ring-2 focus:ring-tld/30 aria-[invalid=true]:border-rose-400";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-fgd/80">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="text-xs text-rose-300">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const err = (k: string) => state.errors?.[k]?.[0];
  if (state.status === "success") {
    return (
      <div role="status" className="glass flex min-h-80 flex-col items-center justify-center gap-3 rounded-3xl p-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-tld/20 text-2xl text-tld">✓</span>
        <p className="text-lg font-semibold text-fgd">{state.message}</p>
      </div>
    );
  }
  const a = (k: string) => ({ id: k, name: k, "aria-invalid": !!err(k), "aria-describedby": err(k) ? `${k}-error` : undefined });
  return (
    <form action={action} noValidate className="glass relative grid gap-4 rounded-3xl p-6 sm:grid-cols-2 sm:p-8">
      <Honeypot />
      <Field id="nombre" label="Nombre *" error={err("nombre")}><input {...a("nombre")} required autoComplete="name" className={inputCls} placeholder="Tu nombre" /></Field>
      <Field id="empresa" label="Empresa *" error={err("empresa")}><input {...a("empresa")} required autoComplete="organization" className={inputCls} placeholder="Nombre de tu empresa" /></Field>
      <Field id="correo" label="Correo *" error={err("correo")}><input {...a("correo")} type="email" required autoComplete="email" className={inputCls} placeholder="tu@empresa.cl" /></Field>
      <Field id="telefono" label="Teléfono (opcional)" error={err("telefono")}><input {...a("telefono")} type="tel" autoComplete="tel" className={inputCls} placeholder="+56 9 ..." /></Field>
      <div className="sm:col-span-2">
        <Field id="mensaje" label="¿Qué te quita tiempo hoy? *" error={err("mensaje")}>
          <textarea {...a("mensaje")} required rows={4} className={`${inputCls} resize-y`} placeholder="Cuéntanos el proceso, problema o idea que quieres resolver." />
        </Field>
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm text-rose-300">{state.status === "error" ? state.message : ""}</p>
        <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-p2 to-tl px-7 py-3.5 font-semibold text-white shadow-[0_10px_40px_rgba(155,66,171,.4)] transition hover:brightness-110 disabled:opacity-60">
          {pending ? "Enviando…" : "Enviar y cotizar"}
        </button>
      </div>
    </form>
  );
}

export function WaitlistForm() {
  const [state, action, pending] = useActionState(submitWaitlist, initial);
  if (state.status === "success") return <p role="status" className="font-semibold text-tl">✓ {state.message}</p>;
  return (
    <form action={action} noValidate className="relative">
      <Honeypot />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="wl-correo" className="sr-only">Tu correo</label>
        <input id="wl-correo" name="correo" type="email" required autoComplete="email" placeholder="tu@empresa.cl"
          aria-invalid={state.status === "error"} aria-describedby="wl-msg"
          className="min-w-0 flex-1 rounded-full border border-p/20 bg-white px-5 py-3 text-ink outline-none focus:border-p focus:ring-2 focus:ring-p/20" />
        <button type="submit" disabled={pending} className="rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-p disabled:opacity-60">
          {pending ? "Enviando…" : "Unirme a la lista"}
        </button>
      </div>
      <p id="wl-msg" aria-live="polite" className="mt-2 text-sm text-rose-600">{state.status === "error" ? state.message : ""}</p>
    </form>
  );
}
