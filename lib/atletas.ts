import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Atleta,
  RelacionKey,
  SeccionAtleta,
} from "@/lib/atletas-shared";

export type {
  Atleta,
  RedSocial,
  RelacionKey,
  SeccionAtleta,
} from "@/lib/atletas-shared";
export { RELACION_LABEL, redesDeAtleta } from "@/lib/atletas-shared";

const CONTENT_DIR = path.join(process.cwd(), "content", "atletas");

const RELACIONES: RelacionKey[] = ["ninguna", "producto", "patrocinio", "equipo"];
const SECCIONES: SeccionAtleta[] = ["atletas", "equipo"];

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

function strList(value: unknown): string[] {
  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        return str(obj.texto ?? obj.beneficio ?? obj.value ?? "");
      }
      return str(item);
    })
    .filter(Boolean);
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

function parseRedes(value: unknown): Atleta["redes"] {
  if (!Array.isArray(value)) return [];
  return value
    .map((raw) => {
      const item = (raw ?? {}) as Record<string, unknown>;
      return { plataforma: str(item.plataforma), url: str(item.url) };
    })
    .filter((r) => /^https?:\/\//i.test(r.url));
}

/**
 * Lee content/atletas/*.md en tiempo de build. Devuelve solo los publicados,
 * ordenados por el campo "orden" (menor primero) y luego por slug.
 */
export function getAtletas(seccion: SeccionAtleta = "atletas"): Atleta[] {
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

    const rawSeccion = str(data.seccion) as SeccionAtleta;

    return {
      slug: file.replace(/\.md$/, ""),
      seccion: SECCIONES.includes(rawSeccion) ? rawSeccion : "atletas",
      nombre: str(data.nombre),
      disciplina: str(data.disciplina),
      club: str(data.club),
      instagram: handle(data.instagram),
      foto: str(data.foto),
      record: str(data.record),
      testimonio: str(data.testimonio),
      beneficios: strList(data.beneficios),
      redes: parseRedes(data.redes),
      orden: Number.isFinite(rawOrden) ? rawOrden : 999,
      publicado: toBool(data.publicado),
      relacion: RELACIONES.includes(rawRelacion) ? rawRelacion : "ninguna",
    };
  });

  return atletas
    .filter((a) => a.publicado && a.seccion === seccion)
    .sort((a, b) => a.orden - b.orden || a.slug.localeCompare(b.slug));
}
