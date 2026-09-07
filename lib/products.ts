export type ProductCategory = "Recuperación" | "Rendimiento" | "Ring" | "Bienestar";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  format: string;
  claim: string;
  desc: string;
  uses: string[];
  /** Imagen del producto (opcional: aún sin foto para algunos). */
  image?: string;
  /** Foto de fondo para la fila (Unsplash), opcional. */
  bg?: string;
  /** Clase de color de acento de la ficha. */
  accent: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "descanso-total",
    name: "Descanso Total",
    category: "Recuperación",
    format: "Suplemento · 100 cápsulas",
    claim: "El músculo se repara mientras duermes. Aquí empieza.",
    desc: "Estimula la producción de serotonina y melatonina para un sueño profundo y reparador. El descanso que necesita el cuerpo para volver al 100% entre sesiones dobles, con menos inflamación y menos dolor muscular.",
    uses: ["Sueño profundo", "Doble sesión", "Recuperación", "Menos dolor"],
    image: "/productos/descanso-total.png",
    accent: "text-gold",
  },
  {
    id: "inhibe-dolor",
    name: "Inhibe Dolor",
    category: "Recuperación",
    format: "Aceite · 60 ml · uso tópico",
    claim: "Baja la inflamación antes de que te frene.",
    desc: "Formulado para el rendimiento físico y la recuperación post-entrenamiento: reduce el dolor y la inflamación después del esfuerzo y devuelve flexibilidad y movilidad a músculos y articulaciones.",
    uses: ["Inflamación", "Post-entreno", "Movilidad", "Flexibilidad"],
    image: "/productos/inhibe-dolor.png",
    accent: "text-ruby",
  },
  {
    id: "poder-absoluto",
    name: "Poder Absoluto",
    category: "Rendimiento",
    format: "Suplemento · 100 cápsulas",
    claim: "Más tanque para la semana más dura del campamento.",
    desc: "Suplemento en cápsulas para subir energía y resistencia en la sesión, bajar el estrés antes de entrenar y acelerar la recuperación muscular después. Apoya la fuerza, la concentración y el control del estrés oxidativo.",
    uses: ["Energía", "Resistencia", "Fuerza", "Recuperación"],
    image: "/productos/poder-absoluto.png",
    bg: "/img/prod-poder-absoluto.jpg",
    accent: "text-gold",
  },
  {
    id: "pomada",
    name: "Pomada",
    category: "Recuperación",
    format: "Pomada · 90 g · uso tópico",
    claim: "El masaje que tu esquina te da entre asaltos.",
    desc: "Ungüento de absorción media-lenta a base de lípidos naturales y extractos herbales. Anestésico local y antiinflamatorio potente; la miel y la cera de abeja dejan una barrera que protege y regenera la piel trabajada.",
    uses: ["Masaje", "Contracturas", "Zonas cargadas", "Piel protegida"],
    image: "/productos/pomada.png",
    accent: "text-ruby",
  },
  {
    id: "vaselina",
    name: "Vaselina",
    category: "Ring",
    format: "Ungüento · 90 g · uso tópico",
    claim: "La piel también aguanta la pelea.",
    desc: "Base oleosa de alta oclusión con polímeros naturales de cera de abeja y ácidos grasos vegetales. Reduce ardor, dolor y descamación, calma la inflamación y ayuda a regenerar la piel expuesta al roce del guante y la lona.",
    uses: ["Córner", "Cara y cejas", "Fricción", "Regeneración"],
    image: "/productos/vaselina.png",
    accent: "text-gold",
  },
];
