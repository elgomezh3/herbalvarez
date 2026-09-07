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
    id: "dolor",
    name: "Dolor",
    category: "Recuperación",
    format: "Aceite · 60 ml · uso tópico",
    claim: "El dolor que dejó el golpe, tratado desde la raíz.",
    desc: "Aceite de hierbas de acción anestésica, analgésica y antiinflamatoria. Trabaja sobre el sistema nervioso y la circulación de la zona para calmar el dolor agudo y el que se queda semanas después de una pelea.",
    uses: ["Golpes", "Dolor articular", "Dolor de espalda", "Circulación"],
    image: "/productos/dolor.png",
    bg: "/img/prod-dolor.jpg",
    accent: "text-ruby",
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
  {
    id: "vi-gen",
    name: "Vi-Gen",
    category: "Ring",
    format: "Aceite · 60 ml · uso tópico",
    claim: "Defensa para la piel que más se expone.",
    desc: "Combina propiedades antibacterianas, antivirales y antifúngicas para cuidar la piel en las zonas de más contacto y humedad del entrenamiento y apoyar las defensas durante las semanas de carga alta.",
    uses: ["Higiene", "Zonas de roce", "Apoyo inmune", "Campamento"],
    image: "/productos/vi-gen.png",
    accent: "text-gold",
  },
  {
    id: "tradicional",
    name: "Tradicional",
    category: "Bienestar",
    format: "Suplemento · 250 ml · uso general",
    claim: "La base sobre la que se construye todo lo demás.",
    desc: "El aceite de hierbas original, con oleocanthal, polifenoles y Omegas 3, 6 y 9. Antioxidante, regenerador y antiinflamatorio para sostener el cuerpo día a día, dentro y fuera del gimnasio. Diez años de tradición mexicana.",
    uses: ["Uso diario", "Antioxidante", "Antiinflamatorio", "Defensas"],
    image: "/productos/tradicional.png",
    bg: "/img/prod-tradicional.jpg",
    accent: "text-ink",
  },
  {
    id: "antiestres",
    name: "Antiestrés",
    category: "Bienestar",
    format: "Suplemento · 80 cápsulas",
    claim: "La cabeza fría también se entrena.",
    desc: "Relajantes naturales y estimulación de melatonina para equilibrar el sistema nervioso. Baja la ansiedad y los nervios de la semana de pesaje y pelea, y ayuda a dormir cuando la mente no quiere parar.",
    uses: ["Semana de pelea", "Nervios", "Descanso", "Calma"],
    image: "/productos/antiestres.png",
    accent: "text-ink",
  },
  {
    id: "diabetes",
    name: "Diabetes",
    category: "Bienestar",
    format: "Suplemento · 250 ml",
    claim: "Energía estable para entrenar todos los días.",
    desc: "Suplemento de herbolaria con propiedades depurativas, digestivas y de apoyo al metabolismo del azúcar. Pensado como apoyo para mantener niveles de energía estables como parte de un estilo de vida activo y saludable.",
    uses: ["Apoyo metabólico", "Energía estable", "Digestión", "Estilo de vida"],
    image: "/productos/diabetes.png",
    accent: "text-ink",
  },
];
