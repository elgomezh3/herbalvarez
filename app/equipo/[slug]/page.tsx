import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives";
import { getEquipo, getMiembroEquipo } from "@/lib/equipo";
import { CATEGORIA_LABEL } from "@/lib/equipo-shared";

export function generateStaticParams() {
  return getEquipo().map((m) => ({ slug: m.perfilSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const miembro = getMiembroEquipo(slug);
  if (!miembro) return {};
  return {
    title: miembro.nombre,
    description:
      miembro.bioCorta || miembro.puesto || `${miembro.nombre} — equipo Herbalvarez`,
  };
}

export default async function PerfilEquipoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const miembro = getMiembroEquipo(slug);
  if (!miembro) notFound();

  const recorte = /\.png$/i.test(miembro.foto);
  const contactos = [
    ...miembro.redes.map((r) => ({ label: r.plataforma, href: r.url })),
    ...(miembro.email
      ? [{ label: "Email", href: `mailto:${miembro.email}` }]
      : []),
    ...(miembro.whatsapp
      ? [{ label: "WhatsApp", href: `https://wa.me/${miembro.whatsapp}` }]
      : []),
  ];

  return (
    <section className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-shell px-5 md:px-8">
        <Reveal>
          <Link
            href="/equipo"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
          >
            <span className="transition-transform group-hover:-translate-x-1" aria-hidden>
              &larr;
            </span>
            Equipo
          </Link>
        </Reveal>

        <RevealGroup
          stagger={0.12}
          className="mt-10 grid gap-10 md:grid-cols-12 md:gap-14"
        >
          <RevealItem className="md:col-span-5">
            <div
              className={`relative aspect-[4/5] w-full max-w-sm ${
                recorte ? "" : "overflow-hidden border border-line bg-green-deep"
              }`}
            >
              {miembro.foto ? (
                <Image
                  src={miembro.foto}
                  alt={miembro.fotoAlt || miembro.nombre}
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  className={
                    recorte
                      ? "object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
                      : "object-cover object-top"
                  }
                  priority
                />
              ) : (
                <div className="grain flex h-full w-full flex-col items-center justify-center gap-2 border border-line bg-green-deep">
                  <span className="display-heading relative z-[2] text-6xl text-ink/15">
                    {miembro.nombre.charAt(0).toUpperCase()}
                  </span>
                  <span className="relative z-[2] text-[10px] uppercase tracking-[0.24em] text-muted/50">
                    Sin foto
                  </span>
                </div>
              )}
            </div>
          </RevealItem>

          <div className="md:col-span-7">
            <RevealItem
              as="p"
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold"
            >
              <span className="h-px w-10 bg-gold" />
              {CATEGORIA_LABEL[miembro.categoria]}
            </RevealItem>

            <RevealItem
              as="h1"
              className="display-heading mt-5 text-[12vw] leading-[0.92] text-ink sm:text-6xl lg:text-7xl"
            >
              {miembro.nombre}
            </RevealItem>

            {miembro.puesto && (
              <RevealItem as="p" className="mt-4 text-xl font-semibold text-ink">
                {miembro.puesto}
              </RevealItem>
            )}

            {(miembro.bioLarga || miembro.bioCorta) && (
              <RevealItem
                as="p"
                className="mt-6 max-w-xl text-base leading-relaxed text-muted"
              >
                {miembro.bioLarga || miembro.bioCorta}
              </RevealItem>
            )}

            {miembro.cita && (
              <RevealItem
                as="p"
                className="mt-6 max-w-xl border-l-2 border-gold pl-5 text-lg italic leading-relaxed text-ink"
              >
                &ldquo;{miembro.cita}&rdquo;
              </RevealItem>
            )}

            {miembro.especialidades.length > 0 && (
              <RevealItem as="ul" className="mt-7 flex flex-wrap gap-2">
                {miembro.especialidades.map((e) => (
                  <li
                    key={e}
                    className="border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-muted"
                  >
                    {e}
                  </li>
                ))}
              </RevealItem>
            )}

            {contactos.length > 0 && (
              <RevealItem
                as="div"
                className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-7"
              >
                {contactos.map((c) => (
                  <a
                    key={c.label + c.href}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
                  >
                    {c.label}{" "}
                    <span className="text-gold" aria-hidden>
                      &#8599;
                    </span>
                  </a>
                ))}
              </RevealItem>
            )}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
