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
    titulo: "Recuperación que no alcanza",
    texto:
      "El músculo no termina de soltar entre sesiones. Cada semana de más para volver al 100% es campamento perdido.",
  },
  {
    numero: "04",
    titulo: "La solución: al ritmo de tu campamento",
    texto:
      "Herbolaria que apoya el descanso, baja la inflamación y cuida tendones y músculos, antes y después del esfuerzo. 100% natural, sin química que revisar antes del pesaje.",
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
      eyebrow={txt(c.eyebrow, "Problema y solución")}
      titulo={lineas(c.titulo, [
        "El desgaste viene con el oficio.",
        "Recuperar rápido, también.",
      ])}
      parrafo={txt(
        c.parrafo,
        "El cuerpo de un peleador vive golpeado, cargado y cansado. Si la recuperación no lleva el ritmo de los entrenamientos, pierdes filo y pierdes campamento. Ahí es donde entra Herbalvarez: menos dolor, mejor descanso y articulaciones que aguantan la carga, con pura herbolaria.",
      )}
      palabraFondo={txt(
        c.palabra_fondo,
        "DUELE — SE RESUELVE — DUELE — SE RESUELVE",
      )}
      dolores={normDolores(c.dolores)}
    />
  );
}
