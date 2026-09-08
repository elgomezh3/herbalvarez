import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "secciones");

export type Seccion = Record<string, unknown>;

/**
 * Lee content/secciones/<nombre>.md en build time y devuelve su frontmatter.
 * Si el archivo no existe o no parsea, devuelve {} (los componentes usan sus
 * valores por defecto, así el sitio nunca queda en blanco).
 */
export function getSeccion(nombre: string): Seccion {
  try {
    const raw = fs.readFileSync(path.join(DIR, `${nombre}.md`), "utf8");
    const { data } = matter(raw);
    return data && typeof data === "object" ? (data as Seccion) : {};
  } catch {
    return {};
  }
}

/** Devuelve el string si tiene contenido; si no, el valor por defecto. */
export function txt(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/** Parte un texto multilínea en renglones limpios; si viene vacío, usa el default. */
export function lineas(value: unknown, fallback: string[]): string[] {
  if (typeof value === "string" && value.trim()) {
    return value
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
  }
  return fallback;
}

/** Lista de objetos: usa la del CMS si trae elementos, si no el default. */
export function lista<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) && value.length > 0 ? (value as T[]) : fallback;
}

/** Lista de strings (widget list simple): limpia y cae al default si viene vacía. */
export function listaTexto(value: unknown, fallback: string[]): string[] {
  if (Array.isArray(value)) {
    const out = value
      .map((v) =>
        typeof v === "string"
          ? v.trim()
          : v && typeof v === "object"
            ? String((v as Record<string, unknown>).texto ?? "").trim()
            : "",
      )
      .filter(Boolean);
    if (out.length > 0) return out;
  }
  if (typeof value === "string" && value.trim()) {
    const out = value
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (out.length > 0) return out;
  }
  return fallback;
}
