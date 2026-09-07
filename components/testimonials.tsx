"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/primitives";
import { EASE, viewportOnce } from "@/lib/motion";

// TODO: reemplazar por testimonios reales (nombre, récord, foto y autorización de uso).
const TESTIMONIALS = [
  {
    quote:
      "Vuelvo al gimnasio dos días antes que antes. En un campamento de ocho semanas, eso lo cambia todo.",
    name: "Peleador de peso wélter",
    meta: "Profesional · Ciudad de México",
  },
  {
    quote:
      "Después del sparring me lo pongo en hombros y manos. Al día siguiente respondo sin pensarlo.",
    name: "Boxeadora amateur élite",
    meta: "Selección estatal · Jalisco",
  },
  {
    quote:
      "Lo que más valoro es que es natural. No tengo que revisar la etiqueta antes de una prueba.",
    name: "Peleador de MMA",
    meta: "Profesional · Nuevo León",
  },
  {
    quote:
      "Mi rodilla cargada aguanta la semana completa de entrenamiento. Antes tenía que parar.",
    name: "Entrenador y ex competidor",
    meta: "Muay thai · Guadalajara",
  },
];

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="flex h-full shrink-0 flex-col border border-line bg-surface p-8 md:w-[420px] md:p-10">
      <span className="display-heading block text-4xl leading-[0.6] text-gold">&ldquo;</span>
      <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-ink md:text-xl">
        {t.quote}
      </blockquote>
      <figcaption className="mt-8 border-t border-line pt-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">
          {t.name}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{t.meta}</p>
      </figcaption>
    </figure>
  );
}

function Intro() {
  return (
    <Reveal>
      <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
        <span className="h-px w-10 bg-gold" />
        Testimonios
      </p>
      <h2 className="display-heading max-w-[14ch] text-5xl text-ink md:text-6xl lg:text-7xl">
        Lo usan los que no pueden permitirse parar.
      </h2>
    </Reveal>
  );
}

function DesktopTrack() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section
      ref={ref}
      aria-label="Testimonios"
      className="relative hidden h-[300vh] border-t border-line bg-bg lg:block"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-shell px-8">
          <Intro />
        </div>
        <motion.div style={{ x }} className="mt-14 flex gap-6 pl-8">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MobileStack() {
  return (
    <section
      aria-label="Testimonios"
      className="border-t border-line bg-bg px-5 py-24 lg:hidden"
    >
      <div className="mx-auto max-w-shell">
        <Intro />
        <div className="mt-12 space-y-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Card t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <div id="testimonios">
      <DesktopTrack />
      <MobileStack />
    </div>
  );
}
