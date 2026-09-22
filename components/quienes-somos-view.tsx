"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MaskedHeading, Reveal } from "@/components/primitives";
import { SectionBg } from "@/components/section-bg";
import { StatValue } from "@/components/stat-value";
import { fadeUp, lineReveal, stagger, viewportOnce } from "@/lib/motion";

export type Stat = { valor: string; etiqueta: string };

export function QuienesSomosView({
  eyebrow,
  titulo,
  parrafoIntro,
  parrafoMision,
  parrafoFormula,
  stats,
  eyebrowMexicanos,
  tituloMexicanos,
  parrafoMexicanos,
  eyebrowIngredientes,
  tituloIngredientes,
  ingredientes,
  ctaTexto,
  ctaEnlace,
  fondo,
  fondoPosicion,
}: {
  eyebrow: string;
  titulo: string[];
  parrafoIntro: string;
  parrafoMision: string;
  parrafoFormula: string;
  stats: Stat[];
  eyebrowMexicanos: string;
  tituloMexicanos: string[];
  parrafoMexicanos: string;
  eyebrowIngredientes: string;
  tituloIngredientes: string[];
  ingredientes: string[];
  ctaTexto: string;
  ctaEnlace: string;
  fondo: string;
  fondoPosicion: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <>
      {/* Portada */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
        <SectionBg src={fondo} posicion={fondoPosicion} />
        <div className="relative z-10 mx-auto max-w-shell px-5 md:px-8">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-10 bg-gold" />
              {eyebrow}
            </p>
          </Reveal>

          <MaskedHeading
            lines={titulo}
            className="max-w-[16ch] text-[13vw] text-ink sm:text-7xl lg:text-8xl"
          />

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              {parrafoIntro}
            </p>
          </Reveal>

          {parrafoMision && (
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                {parrafoMision}
              </p>
            </Reveal>
          )}

          {parrafoFormula && (
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl border-l-2 border-gold pl-5 text-sm leading-relaxed text-ink/85 md:text-base">
                {parrafoFormula}
              </p>
            </Reveal>
          )}

          {stats.length > 0 && (
            <Reveal delay={0.25}>
              <dl className="mt-14 flex flex-wrap gap-10 border-t border-line pt-8 md:gap-16">
                {stats.map((s, i) => (
                  <div key={`${s.etiqueta}-${i}`}>
                    <dt className="display-heading text-3xl text-gold md:text-4xl">
                      <StatValue valor={s.valor} />
                    </dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
                      {s.etiqueta}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </section>

      {/* 100% Mexicanos */}
      <section
        ref={panelRef}
        className="relative overflow-hidden border-t border-line bg-bg py-24 md:py-32"
      >
        <div className="mx-auto max-w-shell px-5 md:px-8">
          <motion.div
            style={{ y: panelY }}
            className="grain relative overflow-hidden bg-green p-8 text-ink ring-1 ring-inset ring-gold/20 md:p-14"
          >
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              <span className="h-px w-10 bg-gold" />
              {eyebrowMexicanos}
            </p>
            <motion.h2
              className="display-heading max-w-[18ch] text-5xl leading-[0.92] text-gold-cream lg:text-6xl"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {tituloMexicanos.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span variants={lineReveal} className="block">
                    {l}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/75">
                {parrafoMexicanos}
              </p>
            </Reveal>
            <span
              aria-hidden
              className="display-heading pointer-events-none absolute -bottom-10 -right-4 select-none text-[12rem] leading-none text-gold/10"
            >
              HV
            </span>
          </motion.div>
        </div>
      </section>

      {/* Ingredientes */}
      {ingredientes.length > 0 && (
        <section className="relative overflow-hidden border-t border-line bg-surface py-24 md:py-32">
          <div className="mx-auto max-w-shell px-5 md:px-8">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-10 bg-gold" />
                {eyebrowIngredientes}
              </p>
            </Reveal>

            <MaskedHeading
              lines={tituloIngredientes}
              className="max-w-[16ch] text-[10vw] text-ink sm:text-6xl lg:text-7xl"
            />

            <motion.ul
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-10 flex max-w-3xl flex-wrap gap-3"
            >
              {ingredientes.map((ing) => (
                <motion.li
                  key={ing}
                  variants={fadeUp}
                  className="border border-line bg-bg/40 px-4 py-2 text-xs uppercase tracking-[0.12em] text-muted backdrop-blur-sm"
                >
                  {ing}
                </motion.li>
              ))}
            </motion.ul>

            {ctaTexto && (
              <Reveal delay={0.1}>
                <Link
                  href={ctaEnlace || "/productos"}
                  className="group mt-12 inline-flex items-center gap-2 bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-bg transition-colors hover:bg-gold-light"
                >
                  {ctaTexto}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      )}
    </>
  );
}
