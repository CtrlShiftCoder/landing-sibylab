# Setup y despliegue

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Completá en `.env.local` al menos:

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- `NEXT_PUBLIC_SCHEDULE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`
- (opcional) `NEXT_PUBLIC_POSTHOG_KEY`

Datos de marca y contacto por defecto: `src/config/site.ts`.

## Resend (formularios)

El contacto y la lista de espera usan **Server Actions** (`src/app/actions/forms.ts`), que llaman a Resend solo en el servidor (`src/lib/email.ts`).

### Pasos

1. Crea cuenta en [resend.com](https://resend.com) y una [API key](https://resend.com/api-keys).
2. Copia `.env.example` → `.env.local` y pega la key en `RESEND_API_KEY`.
3. **Prueba rápida (sin dominio propio):**
   ```env
   CONTACT_FROM_EMAIL="Sibylab Web <onboarding@resend.dev>"
   CONTACT_TO_EMAIL=tu-correo@gmail.com
   ```
   Con el dominio de prueba, Resend suele entregar solo a la dirección de tu cuenta.
4. **Producción:**
   - Verifica `sibylab.com` en [Domains](https://resend.com/domains) (DNS: SPF, DKIM, etc.).
   - Usa un FROM del dominio, p. ej. `Sibylab Web <web@sibylab.com>`.
   - Pon en `CONTACT_TO_EMAIL` el buzón donde quieren recibir leads (puede ser otro).
5. En Vercel, carga las mismas variables en *Environment Variables* (Production / Preview).

### Cómo probar

1. `npm run dev`
2. Envíá el formulario de contacto en la landing.
3. Revisá el inbox de `CONTACT_TO_EMAIL` y el [dashboard de Resend](https://resend.com/emails).
4. Si falla config, el form muestra el mensaje de “aún no está configurado”.

### Arquitectura (buenas prácticas)

| Pieza | Rol |
|---|---|
| Server Action | Mutación desde el form; secretos nunca llegan al cliente |
| `server-only` + `src/lib/email.ts` | Cliente Resend singleton, escape HTML, tags e idempotencia |
| Zod (`schemas.ts`) | Validación de inputs no confiables |
| Honeypot `website` | Anti-bot silencioso |
| Rate limit por IP | Mitiga spam / doble envío agresivo |
| `replyTo` | Responder al lead desde el correo recibido |
| `experimental.serverActions.allowedOrigins` | CSRF/orígenes en `next.config.ts` |

No usamos `after()` para el envío: el usuario debe saber si el correo falló antes de ver el éxito.

## Scripts

```bash
npm run dev
npm run lint
npm run build && npm start
```

## Vercel

1. Importá el repo en Vercel.
2. Cargá las variables de `.env.example` en *Environment Variables*.
3. Conectá el dominio `sibylab.com`.
4. Verificá el dominio en Resend (DNS) para enviar desde `@sibylab.com`.

## Formularios

- Actions: `src/app/actions/forms.ts`
- Validación: `src/lib/schemas.ts`
- Email: `src/lib/email.ts` (Resend)
- Env: `src/lib/env.ts`
