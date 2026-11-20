"use client";

import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { Preloader } from "./Preloader";
import { QuickDock } from "./QuickDock";

export function MotionProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MotionConfig reducedMotion="never">
      <Preloader />
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-cyan-300 to-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
      />
      {children}
      <QuickDock />
    </MotionConfig>
  );
}
