import Image from "next/image";
import { MaskedHeading, Reveal } from "@/components/primitives";
import { getAtletas, RELACION_LABEL, type Atleta } from "@/lib/atletas";

function initial(a: Atleta): string {
  const source = a.nombre || a.instagram || "?";
  return source.trim().charAt(0).toUpperCase() || "?";
}

function AthleteCard({ a, n }: { a: Atleta; n: number }) {
  const hasName = Boolean(a.nombre);
  const displayName = hasName ? a.nombre : `@${a.instagram}`;
  const meta = [a.disciplina, a.club].filter(Boolean).join(" · ");
  const relacion = RELACION_LABEL[a.relacion];
  const igUrl = a.instagram ? `https://instagram.com/${a.instagram}` : null;

  return (
    <div className="flex h-full flex-col p-8 md:p-10">
      <span className="display-heading text-2xl text-gold/70">
        {String(n).padStart(2, "0")}
      </span>

      <div className="relative mt-6 aspect-[4/5] w-full overflow-hidden border border-line bg-bg">
        {a.foto ? (
          <Image
            src={a.foto}
            alt={displayName}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-top"
          />
        ) : (
          <div
            aria-hidden
            className="grain relative flex h-full w-full flex-col items-center justify-center gap-3 bg-green-deep"
          >
            <span className="display-heading relative z-[2] text-6xl text-ink/15">
              {initial(a)}
            </span>
            <span className="relative z-[2] text-[10px] uppercase tracking-[0.24em] text-muted/50">
              Sin foto
            </span>
          </div>
        )}
      </div>

      <h3 className="display-heading mt-6 break-words text-2xl leading-[0.95] text-ink [overflow-wrap:anywhere] md:text-3xl">
        {displayName}
      </h3>
      {meta && (
        <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted">
          {meta}
        </p>
      )}

      {a.testimonio && (
        <blockquote className="mt-5 text-sm leading-relaxed text-muted">
          <span className="display-heading mr-1 align-[-0.15em] text-lg text-gold">
            &ldquo;
          </span>
          {a.testimonio}
        </blockquote>
      )}

      <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
        {igUrl ? (
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-light"
          >
            {hasName ? `@${a.instagram}` : "Ver en Instagram"}
            <span className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        ) : (
          <span />
        )}
        {relacion && (
          <span className="max-w-[9rem] text-right text-[10px] uppercase leading-tight tracking-[0.12em] text-muted/70">
            {relacion}
          </span>
        )}
      </div>
    </div>
  );
}

export function Athletes() {
  const atletas = getAtletas();
  if (atletas.length === 0) return null;

  return (
    <section
      id="atletas"
      className="relative border-t border-line bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-shell px-5 md:px-8">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" />
            Atletas
          </p>
        </Reveal>

        <MaskedHeading
          lines={["La comunidad", "en el ring."]}
          className="max-w-[16ch] text-[11vw] text-ink sm:text-6xl lg:text-7xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            Boxeadores y peleadores de la comunidad Herbalvarez. Cada tarjeta
            declara si la persona recibe producto o patrocinio.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {atletas.map((a, i) => (
            <li key={a.slug} className="bg-surface">
              <Reveal className="h-full" delay={(i % 3) * 0.06}>
                <AthleteCard a={a} n={i + 1} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
