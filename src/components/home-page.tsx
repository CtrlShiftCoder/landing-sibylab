"use client";

import { siteConfig } from "@/config/site";
import { Icon } from "@/components/icons";
import { ContactForm, WaitlistForm } from "@/components/forms";
import { NeuralCanvas } from "@/components/neural-canvas";
import { Effects } from "@/components/effects";
import { Eye3D } from "@/components/eye-3d";
import { SibylabLogo } from "@/components/sibylab-logo";
import { TrackLink } from "@/components/track-link";
import { LangSwitch } from "@/components/lang-switch";
import { useI18n } from "@/components/i18n-provider";
import { LeadEvents } from "@/lib/lead-events";

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[.2em] ${dark ? "text-tld" : "text-p"}`}>
      <span className={`h-px w-6 ${dark ? "bg-tld" : "bg-p"}`} />
      {children}
    </p>
  );
}

function Logo({ light }: { light?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="Sibylab">
      <SibylabLogo size={36} />
      <span className={`font-brand text-[1.35rem] font-bold tracking-[-0.03em] ${light ? "text-fgd" : "text-ink"}`}>Sibylab</span>
    </a>
  );
}

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-p2 to-tl px-7 py-3.5 font-semibold text-white shadow-[0_10px_40px_rgba(155,66,171,.45)] transition hover:-translate-y-0.5 hover:brightness-110";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-fgd transition hover:border-tld hover:text-tld";

const serviceIcons = [Icon.code, Icon.bot, Icon.compass] as const;
const painIcons = [Icon.repeat, Icon.file, Icon.puzzle, Icon.clock] as const;
const pillarIcons = [Icon.brain, Icon.rocket, Icon.target, Icon.bolt, Icon.link] as const;

export function HomePage() {
  const { t } = useI18n();

  const nav = [
    { href: "#servicios", label: t.nav.services },
    { href: "#diferencia", label: t.nav.why },
    { href: "#proceso", label: t.nav.process },
    { href: "#experiencia", label: t.nav.experience },
    { href: "#faq", label: t.nav.faq },
    { href: "#contacto", label: t.nav.contact },
  ];

  return (
    <>
      <Effects />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        {t.skip}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-dark/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
          <Logo light />
          <nav aria-label={t.nav.main} className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm text-fgd/70">
              {nav.map((n) => (
                <li key={n.href}>
                  <a className="transition hover:text-fgd" href={n.href}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch />
            <TrackLink
              href="#contacto"
              event={LeadEvents.ctaClick}
              eventProps={{ location: "header" }}
              className="rounded-full bg-fgd px-3 py-2 text-sm font-semibold text-dark transition hover:bg-tld sm:px-5"
            >
              {t.nav.cta}
            </TrackLink>
            <details className="group relative lg:hidden">
              <summary
                className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-white/15 text-fgd [&::-webkit-details-marker]:hidden"
                aria-label={t.nav.menu}
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
                  <path d="M6 6l12 12M18 6 6 18" className="hidden group-open:block" />
                </svg>
              </summary>
              <nav aria-label={t.nav.mobile} className="absolute right-0 top-12 w-60 rounded-2xl border border-white/10 bg-dark/95 p-3 shadow-2xl backdrop-blur-xl">
                <ul className="flex flex-col">
                  {nav.map((n) => (
                    <li key={n.href}>
                      <a className="block rounded-lg px-4 py-3 text-fgd/80 hover:bg-white/5 hover:text-fgd" href={n.href}>
                        {n.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a className="mt-1 block rounded-lg bg-fgd px-4 py-3 text-center font-semibold text-dark" href="#contacto">
                      {t.nav.cta}
                    </a>
                  </li>
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Morado */}
        <section id="inicio" className="relative overflow-hidden bg-dark pb-24 pt-32 text-fgd sm:pt-40 lg:pb-32">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <NeuralCanvas />
          <div className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-dark/60 blur-[120px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-52 -left-40 size-[32rem] rounded-full bg-dark/60 blur-[120px]" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr]">
            <div className="animate-fade-up">
              <p className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-fgd/80">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-tld opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-tld" />
                </span>
                {t.hero.badge}
              </p>
              <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                {t.hero.h1a} <span className="text-gradient" data-scramble={t.hero.h1b}>{t.hero.h1b}</span>
                <br />
                {t.hero.h1c} <span className="text-gradient">{t.hero.h1d}</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-fgd/70">{t.hero.sub}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <TrackLink
                  href="#contacto"
                  event={LeadEvents.ctaClick}
                  eventProps={{ location: "hero" }}
                  className={`${btnPrimary} glitch`}
                  data-text={t.hero.cta}
                >
                  {t.hero.cta} <Icon.arrow className="size-4" />
                </TrackLink>
                <a href="#servicios" className={btnGhost}>
                  {t.hero.secondary}
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fgd/55">
                <li className="flex items-center gap-2">
                  <Icon.check className="size-4 text-tld" />
                  {t.hero.trust1}
                </li>
                <li className="flex items-center gap-2">
                  <Icon.check className="size-4 text-tld" />
                  {t.hero.trust2}
                </li>
                <li className="flex items-center gap-2">
                  <Icon.check className="size-4 text-tld" />
                  {t.hero.trust3}
                </li>
              </ul>
              <p className="mt-6 font-mono text-sm tracking-wide text-tld">
                {"// "}
                <span data-scramble={siteConfig.slogan}>{siteConfig.slogan}</span>
                <span className="ml-0.5 inline-block w-2 animate-pulse">▍</span>
              </p>
            </div>

            <div className="relative mx-auto hidden aspect-square w-full max-w-md sm:block" aria-hidden>
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-fgd/10" />
              <div className="absolute inset-12 rounded-full border border-p2/20" />
              <div className="absolute inset-20 rounded-full bg-black shadow-[0_0_80px_rgba(0,0,0,0.9),0_0_120px_rgba(92,31,109,0.3),inset_0_0_60px_rgba(0,0,0,0.8)]" />
              <div className="absolute inset-24 grid place-items-center rounded-full bg-gradient-radial from-black/95 to-black">
                <Eye3D size={200} enableTracking />
              </div>
              <div className="glass absolute left-0 top-16 animate-float rounded-2xl px-4 py-3 text-sm shadow-lg">
                <span className="font-mono text-tld">agente.run()</span>
                <br />
                <span className="text-fgd/70">{t.hero.card1}</span>
              </div>
              <div className="glass absolute bottom-12 right-0 animate-float rounded-2xl px-4 py-3 text-sm shadow-lg [animation-delay:-4s]">
                <span className="font-mono text-p2">flujo.auto</span>
                <br />
                <span className="text-fgd/70">{t.hero.card2}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Blanco */}
        <section aria-labelledby="dolor-title" className="relative bg-bg py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <Eyebrow>{t.pain.eyebrow}</Eyebrow>
              <h2 id="dolor-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                {t.pain.title} <span className="text-gradient-light">{t.pain.titleAccent}</span>
              </h2>
            </div>
            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {t.pain.items.map((item, i) => {
                const I = painIcons[i];
                return (
                  <li key={`pain-${i}`} className="card-light reveal spot group rounded-3xl p-7 transition hover:-translate-y-1">
                    <span className="grid size-12 place-items-center rounded-2xl bg-p/10 text-p transition group-hover:bg-p group-hover:text-white">
                      <I className="size-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{item.t}</h3>
                    <p className="mt-2 text-ink2">{item.d}</p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl border border-tl/20 bg-tl/5 p-6 text-center sm:p-8">
              <p className="text-lg text-ink2 sm:text-xl">{t.pain.ctaText}</p>
              <TrackLink
                href="#contacto"
                event={LeadEvents.ctaClick}
                eventProps={{ location: "dolor" }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-p2 to-tl px-7 py-3.5 font-semibold text-white shadow-[0_10px_40px_rgba(155,66,171,.45)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                {t.pain.cta} <Icon.arrow className="size-4" />
              </TrackLink>
            </div>
          </div>
        </section>

        {/* Morado */}
        <section id="servicios" aria-labelledby="serv-title" className="relative overflow-hidden bg-dark py-24 text-fgd sm:py-28">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <Eyebrow dark>{t.services.eyebrow}</Eyebrow>
                <h2 id="serv-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                  {t.services.title} <span className="text-gradient">{t.services.titleAccent}</span>
                </h2>
              </div>
              <p className="max-w-md text-fgd/70">{t.services.aside}</p>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {t.services.cards.map((card, i) => {
                const I = serviceIcons[i];
                return (
                  <article
                    key={`svc-${i}`}
                    className="card-light spot flex flex-col rounded-3xl p-8 text-ink transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(123,45,139,.16)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-p to-tl text-white">
                        <I className="size-7" />
                      </span>
                      <span className="rounded-full bg-p/10 px-3 py-1 font-mono text-xs font-medium text-p">{card.tag}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-ink">{card.t}</h3>
                    <p className="mt-3 text-ink2">{card.d}</p>
                    <ul className="mt-6 space-y-2.5 border-t border-p/10 pt-6">
                      {card.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm text-ink">
                          <Icon.check className="mt-0.5 size-4 shrink-0 text-tl" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <article aria-labelledby="saas-title" className="relative mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white p-8 text-ink sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-p/15 blur-3xl" aria-hidden />
              <div className="relative grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-14 place-items-center rounded-2xl bg-ink text-white">
                      <Icon.layers className="size-7" />
                    </span>
                    <span className="rounded-full bg-p px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-white">
                      {t.services.saasBadge}
                    </span>
                  </div>
                  <h3 id="saas-title" className="mt-6 text-2xl font-bold sm:text-3xl">
                    {t.services.saasTitle}
                  </h3>
                  <p className="mt-3 text-ink2">{t.services.saasDesc}</p>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-ink">{t.services.waitlist}</p>
                  <WaitlistForm />
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Blanco */}
        <section aria-labelledby="nombre-title" className="bg-bg py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
            <div>
              <Eyebrow>{t.about.eyebrow}</Eyebrow>
              <h2 id="nombre-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                {t.about.title} <span className="text-gradient-light">{t.about.titleAccent}</span>
              </h2>
              <p className="mt-6 text-lg text-ink2">{t.about.desc}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="reveal rounded-3xl bg-dark p-8 text-fgd">
                <p className="font-mono text-sm text-tld">Sibyl · Σίβυλλα</p>
                <p className="mt-4 text-2xl font-bold">{t.about.vision}</p>
                <p className="mt-3 text-fgd/70">{t.about.visionDesc}</p>
              </div>
              <div className="card-light reveal spot rounded-3xl p-8">
                <p className="font-mono text-sm text-p">Lab · Laboratory</p>
                <p className="mt-4 text-2xl font-bold">{t.about.method}</p>
                <p className="mt-3 text-ink2">{t.about.methodDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Morado */}
        <section id="diferencia" aria-labelledby="dif-title" className="relative overflow-hidden bg-dark py-24 text-fgd sm:py-28">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="scanline" aria-hidden />
          <div className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-p/25 blur-[140px]" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
              <Eyebrow dark>{t.why.eyebrow}</Eyebrow>
              <h2 id="dif-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                {t.why.title} <span className="text-gradient">{t.why.titleAccent}</span>
              </h2>
              <p className="mt-6 text-lg text-fgd/70">{t.why.desc}</p>
            </div>
            <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {t.why.pillars.map((pillar, i) => {
                const I = pillarIcons[i];
                return (
                  <li key={`pillar-${i}`} className="glass reveal spot rounded-3xl p-7 transition hover:border-tld/40">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-p2/30 to-tl/30 text-tld">
                        <I className="size-6" />
                      </span>
                      <span className="font-mono text-sm text-fgd/30">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{pillar.t}</h3>
                    <p className="mt-2 text-fgd/65">{pillar.d}</p>
                  </li>
                );
              })}
              <li className="reveal flex flex-col justify-center rounded-3xl bg-gradient-to-br from-p to-tl p-7">
                <blockquote>
                  <p className="text-xl font-bold leading-snug">{t.why.quote}</p>
                  <footer className="mt-4 text-sm text-white/80">{t.why.quoteFooter}</footer>
                </blockquote>
              </li>
            </ul>
          </div>
        </section>

        {/* Blanco */}
        <section id="proceso" aria-labelledby="proc-title" className="bg-bg py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>{t.process.eyebrow}</Eyebrow>
              <h2 id="proc-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                {t.process.title} <span className="text-gradient-light">{t.process.titleAccent}</span>
              </h2>
            </div>
            <ol className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              <li role="presentation" aria-hidden className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-p/0 via-p/40 to-tl/0 lg:block" />
              <li role="presentation" aria-hidden className="flow-track left-[8%] right-[8%] top-[31px] hidden h-[3px] lg:block" />
              {t.process.steps.map(([n, title, desc], i) => (
                <li key={n} className="reveal relative text-center" style={{ "--i": i } as React.CSSProperties}>
                  <span className="step-node relative mx-auto grid size-16 place-items-center rounded-2xl border border-p/20 bg-white font-mono text-lg font-medium text-p shadow-[0_10px_30px_rgba(123,45,139,.12)]">
                    {n}
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-ink2">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Morado */}
        <section aria-label={t.midCta.aria} className="relative overflow-hidden bg-dark py-16 text-fgd sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-p/40 via-transparent to-tl/30" aria-hidden />
          <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[.2em] text-tld">{t.midCta.label}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{t.midCta.title}</h2>
              <p className="mt-3 text-fgd/70">{t.midCta.desc}</p>
            </div>
            <TrackLink href="#contacto" event={LeadEvents.ctaClick} eventProps={{ location: "mid_cta" }} className={btnPrimary}>
              {t.midCta.cta} <Icon.arrow className="size-4" />
            </TrackLink>
          </div>
        </section>

        {/* Blanco */}
        <section id="experiencia" aria-labelledby="exp-title" className="bg-bg py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow>{t.experience.eyebrow}</Eyebrow>
              <h2 id="exp-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                {t.experience.title} <span className="text-gradient-light">{t.experience.titleAccent}</span>
              </h2>
              <p className="mt-6 text-lg text-ink2">{t.experience.desc}</p>
              <div className="mt-8 inline-flex items-baseline gap-3 rounded-3xl bg-dark px-7 py-5 text-fgd">
                <span className="text-gradient text-5xl font-extrabold tabular-nums" data-count="15" data-prefix="+">
                  +15
                </span>
                <span className="text-fgd/80">
                  {t.experience.years}
                  <br />
                  {t.experience.yearsOf}
                </span>
              </div>
            </div>
            <div>
              <ul className="flex flex-wrap gap-3" aria-label={t.experience.industriesLabel}>
                {t.experience.industries.map((industry, i) => (
                  <li
                    key={`ind-${i}`}
                    className="reveal rounded-full border border-p/15 bg-white px-5 py-3 font-medium text-ink shadow-sm transition hover:border-p hover:text-p"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
              <div className="mt-10 rounded-3xl border border-tl/20 bg-tl/5 p-7">
                <p className="font-mono text-xs uppercase tracking-[.2em] text-tl">{t.experience.techLabel}</p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {t.experience.techs.map((tech) => (
                    <li key={tech} className="flex items-center gap-2 text-ink">
                      <Icon.check className="size-4 text-tl" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-ink3">
                <Icon.globe className="size-4" />
                {t.experience.based}
              </p>
            </div>
          </div>
        </section>

        {/* Blanco (continúa banda clara con Experiencia) */}
        <section id="faq" aria-labelledby="faq-title" className="bg-bg py-24 sm:py-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="text-center">
              <Eyebrow>{t.faq.eyebrow}</Eyebrow>
              <h2 id="faq-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                {t.faq.title}
              </h2>
            </div>
            <div className="mt-12 space-y-3">
              {t.faq.items.map((f) => (
                <details key={f.q} className="card-light group rounded-2xl px-6 py-4 open:pb-5">
                  <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {f.q}
                      <span className="font-mono text-p transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-ink2">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-10 text-center text-ink2">
              {t.faq.ready}{" "}
              <TrackLink href="#contacto" event={LeadEvents.ctaClick} eventProps={{ location: "faq" }} className="font-semibold text-p underline-offset-4 hover:underline">
                {t.faq.cta}
              </TrackLink>
            </p>
          </div>
        </section>

        {/* Morado */}
        <section id="contacto" aria-labelledby="cta-title" className="relative overflow-hidden bg-dark py-24 text-fgd sm:py-28">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="pointer-events-none absolute -bottom-40 right-0 size-[36rem] rounded-full bg-tl/30 blur-[140px]" aria-hidden />
          <div className="pointer-events-none absolute -left-20 top-0 size-[30rem] rounded-full bg-p/30 blur-[140px]" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <Eyebrow dark>{t.contact.eyebrow}</Eyebrow>
              <h2 id="cta-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                {t.contact.title} <span className="text-gradient">{t.contact.titleAccent}</span>
              </h2>
              <p className="mt-6 text-lg text-fgd/70">
                {t.contact.desc} <strong className="text-fgd">{t.contact.descStrong}</strong>.
              </p>
              <ul className="mt-10 space-y-3">
                <li>
                  <TrackLink
                    href={siteConfig.scheduleUrl}
                    event={LeadEvents.scheduleClick}
                    eventProps={{ location: "contacto" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-tld/50"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-p/30 text-fgd">
                      <Icon.calendar className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{t.contact.schedule}</span>
                      <span className="text-sm text-fgd/60">{t.contact.scheduleHint}</span>
                    </span>
                  </TrackLink>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-tld/50">
                    <span className="grid size-11 place-items-center rounded-xl bg-tl/30 text-fgd">
                      <Icon.mail className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{t.contact.email}</span>
                      <span className="text-sm text-fgd/60">{siteConfig.email}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-dark py-12 text-fgd/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo light />
            <p className="mt-3 font-mono text-sm text-tld">{siteConfig.slogan}</p>
          </div>
          <nav aria-label={t.nav.footer}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a className="hover:text-fgd" href={n.href}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm">{t.footer}</p>
        </div>
      </footer>
    </>
  );
}
