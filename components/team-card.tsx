"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardTilt, fadeUp } from "@/lib/motion";
import { CATEGORIA_LABEL, type MiembroEquipo } from "@/lib/equipo-shared";

function initial(m: MiembroEquipo): string {
  return (m.nombre || "?").trim().charAt(0).toUpperCase() || "?";
}

export function TeamCard({
  miembro,
  index,
}: {
  miembro: MiembroEquipo;
  index: number;
}) {
  const recorte = /\.png$/i.test(miembro.foto);

  return (
    <motion.article
      variants={fadeUp}
      {...cardTilt}
      className="relative flex w-[80vw] shrink-0 snap-start flex-col border border-line bg-surface p-6 [transform-style:preserve-3d] sm:w-[340px] md:w-[360px] md:p-8"
    >
      <span className="display-heading text-2xl text-gold/50">
        {String(index + 1).padStart(2, "0")}
      </span>

      <Link
        href={`/equipo/${miembro.perfilSlug}`}
        className={`relative my-5 block aspect-[4/5] w-full ${
          recorte ? "" : "overflow-hidden border border-line bg-green-deep"
        }`}
      >
        {miembro.foto ? (
          <Image
            src={miembro.foto}
            alt={miembro.fotoAlt || miembro.nombre}
            fill
            sizes="360px"
            className={
              recorte
                ? "object-contain object-bottom drop-shadow-[0_22px_32px_rgba(0,0,0,0.55)]"
                : "object-cover object-top"
            }
          />
        ) : (
          <div className="grain flex h-full w-full flex-col items-center justify-center gap-2 border border-line bg-green-deep">
            <span className="display-heading relative z-[2] text-5xl text-ink/15">
              {initial(miembro)}
            </span>
            <span className="relative z-[2] text-[9px] uppercase tracking-[0.22em] text-muted/50">
              Sin foto
            </span>
          </div>
        )}
      </Link>

      <p className="flex flex-wrap gap-x-2 text-[10px] font-semibold uppercase tracking-[0.16em]">
        <span className="text-gold">{CATEGORIA_LABEL[miembro.categoria]}</span>
      </p>

      <h3 className="display-heading mt-2 text-3xl leading-[0.95] text-ink [overflow-wrap:anywhere]">
        {miembro.nombre}
      </h3>

      {miembro.puesto && (
        <p className="mt-2 text-sm font-semibold leading-snug text-ink">
          {miembro.puesto}
        </p>
      )}

      {(miembro.bioCorta || miembro.cita) && (
        <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted">
          {miembro.bioCorta ? (
            miembro.bioCorta
          ) : (
            <>
              <span className="text-gold">&ldquo;</span>
              {miembro.cita}
            </>
          )}
        </p>
      )}

      {miembro.especialidades.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {miembro.especialidades.slice(0, 3).map((e) => (
            <li
              key={e}
              className="border border-line px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-muted"
            >
              {e}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-6">
        <Link
          href={`/equipo/${miembro.perfilSlug}`}
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
        >
          Ver perfil{" "}
          <span className="text-gold" aria-hidden>
            &rarr;
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
