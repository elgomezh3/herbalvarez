"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { ACENTO_TEXTO, haloClass, type Producto } from "@/lib/productos-shared";

export function ProductRow({ producto, index }: { producto: Producto; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
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
      {producto.fotoFondo && (
        <motion.div aria-hidden style={reduce ? undefined : { y: bgY }} className="absolute inset-0 z-0">
          <Image
            src={producto.fotoFondo}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-45 md:opacity-60"
          />
          <div className="absolute inset-0 bg-bg/70 md:bg-bg/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30 md:hidden" />
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
        style={reduce ? undefined : { y: numY }}
        className={`display-heading pointer-events-none absolute top-0 z-0 select-none text-[34vw] leading-none text-gold/[0.06] md:text-[15vw] ${
          flip ? "left-0" : "right-0"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Producto */}
      <div
        className={`relative z-10 flex justify-center md:col-span-5 ${
          flip ? "md:order-2 md:col-start-8" : "md:order-1"
        }`}
      >
        <div className="relative w-full max-w-[280px] md:max-w-[340px]">
          <div
            className={`absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${haloClass(producto.acento)}`}
          />

          <motion.div
            aria-hidden
            style={reduce ? undefined : { rotate: ringRotate }}
            className="absolute left-1/2 top-1/2 aspect-square w-[122%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold" />
          </motion.div>

          <motion.div
            style={
              reduce ? undefined : { rotateY, rotateZ, y: imgY, transformPerspective: 1000 }
            }
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative z-10 aspect-square [transform-style:preserve-3d]"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full"
            >
              {producto.imagen ? (
                <Image
                  src={producto.imagen}
                  alt={`Herbalvarez ${producto.nombre}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 340px"
                  className="object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)]"
                  priority={index < 2}
                />
              ) : (
                <div className="grain relative flex h-full w-full flex-col items-center justify-center gap-3">
                  <span className="display-heading relative z-[2] text-6xl text-ink/15">
                    {producto.nombre.charAt(0) || "?"}
                  </span>
                  <span className="relative z-[2] text-[10px] uppercase tracking-[0.24em] text-muted/50">
                    Foto próximamente
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            aria-hidden
            style={reduce ? undefined : { scaleX: shadowScale }}
            className="absolute -bottom-5 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl"
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
        {(producto.categoria || producto.formato) && (
          <p className="flex flex-wrap items-center gap-x-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
            {producto.categoria && (
              <span className={ACENTO_TEXTO[producto.acento]}>{producto.categoria}</span>
            )}
            {producto.formato && <span className="text-muted">· {producto.formato}</span>}
          </p>
        )}

        <h3 className="display-heading mt-4 break-words text-[13vw] leading-[0.9] text-ink [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
          {producto.nombre}
        </h3>

        {producto.claim && (
          <p className="mt-5 text-lg font-semibold leading-snug text-ink md:text-xl">
            {producto.claim}
          </p>
        )}
        {producto.descripcion && (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
            {producto.descripcion}
          </p>
        )}

        {producto.usos.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {producto.usos.map((u) => (
              <li
                key={u}
                className="border border-line bg-bg/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-muted backdrop-blur-sm"
              >
                {u}
              </li>
            ))}
          </ul>
        )}

        <a
          href="#contacto"
          className="group mt-7 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
        >
          Pedir {producto.nombre}
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            &rarr;
          </span>
        </a>
      </motion.div>
    </div>
  );
}
