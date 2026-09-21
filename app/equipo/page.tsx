import type { Metadata } from "next";
import { TeamSection } from "@/components/team-section";

export const metadata: Metadata = {
  title: "Equipo",
  description: "La gente detrás de la marca Herbalvarez.",
};

export default function EquipoPage() {
  return <TeamSection modo="pagina" />;
}
