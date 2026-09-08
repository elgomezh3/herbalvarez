import { ProblemView, type Dolor } from "@/components/problem-view";
import { getSeccion, txt, lineas, lista } from "@/lib/secciones";

const DOLORES: Dolor[] = [
  {
    numero: "01",
    titulo: "Golpes que no cierran",
    texto:
      "Hematomas y zonas cargadas que siguen ahí cuando ya deberías estar entrenando de nuevo.",
  },
  {
    numero: "02",
    titulo: "Articulaciones al límite",
    texto:
      "Nudillos, muñecas, hombros y rodillas que reclaman después de cada sesión de sparring.",
  },
  {
    numero: "03",
    titulo: "Fatiga que se acumula",
    texto:
      "El músculo no termina de soltar entre entrenamientos y el rendimiento cae sin que lo notes.",
  },
  {
    numero: "04",
    titulo: "Recuperación lenta entre peleas",
    texto:
      "Cada semana de más para volver al 100% es una semana menos de campamento. Y eso se paga en el ring.",
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
        "El cuerpo de un peleador vive golpeado, cargado y cansado. Cuando la recuperación no sigue el ritmo de los entrenamientos, se pierde filo, se pierde campamento y, tarde o temprano, se pierden peleas.",
      )}
      palabraFondo={txt(c.palabra_fondo, "DUELE — DUELE — DUELE")}
      dolores={normDolores(c.dolores)}
    />
  );
}
