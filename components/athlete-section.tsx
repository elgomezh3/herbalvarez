import { MaskedHeading, Reveal } from "@/components/primitives";
import { Carousel } from "@/components/carousel";
import { AthleteCard } from "@/components/athlete-card";
import { AthleteRow } from "@/components/athlete-row";
import { CarouselCtaCard } from "@/components/carousel-cta-card";
import { SectionBg } from "@/components/section-bg";
import { getAtletas } from "@/lib/atletas";
import { getSeccion, txt, lineas } from "@/lib/secciones";

const DEFAULTS = {
  eyebrow: "Atletas",
  titulo: ["En su esquina."],
  parrafo:
    "Boxeadores y peleadores que usan Herbalvarez en su preparación. Cada ficha declara con transparencia si la persona recibe producto o patrocinio.",
};

/**
 * Sección de Atletas. `modo="home"` muestra un carrusel con los destacados +
 * una tarjeta final "Ver todos los atletas" hacia /atletas; `modo="pagina"`
 * muestra la lista completa en filas apiladas con scroll parallax, pensado
 * para usarse dentro de /atletas.
 */
export function AthleteSection({
  modo = "pagina",
  limite,
}: {
  modo?: "home" | "pagina";
  limite?: number;
}) {
  const atletas = getAtletas(
    modo === "home" ? { soloDestacados: true, limite: limite ?? 3 } : {},
  );
  if (atletas.length === 0) return null;

  const c = getSeccion("atletas");
  const eyebrow = txt(c.eyebrow, DEFAULTS.eyebrow);
  const titulo = lineas(c.titulo, DEFAULTS.titulo);
  const parrafo = txt(c.parrafo, DEFAULTS.parrafo);
  const fondoImg = txt(c.fondo, "");
  const fondoTransparente = c.fondo_transparente !== false;
  const fondoColor = txt(c.fondo_color, "#0c0c05");

  const espaciado =
    modo === "home"
      ? "border-t border-line py-24 md:py-32"
      : "pb-24 pt-32 md:pb-32 md:pt-40";

  return (
    <section
      id="atletas"
      className={`relative overflow-hidden ${espaciado}`}
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

        {modo === "home" ? (
          <div className="mt-12">
            <Carousel label={eyebrow}>
              {atletas.map((a, i) => (
                <AthleteCard key={a.slug} atleta={a} index={i} />
              ))}
              <CarouselCtaCard href="/atletas" label="Ver todos los atletas" />
            </Carousel>
          </div>
        ) : (
          <div className="mt-8">
            {atletas.map((a, i) => (
              <AthleteRow key={a.slug} atleta={a} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
