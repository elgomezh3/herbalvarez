// Tipos y helpers de productos SIN dependencias de Node.
// Seguro de importar desde componentes cliente.

export type ProductoAcento = "rubi" | "oro" | "neutro";

export type Producto = {
  slug: string;
  nombre: string;
  categoria: string;
  formato: string;
  claim: string;
  descripcion: string;
  usos: string[];
  /** Imagen del producto (/productos/...), o "". */
  imagen: string;
  /** Foto de fondo de la fila (/img/...), opcional. */
  fotoFondo: string;
  acento: ProductoAcento;
  orden: number;
  publicado: boolean;
};

/** Clase de color de texto para categoría y detalles. */
export const ACENTO_TEXTO: Record<ProductoAcento, string> = {
  rubi: "text-ruby",
  oro: "text-gold",
  neutro: "text-ink",
};

/** Halo detrás de la botella. */
export function haloClass(acento: ProductoAcento): string {
  if (acento === "rubi") return "bg-ruby/25";
  if (acento === "oro") return "bg-gold/20";
  return "bg-green/40";
}
