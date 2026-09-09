import { AthleteSection } from "@/components/athlete-section";

export function Athletes() {
  return (
    <AthleteSection
      seccion="atletas"
      configKey="atletas"
      id="atletas"
      defaults={{
        eyebrow: "Atletas",
        titulo: ["En su esquina."],
        parrafo:
          "Boxeadores y peleadores que usan Herbalvarez en su preparación. Cada ficha declara con transparencia si la persona recibe producto o patrocinio.",
      }}
    />
  );
}
