import { ProblemView, type Dolor } from "@/components/problem-view";
import { getSeccion, txt, lineas, lista } from "@/lib/secciones";

const DOLORES: Dolor[] = [
  {
    numero: "01",
    titulo: "Vuelves antes al costal",
    texto:
      "Menos días perdidos entre sesiones y entre peleas: la recuperación deja de ser el cuello de botella de tu campamento.",
  },
  {
    numero: "02",
    titulo: "Articulaciones que aguantan",
    texto:
      "Soporte para nudillos, muñecas, hombros y tendones, antes de cargarlos y después del impacto.",
  },
  {
    numero: "03",
    titulo: "Duermes, reparas",
    texto:
      "Mejor descanso para que el músculo se recomponga de una sesión a la otra, sin fármacos para dormir.",
  },
  {
    numero: "04",
    titulo: "Todo con pura herbolaria",
    texto:
      "Fórmulas 100% naturales de la casa de Hialuroniz. Nada de química que tengas que revisar antes de un pesaje.",
  },
];

function normDolores(value: unknown): Dolor[] {
  const arr = lista<Record<string, unknown>>(value, []);
  const out = arr
    .map((d, i) => ({
      numero: txt(d.numero, String(i + 1).padStart(2, "0")),
      titulo: txt(d.titulo, ""),
      texto: txt(d.texto, ""),
    }))
    .filter((d) => d.titulo || d.texto);
  return out.length > 0 ? out : DOLORES;
}

export function Problem() {
  const c = getSeccion("problema");

  return (
    <ProblemView
      eyebrow={txt(c.eyebrow, "Solución")}
      titulo={lineas(c.titulo, [
        "Menos días parado.",
        "Más días de campamento.",
      ])}
      parrafo={txt(
        c.parrafo,
        "Entre entrenamientos y peleas, el cuerpo no siempre alcanza a recuperarse. Herbalvarez lo apoya con herbolaria mexicana: baja la inflamación, cuida las articulaciones que reciben el impacto y mejora el descanso, para que vuelvas al 100% con menos días parado. Todo natural, sin química que revisar antes del pesaje.",
      )}
      palabraFondo={txt(
        c.palabra_fondo,
        "SE RESUELVE — SE RESUELVE — SE RESUELVE",
      )}
      dolores={normDolores(c.dolores)}
      fondo={txt(c.fondo, "/img/problema.jpg")}
      fondoPosicion={txt(c.fondo_posicion, "68% 50%")}
    />
  );
}
