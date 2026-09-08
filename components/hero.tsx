import { HeroView, type Stat } from "@/components/hero-view";
import { getSeccion, txt, lineas, lista } from "@/lib/secciones";

const TITULO = ["Tu cuerpo", "es el arma.", "Nosotros lo", "mantenemos listo."];

const STATS: Stat[] = [
  { valor: "10", etiqueta: "años probados" },
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
      eyebrow={txt(c.eyebrow, "Nutrición y recuperación, 100% natural")}
      titulo={lineas(c.titulo, TITULO)}
      parrafo={txt(
        c.parrafo,
        "Herbolaria mexicana para boxeadores y peleadores: energía limpia, recuperación más rápida y soporte para articulaciones castigadas. Sin química de laboratorio y sin la montaña rusa de los estimulantes. Sabes exactamente qué te pones.",
      )}
      ctaPrimario={{
        texto: txt(c.cta_primario_texto, "Ver el arsenal"),
        enlace: txt(c.cta_primario_enlace, "#productos"),
      }}
      ctaSecundario={{
        texto: txt(c.cta_secundario_texto, "Cómo lo hacemos"),
        enlace: txt(c.cta_secundario_enlace, "#diferencia"),
      }}
      palabraFondo={txt(c.palabra_fondo, "RING")}
      stats={normStats(c.stats)}
    />
  );
}
