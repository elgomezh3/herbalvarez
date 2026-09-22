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

/** Contenedor que escalona a sus hijos <RevealItem> / motion con variants={fadeUp}. */
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

const revealTags = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  ul: motion.ul,
} as const;

/**
 * Un paso dentro de un <RevealGroup>: no dispara su propia entrada (a
 * diferencia de <Reveal>), hereda el "show"/"hidden" del grupo padre para
 * que todos los pasos aparezcan en cascada en vez de todos a la vez.
 */
export function RevealItem({
  as = "div",
  children,
  className,
  ...props
}: HTMLMotionProps<"div"> & { as?: keyof typeof revealTags }) {
  const Component = revealTags[as];
  return (
    // @ts-expect-error -- las props varían por etiqueta (ul vs p vs h1), pero
    // todas aceptan variants/className/children.
    <Component variants={fadeUp} className={className} {...props}>
      {children}
    </Component>
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
