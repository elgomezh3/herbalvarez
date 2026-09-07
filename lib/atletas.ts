import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type RelacionKey = "ninguna" | "producto" | "patrocinio" | "equipo";

/** Texto que se muestra en la tarjeta cuando la relación no es "ninguna". */
export const RELACION_LABEL: Record<RelacionKey, string> = {
  ninguna: "",
  producto: "Recibe producto de Herbalvarez",
  patrocinio: "Patrocinado por Herbalvarez",
  equipo: "Atleta del equipo Herbalvarez",
};

export type Atleta = {
  slug: string;
  nombre: string;
  disciplina: string;
  club: string;
  /** Usuario de Instagram, sin la @. */
  instagram: string;
  /** Ruta pública de la foto (/atletas/...), o "" si no hay. */
  foto: string;
  testimonio: string;
  orden: number;
  publicado: boolean;
  relacion: RelacionKey;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "atletas");

const RELACIONES: RelacionKey[] = ["ninguna", "producto", "patrocinio", "equipo"];

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

/** Normaliza cualquier cosa que peguen en el campo de Instagram a solo el usuario. */
function handle(value: unknown): string {
  return str(value)
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^@+/, "")
    .replace(/[/?#].*$/, "")
    .trim();
}

function toBool(value: unknown): boolean {
  return value === true || value === "true" || value === 1 || value === "1";
}

/**
 * Lee content/atletas/*.md en tiempo de build. Devuelve solo los publicados,
 * ordenados por el campo "orden" (menor primero) y luego por slug.
 */
export function getAtletas(): Atleta[] {
  let files: string[];
  try {
    files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const atletas: Atleta[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    const rawOrden = Number(data.orden);
    const rawRelacion = str(data.relacion) as RelacionKey;

    return {
      slug: file.replace(/\.md$/, ""),
      nombre: str(data.nombre),
      disciplina: str(data.disciplina),
      club: str(data.club),
      instagram: handle(data.instagram),
      foto: str(data.foto),
      testimonio: str(data.testimonio),
      orden: Number.isFinite(rawOrden) ? rawOrden : 999,
      publicado: toBool(data.publicado),
      relacion: RELACIONES.includes(rawRelacion) ? rawRelacion : "ninguna",
    };
  });

  return atletas
    .filter((a) => a.publicado)
    .sort((a, b) => a.orden - b.orden || a.slug.localeCompare(b.slug));
}
