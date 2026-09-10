import { MaskedHeading, Reveal } from "@/components/primitives";
import { Carousel } from "@/components/carousel";
import { AthleteCard } from "@/components/athlete-card";
import { SectionBg } from "@/components/section-bg";
import { getAtletas, type SeccionAtleta } from "@/lib/atletas";
import { getSeccion, txt, lineas } from "@/lib/secciones";

type Defaults = { eyebrow: string; titulo: string[]; parrafo: string };

/**
 * Sección de fichas de personas. Se usa dos veces: "atletas" (comunidad) y
 * "equipo" (parte de la marca). Cada ficha se filtra por su campo `seccion`.
 */
export function AthleteSection({
  seccion,
  configKey,
  id,
  defaults,
}: {
  seccion: SeccionAtleta;
  configKey: string;
  id: string;
  defaults: Defaults;
}) {
  const atletas = getAtletas(seccion);
  if (atletas.length === 0) return null;

  const c = getSeccion(configKey);
  const eyebrow = txt(c.eyebrow, defaults.eyebrow);
  const titulo = lineas(c.titulo, defaults.titulo);
  const parrafo = txt(c.parrafo, defaults.parrafo);
  const fondoImg = txt(c.fondo, "");
  const fondoTransparente = c.fondo_transparente !== false;
  const fondoColor = txt(c.fondo_color, "#0c0c05");

  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-line py-24 md:py-32"
      style={
        !fondoImg && !fondoTransparente
          ? { backgroundColor: fondoColor }
          : undefined
      }
    >
      <SectionBg src={fondoImg} posicion={txt(c.fondo_posicion, "50% 50%")} />

      <div className="relative z-10 mx-auto max-w-shell px-5 md:px-8">
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

        <div className="mt-12">
          <Carousel label={defaults.eyebrow}>
            {atletas.map((a, i) => (
              <AthleteCard key={a.slug} atleta={a} index={i} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
