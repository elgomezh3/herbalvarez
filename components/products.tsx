"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MaskedHeading, Reveal } from "@/components/primitives";
import { EASE, viewportOnce } from "@/lib/motion";
import { PRODUCTS, type Product } from "@/lib/products";

function haloClass(accent: string) {
  if (accent === "text-ruby") return "bg-ruby/25";
  if (accent === "text-gold") return "bg-gold/20";
  return "bg-green/40";
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // La botella "gira" mientras la fila cruza el viewport (fake 3D).
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-28, 0, 28]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [flip ? 7 : -7, flip ? -7 : 7]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const numY = useTransform(scrollYProgress, [0, 1], ["45%", "-45%"]);
  const shadowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  return (
    <div
      ref={ref}
      className="relative grid items-center gap-6 overflow-hidden border-t border-line py-14 md:min-h-[78vh] md:grid-cols-12 md:gap-10 md:py-20"
    >
      {/* Foto de fondo (Unsplash) para filas destacadas */}
      {product.bg && (
        <motion.div
          aria-hidden
          style={reduce ? undefined : { y: bgY }}
          className="pointer-events-none absolute inset-0 z-0 scale-110"
        >
          <Image
            src={product.bg}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-45 md:opacity-60"
          />
          <div className="absolute inset-0 bg-bg/70 md:bg-bg/45" />
          {/* Móvil: oscurece de abajo hacia arriba (texto apilado). */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30 md:hidden" />
          {/* Escritorio: oscurece del lado del texto. */}
          <div
            className={`absolute inset-0 hidden md:block ${
              flip
                ? "bg-gradient-to-r from-bg via-bg/80 to-bg/10"
                : "bg-gradient-to-l from-bg via-bg/80 to-bg/10"
            }`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(22,51,34,0.5),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(229,198,126,0.12),transparent_55%)] mix-blend-screen" />
        </motion.div>
      )}

      <motion.span
        aria-hidden
        style={{ y: numY }}
        className={`display-heading pointer-events-none absolute top-0 z-0 select-none text-[34vw] leading-none text-gold/[0.06] md:text-[15vw] ${
          flip ? "left-0" : "right-0"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Visual de producto */}
      <div
        className={`relative z-10 flex justify-center md:col-span-5 ${
          flip ? "md:order-2 md:col-start-8" : "md:order-1"
        }`}
      >
        <div className="relative h-[360px] w-full max-w-[340px] md:h-[460px]">
          <div
            className={`absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${haloClass(
              product.accent
            )}`}
          />
          {/* aro que contrarrota */}
          <motion.div
            aria-hidden
            style={reduce ? undefined : { rotate: ringRotate }}
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25 md:h-[380px] md:w-[380px]"
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold" />
          </motion.div>

          {product.image ? (
            <motion.div
              style={
                reduce
                  ? undefined
                  : { rotateY, rotateZ, y: imgY, transformPerspective: 1000 }
              }
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative z-10 h-full w-full [transform-style:preserve-3d]"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src={product.image}
                  alt={`Herbalvarez ${product.name}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 340px"
                  className="object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)]"
                  priority={index < 2}
                />
              </motion.div>
            </motion.div>
          ) : (
            // Fallback mientras no hay foto del producto
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative z-10 flex h-full w-full flex-col items-center justify-center"
            >
              <span className="display-heading text-[7rem] leading-none text-ink/80 md:text-[9rem]">
                {product.name.charAt(0)}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.24em] text-muted">
                Foto próximamente
              </span>
            </motion.div>
          )}

          <motion.div
            aria-hidden
            style={reduce ? undefined : { scaleX: shadowScale }}
            className="absolute bottom-3 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl"
          />
        </div>
      </div>

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className={`relative z-10 md:col-span-6 ${
          flip ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7"
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
          <span className={product.accent}>{product.category}</span>
          <span className="hidden h-px w-8 bg-line sm:block" />
          <span className="text-muted">{product.format}</span>
        </div>

        <h3 className="display-heading mt-4 text-[15vw] leading-[0.9] text-ink sm:text-6xl lg:text-7xl">
          {product.name}
        </h3>

        <p className="mt-5 text-lg font-semibold leading-snug text-ink md:text-xl">
          {product.claim}
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
          {product.desc}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {product.uses.map((u) => (
            <li
              key={u}
              className="border border-line bg-bg/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-muted backdrop-blur-sm"
            >
              {u}
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="group mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-ink"
        >
          Pedir {product.name}
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </a>
      </motion.div>
    </div>
  );
}

export function Products() {
  return (
    <section id="productos" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-shell px-5 md:px-8">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" />
            Los productos
          </p>
        </Reveal>
        <MaskedHeading
          lines={["Diez fórmulas.", "Un mismo origen."]}
          className="max-w-[16ch] text-[11vw] text-ink sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            Los mismos aceites de hierbas medicinales de Hialuroniz, ordenados
            por lo que tu cuerpo tiene que resolver: recuperar, rendir, entrar al
            ring y sostener el día a día.
          </p>
        </Reveal>

        <div className="mt-8">
          {PRODUCTS.map((p, i) => (
            <ProductRow key={p.id} product={p} index={i} />
          ))}
        </div>

        <Reveal>
          <p className="mt-16 max-w-2xl border-t border-line pt-6 text-xs leading-relaxed text-muted/70">
            Productos de herbolaria. No son medicamentos y no sustituyen la
            atención médica ni la valoración de un profesional del deporte.
            Consulta a tu médico.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
