"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function smoothScrollTo(
  target: number | string | HTMLElement,
  offset = -84,
) {
  if (typeof window === "undefined") return;

  if (typeof target === "number") {
    const top = Math.max(0, target);
    if (activeLenis) {
      activeLenis.start();
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
    if (
      !el &&
      (trimmed.startsWith("#") ||
        trimmed.startsWith(".") ||
        trimmed.startsWith("["))
    ) {
      const found = document.querySelector(trimmed);
      if (found instanceof HTMLElement) el = found;
    }
  } else if (target instanceof HTMLElement) {
    el = target;
  }

  if (!el) return;

  if (activeLenis) {
    activeLenis.start();
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
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    if (!prefersReduced) {
      lenis = new Lenis({
        lerp: 0.085,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.35,
        autoRaf: true,
        anchors: false,
      });
      activeLenis = lenis;
    }

    // Intercept EVERY same-page anchor click (#id or /#id) in capture phase
    // before Next.js <Link> or native hash jump fights Lenis's internal scroll state.
    const onDocumentClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.dataset.navScroll === "true") return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || !rawHref.includes("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
      if (norm(url.pathname) !== norm(window.location.pathname)) return;

      const hashId = decodeURIComponent(url.hash.replace(/^#/, ""));
      if (!hashId) return;

      const destEl = document.getElementById(hashId);
      if (!destEl) return;

      e.preventDefault();
      smoothScrollTo(destEl, -88);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}#${encodeURIComponent(hashId)}`,
      );
    };

    const onHashChange = () => {
      const hashId = decodeURIComponent(
        window.location.hash.replace(/^#/, ""),
      );
      if (!hashId) return;
      const destEl = document.getElementById(hashId);
      if (destEl) {
        smoothScrollTo(destEl, -88);
      }
    };

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("hashchange", onHashChange);
      if (lenis) {
        if (activeLenis === lenis) {
          activeLenis = null;
        }
        lenis.destroy();
      }
    };
  }, []);

  // Sync Lenis cleanly after client-side route transitions (/resume, /projects/[slug], /#projects)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hashId = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (hashId) {
      const scrollToHash = () => {
        const destEl = document.getElementById(hashId);
        if (destEl) {
          smoothScrollTo(destEl, -88);
        }
      };
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(scrollToHash);
      });
      return () => cancelAnimationFrame(raf1);
    }

    if (activeLenis) {
      activeLenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
