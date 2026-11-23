"use client";

import type { ReactNode } from "react";
import { ThreeBowCard, type BowAccent } from "./ThreeBowCard";

/* ============================================================================
   1. ScrollParallax & ScrollDepthFrame — Clean steady wrappers
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
      <div className="absolute right-[6%] top-[12%] h-80 w-80 rounded-full bg-sky-500/10 blur-[130px]" />
      <div className="absolute left-[4%] top-[48%] h-72 w-72 rounded-full bg-cyan-500/8 blur-[130px]" />
      <div className="absolute right-[18%] bottom-[8%] h-72 w-72 rounded-full bg-amber-500/6 blur-[130px]" />
    </div>
  );
}

/* ============================================================================
   2. TiltSpotlightCard — Powered by Three.js 3D Corner/Side Bow Engine
============================================================================ */
export function TiltSpotlightCard({
  children,
  className = "",
  accent = "cyan",
  maxTilt = 6.5,
}: {
  children: ReactNode;
  className?: string;
  accent?: BowAccent;
  maxTilt?: number;
}) {
  return (
    <ThreeBowCard accent={accent} maxTilt={maxTilt} className={className}>
      {children}
    </ThreeBowCard>
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
    <div className="relative space-y-8">
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-5 top-4 hidden w-[2px] bg-gradient-to-b from-sky-400 via-cyan-400/50 to-transparent md:block"
      />
      {children}
    </div>
  );
}
