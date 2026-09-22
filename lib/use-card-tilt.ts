"use client";

import { useContext, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { CarouselContainerContext } from "@/components/carousel";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

/**
 * Tilt 3D de una tarjeta dentro de un <Carousel>: se inclina hacia adelante
 * al entrar en pantalla (scroll vertical de la página) y gira sobre su eje
 * vertical según su posición dentro del carrusel (scroll horizontal al
 * deslizar). Se usa dentro de un `motion.article` con `ref` y `style`.
 *
 * Los rangos de rotación colapsan a 0 cuando el usuario prefiere menos
 * movimiento, en vez de quitar el `style` por completo: así el primer
 * render del cliente coincide siempre con el del servidor (ver
 * lib/use-safe-reduced-motion.ts) y no hay error de hidratación.
 */
export function useCardTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const containerRef = useContext(CarouselContainerContext);
  const reduce = useSafeReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const { scrollXProgress } = useScroll({
    container: containerRef ?? undefined,
    target: ref,
    axis: "x",
    offset: ["start end", "end start"],
    // El ref del contenedor vive en el Carousel padre: en el commit de React
    // el layout effect del hijo (esta tarjeta) corre antes de que ese ref se
    // adjunte, así que useScroll lo ve como `undefined` con el default
    // useLayoutEffect. Con un useEffect normal ya está listo para entonces.
    layoutEffect: false,
  });

  // Solo se inclina al entrar y al salir del viewport; se mantiene plana
  // mientras está a la vista (progress 0.2-0.8). Antes se inclinaba de forma
  // continua durante todo el tiempo que la tarjeta estaba en pantalla, lo
  // que con `transformPerspective` se sentía como que el contenido "se movía
  // dentro de su marco" mientras se leía, en vez de solo al entrar/salir.
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduce ? [0, 0, 0, 0] : [6, 0, 0, -6],
  );
  const rotateY = useTransform(
    scrollXProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [-18, 0, 18],
  );

  return { ref, style: { rotateX, rotateY, transformPerspective: 1000 } };
}
