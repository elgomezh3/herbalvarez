"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Igual que `useReducedMotion` de Framer Motion, pero siempre arranca en
 * `false` (para coincidir con el render del servidor) y solo cambia después
 * de montar en el cliente.
 *
 * `useReducedMotion` lee `window.matchMedia` de forma síncrona en el primer
 * render del cliente. Si el sistema del usuario tiene "reducir movimiento"
 * activado, ese primer render ya devuelve `true`, mientras que el servidor
 * (sin `window`) siempre renderiza como si fuera `false` — un `style`
 * condicionado a ese valor entonces no coincide entre servidor y cliente y
 * React lo reporta como error de hidratación. Retrasar el cambio a después
 * del montaje evita el desajuste; el costo es que, en ese caso puntual, el
 * primer fotograma se ve sin la animación reducida antes de asentarse.
 */
export function useSafeReducedMotion(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(reduce);
}
