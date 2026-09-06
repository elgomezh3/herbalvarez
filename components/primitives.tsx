"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, stagger, lineReveal, viewportOnce } from "@/lib/motion";

/** Bloque que aparece al entrar en viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Contenedor que escalona a sus hijos <Reveal> / motion. */
export function RevealGroup({
  children,
  className,
  stagger: s = 0.12,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      variants={stagger(s)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Título partido en líneas que suben detrás de una máscara. */
export function MaskedHeading({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <motion.h2
      className={`display-heading ${className}`}
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span variants={lineReveal} className="block">
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
