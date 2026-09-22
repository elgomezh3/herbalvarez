"use client";

import {
  Children,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion } from "framer-motion";
import { stagger, viewportOnce } from "@/lib/motion";

/**
 * Contenedor con scroll horizontal del carrusel más cercano, para que las
 * tarjetas (AthleteCard, ProductCard, TeamCard...) puedan medir su propia
 * posición dentro de él y armar el tilt 3D al deslizar. Ver useCardTilt.
 */
export const CarouselContainerContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

/**
 * Carrusel horizontal con scroll-snap. En móvil se desliza; hay flechas y
 * puntitos debajo para indicar que se puede navegar. Los hijos deben llevar
 * `shrink-0 snap-start` y un ancho fijo.
 */
export function Carousel({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [overflow, setOverflow] = useState(true);
  const [active, setActive] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    setOverflow(max > 8);

    const slides = Array.from(el.children) as HTMLElement[];
    if (!slides.length) return;
    const base = slides[0].offsetLeft;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft - base - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const target = slides[i];
    if (target) {
      el.scrollTo({
        left: target.offsetLeft - slides[0].offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const move = (dir: 1 | -1) => {
    ref.current?.scrollBy({
      left: dir * ref.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const arrow =
    "flex h-10 w-10 items-center justify-center border border-line text-lg text-ink transition-colors hover:border-gold hover:text-gold disabled:cursor-default disabled:opacity-25 disabled:hover:border-line disabled:hover:text-ink sm:h-11 sm:w-11";

  return (
    <div className="relative">
      <motion.div
        ref={ref}
        role="region"
        aria-label={label}
        data-lenis-prevent
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        // `touch-action: pan-x` es lo que de verdad libera el swipe vertical:
        // le dice al navegador que este elemento solo gestiona el gesto
        // horizontal, así un dedo moviéndose hacia arriba/abajo sobre el
        // carrusel pasa de inmediato al scroll normal de la página en vez de
        // quedar "atrapado" hasta salir del cuadro. `data-lenis-prevent` por
        // sí solo no bastaba porque el contenedor seguía pareciendo también
        // un scroller vertical (overflow-x sin overflow-y forzaba auto ahí).
        className="relative flex snap-x snap-mandatory touch-pan-x gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 py-2 [-ms-overflow-style:none] [perspective:1200px] [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        <CarouselContainerContext.Provider value={ref}>
          {children}
        </CarouselContainerContext.Provider>
      </motion.div>

      {overflow && count > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir a ${i + 1} de ${count}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className="group p-2"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    i === active
                      ? "w-6 bg-gold"
                      : "w-1.5 bg-line group-hover:bg-muted"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => move(-1)}
              disabled={!canPrev}
              className={arrow}
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => move(1)}
              disabled={!canNext}
              className={arrow}
            >
              &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
