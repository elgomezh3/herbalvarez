"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, lineReveal, stagger } from "@/lib/motion";

const HEADLINE = ["Tu cuerpo", "es el arma.", "Nosotros lo", "mantenemos listo."];

const STATS = [
  { value: "10", label: "años de tradición" },
  { value: "100%", label: "natural" },
  { value: "0", label: "químicos" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-bg"
    >
      {/* Imagen de fondo (placeholder) */}
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
        {/* Overlays: oscuro a la izquierda (texto), foto visible a la derecha */}
        <div className="absolute inset-0 bg-bg/45 md:bg-bg/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/45 md:via-bg/70 md:to-bg/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_35%,rgba(200,17,17,0.32),transparent_55%)] mix-blend-screen" />
      </motion.div>

      {/* Palabra gigante de fondo */}
      <motion.span
        aria-hidden
        style={{ y: wordY }}
        className="display-heading pointer-events-none absolute -left-4 top-[14%] z-0 hidden select-none text-[22vw] leading-none text-white/[0.04] sm:block md:top-[16%] md:text-[18vw]"
      >
        RING
      </motion.span>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-shell px-5 pb-16 pt-28 md:px-8 md:pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze"
        >
          <span className="h-px w-10 bg-bronze" />
          Recuperación de nivel profesional
        </motion.p>

        <motion.h1
          className="display-heading max-w-[15ch] text-[13vw] leading-[0.9] text-ink sm:text-[9vw] lg:text-[7.2rem]"
          variants={stagger(0.09, 0.35)}
          initial="hidden"
          animate="show"
        >
          {HEADLINE.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                variants={lineReveal}
                className={`block ${i === 1 ? "text-blood" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          Aceites de hierbas medicinales 100% naturales para boxeadores y
          deportistas de combate. Diez años de tradición mexicana, formulados
          para lo que exige el ring.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#productos"
            className="bg-blood px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-blood-bright"
          >
            Ver productos
          </a>
          <a
            href="#diferencia"
            className="border border-line px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-bronze hover:text-bronze"
          >
            Conocer la historia
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.3 }}
          className="mt-16 flex gap-10 border-t border-line pt-6 md:gap-16"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="display-heading text-3xl text-bronze md:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-muted/40 p-1">
          <span className="h-2 w-1 animate-scroll-hint rounded-full bg-bronze" />
        </div>
      </div>
    </section>
  );
}
