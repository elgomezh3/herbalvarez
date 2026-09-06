"use client";

import { MaskedHeading, Reveal } from "@/components/primitives";

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/herbalvarez" },
  { label: "Facebook", href: "https://facebook.com/herbalvarez" },
  { label: "TikTok", href: "https://tiktok.com/@herbalvarez" },
];

export function Footer() {
  return (
    <footer
      id="contacto"
      className="grain relative overflow-hidden border-t border-line bg-surface"
    >
      <div className="mx-auto max-w-shell px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
            <span className="h-px w-10 bg-bronze" />
            Contacto
          </p>
        </Reveal>

        <MaskedHeading
          lines={["Prepara tu", "próximo campamento."]}
          className="max-w-[14ch] text-[12vw] text-ink sm:text-6xl lg:text-8xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            Escríbenos para pedidos, mayoreo o patrocinio de peleadores. Enviamos
            a todo México.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                Correo
              </p>
              <a
                href="mailto:hola@herbalvarez.mx"
                className="mt-2 block text-lg text-ink transition-colors hover:text-bronze"
              >
                hola@herbalvarez.mx
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                WhatsApp
              </p>
              <a
                href="https://wa.me/520000000000"
                className="mt-2 block text-lg text-ink transition-colors hover:text-bronze"
              >
                +52 000 000 0000
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                Redes
              </p>
              <ul className="mt-2 space-y-1">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-ink transition-colors hover:text-bronze"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-xs uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="display-heading text-lg tracking-normal text-ink">
            HERBAL<span className="text-blood">VAREZ</span>
          </span>
          <span>
            Marca hermana de{" "}
            <a
              href="https://hialuroniz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink transition-colors hover:text-bronze"
            >
              Hialuroniz
            </a>
          </span>
          <span>
            &copy; {new Date().getFullYear()} Herbalvarez · Hecho en México
          </span>
        </div>

        <p className="mt-6 text-[10px] leading-relaxed text-muted/60">
          Productos de herbolaria; no son medicamentos, consulta a tu médico.
          Fotografías de ambiente:{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-bronze"
          >
            Unsplash
          </a>{" "}
          (MARK ADRIANE, Boris Izmaylov, Anastase Maragos, Bogdan Yukhymchuk,
          Mike Cox). Fotos de producto e imagen del hero: pendientes de material
          definitivo.
        </p>
      </div>
    </footer>
  );
}
