const ITEMS = [
  "Recupera más rápido",
  "Pelea más seguido",
  "Sin química",
  "100% natural",
  "Tradición mexicana",
  "Hecho para el ring",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-gold-deep bg-gold py-4 text-green-deep">
      <div className="flex w-max animate-marquee gap-6 whitespace-nowrap will-change-transform">
        {row.map((item, i) => (
          <span
            key={i}
            className="display-heading flex items-center gap-6 text-xl md:text-2xl"
          >
            {item}
            <span className="text-green-deep/45">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
