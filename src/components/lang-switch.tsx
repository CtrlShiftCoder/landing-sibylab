"use client";

import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/i18n/dictionaries";

export function LangSwitch() {
  const { locale, setLocale, t } = useI18n();

  const btn = (code: Locale) => (
    <button
      type="button"
      onClick={() => setLocale(code)}
      aria-pressed={locale === code}
      className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition ${
        locale === code ? "bg-fgd text-dark" : "text-fgd/55 hover:text-fgd"
      }`}
    >
      {code === "es" ? t.lang.es : t.lang.en}
    </button>
  );

  return (
    <div
      role="group"
      aria-label={t.lang.label}
      className="inline-flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-0.5"
    >
      {btn("es")}
      {btn("en")}
    </div>
  );
}
