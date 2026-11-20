"use client";

import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

/* ============================================================================
   1. ScrollParallax & ScrollDepthFrame — Clean steady wrappers (no scroll jitter)
============================================================================ */
export function ScrollParallax({
  children,
  className = "",
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function ScrollDepthFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function ScrollParallaxBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute right-[6%] top-[12%] h-80 w-80 rounded-full bg-indigo-500/10 blur-[130px]" />
      <div className="absolute left-[4%] top-[48%] h-72 w-72 rounded-full bg-sky-500/8 blur-[130px]" />
      <div className="absolute right-[18%] bottom-[8%] h-72 w-72 rounded-full bg-violet-500/8 blur-[130px]" />
    </div>
  );
}

/* ============================================================================
   2. TiltSpotlightCard — Professional steady card with subtle cursor spotlight
============================================================================ */
const accentGlows = {
  cyan: "rgba(99, 102, 241, 0.16)",
  amber: "rgba(245, 158, 11, 0.15)",
  emerald: "rgba(16, 185, 129, 0.15)",
  violet: "rgba(139, 92, 246, 0.16)",
};

export function TiltSpotlightCard({
  children,
  className = "",
  accent = "cyan",
}: {
  children: ReactNode;
  className?: string;
  accent?: "cyan" | "amber" | "emerald" | "violet";
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
      className={`glass-card overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(440px circle at ${spot.x}px ${spot.y}px, ${accentGlows[accent]}, transparent 64%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* ============================================================================
   3. AnimatedStat — Crisp instant metric readout
============================================================================ */
export function AnimatedStat({
  fallback,
}: {
  target?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  fallback: string;
}) {
  return <span>{fallback}</span>;
}

/* ============================================================================
   4. ScrollTimelineWrapper — Clean steady architectural timeline rail
============================================================================ */
export function ScrollTimelineWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative space-y-10">
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-5 top-4 hidden w-[2px] bg-gradient-to-b from-indigo-500 via-sky-400/50 to-transparent md:block"
      />
      {children}
    </div>
  );
}
