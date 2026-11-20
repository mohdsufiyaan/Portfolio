"use client";

import { motion } from "motion/react";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

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
  accent?: "cyan" | "amber" | "emerald" | "violet";
}

const accentSpotlights = {
  cyan: "rgba(56, 189, 248, 0.16)",
  amber: "rgba(251, 146, 60, 0.14)",
  emerald: "rgba(16, 185, 129, 0.14)",
  violet: "rgba(139, 92, 246, 0.15)",
};

export function SpotlightCard({
  children,
  className = "",
  accent = "cyan",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      className={`glass-card overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: pos.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${accentSpotlights[accent]}, transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
