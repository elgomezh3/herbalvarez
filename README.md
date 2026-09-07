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

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Estructura

| Archivo | Sección |
| --- | --- |
| `components/header.tsx` | Header fijo con logo, menú y menú móvil |
| `components/hero.tsx` | Hero de alto impacto: entrada por líneas + imagen de fondo con parallax |
| `components/problem.tsx` | "El problema" — nombra el dolor del peleador |
| `components/marquee.tsx` | Banda roja con texto en loop entre "El problema" y "Productos" |
| `components/products.tsx` | 5 productos; la botella "gira" (fake 3D) con el scroll; 1 fila con foto de fondo |
| `components/difference.tsx` | Por qué es diferente — panel rojo + 4 pilares |
| `components/testimonials.tsx` | Testimonios: scroll horizontal fijado en escritorio, apilados en móvil |
| `components/footer.tsx` | Contacto, redes y aviso legal |
| `components/primitives.tsx` | `Reveal`, `RevealGroup`, `MaskedHeading` reutilizables |
| `lib/products.ts` | Datos de los 5 productos (categoría, formato, copy, imagen, foto de fondo) |
| `lib/motion.ts` | Variants y curvas de easing compartidas |

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

- El header usa el wordmark **en texto** (`HERBALVAREZ`, tipografía display) —
  sin imagen, para no depender de un asset en el build.
- `public/logo.png` — emblema completo (corona + marco + texto), PNG transparente.
  Se usa en el footer.
- `public/logo-wordmark.png` — wordmark en PNG transparente (disponible, sin uso
  actual en el sitio).
- `app/icon.png` — favicon (emblema sobre cuadro verde), generado de `logo.png`.

Recomendable pedir versiones **SVG** para nitidez perfecta a cualquier tamaño.

## Pendientes de contenido

- Testimonios en `components/testimonials.tsx` son **placeholders**.
- Datos de contacto (correo, WhatsApp, redes) en `components/footer.tsx`.
- Enlaces a tienda / checkout en los CTA "Comprar" y "Pedir".
- Revisar claims y categorías en `lib/products.ts`.
