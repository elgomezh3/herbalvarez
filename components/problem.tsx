import { ProblemView, type Dolor } from "@/components/problem-view";
import { getSeccion, txt, lineas, lista } from "@/lib/secciones";

const DOLORES: Dolor[] = [
  {
    numero: "01",
    titulo: "Golpes que no cierran",
    texto:
      "Hematomas y zonas cargadas que siguen ahí cuando ya deberías estar de vuelta en el costal.",
  },
  {
    numero: "02",
    titulo: "Articulaciones que cobran factura",
    texto:
      "Nudillos, muñecas, hombros y rodillas absorben cada impacto. Ronda tras ronda, la cuenta se acumula.",
  },
  {
    numero: "03",
    titulo: "Fatiga que se acumula",
    texto:
      "El músculo no termina de soltar entre sesiones y el rendimiento cae sin que lo notes.",
  },
  {
    numero: "04",
    titulo: "Recuperación lenta entre peleas",
    texto:
      "Cada semana de más para volver al 100% es una semana menos de campamento. Eso se paga arriba del ring.",
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
      eyebrow={txt(c.eyebrow, "El problema")}
      titulo={lineas(c.titulo, ["Entre pelea y pelea,", "el dolor no negocia."])}
      parrafo={txt(
        c.parrafo,
        "El cuerpo de un peleador vive golpeado, cargado y cansado. Si la recuperación no lleva el ritmo de los entrenamientos, pierdes filo, pierdes campamento y, tarde o temprano, pierdes peleas.",
      )}
      palabraFondo={txt(c.palabra_fondo, "DUELE — DUELE — DUELE")}
      dolores={normDolores(c.dolores)}
    />
  );
}
