import type { Metadata } from "next";
import { AthleteSection } from "@/components/athlete-section";

export const metadata: Metadata = {
  title: "Atletas",
  description:
    "Boxeadores y peleadores que usan Herbalvarez en su preparación.",
};

export default function AtletasPage() {
  return <AthleteSection modo="pagina" />;
}
