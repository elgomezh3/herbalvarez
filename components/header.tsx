"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { EASE } from "@/lib/motion";

const NAV = [
  { label: "Solución", href: "#problema" },
  { label: "Productos", href: "#productos" },
  { label: "Diferencia", href: "#diferencia" },
  { label: "Atletas", href: "#atletas" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-5 md:h-20 md:px-8">
          <a
            href="#top"
            aria-label="Herbalvarez — inicio"
            className="display-heading shrink-0 text-xl leading-none tracking-normal text-ink transition-colors hover:text-gold-light md:text-2xl"
          >
            HERBAL<span className="text-gold">VAREZ</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-xs font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#productos"
              className="hidden bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-bg transition-colors hover:bg-gold-light sm:inline-block"
            >
              Comprar
            </a>
            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-ink transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg lg:hidden"
          >
            <nav className="flex h-full flex-col justify-center gap-2 px-6">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: EASE }}
                  className="display-heading border-b border-line py-4 text-4xl text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#productos"
                onClick={() => setOpen(false)}
                className="mt-8 bg-gold px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-bg"
              >
                Comprar
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
