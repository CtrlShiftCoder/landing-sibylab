# Sibylab — Landing page

Landing de **Sibylab** (*We Build What’s Next.*) con Next.js 16 (App Router), TypeScript y Tailwind CSS v4.

## Inicio rápido

```bash
npm install
cp .env.example .env.local   # completar valores reales
npm run dev                  # http://localhost:3000
```

Guías detalladas:

| Documento | Contenido |
|---|---|
| [`docs/setup.md`](docs/setup.md) | Variables de entorno, Resend, Vercel |
| [`docs/brand.md`](docs/brand.md) | Logos, favicon, dónde poner imágenes |
| [`docs/marketing.md`](docs/marketing.md) | ICP, SEO, plan 30 días, analytics |

## Estructura del proyecto

```
public/
  brand/                 ← TODAS las fotos/logos (URL /brand/…)
src/
  app/
    opengraph-image.tsx  ← OG al compartir (código)
    page.tsx             ← landing
    layout.tsx           ← SEO + favicon vía metadata.icons
    actions/             ← server actions de formularios
  components/            ← UI (logo, eye 3D, forms, analytics)
  config/site.ts         ← datos de contacto y marca
  lib/                   ← email, schemas, analytics
docs/                    ← documentación del proyecto
AGENTS.md                ← reglas Next.js para agentes (auto)
```

## Desarrollo

```bash
npm run lint
npm run build && npm start
```
