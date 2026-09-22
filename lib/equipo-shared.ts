// Tipos y helpers de equipo SIN dependencias de Node.
// Seguro de importar desde componentes cliente.

export type CategoriaEquipo =
  | "direccion"
  | "marketing"
  | "produccion"
  | "salud"
  | "atencion"
  | "otra";

export const CATEGORIA_LABEL: Record<CategoriaEquipo, string> = {
  direccion: "Dirección",
  marketing: "Marketing",
  produccion: "Producción",
  salud: "Salud",
  atencion: "Atención al cliente",
  otra: "Otra",
};

export type RedSocialEquipo = {
  /** Instagram | TikTok | YouTube | LinkedIn | Facebook | Otra */
  plataforma: string;
  url: string;
};

export type MiembroEquipo = {
  /** Nombre del archivo (sin .md) — id interno, no se usa en URLs públicas. */
  slug: string;
  /** Slug amigable para /equipo/[perfilSlug] — editable en el CMS. */
  perfilSlug: string;
  nombre: string;
  puesto: string;
  foto: string;
  fotoAlt: string;
  bioCorta: string;
  bioLarga: string;
  cita: string;
  especialidades: string[];
  redes: RedSocialEquipo[];
  email: string;
  whatsapp: string;
  categoria: CategoriaEquipo;
  orden: number;
  visible: boolean;
  estado: "borrador" | "publicado";
};
