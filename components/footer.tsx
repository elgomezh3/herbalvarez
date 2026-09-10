import Image from "next/image";
import { MaskedHeading, Reveal } from "@/components/primitives";
import { SectionBg } from "@/components/section-bg";
import { getSeccion, txt, lineas, lista } from "@/lib/secciones";

type Red = { plataforma: string; url: string };

const REDES_DEFAULT: Red[] = [
  { plataforma: "Instagram", url: "https://instagram.com/herbalvarez" },
  { plataforma: "Facebook", url: "https://facebook.com/herbalvarez" },
  { plataforma: "TikTok", url: "https://tiktok.com/@herbalvarez" },
];

function normRedes(value: unknown): Red[] {
  const arr = lista<Record<string, unknown>>(value, []);
  const out = arr
    .map((r) => ({ plataforma: txt(r.plataforma, ""), url: txt(r.url, "") }))
    .filter((r) => /^https?:\/\//i.test(r.url));
  return out.length > 0 ? out : REDES_DEFAULT;
}

export function Footer() {
  const c = getSeccion("contacto");

  const eyebrow = txt(c.eyebrow, "Contacto");
  const titulo = lineas(c.titulo, ["Arma tu", "próximo campamento."]);
  const parrafo = txt(
    c.parrafo,
    "Pedidos, mayoreo y patrocinio de atletas. Enviamos a todo México.",
  );
  const correo = txt(c.correo, "hola@herbalvarez.mx");
  const waNumero = txt(c.whatsapp_numero, "520000000000").replace(/[^\d]/g, "");
  const waTexto = txt(c.whatsapp_texto, "+52 000 000 0000");
  const redes = normRedes(c.redes);
  const marcaTexto = txt(c.marca_hermana_texto, "Hialuroniz");
  const marcaUrl = txt(c.marca_hermana_url, "https://hialuroniz.com");
  const creditos = txt(
    c.creditos,
    "Productos de herbolaria; no son medicamentos, consulta a tu médico.",
  );

  return (
    <footer
      id="contacto"
      className="grain relative overflow-hidden border-t border-line bg-surface"
    >
      <SectionBg
        src={txt(c.fondo, "")}
        posicion={txt(c.fondo_posicion, "50% 50%")}
      />

      <div className="relative z-10 mx-auto max-w-shell px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" />
            {eyebrow}
          </p>
        </Reveal>

        <MaskedHeading
          lines={titulo}
          className="max-w-[14ch] text-[12vw] text-ink sm:text-6xl lg:text-8xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {parrafo}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                Correo
              </p>
              <a
                href={`mailto:${correo}`}
                className="mt-2 block text-lg text-ink transition-colors hover:text-gold"
              >
                {correo}
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                WhatsApp
              </p>
              <a
                href={`https://wa.me/${waNumero}`}
                className="mt-2 block text-lg text-ink transition-colors hover:text-gold"
              >
                {waTexto}
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                Redes
              </p>
              <ul className="mt-2 space-y-1">
                {redes.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-ink transition-colors hover:text-gold"
                    >
                      {s.plataforma}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-20 flex justify-center border-t border-line pt-14">
            <Image
              src="/logo.png"
              alt="Herbalvarez — Aceite de Hierbas"
              width={900}
              height={828}
              className="h-auto w-[240px] md:w-[300px]"
            />
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="display-heading text-lg tracking-normal text-ink">
            HERBAL<span className="text-gold">VAREZ</span>
          </span>
          <span>
            Marca hermana de{" "}
            <a
              href={marcaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink transition-colors hover:text-gold"
            >
              {marcaTexto}
            </a>
          </span>
          <span>
            &copy; {new Date().getFullYear()} Herbalvarez · Hecho en México
          </span>
        </div>

        {creditos && (
          <p className="mt-6 text-[10px] leading-relaxed text-muted/60">
            {creditos}
          </p>
        )}
      </div>
    </footer>
  );
}
