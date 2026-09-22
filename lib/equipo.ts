import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CategoriaEquipo, MiembroEquipo } from "@/lib/equipo-shared";

export type {
  CategoriaEquipo,
  MiembroEquipo,
  RedSocialEquipo,
} from "@/lib/equipo-shared";
export { CATEGORIA_LABEL } from "@/lib/equipo-shared";

const CONTENT_DIR = path.join(process.cwd(), "content", "equipo");

const CATEGORIAS: CategoriaEquipo[] = [
  "direccion",
  "marketing",
  "produccion",
  "salud",
  "atencion",
  "otra",
];
const ESTADOS: MiembroEquipo["estado"][] = ["borrador", "publicado"];

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

function strList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (item && typeof item === "object" ? "" : str(item)))
    .filter(Boolean);
}

function toBool(value: unknown): boolean {
  return value === true || value === "true" || value === 1 || value === "1";
}

function parseRedes(value: unknown): MiembroEquipo["redes"] {
  if (!Array.isArray(value)) return [];
  return value
    .map((raw) => {
      const item = (raw ?? {}) as Record<string, unknown>;
      return { plataforma: str(item.plataforma), url: str(item.url) };
    })
    .filter((r) => /^https?:\/\//i.test(r.url));
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function leerEquipo(): MiembroEquipo[] {
  let files: string[];
  try {
    files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  return files.map((file): MiembroEquipo => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    const rawOrden = Number(data.orden);
    const rawCategoria = str(data.categoria) as CategoriaEquipo;
    const rawEstado = str(data.estado) as MiembroEquipo["estado"];
    const nombre = str(data.nombre);
    const slugPropio = str(data.slug);
    const archivoSlug = file.replace(/\.md$/, "");

    return {
      slug: archivoSlug,
      perfilSlug: slugPropio || slugify(nombre) || archivoSlug,
      nombre,
      puesto: str(data.puesto),
      foto: str(data.foto),
      fotoAlt: str(data.foto_alt) || nombre,
      bioCorta: str(data.bio_corta).slice(0, 150),
      bioLarga: str(data.bio_larga),
      cita: str(data.cita),
      especialidades: strList(data.especialidades),
      redes: parseRedes(data.redes),
      email: str(data.email),
      whatsapp: str(data.whatsapp).replace(/[^\d]/g, ""),
      categoria: CATEGORIAS.includes(rawCategoria) ? rawCategoria : "otra",
      orden: Number.isFinite(rawOrden) ? rawOrden : 999,
      visible: toBool(data.visible),
      estado: ESTADOS.includes(rawEstado) ? rawEstado : "borrador",
    };
  });
}

/**
 * Lee content/equipo/*.md en tiempo de build. Devuelve solo los visibles y
 * publicados, ordenados por "orden". `limite` corta ese mismo orden a los
 * primeros N (para el resumen corto de la home): así el home siempre
 * muestra un prefijo exacto del orden real, nunca un subconjunto aparte que
 * pueda numerarse distinto entre home y la página completa.
 */
export function getEquipo(opts: { limite?: number } = {}) {
  const equipo = leerEquipo()
    .filter((m) => m.visible && m.estado === "publicado")
    .sort((a, b) => a.orden - b.orden || a.slug.localeCompare(b.slug));

  return opts.limite ? equipo.slice(0, opts.limite) : equipo;
}

/** Un integrante por su slug de perfil (`/equipo/[slug]`), o null si no existe/no es visible. */
export function getMiembroEquipo(perfilSlug: string) {
  return getEquipo().find((m) => m.perfilSlug === perfilSlug) ?? null;
}
