import type { Variants } from "framer-motion";

/** Curva de salida usada en todo el sitio: arranque firme, frenado suave. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: EASE } },
};

/** Contenedor que escalona la entrada de sus hijos. */
export const stagger = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Línea de texto que se revela detrás de una máscara. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1, ease: EASE },
  },
};

export const viewportOnce = { once: true, amount: 0.35 } as const;

/**
 * Reveal de fotos "por máscara": la imagen no se desplaza ni se desvanece,
 * aparece detrás de un clip-path que se abre de abajo hacia arriba (como una
 * cortina que sube). Se usa como `variants` en tarjetas ya escalonadas por un
 * padre, o directo en `initial`/`whileInView` para efectos independientes
 * (ver MASK_HIDDEN/MASK_VISIBLE).
 */
export const MASK_HIDDEN = "inset(100% 0% 0% 0%)";
export const MASK_VISIBLE = "inset(0% 0% 0% 0%)";

export const maskReveal: Variants = {
  hidden: { clipPath: MASK_HIDDEN },
  show: { clipPath: MASK_VISIBLE, transition: { duration: 1, ease: EASE } },
};

/**
 * Realce de tarjetas al pasar el mouse o tocar: solo escala (se levanta un
 * poco). El tilt 3D en sí lo maneja `useCardTilt` (lib/use-card-tilt.ts),
 * ligado al scroll — mezclar rotación por hover Y por scroll en el mismo eje
 * haría que compitan entre sí.
 */
export const cardTilt = {
  whileHover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.15 },
  },
} as const;
