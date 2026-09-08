import { MaskedHeading, Reveal } from "@/components/primitives";
import { AthleteRow } from "@/components/athlete-row";
import { getAtletas } from "@/lib/atletas";
import { getSeccion, txt, lineas } from "@/lib/secciones";

export function Athletes() {
  const atletas = getAtletas();
  if (atletas.length === 0) return null;

  const c = getSeccion("atletas");
  const eyebrow = txt(c.eyebrow, "Atletas");
  const titulo = lineas(c.titulo, ["En su esquina."]);
  const parrafo = txt(
    c.parrafo,
    "Boxeadores y peleadores que usan Herbalvarez en su preparación. Cada ficha declara con transparencia si la persona recibe producto o patrocinio.",
  );

  return (
    <section
      id="atletas"
      className="relative border-t border-line bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-shell px-5 md:px-8">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" />
            {eyebrow}
          </p>
        </Reveal>

        <MaskedHeading
          lines={titulo}
          className="max-w-[16ch] text-[11vw] text-ink sm:text-6xl lg:text-7xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {parrafo}
          </p>
        </Reveal>

        <div className="mt-10">
          {atletas.map((a, i) => (
            <AthleteRow key={a.slug} atleta={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
