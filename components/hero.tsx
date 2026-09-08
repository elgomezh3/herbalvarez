import { HeroView, type Stat } from "@/components/hero-view";
import { getSeccion, txt, lineas, lista } from "@/lib/secciones";

const TITULO = ["Tu cuerpo", "es el arma.", "Nosotros lo", "mantenemos listo."];

const STATS: Stat[] = [
  { valor: "10", etiqueta: "años de tradición" },
  { valor: "100%", etiqueta: "natural" },
  { valor: "0", etiqueta: "químicos" },
];

function normStats(value: unknown): Stat[] {
  const arr = lista<Record<string, unknown>>(value, []);
  const out = arr
    .map((s) => ({ valor: txt(s.valor, ""), etiqueta: txt(s.etiqueta, "") }))
    .filter((s) => s.valor || s.etiqueta);
  return out.length > 0 ? out : STATS;
}

export function Hero() {
  const c = getSeccion("hero");

  return (
    <HeroView
      eyebrow={txt(c.eyebrow, "Recuperación de nivel profesional")}
      titulo={lineas(c.titulo, TITULO)}
      parrafo={txt(
        c.parrafo,
        "Aceites de hierbas medicinales 100% naturales para boxeadores y deportistas de combate. Diez años de tradición mexicana, formulados para lo que exige el ring.",
      )}
      ctaPrimario={{
        texto: txt(c.cta_primario_texto, "Ver productos"),
        enlace: txt(c.cta_primario_enlace, "#productos"),
      }}
      ctaSecundario={{
        texto: txt(c.cta_secundario_texto, "Conocer la historia"),
        enlace: txt(c.cta_secundario_enlace, "#diferencia"),
      }}
      palabraFondo={txt(c.palabra_fondo, "RING")}
      stats={normStats(c.stats)}
    />
  );
}
