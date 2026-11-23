"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function smoothScrollTo(target: number | string | HTMLElement, offset = -84) {
  if (typeof window === "undefined") return;

  if (activeLenis) {
    if (typeof target === "number") {
      activeLenis.scrollTo(target, { duration: 1.05 });
    } else {
      activeLenis.scrollTo(target, { offset, duration: 1.1 });
    }
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    return;
  }

  const el =
    typeof target === "string"
      ? document.getElementById(target.replace(/^#/, "")) ?? document.querySelector(target)
      : target;

  if (el instanceof HTMLElement) {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }
}

export function setSmoothScrollLocked(locked: boolean) {
  if (!activeLenis) return;
  if (locked) {
    activeLenis.stop();
  } else {
    activeLenis.start();
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.35,
      autoRaf: true,
      anchors: false,
    });

    activeLenis = lenis;

    return () => {
      if (activeLenis === lenis) {
        activeLenis = null;
      }
      lenis.destroy();
    };
  }, []);

  return null;
}
