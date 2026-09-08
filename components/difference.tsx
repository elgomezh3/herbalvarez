import { DifferenceView, type Pilar } from "@/components/difference-view";
import { getSeccion, txt, lineas, lista } from "@/lib/secciones";

const PILARES: Pilar[] = [
  {
    titulo: "100% natural",
    texto:
      "Hierbas medicinales y nada más. Lo que te pones en la piel y en el cuerpo viene del campo, no del laboratorio.",
  },
  {
    titulo: "Sabes qué te pones",
    texto:
      "Sin parabenos, sin fragancias sintéticas, sin analgésicos ni estimulantes ocultos. Una cosa menos de qué preocuparte rumbo al pesaje.",
  },
  {
    titulo: "Cuida tus articulaciones",
    texto:
      "Pensado para cuerpos que reciben impacto repetido: soporte para tendones, ligamentos y músculos, antes y después del esfuerzo.",
  },
  {
    titulo: "10 años probados",
    texto:
      "La misma casa detrás de Hialuroniz. Una década formulando herbolaria que la gente vuelve a comprar.",
  },
];

function normPilares(value: unknown): Pilar[] {
  const arr = lista<Record<string, unknown>>(value, []);
  const out = arr
    .map((p) => ({ titulo: txt(p.titulo, ""), texto: txt(p.texto, "") }))
    .filter((p) => p.titulo || p.texto);
  return out.length > 0 ? out : PILARES;
}

export function Difference() {
  const c = getSeccion("diferencia");

  return (
    <DifferenceView
      eyebrow={txt(c.eyebrow, "Rendimiento sin química")}
      titulo={lineas(c.titulo, ["Sin química.", "Sin atajos.", "Solo hierba."])}
      parrafo={txt(
        c.parrafo,
        "Casi todo el mercado deportivo va de negro, rojo y química. Herbalvarez toma la herbolaria de Hialuroniz y la pone a trabajar para un cuerpo que compite, respetando su fisiología. Cambia el enfoque, no la pureza de la fórmula.",
      )}
      pilares={normPilares(c.pilares)}
    />
  );
}
