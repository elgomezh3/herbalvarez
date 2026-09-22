"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cardTilt, fadeUp } from "@/lib/motion";
import { useCardTilt } from "@/lib/use-card-tilt";

/**
 * Última tarjeta de un carrusel de resumen (home): en vez de una ficha más,
 * invita a ver la lista completa en su página propia. Mismas medidas que
 * AthleteCard/TeamCard para no romper el ritmo del scroll-snap.
 */
export function CarouselCtaCard({ href, label }: { href: string; label: string }) {
  const tilt = useCardTilt<HTMLElement>();

  return (
    <motion.article
      ref={tilt.ref}
      style={tilt.style}
      variants={fadeUp}
      {...cardTilt}
      className="w-[80vw] shrink-0 snap-start [transform-style:preserve-3d] sm:w-[340px] md:w-[360px]"
    >
      <Link
        href={href}
        className="group flex h-full min-h-[420px] flex-col items-center justify-center gap-6 border border-line bg-green p-8 text-center transition-colors hover:border-gold"
      >
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-2xl text-gold transition-transform group-hover:translate-x-1"
          aria-hidden
        >
          &rarr;
        </span>
        <span className="display-heading text-2xl leading-[0.95] text-ink">
          {label}
        </span>
      </Link>
    </motion.article>
  );
}
