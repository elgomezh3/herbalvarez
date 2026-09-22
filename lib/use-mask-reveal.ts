"use client";

import { useEffect, useRef, useState } from "react";
import { EASE, MASK_HIDDEN, MASK_VISIBLE } from "@/lib/motion";

/**
 * Reveal de una foto "por máscara" (clip-path que se abre de abajo hacia
 * arriba), para usarse fuera de un <Carousel> con stagger (donde ya funciona
 * bien vía `variants={maskReveal}` heredado del padre).
 *
 * Usa IntersectionObserver nativo en vez de `whileInView`/`useInView` de
 * Framer Motion: en esta versión, cuando `clipPath` es de las propiedades
 * animadas en un elemento con transformaciones 3D en el árbol, el propio
 * disparador por viewport de Framer Motion (ambos, prop y hook) deja de
 * activarse — reproducido y confirmado con logging directo.
 *
 * Ojo con el `threshold`: en un elemento con ancestros con transform 3D
 * (rotateY/perspective de las fotos con tilt), un threshold fraccionario
 * (ej. 0.35) hace que el propio IntersectionObserver nativo deje de reportar
 * cambios tras la entrada inicial — reproducido igual. `threshold: 0` sí
 * funciona; se usa `isIntersecting` (no `intersectionRatio`, que en este
 * mismo contexto vuelve 0 aunque sí esté intersectando) como señal.
 */
export function useMaskReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return {
    ref,
    initial: { clipPath: MASK_HIDDEN } as const,
    animate: { clipPath: inView ? MASK_VISIBLE : MASK_HIDDEN },
    transition: { duration: 1.8, ease: EASE },
  };
}
