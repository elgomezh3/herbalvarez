import { AthleteSection } from "@/components/athlete-section";

export function Team() {
  return (
    <AthleteSection
      seccion="equipo"
      configKey="equipo"
      id="equipo"
      defaults={{
        eyebrow: "El equipo",
        titulo: ["La marca la hacen", "peleadores."],
        parrafo:
          "Herbalvarez no nace en un laboratorio ni en una oficina. Detrás está gente que ha estado arriba del ring y sabe lo que un cuerpo necesita entre pelea y pelea.",
      }}
    />
  );
}
