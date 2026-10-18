# Marketing — visibilidad y leads (Sibylab)

Resumen operativo. Objetivo: conversaciones calificadas en Chile (B2B).

## ICP (prioridad)

1. **Pyme 30–300 empleados** — procesos manuales (Excel, correo, WhatsApp).
2. **Corporativo con TI saturada** — llevar IA de demo a producción.
3. **Scale-ups** — MVP / squad senior a medida.

Oferta de entrada: **diagnóstico gratis de ~30 min**.

## Keywords SEO (ES-CL)

1. desarrollo de software a medida Chile  
2. empresa de desarrollo de software Santiago  
3. automatización de procesos con inteligencia artificial  
4. consultoría inteligencia artificial empresas Chile  
5. automatización de procesos empresariales Chile  
6. agente de IA / chatbot con IA para empresas  
7. integración de IA con ERP / CRM  
8. desarrollo de aplicaciones web a medida  
9. cómo implementar inteligencia artificial en una empresa  
10. software a medida vs SaaS  

## Plan 30 días (resumen)

| Semana | Foco |
|---|---|
| 1 | Search Console, Google Business, LinkedIn fundadores, env vars reales, PostHog |
| 2 | 3 posts LinkedIn + outreach ICP + 1 artículo pilar + lead magnet |
| 3 | Google Ads Search (keywords 1–5) + partners |
| 4 | Optimizar lo que convierte; cortar lo que no |

## Lead magnets (sin casos inventados)

1. Checklist de madurez para implementar IA  
2. Matriz: software a medida vs SaaS vs low-code  
3. Plantilla para priorizar procesos a automatizar  

## Eventos de analytics

Configurá `NEXT_PUBLIC_POSTHOG_KEY` en `.env.local`.

| Evento | Cuándo |
|---|---|
| `cta_click` | Clic en CTAs |
| `lead_whatsapp_click` | WhatsApp |
| `lead_schedule_click` | Calendly / agenda |
| `lead_contact_submit` | Formulario de contacto OK |
| `lead_waitlist_submit` | Lista de espera SaaS |

## Checklist técnico de conversión

- [ ] WhatsApp, Calendly, Resend y correo reales en `.env`
- [ ] Probar envío de un lead en producción
- [ ] Google Search Console + Business Profile
- [ ] LinkedIn de empresa y fundadores
- [ ] PostHog (o GA4) con conversiones marcadas
