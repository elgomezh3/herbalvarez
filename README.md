# Herbalvarez

Sitio de una sola página para **Herbalvarez** — marca hermana de Hialuroniz, aceites
de hierbas medicinales 100% naturales enfocados en boxeadores profesionales y
deportistas de combate.

**Paleta de marca:** verde bosque `#163322` + oro `#e5c67e` + negro-oliva `#0c0c05`
+ crema `#f7f1da`, con rubí `#9e2a2b` como chispa (solo en "El problema" y en las
fichas de recuperación). Definida en `tailwind.config.ts`.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 3**
- **Framer Motion** — animaciones de entrada, reveal al hacer scroll, parallax
- **Lenis** (`lenis/react`) — smooth scroll global
- **Sveltia CMS** en `/admin` — administra la sección Atletas (ver `ADMIN-GUIA.md`)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Estructura

Todo el contenido vive en `content/` y se lee en **build time**. Cada sección
animada es un **componente servidor** (`*.tsx`, lee el archivo) que pasa props a
un **componente cliente** (`*-view.tsx` / `*-row.tsx`, hace las animaciones).

| Archivo | Sección |
| --- | --- |
| `components/header.tsx` | Header fijo con logo, menú y menú móvil (contenido hardcodeado) |
| `components/hero.tsx` + `hero-view.tsx` | Hero: entrada por líneas + imagen de fondo con parallax |
| `components/problem.tsx` + `problem-view.tsx` | "El problema" — nombra el dolor del peleador |
| `components/marquee.tsx` | Banda dorada con texto en loop |
| `components/products.tsx` + `products-row.tsx` | Productos; la botella "gira" (fake 3D) con el scroll |
| `components/difference.tsx` + `difference-view.tsx` | Por qué es diferente — panel verde + 4 pilares |
| `components/athletes.tsx` + `athlete-row.tsx` | "Atletas" — mismo layout que Productos, foto con fake-3D |
| `components/footer.tsx` | Contacto, redes y aviso legal (server) |
| `components/primitives.tsx` | `Reveal`, `RevealGroup`, `MaskedHeading` reutilizables |
| `lib/secciones.ts` | Lee `content/secciones/<nombre>.md` + helpers `txt` / `lineas` / `lista` con fallback |
| `lib/productos.ts` / `productos-shared.ts` | Lee `content/productos/*.md`; tipos y helpers (shared = sin Node) |
| `lib/atletas.ts` / `atletas-shared.ts` | Lee `content/atletas/*.md`; tipos y helpers (shared = sin Node) |
| `lib/motion.ts` | Variants y curvas de easing compartidas |
| `app/robots.ts` | `robots.txt` generado — bloquea `/admin` |
| `public/admin/` | Sveltia CMS (`index.html` + `config.yml`) |
| `content/secciones/*.md` | Texto de cada sección (título, párrafo, listas). Editable desde `/admin` |
| `content/productos/*.md` | Un `.md` por producto. Editable desde `/admin` |
| `content/atletas/*.md` | Un `.md` por atleta. Editable desde `/admin` |

Todos los `lib/*.ts` que usan `node:fs` caen a los valores por defecto (los
textos actuales, embebidos en el componente) si el archivo falta o viene vacío,
así el sitio nunca queda en blanco.

## Productos (orden actual)

Descanso Total · Inhibe Dolor · Poder Absoluto · Pomada · Vaselina.

Son los únicos productos que se venden por ahora. El copy de cada uno se adaptó
al mundo del boxeo a partir de las fichas de `hialuroniz.com.mx`. Sin claims de
enfermedades: todo se reencuadra a entrenamiento, recuperación, piel y descanso.

## Imágenes

- `public/productos/*.png` — 5 fotos de producto (fondo removido, recortadas y
  centradas en lienzo cuadrado).
- `public/img/hero.jpg`, `problema.jpg`, `prod-poder-absoluto.jpg` — fotos de
  ambiente de **Unsplash** (uso libre, sin atribución obligatoria). Autores:
  MARK ADRIANE, Boris Izmaylov, Bogdan Yukhymchuk. Todas llevan overlay oscuro +
  tinte para legibilidad. Sustituibles por material propio.

## Logo

- `public/logo-wordmark.png` — wordmark dorado (HERBALVAREZ + "Aceite de
  Hierbas"), PNG transparente ~1400×303. Se usa en el header (`next/image`,
  alto fijo `h-9`/`md:h-11`).
- `public/logo.png` — emblema completo (corona + marco + texto), PNG transparente.
  Se usa en el footer.
- `app/icon.png` — favicon (emblema sobre cuadro verde), generado de `logo.png`.

Recomendable pedir versiones **SVG** para nitidez perfecta a cualquier tamaño.

## CMS (`/admin`)

Sveltia CMS, backend GitHub, login con token personal (sin OAuth propio).
Tres áreas:

- **Secciones del sitio** — `files` collection, un archivo por sección en
  `content/secciones/`. Edita títulos, párrafos y listas (dolores, pilares,
  frases del marquee, redes del footer…).
- **Productos** — `folder` collection, `content/productos/`. Uno por ficha.
  `media_folder` propio: `/public/productos`.
- **Atletas** — `folder` collection, `content/atletas/`. `media_folder` propio:
  `/public/atletas`.

`media_folder` global (imágenes sueltas): `public/uploads` → `/uploads`.

Guía para no-programadores: **`ADMIN-GUIA.md`**.

## Atletas

La sección "Atletas" se alimenta de `content/atletas/*.md` y se lee en build
time. Se administra desde **`/admin`** (Sveltia CMS, backend GitHub, login con
token personal). Guía para no-programadores: **`ADMIN-GUIA.md`**.

- Cada ficha usa el mismo layout que Productos (foto con fake-3D + texto,
  alternando lado). Mapeo: eyebrow = `@instagram · disciplina`, título =
  `nombre`, frase destacada = `record`, descripción = `testimonio`, etiquetas =
  `beneficios`, enlaces = `redes` (+ Instagram del handle).
- Solo se muestran los que tienen `publicado: true`, ordenados por `orden`.
- Sin foto → recuadro neutro con la inicial. Sin testimonio → la ficha no
  muestra frase (nunca se inventan testimonios: son personas reales).
- Las fotos suben a `public/atletas/` (`media_folder` en `config.yml`).
- Carga inicial: 9 atletas con usuario de Instagram y disciplina; el resto de
  campos se completan desde `/admin`.

## Pendientes de contenido

- Nombre / disciplina / foto / testimonio de los 9 atletas (desde `/admin`).
- Datos de contacto (correo, WhatsApp, redes) en `components/footer.tsx`.
- Enlaces a tienda / checkout en los CTA "Comprar" y "Pedir".
- Revisar claims y categorías de los productos (desde `/admin` → Productos).
