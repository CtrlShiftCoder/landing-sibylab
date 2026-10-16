# Sibylab — Landing page

Landing de **Sibylab** (*We Build What’s Next.*) hecha con Next.js 16 (App Router), TypeScript y Tailwind CSS v4.
Página 100 % estática (prerenderizada), con JS de cliente solo en los formularios.

## Requisitos
- Node.js 20+ y npm

## Configuración
```bash
npm install
cp .env.example .env.local   # completa los valores
```

| Variable | Uso |
|---|---|
| `RESEND_API_KEY` | API key de [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Correo que recibe los formularios |
| `CONTACT_FROM_EMAIL` | Remitente (dominio verificado en Resend) |
| `NEXT_PUBLIC_*` | Correo, WhatsApp, link de agenda y URL del sitio |

Los datos de contacto también están centralizados en `src/config/site.ts` (valores por defecto **de ejemplo**: reemplázalos).
Si faltan las variables de Resend, los formularios muestran un mensaje amable invitando a escribir por correo/WhatsApp.

## Desarrollo
```bash
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Formularios y correo
- `src/app/actions/forms.ts`: Server Actions de **contacto** y **lista de espera SaaS**.
- Validación con **zod** (`src/lib/schemas.ts`), anti-spam con campo *honeypot*, envío vía Resend (`src/lib/email.ts`).

## Despliegue en Vercel
1. Sube el proyecto a GitHub.
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio (detecta Next.js automáticamente).
3. En *Settings → Environment Variables* agrega las variables de `.env.example`.
4. Deploy. Luego conecta el dominio `sibylab.cl` en *Settings → Domains*.
5. En Resend, verifica el dominio (registros DNS) para poder enviar desde `@sibylab.cl`.

## Estructura
```
src/app/page.tsx           Landing (secciones)
src/app/layout.tsx         Fuentes, metadata SEO/OpenGraph
src/app/opengraph-image.tsx Imagen OG generada
src/components/            Formularios (cliente) e íconos SVG
src/config/site.ts         Datos de contacto y marca
```
