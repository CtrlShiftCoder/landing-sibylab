import { siteConfig, whatsappLink } from "@/config/site";
import { Icon } from "@/components/icons";
import { ContactForm, WaitlistForm } from "@/components/forms";
import { NeuralCanvas } from "@/components/neural-canvas";
import { Effects } from "@/components/effects";

const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#diferencia", label: "Por qué Sibylab" },
  { href: "#proceso", label: "Proceso" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#contacto", label: "Contacto" },
];

const pains = [
  { icon: Icon.repeat, t: "Tareas repetitivas", d: "Tu equipo copia, pega y revisa lo mismo todos los días." },
  { icon: Icon.file, t: "Documentos a mano", d: "Facturas, contratos y formularios que se procesan uno por uno." },
  { icon: Icon.puzzle, t: "Sistemas que no conversan", d: "Planillas, correos y plataformas desconectadas entre sí." },
  { icon: Icon.clock, t: "Horas que no vuelven", d: "Tiempo valioso que podría estar en lo que de verdad importa." },
];

const services = [
  { icon: Icon.code, tag: "Software", t: "Desarrollo a medida", d: "Plataformas, sistemas e integraciones construidos para la operación real de tu empresa. Arquitectura moderna, preparada para crecer.", items: ["Aplicaciones web y móviles", "Integración de sistemas y APIs", "Arquitectura escalable en la nube"] },
  { icon: Icon.bot, tag: "IA", t: "Automatización con IA", d: "Agentes inteligentes y flujos automáticos que eliminan el trabajo manual y repetitivo para que tu equipo se enfoque en lo estratégico.", items: ["Agentes de IA para tu negocio", "Flujos de trabajo automatizados", "Procesamiento inteligente de documentos"] },
  { icon: Icon.compass, tag: "Estrategia", t: "Asesoría y acompañamiento", d: "Te ayudamos a decidir qué tecnología usar, cuándo y cómo, con una mirada de negocio y no solo técnica.", items: ["Diagnóstico tecnológico", "Roadmap de transformación con IA", "CTO fraccional"] },
];

const pillars = [
  { icon: Icon.brain, t: "IA desde el diseño", d: "No incorporamos IA como un complemento. La integramos estratégicamente para automatizar procesos, potenciar decisiones y crear nuevas oportunidades." },
  { icon: Icon.rocket, t: "De la idea a la ejecución", d: "No nos quedamos en presentaciones. Diseñamos, prototipamos, desarrollamos e implementamos soluciones reales." },
  { icon: Icon.target, t: "Tecnología enfocada en resultados", d: "Nuestro objetivo no es entregar más software, sino generar eficiencia, reducir costos y mejorar la productividad." },
  { icon: Icon.bolt, t: "Innovación ágil y personalizada", d: "Cada empresa es distinta. Diseñamos a la medida, evitando tecnologías innecesarias y complejidad que no aporta valor." },
  { icon: Icon.link, t: "Visión integral y escalabilidad", d: "Arquitectura moderna, automatización, integración de sistemas y agentes inteligentes, preparados para evolucionar." },
];

const steps = [
  ["01", "Descubrimos", "Entendemos el problema"],
  ["02", "Diseñamos", "Definimos la solución"],
  ["03", "Validamos", "Probamos la idea"],
  ["04", "Construimos", "Desarrollamos la solución"],
  ["05", "Implementamos", "Llevamos a producción"],
  ["06", "Evolucionamos", "Medimos y mejoramos"],
];

const industries = ["Banca", "Retail", "Minería", "Salud", "Gobierno", "Educación", "Seguros", "Fintech", "Legaltech", "Empresas internacionales"];

