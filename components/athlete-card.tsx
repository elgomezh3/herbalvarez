"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import {
  RELACION_LABEL,
  redesDeAtleta,
  type Atleta,
} from "@/lib/atletas-shared";

function initial(a: Atleta): string {
  return (a.nombre || a.instagram || "?").trim().charAt(0).toUpperCase() || "?";
}

export function AthleteCard({
  atleta,
  index,
}: {
  atleta: Atleta;
  index: number;
}) {
  const recorte = /\.png$/i.test(atleta.foto);
  const hasName = Boolean(atleta.nombre);
  const displayName = hasName ? atleta.nombre : `@${atleta.instagram}`;
  const meta = [atleta.disciplina, atleta.club].filter(Boolean).join(" · ");
  const relacion = RELACION_LABEL[atleta.relacion];
  const redes = redesDeAtleta(atleta);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative flex w-[80vw] shrink-0 snap-start flex-col border border-line bg-surface p-6 sm:w-[340px] md:w-[360px] md:p-8"
    >
      <span className="display-heading text-2xl text-gold/50">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={`relative my-5 aspect-[4/5] w-full ${
          recorte ? "" : "overflow-hidden border border-line bg-green-deep"
        }`}
      >
        {atleta.foto ? (
          <Image
            src={atleta.foto}
            alt={displayName}
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
              {initial(atleta)}
            </span>
            <span className="relative z-[2] text-[9px] uppercase tracking-[0.22em] text-muted/50">
              Sin foto
            </span>
          </div>
        )}
      </div>

      <p className="flex flex-wrap gap-x-2 text-[10px] font-semibold uppercase tracking-[0.16em]">
        {atleta.instagram && <span className="text-gold">@{atleta.instagram}</span>}
        {meta && <span className="text-muted">· {meta}</span>}
      </p>

      <h3 className="display-heading mt-2 text-3xl leading-[0.95] text-ink [overflow-wrap:anywhere]">
        {displayName}
      </h3>

      {atleta.record && (
        <p className="mt-2 text-sm font-semibold leading-snug text-ink">
          {atleta.record}
        </p>
      )}
      {atleta.testimonio && (
        <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted">
          <span className="text-gold">&ldquo;</span>
          {atleta.testimonio}
        </p>
      )}

      {atleta.beneficios.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {atleta.beneficios.slice(0, 3).map((b) => (
            <li
              key={b}
              className="border border-line px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-muted"
            >
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-6">
        {redes.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {redes.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
              >
                {r.plataforma}{" "}
                <span className="text-gold" aria-hidden>
                  &#8599;
                </span>
              </a>
            ))}
          </div>
        )}
        {relacion && (
          <p className="mt-3 text-[9px] uppercase tracking-[0.12em] text-muted/60">
            {relacion}
          </p>
        )}
      </div>
    </motion.article>
  );
}
