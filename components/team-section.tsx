import { MaskedHeading, Reveal } from "@/components/primitives";
import { Carousel } from "@/components/carousel";
import { TeamCard } from "@/components/team-card";
import { TeamRow } from "@/components/team-row";
import { CarouselCtaCard } from "@/components/carousel-cta-card";
import { SectionBg } from "@/components/section-bg";
import { getEquipo } from "@/lib/equipo";
import { getSeccion, txt, lineas } from "@/lib/secciones";

const DEFAULTS = {
  eyebrow: "El equipo",
  titulo: ["La gente detrás", "de la marca."],
  parrafo:
    "Herbalvarez no nace en un laboratorio ni en una oficina. Detrás está el equipo que arma, prueba y sostiene cada fórmula y cada campaña.",
};

/**
 * Sección de Equipo. `modo="home"` muestra un carrusel con los primeros N
 * por "orden" (mismo orden que /equipo, nunca un subconjunto aparte) + una
 * tarjeta final "Ver todo el equipo" hacia /equipo; `modo="pagina"` muestra
 * la lista completa en filas apiladas con scroll parallax, pensado para
 * usarse dentro de /equipo.
 */
export function TeamSection({
  modo = "pagina",
  limite,
}: {
  modo?: "home" | "pagina";
  limite?: number;
}) {
  const equipo = getEquipo(modo === "home" ? { limite: limite ?? 3 } : {});
  if (equipo.length === 0) return null;

  const c = getSeccion("equipo");
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
      id="equipo"
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
              {equipo.map((m, i) => (
                <TeamCard key={m.slug} miembro={m} index={i} />
              ))}
              <CarouselCtaCard href="/equipo" label="Ver todo el equipo" />
            </Carousel>
          </div>
        ) : (
          <div className="mt-8">
            {equipo.map((m, i) => (
              <TeamRow key={m.slug} miembro={m} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
