"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function smoothScrollTo(target: number | string | HTMLElement, offset = -84) {
  if (typeof window === "undefined") return;

  if (typeof target === "number") {
    const top = Math.max(0, target);
    if (activeLenis) {
      activeLenis.scrollTo(top, { duration: 1.05, force: true });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
    return;
  }

  let el: HTMLElement | null = null;
  if (typeof target === "string") {
    const trimmed = target.trim();
    const id = trimmed.replace(/^#/, "");
    el = document.getElementById(id);
    if (!el && (trimmed.startsWith("#") || trimmed.startsWith(".") || trimmed.startsWith("["))) {
      const found = document.querySelector(trimmed);
      if (found instanceof HTMLElement) el = found;
    }
  } else if (target instanceof HTMLElement) {
    el = target;
  }

  if (!el) return;

  if (activeLenis) {
    activeLenis.scrollTo(el, { offset, duration: 1.15, force: true });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
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
