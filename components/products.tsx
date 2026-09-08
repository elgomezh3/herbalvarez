import { MaskedHeading, Reveal } from "@/components/primitives";
import { ProductRow } from "@/components/products-row";
import { getProductos } from "@/lib/productos";
import { getSeccion, txt, lineas } from "@/lib/secciones";

export function Products() {
  const productos = getProductos();
  if (productos.length === 0) return null;

  const c = getSeccion("productos");
  const eyebrow = txt(c.eyebrow, "Los productos");
  const titulo = lineas(c.titulo, ["Cinco fórmulas.", "Un mismo origen."]);
  const parrafo = txt(
    c.parrafo,
    "Los mismos aceites de hierbas medicinales de Hialuroniz, elegidos por lo que tu cuerpo tiene que resolver: recuperar, rendir y aguantar el ring.",
  );
  const avisoLegal = txt(
    c.aviso_legal,
    "Productos de herbolaria. No son medicamentos y no sustituyen la atención médica ni la valoración de un profesional del deporte. Consulta a tu médico.",
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

        <div className="mt-8">
          {productos.map((p, i) => (
            <ProductRow key={p.slug} producto={p} index={i} />
          ))}
        </div>

        <Reveal>
          <p className="mt-16 max-w-2xl border-t border-line pt-6 text-xs leading-relaxed text-muted/70">
            {avisoLegal}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
