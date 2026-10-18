# Setup y despliegue

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Completá en `.env.local` al menos:

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_WHATSAPP_DISPLAY`
- `NEXT_PUBLIC_SCHEDULE_URL`
- `NEXT_PUBLIC_SITE_URL`
- (opcional) `NEXT_PUBLIC_POSTHOG_KEY`

Datos de marca y contacto por defecto: `src/config/site.ts`.

## Scripts

```bash
npm run dev
npm run lint
npm run build && npm start
```

## Vercel

1. Importá el repo en Vercel.
2. Cargá las variables de `.env.example` en *Environment Variables*.
3. Conectá el dominio `sibylab.cl`.
4. Verificá el dominio en Resend (DNS) para enviar desde `@sibylab.cl`.

## Formularios

- Actions: `src/app/actions/forms.ts`
- Validación: `src/lib/schemas.ts`
- Email: `src/lib/email.ts` (Resend + honeypot anti-spam)
