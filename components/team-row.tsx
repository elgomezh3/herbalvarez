"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { CATEGORIA_LABEL, type MiembroEquipo } from "@/lib/equipo-shared";

function initial(m: MiembroEquipo): string {
  return (m.nombre || "?").trim().charAt(0).toUpperCase() || "?";
}

export function TeamRow({ miembro, index }: { miembro: MiembroEquipo; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
  const flip = index % 2 === 1;
  const recorte = /\.png$/i.test(miembro.foto);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-16, 0, 16]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [flip ? 4 : -4, flip ? -4 : 4]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const numY = useTransform(scrollYProgress, [0, 1], ["45%", "-45%"]);
  const shadowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1, 0.75]);

  const contactos = [
    ...miembro.redes.map((r) => ({ label: r.plataforma, href: r.url })),
    ...(miembro.email ? [{ label: "Email", href: `mailto:${miembro.email}` }] : []),
    ...(miembro.whatsapp
      ? [{ label: "WhatsApp", href: `https://wa.me/${miembro.whatsapp}` }]
      : []),
  ];

  return (
    <div
      ref={ref}
      className="relative grid items-center gap-6 overflow-hidden border-t border-line py-14 md:min-h-[78vh] md:grid-cols-12 md:gap-10 md:py-20"
    >
      <motion.span
        aria-hidden
        style={reduce ? undefined : { y: numY }}
        className={`display-heading pointer-events-none absolute top-0 z-0 select-none text-[34vw] leading-none text-gold/[0.06] md:text-[15vw] ${
          flip ? "left-0" : "right-0"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Foto */}
      <Link
        href={`/equipo/${miembro.perfilSlug}`}
        className={`relative z-10 flex justify-center md:col-span-5 ${
          flip ? "md:order-2 md:col-start-8" : "md:order-1"
        }`}
      >
        <div className="relative w-full max-w-[280px] md:max-w-[340px]">
          <div className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

          <motion.div
            aria-hidden
            style={reduce ? undefined : { rotate: ringRotate }}
            className="absolute left-1/2 top-1/2 aspect-square w-[122%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold" />
          </motion.div>

          <motion.div
            style={
              reduce ? undefined : { rotateY, rotateZ, y: imgY, transformPerspective: 1200 }
            }
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative z-10 [transform-style:preserve-3d]"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`relative aspect-[4/5] w-full ${
                recorte
                  ? ""
                  : "overflow-hidden border border-line bg-green-deep shadow-[0_35px_45px_rgba(0,0,0,0.5)]"
              }`}
            >
              {miembro.foto ? (
                <Image
                  src={miembro.foto}
                  alt={miembro.fotoAlt || miembro.nombre}
                  fill
                  sizes="(max-width: 768px) 80vw, 340px"
                  className={
                    recorte
                      ? "object-contain object-bottom drop-shadow-[0_30px_45px_rgba(0,0,0,0.55)]"
                      : "object-cover object-top"
                  }
                  priority={index < 2}
                />
              ) : (
                <div className="grain relative flex h-full w-full flex-col items-center justify-center gap-3 border border-line bg-green-deep">
                  <span className="display-heading relative z-[2] text-6xl text-ink/15">
                    {initial(miembro)}
                  </span>
                  <span className="relative z-[2] text-[10px] uppercase tracking-[0.24em] text-muted/50">
                    Sin foto
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
      </Link>

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
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {CATEGORIA_LABEL[miembro.categoria]}
        </p>

        <h3 className="display-heading mt-4 break-words text-[13vw] leading-[0.9] text-ink [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
          {miembro.nombre}
        </h3>

        {miembro.puesto && (
          <p className="mt-5 text-lg font-semibold leading-snug text-ink md:text-xl">
            {miembro.puesto}
          </p>
        )}

        {(miembro.bioLarga || miembro.bioCorta) && (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
            {miembro.bioLarga || miembro.bioCorta}
          </p>
        )}

        {miembro.cita && (
          <p className="mt-4 max-w-md border-l-2 border-gold pl-4 text-sm italic leading-relaxed text-ink/90 md:text-base">
            &ldquo;{miembro.cita}&rdquo;
          </p>
        )}

        {miembro.especialidades.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {miembro.especialidades.map((e) => (
              <li
                key={e}
                className="border border-line bg-bg/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-muted backdrop-blur-sm"
              >
                {e}
              </li>
            ))}
          </ul>
        )}

        {contactos.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            {contactos.map((c) => (
              <a
                key={c.label + c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-gold"
              >
                {c.label}
                <span className="text-gold transition-transform group-hover:translate-x-0.5">
                  &#8599;
                </span>
              </a>
            ))}
          </div>
        )}

        <Link
          href={`/equipo/${miembro.perfilSlug}`}
          className="group mt-7 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
        >
          Ver perfil completo
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            &rarr;
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
