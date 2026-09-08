"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/primitives";
import { fadeUp, lineReveal, stagger, viewportOnce } from "@/lib/motion";

export type Pilar = { titulo: string; texto: string };

export function DifferenceView({
  eyebrow,
  titulo,
  parrafo,
  pilares,
}: {
  eyebrow: string;
  titulo: string[];
  parrafo: string;
  pilares: Pilar[];
}) {
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
          <motion.div
            style={{ y: panelY }}
            className="grain relative overflow-hidden bg-green p-8 text-ink ring-1 ring-inset ring-gold/20 md:col-span-5 md:p-12"
          >
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              <span className="h-px w-10 bg-gold" />
              {eyebrow}
            </p>
            <motion.h2
              className="display-heading text-5xl leading-[0.92] text-gold-cream lg:text-6xl"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {titulo.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span variants={lineReveal} className="block">
                    {l}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-ink/75">
                {parrafo}
              </p>
            </Reveal>
            <span
              aria-hidden
              className="display-heading pointer-events-none absolute -bottom-10 -right-4 select-none text-[12rem] leading-none text-gold/10"
            >
              HV
            </span>
          </motion.div>

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-px self-stretch overflow-hidden border border-line bg-line sm:grid-cols-2 md:col-span-7"
          >
            {pilares.map((p, i) => (
              <motion.div
                key={`${p.titulo}-${i}`}
                variants={fadeUp}
                className="flex flex-col justify-center bg-surface p-8 md:p-10"
              >
                <h3 className="display-heading text-2xl text-gold">{p.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.texto}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
