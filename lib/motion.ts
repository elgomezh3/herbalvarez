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
