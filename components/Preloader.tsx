"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cpu, Sparkles } from "lucide-react";

const BOOT_STEPS = [
  "INITIALIZING 3D NEURAL CORE (WEBGL2 / WEBGPU)",
  "MOUNTING D3.JS FORCE-DIRECTED SKILL PHYSICS",
  "LOADING MULTI-LAYER SYSTEM ARCHITECTURE STUDIO",
  "SYNCHRONIZING LIVE GITHUB CONTRIBUTION MATRIX",
  "PORTFOLIO TELEMETRY READY",
];

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1350;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tick = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));
      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timer = setTimeout(() => setVisible(false), 180);
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
            scale: 1.04,
            filter: "blur(12px)",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={() => setVisible(false)}
          className="preserve-dark fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#03060c]"
        >
          {/* Ambient radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_30%_75%,rgba(251,146,60,0.14),transparent_50%)]"
          />
          <div
            aria-hidden="true"
            className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-50"
          />

          <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
            {/* Dual Counter-Rotating Futuristic SVG Rings */}
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
                  stroke="rgba(56, 189, 248, 0.18)"
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
                  stroke="rgba(251, 146, 60, 0.35)"
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
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#fb923c" />
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
                <span className="bg-gradient-to-br from-white via-sky-200 to-cyan-400 bg-clip-text font-mono text-2xl font-extrabold tracking-tight text-transparent">
                  MS
                </span>
                <span className="font-mono text-[11px] font-semibold text-sky-400">
                  {progress}%
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Mohd Sufiyan · Systems Portfolio</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full border border-white/10 bg-slate-900/90 p-[1px]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-orange-400 shadow-[0_0_16px_#38bdf8] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Live Boot Step Readout */}
            <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-sky-300">
              <Cpu className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              <span>{BOOT_STEPS[stepIndex]}</span>
            </div>

            <span className="mt-5 font-mono text-[10px] text-slate-500">
              Click anywhere to enter immediately
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
