import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Producto, ProductoAcento } from "@/lib/productos-shared";

export type { Producto, ProductoAcento } from "@/lib/productos-shared";
export { ACENTO_TEXTO, haloClass } from "@/lib/productos-shared";

const DIR = path.join(process.cwd(), "content", "productos");

const ACENTOS: ProductoAcento[] = ["rubi", "oro", "neutro"];

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

function strList(value: unknown): string[] {
  if (typeof value === "string") {
    return value.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
  }
  if (!Array.isArray(value)) return [];
  return value
    .map((v) =>
      v && typeof v === "object"
        ? str((v as Record<string, unknown>).texto ?? (v as Record<string, unknown>).value ?? "")
        : str(v),
    )
    .filter(Boolean);
}

function toBool(value: unknown): boolean {
  return value === true || value === "true" || value === 1 || value === "1";
}

/** Lee content/productos/*.md en build time. Solo publicados, ordenados por "orden". */
export function getProductos(): Producto[] {
  let files: string[];
  try {
    files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const productos: Producto[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data } = matter(raw);
    const rawOrden = Number(data.orden);
    const rawAcento = str(data.acento) as ProductoAcento;

    return {
      slug: file.replace(/\.md$/, ""),
      nombre: str(data.nombre),
      categoria: str(data.categoria),
      formato: str(data.formato),
      claim: str(data.claim),
      descripcion: str(data.descripcion),
      usos: strList(data.usos),
      imagen: str(data.imagen),
      fotoFondo: str(data.foto_fondo),
      acento: ACENTOS.includes(rawAcento) ? rawAcento : "neutro",
      orden: Number.isFinite(rawOrden) ? rawOrden : 999,
      publicado: toBool(data.publicado),
    };
  });

  return productos
    .filter((p) => p.publicado)
    .sort((a, b) => a.orden - b.orden || a.slug.localeCompare(b.slug));
}
