"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ThreeBowCard, type BowAccent } from "./ThreeBowCard";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}

/**
 * Refined, executive one-time entrance transition (smooth glide, zero bounce/jitter).
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  direction = "up",
  className = "",
}: RevealProps) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -18, y: 0 }
      : direction === "right"
        ? { opacity: 0, x: 18, y: 0 }
        : { opacity: 0, x: 0, y };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.48,
        delay: Math.min(delay, 0.25),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  accent?: BowAccent;
  maxTilt?: number;
}

export function SpotlightCard({
  children,
  className = "",
  accent = "cyan",
  maxTilt = 6.5,
}: SpotlightCardProps) {
  return (
    <ThreeBowCard accent={accent} maxTilt={maxTilt} className={className}>
      {children}
    </ThreeBowCard>
  );
}
