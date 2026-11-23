"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cpu, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const BOOT_STEPS = [
  "INITIALIZING 3D NEURAL CORE (WEBGL2)",
  "MOUNTING D3.JS FORCE-DIRECTED SKILL PHYSICS",
  "LOADING MULTI-LAYER ARCHITECTURE STUDIO",
  "PORTFOLIO TELEMETRY READY",
];

export function Preloader() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 900;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tick = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));
      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timer = setTimeout(() => setVisible(false), 140);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const stepIndex = Math.min(
    BOOT_STEPS.length - 1,
    Math.floor((progress / 100) * BOOT_STEPS.length),
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="portfolio-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(10px)",
            transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={() => setVisible(false)}
          className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden transition-colors ${
            isDark ? "bg-[#04070f]" : "bg-[#f8fafc]"
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_30%_75%,rgba(251,146,60,0.11),transparent_50%)]"
          />
          <div
            aria-hidden="true"
            className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-50"
          />

          <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
            <div className="relative flex h-32 w-32 items-center justify-center">
              <motion.svg
                viewBox="0 0 120 120"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 h-full w-full"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={isDark ? "rgba(56, 189, 248, 0.22)" : "rgba(2, 132, 199, 0.24)"}
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                />
              </motion.svg>

              <motion.svg
                viewBox="0 0 120 120"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)]"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke={isDark ? "rgba(251, 146, 60, 0.36)" : "rgba(217, 119, 6, 0.34)"}
                  strokeWidth="1.5"
                  strokeDasharray="18 24"
                />
              </motion.svg>

              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 h-full w-full -rotate-90"
              >
                <defs>
                  <linearGradient
                    id="preloaderRingGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={isDark ? "#38bdf8" : "#0284c7"} />
                    <stop offset="50%" stopColor={isDark ? "#22d3ee" : "#0891b2"} />
                    <stop offset="100%" stopColor={isDark ? "#fb923c" : "#d97706"} />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="44"
                  fill="none"
                  stroke="url(#preloaderRingGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={276}
                  strokeDashoffset={276 - (276 * progress) / 100}
                />
              </svg>

              <div className="flex flex-col items-center">
                <span className="text-gradient-hero font-mono text-2xl font-extrabold tracking-tight">
                  MS
                </span>
                <span className="font-mono text-xs font-semibold text-sky-400">
                  {progress}%
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Mohd Sufiyan · Systems Portfolio</span>
            </div>

            <div className="surface-subcard mt-4 h-1.5 w-full overflow-hidden rounded-full p-[1px]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-400 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex items-center gap-2 font-mono text-xs text-sky-300">
              <Cpu className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              <span>{BOOT_STEPS[stepIndex]}</span>
            </div>

            <span className="mt-4 font-mono text-[11px] text-slate-400">
              Click anywhere to enter immediately
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
