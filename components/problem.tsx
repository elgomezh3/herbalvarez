"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedHeading, Reveal } from "@/components/primitives";
import { stagger, fadeUp, viewportOnce } from "@/lib/motion";

const PAINS = [
  {
    n: "01",
    title: "Golpes que no cierran",
    body: "Hematomas y zonas cargadas que siguen ahí cuando ya deberías estar entrenando de nuevo.",
  },
  {
    n: "02",
    title: "Articulaciones al límite",
    body: "Nudillos, muñecas, hombros y rodillas que reclaman después de cada sesión de sparring.",
  },
  {
    n: "03",
    title: "Fatiga que se acumula",
    body: "El músculo no termina de soltar entre entrenamientos y el rendimiento cae sin que lo notes.",
  },
  {
    n: "04",
    title: "Recuperación lenta entre peleas",
    body: "Cada semana de más para volver al 100% es una semana menos de campamento. Y eso se paga en el ring.",
  },
];

export function Problem() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wordX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="problema"
      ref={ref}
      className="relative overflow-hidden border-t border-line bg-surface py-24 md:py-36"
    >
      {/* Foto de fondo */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 z-0 scale-110"
      >
        <Image
          src="/img/problema.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[68%_center] opacity-70"
        />
        <div className="absolute inset-0 bg-surface/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-surface/10" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-surface to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_75%,rgba(22,51,34,0.6),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_40%,rgba(158,42,43,0.2),transparent_55%)] mix-blend-screen" />
      </motion.div>

      <motion.span
        aria-hidden
        style={{ x: wordX }}
        className="display-heading pointer-events-none absolute -bottom-8 left-0 select-none whitespace-nowrap text-[22vw] leading-none text-ruby/[0.09]"
      >
        DUELE — DUELE — DUELE
      </motion.span>

      <div className="relative z-10 mx-auto max-w-shell px-5 md:px-8">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ruby-bright">
            <span className="h-px w-10 bg-ruby-bright" />
            El problema
          </p>
        </Reveal>

        <MaskedHeading
          lines={["Entre pelea y pelea,", "el dolor no negocia."]}
          className="max-w-[18ch] text-[10vw] text-ink sm:text-6xl lg:text-7xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            El cuerpo de un peleador vive golpeado, cargado y cansado. Cuando la
            recuperación no sigue el ritmo de los entrenamientos, se pierde
            filo, se pierde campamento y, tarde o temprano, se pierden peleas.
          </p>
        </Reveal>

        <motion.ul
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2"
        >
          {PAINS.map((p, i) => {
            const hot = i === PAINS.length - 1;
            return (
              <motion.li
                key={p.n}
                variants={fadeUp}
                className={`group p-8 transition-colors md:p-10 ${
                  hot
                    ? "bg-ruby text-ink"
                    : "bg-surface hover:bg-green-deep"
                }`}
              >
                <span
                  className={`display-heading text-2xl transition-colors ${
                    hot
                      ? "text-ink/70"
                      : "text-ruby/70 group-hover:text-ruby-bright"
                  }`}
                >
                  {p.n}
                </span>
                <h3
                  className={`mt-4 text-xl font-semibold ${
                    hot ? "text-ink" : "text-ink"
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    hot ? "text-ink/80" : "text-muted"
                  }`}
                >
                  {p.body}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
