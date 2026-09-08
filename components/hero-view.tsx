"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, lineReveal, stagger } from "@/lib/motion";

export type Stat = { valor: string; etiqueta: string };
export type Cta = { texto: string; enlace: string };

export function HeroView({
  eyebrow,
  titulo,
  parrafo,
  ctaPrimario,
  ctaSecundario,
  palabraFondo,
  stats,
}: {
  eyebrow: string;
  titulo: string[];
  parrafo: string;
  ctaPrimario: Cta;
  ctaSecundario: Cta;
  palabraFondo: string;
  stats: Stat[];
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  // El contenido se mantiene visible casi toda la primera pantalla y solo se
  // desvanece (sin llegar a 0) cuando la sección ya está saliendo.
  const fade = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.25]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-bg"
    >
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/img/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_38%]"
        />
        <div className="absolute inset-0 bg-bg/45 md:bg-bg/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/45 md:via-bg/70 md:to-bg/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(22,51,34,0.55),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(229,198,126,0.20),transparent_55%)] mix-blend-screen" />
      </motion.div>

      {palabraFondo && (
        <motion.span
          aria-hidden
          style={{ y: wordY }}
          className="display-heading pointer-events-none absolute -left-4 top-[14%] z-0 hidden select-none text-[22vw] leading-none text-gold/[0.05] sm:block md:top-[16%] md:text-[18vw]"
        >
          {palabraFondo}
        </motion.span>
      )}

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-shell px-5 pb-16 pt-28 md:px-8 md:pt-32"
      >
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold"
          >
            <span className="h-px w-10 bg-gold" />
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          className="display-heading max-w-[15ch] text-[13vw] leading-[0.9] text-ink sm:text-[9vw] lg:text-[7.2rem]"
          variants={stagger(0.09, 0.35)}
          initial="hidden"
          animate="show"
        >
          {titulo.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                variants={lineReveal}
                className={`block ${i === 1 ? "text-gold" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {parrafo && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {parrafo}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {ctaPrimario.texto && (
            <a
              href={ctaPrimario.enlace || "#productos"}
              className="bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-bg transition-colors hover:bg-gold-light"
            >
              {ctaPrimario.texto}
            </a>
          )}
          {ctaSecundario.texto && (
            <a
              href={ctaSecundario.enlace || "#diferencia"}
              className="border border-gold/40 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:text-gold"
            >
              {ctaSecundario.texto}
            </a>
          )}
        </motion.div>

        {stats.length > 0 && (
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1.3 }}
            className="mt-16 flex gap-10 border-t border-line pt-6 md:gap-16"
          >
            {stats.map((s, i) => (
              <div key={`${s.etiqueta}-${i}`}>
                <dt className="display-heading text-3xl text-gold md:text-4xl">
                  {s.valor}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
                  {s.etiqueta}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-muted/40 p-1">
          <span className="h-2 w-1 animate-scroll-hint rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
