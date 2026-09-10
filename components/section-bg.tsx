import Image from "next/image";

/**
 * Imagen de fondo opcional para una sección. Si `src` está vacío no renderiza
 * nada y la sección conserva su fondo normal. Cuando hay imagen, va detrás
 * (z-0) con un velo oscuro para que el texto siga legible; el contenido de la
 * sección debe ir en un contenedor `relative z-10`.
 */
export function SectionBg({
  src,
  posicion = "50% 50%",
}: {
  src?: string;
  posicion?: string;
}) {
  if (!src) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-90"
        style={{ objectPosition: posicion }}
      />
      <div className="absolute inset-0 bg-bg/72" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/75 to-bg/45" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
