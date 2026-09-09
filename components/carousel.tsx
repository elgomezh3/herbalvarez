"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Carrusel horizontal con scroll-snap. En móvil se desliza; en escritorio hay
 * flechas. Los hijos deben llevar `shrink-0 snap-start` y un ancho fijo.
 */
export function Carousel({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
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

  const move = (dir: 1 | -1) => {
    ref.current?.scrollBy({
      left: dir * ref.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label={label}
        data-lenis-prevent
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 py-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-[10px] uppercase tracking-[0.24em] text-muted/60 md:hidden">
          Desliza &rarr;
        </p>
        <div className="ml-auto hidden items-center gap-3 md:flex">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => move(-1)}
            disabled={!canPrev}
            className="flex h-11 w-11 items-center justify-center border border-line text-lg text-ink transition-colors hover:border-gold hover:text-gold disabled:cursor-default disabled:opacity-25 disabled:hover:border-line disabled:hover:text-ink"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => move(1)}
            disabled={!canNext}
            className="flex h-11 w-11 items-center justify-center border border-line text-lg text-ink transition-colors hover:border-gold hover:text-gold disabled:cursor-default disabled:opacity-25 disabled:hover:border-line disabled:hover:text-ink"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
