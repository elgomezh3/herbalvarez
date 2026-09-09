"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import { ACENTO_TEXTO, type Producto } from "@/lib/productos-shared";

export function ProductCard({
  producto,
  index,
}: {
  producto: Producto;
  index: number;
}) {
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

      <div className="relative mx-auto my-5 h-52 w-full md:h-60">
        {producto.imagen ? (
          <Image
            src={producto.imagen}
            alt={`Herbalvarez ${producto.nombre}`}
            fill
            sizes="360px"
            className="object-contain drop-shadow-[0_22px_32px_rgba(0,0,0,0.5)]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="display-heading text-6xl text-ink/15">
              {producto.nombre.charAt(0) || "?"}
            </span>
          </div>
        )}
      </div>

      {(producto.categoria || producto.formato) && (
        <p className="flex flex-wrap gap-x-2 text-[10px] font-semibold uppercase tracking-[0.16em]">
          {producto.categoria && (
            <span className={ACENTO_TEXTO[producto.acento]}>
              {producto.categoria}
            </span>
          )}
          {producto.formato && (
            <span className="text-muted">· {producto.formato}</span>
          )}
        </p>
      )}

      <h3 className="display-heading mt-2 text-3xl leading-[0.95] text-ink">
        {producto.nombre}
      </h3>

      {producto.claim && (
        <p className="mt-2 text-sm font-semibold leading-snug text-ink">
          {producto.claim}
        </p>
      )}
      {producto.descripcion && (
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
          {producto.descripcion}
        </p>
      )}

      {producto.usos.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {producto.usos.slice(0, 4).map((u) => (
            <li
              key={u}
              className="border border-line px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-muted"
            >
              {u}
            </li>
          ))}
        </ul>
      )}

      <a
        href="#contacto"
        className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
      >
        Pedir {producto.nombre}
        <span className="transition-transform group-hover:translate-x-1" aria-hidden>
          &rarr;
        </span>
      </a>
    </motion.article>
  );
}
