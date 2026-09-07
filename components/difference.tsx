"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/primitives";
import { fadeUp, lineReveal, stagger, viewportOnce } from "@/lib/motion";

const PILLARS = [
  {
    title: "100% natural",
    body: "Hierbas medicinales y nada más. Lo que te pones en la piel viene del campo, no del laboratorio.",
  },
  {
    title: "Sin químicos",
    body: "Sin parabenos, sin fragancias sintéticas, sin analgésicos ocultos. Nada que un peleador tenga que pensar dos veces.",
  },
  {
    title: "Tradición mexicana",
    body: "Una receta de herbolaria mexicana transmitida y afinada, ahora al servicio del deporte de combate.",
  },
  {
    title: "10 años de experiencia",
    body: "La misma casa detrás de Hialuroniz. Una década formulando aceites de hierbas que la gente vuelve a comprar.",
  },
];

export function Difference() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      id="diferencia"
      ref={ref}
      className="relative overflow-hidden border-t border-line bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-shell px-5 md:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Panel verde bosque */}
          <motion.div
            style={{ y: panelY }}
            className="grain relative overflow-hidden bg-green p-8 text-ink ring-1 ring-inset ring-gold/20 md:col-span-5 md:p-12"
          >
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              <span className="h-px w-10 bg-gold" />
              Por qué es diferente
            </p>
            <motion.h2
              className="display-heading text-5xl leading-[0.92] text-gold-cream lg:text-6xl"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {["Sin química.", "Sin atajos.", "Solo hierba."].map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span variants={lineReveal} className="block">
                    {l}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-ink/75">
                Herbalvarez nace de Hialuroniz para llevar la misma herbolaria a
                un cuerpo que compite. Lo que cambia es el enfoque, no la pureza
                de la fórmula.
              </p>
            </Reveal>
            <span
              aria-hidden
              className="display-heading pointer-events-none absolute -bottom-10 -right-4 select-none text-[12rem] leading-none text-gold/10"
            >
              HV
            </span>
          </motion.div>

          {/* Pilares */}
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-px self-stretch overflow-hidden border border-line bg-line sm:grid-cols-2 md:col-span-7"
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="flex flex-col justify-center bg-surface p-8 md:p-10"
              >
                <h3 className="display-heading text-2xl text-gold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
