"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { submitContact, submitWaitlist } from "@/app/actions/forms";
import type { FormState } from "@/lib/schemas";
import { contactServiceValues, type ContactServiceValue } from "@/lib/services";
import { track } from "@/lib/analytics";
import { LeadEvents } from "@/lib/lead-events";
import { siteConfig, whatsappLink } from "@/config/site";
import { useI18n } from "@/components/i18n-provider";

const initial: FormState = { status: "idle" };

function Honeypot() {
  const { t } = useI18n();
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        {t.form.honeypot} <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function AttributionFields() {
  const [attrs, setAttrs] = useState<Record<string, string>>({});
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const next: Record<string, string> = {};
      for (const k of ["utm_source", "utm_medium", "utm_campaign", "gclid"] as const) {
        const v = sp.get(k);
        if (v) next[k] = v;
      }
      if (document.referrer) next.referrer = document.referrer.slice(0, 300);
      setAttrs(next);
      if (Object.keys(next).length) {
        sessionStorage.setItem("sibylab_attrs", JSON.stringify(next));
      } else {
        const saved = sessionStorage.getItem("sibylab_attrs");
        if (saved) setAttrs(JSON.parse(saved) as Record<string, string>);
      }
    } catch {
      /* ignore */
    }
  }, []);
  return (
    <>
      {Object.entries(attrs).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
    </>
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

function PhoneField({ id, error, defaultValue }: { id: string; error?: string; defaultValue?: string }) {
  const { t } = useI18n();
  const [value, setValue] = useState<string>(defaultValue ?? "");

  return (
    <Field id={id} label={t.form.phone} error={error}>
      <PhoneInput
        id={id}
        flags={flags}
        international
        defaultCountry="CL"
        countries={["CL", "AR", "PE", "CO", "MX", "ES", "US", "BR", "UY", "BO", "EC", "PY"]}
        countryCallingCodeEditable={false}
        value={value || undefined}
        onChange={(v) => setValue(v ?? "")}
        className={error ? "PhoneInput PhoneInput--invalid" : "PhoneInput"}
        numberInputProps={{
          autoComplete: "tel",
          "aria-invalid": !!error,
          "aria-describedby": error ? `${id}-error` : undefined,
        }}
      />
      <input type="hidden" name={id} value={value} />
    </Field>
  );
}

export function ContactForm() {
  const { t } = useI18n();
  const [state, action, pending] = useActionState(submitContact, initial);
  const tracked = useRef(false);
  const err = (k: string) => state.errors?.[k]?.[0];
  const v = state.values ?? {};
  const formKey = state.status === "error" ? `err-${v.nombre}-${v.correo}-${v.mensaje?.slice(0, 20)}` : "contact";

  useEffect(() => {
    if (state.status === "success" && !tracked.current) {
      tracked.current = true;
      track(LeadEvents.contactSubmit, { source: "contact_form" });
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div role="status" className="glass flex min-h-80 flex-col items-center justify-center gap-3 rounded-3xl p-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-tld/20 text-2xl text-tld">✓</span>
        <p className="text-lg font-semibold text-fgd">{state.message}</p>
        <p className="text-sm text-fgd/60">{t.form.successNext}</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <a href={siteConfig.scheduleUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-fgd px-5 py-2.5 text-sm font-semibold text-dark transition hover:bg-tld">
            {t.form.schedule}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fgd">
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const a = (k: string) => ({ id: k, name: k, "aria-invalid": !!err(k), "aria-describedby": err(k) ? `${k}-error` : undefined });

  return (
    <form key={formKey} action={action} noValidate className="glass relative grid gap-4 rounded-3xl p-6 sm:grid-cols-2 sm:p-8">
      <Honeypot />
      <AttributionFields />
      <Field id="nombre" label={t.form.name} error={err("nombre")}>
        <input {...a("nombre")} required autoComplete="name" className={inputCls} placeholder={t.form.namePh} defaultValue={v.nombre ?? ""} />
      </Field>
      <Field id="empresa" label={t.form.company} error={err("empresa")}>
        <input {...a("empresa")} required autoComplete="organization" className={inputCls} placeholder={t.form.companyPh} defaultValue={v.empresa ?? ""} />
      </Field>
      <Field id="correo" label={t.form.email} error={err("correo")}>
        <input {...a("correo")} type="email" required autoComplete="email" className={inputCls} placeholder={t.form.emailPh} defaultValue={v.correo ?? ""} />
      </Field>
      <PhoneField id="telefono" error={err("telefono")} defaultValue={v.telefono} />
      <div className="sm:col-span-2">
        <Field id="interes" label={t.form.interest} error={err("interes")}>
          <select {...a("interes")} required defaultValue={v.interes ?? "automatizacion"} className={`${inputCls} select-dark`}>
            {contactServiceValues.map((value) => (
              <option key={value} value={value}>
                {t.contactServices[value as ContactServiceValue]}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field id="mensaje" label={t.form.message} error={err("mensaje")}>
          <textarea
            {...a("mensaje")}
            required
            rows={4}
            className={`${inputCls} resize-y`}
            placeholder={t.form.messagePh}
            defaultValue={v.mensaje ?? ""}
          />
        </Field>
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fgd/50">{t.form.privacy}</p>
        <p aria-live="polite" className="text-sm text-rose-300">{state.status === "error" ? state.message : ""}</p>
        <button type="submit" disabled={pending} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-p2 to-tl px-7 py-3.5 font-semibold text-white shadow-[0_10px_40px_rgba(155,66,171,.4)] transition hover:brightness-110 disabled:opacity-60">
          {pending ? t.form.sending : t.form.submit}
        </button>
      </div>
    </form>
  );
}

export function WaitlistForm() {
  const { t } = useI18n();
  const [state, action, pending] = useActionState(submitWaitlist, initial);
  const tracked = useRef(false);
  const formKey = state.status === "error" ? `wl-err-${state.values?.correo ?? ""}` : "waitlist";

  useEffect(() => {
    if (state.status === "success" && !tracked.current) {
      tracked.current = true;
      track(LeadEvents.waitlistSubmit, { source: "saas_waitlist" });
    }
  }, [state.status]);

  if (state.status === "success") return <p role="status" className="font-semibold text-tl">✓ {state.message}</p>;
  return (
    <form key={formKey} action={action} noValidate className="relative">
      <Honeypot />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="wl-correo" className="sr-only">{t.form.email}</label>
        <input
          id="wl-correo"
          name="correo"
          type="email"
          required
          autoComplete="email"
          placeholder={t.form.waitlistPh}
          defaultValue={state.values?.correo ?? ""}
          aria-invalid={state.status === "error"}
          aria-describedby="wl-msg"
          className="min-w-0 flex-1 rounded-full border border-p/20 bg-white px-5 py-3 text-ink outline-none focus:border-p focus:ring-2 focus:ring-p/20"
        />
        <button type="submit" disabled={pending} className="rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-p disabled:opacity-60">
          {pending ? t.form.waitlistSending : t.form.waitlistSubmit}
        </button>
      </div>
      <p id="wl-msg" aria-live="polite" className="mt-2 text-sm text-rose-600">{state.status === "error" ? state.message : ""}</p>
    </form>
  );
}
