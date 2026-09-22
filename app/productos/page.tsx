import type { Metadata } from "next";
import { ProductSection } from "@/components/product-section";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "El arsenal completo de Herbalvarez: herbolaria mexicana para recuperar, rendir y aguantar el ring.",
};

export default function ProductosPage() {
  return <ProductSection modo="pagina" />;
}
