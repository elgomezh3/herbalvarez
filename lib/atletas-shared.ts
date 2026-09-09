// Tipos y helpers de atletas SIN dependencias de Node.
// Seguro de importar desde componentes cliente.

export type RelacionKey = "ninguna" | "producto" | "patrocinio" | "equipo";

/** Texto que se muestra en la ficha cuando la relación no es "ninguna". */
export const RELACION_LABEL: Record<RelacionKey, string> = {
  ninguna: "",
  producto: "Recibe producto de Herbalvarez",
  patrocinio: "Patrocinado por Herbalvarez",
  equipo: "Atleta del equipo Herbalvarez",
};

export type RedSocial = {
  plataforma: string;
  url: string;
};

/** En qué sección aparece la ficha. */
export type SeccionAtleta = "atletas" | "equipo";

export type Atleta = {
  slug: string;
  /** "atletas" (comunidad) o "equipo" (parte de la marca). */
  seccion: SeccionAtleta;
  nombre: string;
  disciplina: string;
  club: string;
  /** Usuario de Instagram, sin la @. */
  instagram: string;
  /** Ruta pública de la foto (/atletas/...), o "" si no hay. */
  foto: string;
  /** Récord deportivo, texto libre. Ej.: "12-1, 8 KO". */
  record: string;
  testimonio: string;
  /** En qué le han ayudado los productos (etiquetas cortas). */
  beneficios: string[];
  /** Redes sociales del atleta. */
  redes: RedSocial[];
  orden: number;
  publicado: boolean;
  relacion: RelacionKey;
};

/**
 * Lista final de redes de un atleta para la ficha: Instagram (del campo
 * "instagram") primero, y luego las demás, sin duplicar Instagram.
 */
export function redesDeAtleta(a: Atleta): RedSocial[] {
  const extras = a.redes.filter(
    (r) => r.plataforma.toLowerCase() !== "instagram",
  );
  const ig: RedSocial[] = a.instagram
    ? [{ plataforma: "Instagram", url: `https://instagram.com/${a.instagram}` }]
    : a.redes.filter((r) => r.plataforma.toLowerCase() === "instagram");
  return [...ig, ...extras];
}
