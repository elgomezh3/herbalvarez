import { MaskedHeading, Reveal } from "@/components/primitives";
import { Carousel } from "@/components/carousel";
import { ProductCard } from "@/components/product-card";
import { getProductos } from "@/lib/productos";
import { getSeccion, txt, lineas } from "@/lib/secciones";

export function Products() {
  const productos = getProductos();
  if (productos.length === 0) return null;

  const c = getSeccion("productos");
  const eyebrow = txt(c.eyebrow, "El arsenal");
  const titulo = lineas(c.titulo, ["Cinco fórmulas.", "Cero química."]);
  const parrafo = txt(
    c.parrafo,
    "Las mismas fórmulas de herbolaria de Hialuroniz, escogidas por lo que un peleador tiene que resolver: recuperar, rendir y aguantar el ring. Respetan la fisiología del cuerpo; nada de laboratorio.",
  );
  const avisoLegal = txt(
    c.aviso_legal,
    "Productos de herbolaria. No son medicamentos ni sustituyen la atención médica ni la valoración de un profesional del deporte. Consulta a tu médico.",
  );

  return (
    <section id="productos" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-shell px-5 md:px-8">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" />
            {eyebrow}
          </p>
        </Reveal>
        <MaskedHeading
          lines={titulo}
          className="max-w-[16ch] text-[11vw] text-ink sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {parrafo}
          </p>
        </Reveal>

        <div className="mt-12">
          <Carousel label="Productos">
            {productos.map((p, i) => (
              <ProductCard key={p.slug} producto={p} index={i} />
            ))}
          </Carousel>
        </div>

        <Reveal>
          <p className="mt-14 max-w-2xl border-t border-line pt-6 text-xs leading-relaxed text-muted/70">
            {avisoLegal}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