const techs = ["IA generativa", "Agentes autónomos", "Automatización de procesos", "Procesamiento de documentos", "Integraciones y APIs", "Cloud & arquitectura moderna"];

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[.2em] ${dark ? "text-tld" : "text-p"}`}>
      <span className={`h-px w-6 ${dark ? "bg-tld" : "bg-p"}`} />{children}
    </p>
  );
}

function Logo({ light }: { light?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="Sibylab, ir al inicio">
      <svg viewBox="0 0 64 64" className="size-8" aria-hidden>
        <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9b42ab" /><stop offset="1" stopColor="#3fbfb2" /></linearGradient></defs>
        <rect width="64" height="64" rx="14" fill="#150c1d" stroke="rgba(246,241,250,.15)" />
        <path d="M14 32c5-9 11-13 18-13s13 4 18 13c-5 9-11 13-18 13s-13-4-18-13z" fill="none" stroke="url(#lg)" strokeWidth="4" />
        <circle cx="32" cy="32" r="6" fill="url(#lg)" />
      </svg>
      <span className={`text-lg font-extrabold tracking-tight ${light ? "text-fgd" : "text-ink"}`}>Sibylab</span>
    </a>
  );
}

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-p2 to-tl px-7 py-3.5 font-semibold text-white shadow-[0_10px_40px_rgba(155,66,171,.45)] transition hover:-translate-y-0.5 hover:brightness-110";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-fgd transition hover:border-tld hover:text-tld";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    slogan: siteConfig.slogan,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: "CL",
    address: { "@type": "PostalAddress", addressCountry: "CL" },
  };

  return (
    <>
      <Effects />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Saltar al contenido</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-dark/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo light />
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm text-fgd/70">
              {nav.map((n) => <li key={n.href}><a className="transition hover:text-fgd" href={n.href}>{n.label}</a></li>)}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contacto" className="hidden rounded-full bg-fgd px-5 py-2 text-sm font-semibold text-dark transition hover:bg-tld sm:inline-flex">Reunión gratis</a>
            <details className="group relative lg:hidden">
              <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-white/15 text-fgd [&::-webkit-details-marker]:hidden" aria-label="Abrir menú">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" /><path d="M6 6l12 12M18 6 6 18" className="hidden group-open:block" /></svg>
              </summary>
              <nav aria-label="Móvil" className="absolute right-0 top-12 w-60 rounded-2xl border border-white/10 bg-dark/95 p-3 shadow-2xl backdrop-blur-xl">
                <ul className="flex flex-col">
                  {nav.map((n) => <li key={n.href}><a className="block rounded-lg px-4 py-3 text-fgd/80 hover:bg-white/5 hover:text-fgd" href={n.href}>{n.label}</a></li>)}
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section id="inicio" className="relative overflow-hidden bg-dark pb-24 pt-32 text-fgd sm:pt-40 lg:pb-32">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <NeuralCanvas />
          <div className="scanline" aria-hidden />
          <div className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-p/40 blur-[120px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-52 -left-40 size-[32rem] rounded-full bg-tl/40 blur-[120px]" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr]">
            <div className="animate-fade-up">
              <p className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-fgd/80">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-tld opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-tld" /></span>
                Laboratorio de IA y software · Chile
              </p>
              <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Inteligencia que <span className="text-gradient" data-scramble="anticipa.">anticipa.</span><br />Tecnología que se construye <span className="text-gradient">a tu medida.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-fgd/70">
                Automatizamos el trabajo repetitivo con inteligencia artificial y software a medida, para que tu equipo recupere su tiempo y lo invierta en lo que de verdad importa.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#contacto" className={`${btnPrimary} glitch`} data-text="Agenda tu primera reunión gratis">Agenda tu primera reunión gratis <Icon.arrow className="size-4" /></a>
                <a href="#servicios" className={btnGhost}>Ver servicios</a>
              </div>
              <p className="mt-8 font-mono text-sm tracking-wide text-tld">{"// "}<span data-scramble={siteConfig.slogan}>{siteConfig.slogan}</span><span className="ml-0.5 inline-block w-2 animate-pulse">▍</span></p>
            </div>

            {/* Visual: "orbe" sibila */}
            <div className="relative mx-auto hidden aspect-square w-full max-w-md sm:block" aria-hidden>
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-fgd/15" />
              <div className="absolute inset-10 rounded-full border border-tld/40" />
              <div className="pointer-events-none absolute inset-16 rounded-full bg-gradient-to-br from-tld/50 via-cyan-400/40 to-white/30 blur-2xl" />
              <div className="absolute inset-20 rounded-full bg-gradient-to-br from-cyan-300/60 via-tld/50 to-p2/40 shadow-[0_0_80px_rgba(63,191,178,0.4),inset_0_0_60px_rgba(255,255,255,0.15)]" />
              <div className="ring-glow absolute inset-24 grid place-items-center rounded-full bg-gradient-to-br from-white/25 via-cyan-50/20 to-tld/15 shadow-[inset_0_2px_40px_rgba(255,255,255,0.3),inset_0_-2px_40px_rgba(63,191,178,0.2)] backdrop-blur-xl">
                <svg viewBox="0 0 64 64" className="eye-lid w-1/2 overflow-visible drop-shadow-[0_4px_12px_rgba(63,191,178,0.6)]"><defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".5" stopColor="#3fbfb2" /><stop offset="1" stopColor="#0f6b6b" /></linearGradient></defs><path d="M8 32c6-11 14-16 24-16s18 5 24 16c-6 11-14 16-24 16S14 43 8 32z" fill="none" stroke="url(#hg)" strokeWidth="2.8" /><g data-eye className="eye-pupil"><circle cx="32" cy="32" r="9" fill="url(#hg)" /><circle cx="32" cy="32" r="3.5" fill="#0f0f1e" /><circle cx="34.5" cy="29.5" r="1.8" fill="#fff" opacity=".95" /></g></svg>
              </div>
              <div className="glass absolute left-0 top-16 animate-float rounded-2xl px-4 py-3 text-sm shadow-lg"><span className="font-mono text-tld">agente.run()</span><br /><span className="text-fgd/70">Documento procesado ✓</span></div>
              <div className="glass absolute bottom-12 right-0 animate-float rounded-2xl px-4 py-3 text-sm shadow-lg [animation-delay:-4s]"><span className="font-mono text-p2">flujo.auto</span><br /><span className="text-fgd/70">Tarea manual eliminada ✓</span></div>
            </div>
          </div>
        </section>

        {/* DOLOR */}
        <section aria-labelledby="dolor-title" className="relative py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <Eyebrow>El problema</Eyebrow>
              <h2 id="dolor-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">¿Tu equipo pierde horas en lo que <span className="text-gradient-light">una máquina podría hacer?</span></h2>
            </div>
            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pains.map(({ icon: I, t, d }) => (
                <li key={t} className="card-light reveal spot group rounded-3xl p-7 transition hover:-translate-y-1">
                  <span className="grid size-12 place-items-center rounded-2xl bg-p/10 text-p transition group-hover:bg-p group-hover:text-white"><I className="size-6" /></span>
                  <h3 className="mt-5 text-lg font-bold">{t}</h3>
                  <p className="mt-2 text-ink2">{d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-12 rounded-3xl border border-tl/20 bg-tl/5 p-6 text-center text-lg text-ink2 sm:text-xl">
              En Sibylab convertimos ese tiempo perdido en <strong className="text-tl">tiempo para crecer</strong>.
            </p>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" aria-labelledby="serv-title" className="bg-white/50 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <Eyebrow>Servicios</Eyebrow>
                <h2 id="serv-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">Soluciones tecnológicas <span className="text-gradient-light">a la medida de tu negocio</span></h2>
              </div>
              <p className="max-w-md text-ink2">Sin paquetes genéricos: cada proyecto se cotiza según tus necesidades reales.</p>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {services.map(({ icon: I, tag, t, d, items }) => (
                <article key={t} className="card-light reveal spot flex flex-col rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(123,45,139,.16)]">
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-p to-tl text-white"><I className="size-7" /></span>
                    <span className="rounded-full bg-bg3 px-3 py-1 font-mono text-xs text-p">{tag}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{t}</h3>
                  <p className="mt-3 text-ink2">{d}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-p/10 pt-6">
                    {items.map((i) => <li key={i} className="flex gap-2.5 text-sm text-ink"><Icon.check className="mt-0.5 size-4 shrink-0 text-tl" />{i}</li>)}
                  </ul>
                </article>
              ))}
            </div>

            {/* SaaS próximamente */}
            <article aria-labelledby="saas-title" className="reveal relative mt-5 overflow-hidden rounded-3xl border border-p/20 bg-gradient-to-br from-bg3 via-white to-tl/10 p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-p/15 blur-3xl" aria-hidden />
              <div className="relative grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-14 place-items-center rounded-2xl bg-ink text-white"><Icon.layers className="size-7" /></span>
                    <span className="rounded-full bg-p px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-white">Próximamente</span>
                  </div>
                  <h3 id="saas-title" className="mt-6 text-2xl font-bold sm:text-3xl">Productos SaaS propios</h3>
                  <p className="mt-3 text-ink2">En nuestro laboratorio estamos construyendo plataformas listas para usar, que llevan la inteligencia artificial a los procesos del día a día. Sé de los primeros en probarlas.</p>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-ink">Únete a la lista de espera</p>
                  <WaitlistForm />
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* NOMBRE / ABOUT */}
        <section aria-labelledby="nombre-title" className="py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
            <div>
              <Eyebrow>Detrás del nombre</Eyebrow>
              <h2 id="nombre-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">Un laboratorio que usa la inteligencia para <span className="text-gradient-light">anticipar el futuro</span></h2>
              <p className="mt-6 text-lg text-ink2">Sibylab une dos ideas: la visión de quien anticipa lo que viene y el rigor de quien experimenta hasta encontrar la solución correcta.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="reveal rounded-3xl bg-dark p-8 text-fgd">
                <p className="font-mono text-sm text-tld">Sibyl · Σίβυλλα</p>
                <p className="mt-4 text-2xl font-bold">Visión</p>
                <p className="mt-3 text-fgd/70">Inspirado en las sibilas griegas: predicción, conocimiento y la capacidad de ver lo que otros aún no ven.</p>
              </div>
              <div className="card-light reveal spot rounded-3xl p-8">
                <p className="font-mono text-sm text-p">Lab · Laboratory</p>
                <p className="mt-4 text-2xl font-bold">Experimentación</p>
                <p className="mt-3 text-ink2">Investigación, prototipos y pruebas de concepto: innovación con método, ingeniería y descubrimiento.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DIFERENCIA */}
        <section id="diferencia" aria-labelledby="dif-title" className="relative overflow-hidden bg-dark py-24 text-fgd sm:py-28">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="scanline" aria-hidden />
          <div className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-p/25 blur-[140px]" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
              <Eyebrow dark>Por qué Sibylab</Eyebrow>
              <h2 id="dif-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">No desarrollamos tecnología solo por innovar. <span className="text-gradient">Resolvemos problemas reales.</span></h2>
              <p className="mt-6 text-lg text-fgd/70">Combinamos inteligencia artificial, ingeniería de software y visión estratégica de negocio para transformar desafíos complejos en soluciones prácticas, escalables y sostenibles.</p>
            </div>
            <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map(({ icon: I, t, d }, i) => (
                <li key={t} className="glass reveal spot rounded-3xl p-7 transition hover:border-tld/40">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-p2/30 to-tl/30 text-tld"><I className="size-6" /></span>
                    <span className="font-mono text-sm text-fgd/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{t}</h3>
                  <p className="mt-2 text-fgd/65">{d}</p>
                </li>
              ))}
              <li className="reveal flex flex-col justify-center rounded-3xl bg-gradient-to-br from-p to-tl p-7">
                <blockquote>
                  <p className="text-xl font-bold leading-snug">“No vendemos tecnología. Transformamos problemas en oportunidades mediante inteligencia.”</p>
                  <footer className="mt-4 text-sm text-white/80">Queremos ser más que un proveedor: un socio estratégico que te ayuda a construir tu futuro.</footer>
                </blockquote>
              </li>
            </ul>
          </div>
        </section>

        {/* PROCESO */}
        <section id="proceso" aria-labelledby="proc-title" className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Cómo trabajamos</Eyebrow>
              <h2 id="proc-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">De la idea a producción <span className="text-gradient-light">en 6 pasos</span></h2>
            </div>
            <ol className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              <li role="presentation" aria-hidden className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-p/0 via-p/40 to-tl/0 lg:block" />
              <li role="presentation" aria-hidden className="flow-track left-[8%] right-[8%] top-[31px] hidden h-[3px] lg:block" />
              {steps.map(([n, t, d], i) => (
                <li key={n} className="reveal relative text-center" style={{ "--i": i } as React.CSSProperties}>
                  <span className="step-node relative mx-auto grid size-16 place-items-center rounded-2xl border border-p/20 bg-white font-mono text-lg font-medium text-p shadow-[0_10px_30px_rgba(123,45,139,.12)]">{n}</span>
                  <h3 className="mt-5 text-lg font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-ink2">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* EXPERIENCIA */}
        <section id="experiencia" aria-labelledby="exp-title" className="bg-white/50 py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow>Experiencia</Eyebrow>
              <h2 id="exp-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">Una empresa nueva, <span className="text-gradient-light">un equipo con trayectoria</span></h2>
              <p className="mt-6 text-lg text-ink2">Sibylab nace con la experiencia de un equipo que ha liderado proyectos tecnológicos para grandes organizaciones en distintas industrias.</p>
              <div className="mt-8 inline-flex items-baseline gap-3 rounded-3xl bg-dark px-7 py-5 text-fgd">
                <span className="text-gradient text-5xl font-extrabold tabular-nums" data-count="15" data-prefix="+">+15</span>
                <span className="text-fgd/80">años de experiencia<br />del equipo</span>
              </div>
            </div>
            <div>
              <ul className="flex flex-wrap gap-3" aria-label="Industrias">
                {industries.map((i) => (
                  <li key={i} className="reveal rounded-full border border-p/15 bg-white px-5 py-3 font-medium text-ink shadow-sm transition hover:border-p hover:text-p">{i}</li>
                ))}
              </ul>
              <div className="mt-10 rounded-3xl border border-tl/20 bg-tl/5 p-7">
                <p className="font-mono text-xs uppercase tracking-[.2em] text-tl">A la vanguardia de lo nuevo</p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {techs.map((t) => <li key={t} className="flex items-center gap-2 text-ink"><Icon.check className="size-4 text-tl" />{t}</li>)}
                </ul>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-ink3"><Icon.globe className="size-4" />Basados en Chile, con proyección a otros países.</p>
            </div>
          </div>
        </section>

        {/* CTA + CONTACTO */}
        <section id="contacto" aria-labelledby="cta-title" className="relative overflow-hidden bg-dark py-24 text-fgd sm:py-28">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="pointer-events-none absolute -bottom-40 right-0 size-[36rem] rounded-full bg-tl/30 blur-[140px]" aria-hidden />
          <div className="pointer-events-none absolute -left-20 top-0 size-[30rem] rounded-full bg-p/30 blur-[140px]" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <Eyebrow dark>Hablemos</Eyebrow>
              <h2 id="cta-title" className="text-3xl font-extrabold tracking-tight sm:text-5xl">Tu primera reunión es <span className="text-gradient">gratis</span></h2>
              <p className="mt-6 text-lg text-fgd/70">Cuéntanos qué proceso te quita tiempo. Lo analizamos juntos y te proponemos una solución. Sin precios de catálogo: <strong className="text-fgd">cotiza con nosotros</strong>.</p>
              <ul className="mt-10 space-y-3">
                <li><a href={siteConfig.scheduleUrl} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-tld/50"><span className="grid size-11 place-items-center rounded-xl bg-p/30 text-fgd"><Icon.calendar className="size-5" /></span><span><span className="block font-semibold">Agenda una reunión</span><span className="text-sm text-fgd/60">Elige el horario que te acomode</span></span></a></li>
                <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-wa/50"><span className="grid size-11 place-items-center rounded-xl bg-wa/20 text-wa"><Icon.whatsapp className="size-5" /></span><span><span className="block font-semibold">WhatsApp</span><span className="text-sm text-fgd/60">{siteConfig.whatsappDisplay}</span></span></a></li>
                <li><a href={`mailto:${siteConfig.email}`} className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-tld/50"><span className="grid size-11 place-items-center rounded-xl bg-tl/30 text-fgd"><Icon.mail className="size-5" /></span><span><span className="block font-semibold">Correo</span><span className="text-sm text-fgd/60">{siteConfig.email}</span></span></a></li>
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
          <nav aria-label="Pie de página"><ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">{nav.map((n) => <li key={n.href}><a className="hover:text-fgd" href={n.href}>{n.label}</a></li>)}</ul></nav>
          <p className="text-sm">© 2026 Sibylab · Chile</p>
        </div>
      </footer>

      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-wa text-white shadow-[0_10px_30px_rgba(37,211,102,.45)] transition hover:scale-105">
        <Icon.whatsapp className="size-7" />
      </a>
    </>
  );
}
