"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const NUMERO = /^(\D*)(\d+(?:[.,]\d+)?)(\D*)$/;

function numeroDe(texto: string): number | null {
  const m = texto.match(NUMERO);
  return m ? parseFloat(m[2].replace(",", ".")) : null;
}

/**
 * Muestra un stat (ej. "10", "100%") que anima desde 0 (o desde `desde`, si
 * se define) hasta su valor real la primera vez que entra en viewport. Útil
 * para un stat cuyo valor final es "0": con `desde="100"` cuenta hacia abajo
 * en vez de quedarse estático en 0. Si el texto no tiene un número claro, o
 * el usuario prefiere menos movimiento, se muestra el valor final sin animar.
 */
export function StatValue({ valor, desde }: { valor: string; desde?: string }) {
  // Memoizado por `valor`: si no, cada re-render (incluido cada onUpdate de la
  // propia animación) crea un array nuevo, el efecto de abajo lo ve como un
  // cambio de dependencia y reinicia la animación en bucle.
  const match = useMemo(() => valor.match(NUMERO), [valor]);
  const inicio = useMemo(() => (desde ? numeroDe(desde) : null) ?? 0, [desde]);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  // Empieza en `false` (igual que el servidor) y solo se sabe la real después
  // de montar, para no romper la hidratación en un sistema con esta opción
  // activada. Por eso el estado inicial siempre arranca "animable" y se
  // corrige al valor final apenas se confirma `reduce`, más abajo.
  const reduce = useSafeReducedMotion();
  const [display, setDisplay] = useState(() =>
    !match ? valor : `${match[1]}${inicio}${match[3]}`,
  );

  // Corrige al valor final en cuanto se confirma que el usuario prefiere
  // menos movimiento (puede ser justo después de montar, no en el primer
  // render, para no desajustar la hidratación).
  useEffect(() => {
    if (reduce) setDisplay(valor);
  }, [reduce, valor]);

  useEffect(() => {
    if (!inView || !match || reduce) return;
    const [, prefijo, numeroTexto, sufijo] = match;
    const destino = parseFloat(numeroTexto.replace(",", "."));
    const decimales = /[.,]/.test(numeroTexto) ? 1 : 0;

    const controls = animate(inicio, destino, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setDisplay(`${prefijo}${v.toFixed(decimales)}${sufijo}`),
    });
    return () => controls.stop();
  }, [inView, match, reduce, inicio]);

  return <span ref={ref}>{display}</span>;
}
