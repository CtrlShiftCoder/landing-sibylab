# Marca e imágenes

## Regla simple

**Todas las fotos/logos van en `public/brand/`.**  
No pongas PNGs sueltos dentro de `src/app/`.

## Dónde va cada cosa

| Ubicación | Para qué |
|---|---|
| `public/brand/logo.png` | Logo oficial (web, favicon, Apple, schema, OG) |
| `public/brand/logo.svg` | Versión vector |
| `public/brand/eye.svg` | Referencia del ojo 3D |
| `public/brand/logo-legacy.png` | Logo anterior (archivo histórico) |
| `src/app/opengraph-image.tsx` | Imagen al compartir en redes (código, no foto) |

Favicon y Apple icon se configuran en `src/app/layout.tsx` → `metadata.icons` apuntando a `/brand/logo.png`.

## Archivos actuales

| Archivo | URL pública |
|---|---|
| `logo.png` | `/brand/logo.png` |
| `logo.svg` | `/brand/logo.svg` |
| `eye.svg` | `/brand/eye.svg` |
| `logo-legacy.png` | `/brand/logo-legacy.png` |

## Cómo actualizar el logo

1. Reemplazá solo `public/brand/logo.png`.
2. Listo: header, footer, favicon y OG usan ese archivo.
