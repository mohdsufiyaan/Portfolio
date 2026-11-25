"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { profile } from "../app/data";
import { ThemeToggle } from "./ThemeToggle";
import { smoothScrollTo } from "./SmoothScroll";

const navItems = [
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Blueprints", href: "/#flagship-studio", id: "flagship-studio" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "GitHub", href: "/#github", id: "github" },
  { label: "Architecture", href: "/#architecture", id: "architecture" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const clickLockRef = useRef<{ id: string; until: number } | null>(null);
  const lockTimerRef = useRef<number | null>(null);

  const clearClickLock = useCallback(() => {
    clickLockRef.current = null;
    if (lockTimerRef.current !== null) {
      window.clearTimeout(lockTimerRef.current);
      lockTimerRef.current = null;
    }
  }, []);

  const syncActiveSection = useCallback(() => {
    setScrolled(window.scrollY > 24);

    if (pathname !== "/") {
      clearClickLock();
      setActiveId(
        pathname.startsWith("/projects")
          ? "projects"
          : pathname === "/resume"
            ? "resume"
            : "",
      );
      return;
    }

    // Hold clicked target during smooth scroll so intermediate sections don't flash active
    if (clickLockRef.current && performance.now() < clickLockRef.current.until) {
      return;
    }
    clickLockRef.current = null;

    const focalLine = Math.max(120, Math.min(window.innerHeight * 0.32, 260));
    let current = "";
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const { top, bottom } = el.getBoundingClientRect();
      if (top <= focalLine && bottom > focalLine) {
        current = item.id;
        break;
      }
    }

    setActiveId(current);
  }, [pathname, clearClickLock]);

  const lockActiveDuringScroll = useCallback(
    (id: string, durationMs = 1250) => {
      clearClickLock();
      clickLockRef.current = { id, until: performance.now() + durationMs };
      setActiveId(id);
      lockTimerRef.current = window.setTimeout(() => {
        clickLockRef.current = null;
        lockTimerRef.current = null;
        syncActiveSection();
      }, durationMs);
    },
    [clearClickLock, syncActiveSection],
  );

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        syncActiveSection();
        rafId = 0;
      });
    };

    const onUserScrollIntent = () => {
      if (clickLockRef.current) {
        clearClickLock();
        onScroll();
      }
    };

    syncActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("wheel", onUserScrollIntent, { passive: true });
    window.addEventListener("touchstart", onUserScrollIntent, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      clearClickLock();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onUserScrollIntent);
      window.removeEventListener("touchstart", onUserScrollIntent);
    };
  }, [syncActiveSection, clearClickLock]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavClick = (
    e: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    setMobileOpen(false);
    if (pathname !== "/") return;

    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    lockActiveDuringScroll(id);
    smoothScrollTo(target, -88);
    window.history.replaceState(null, "", `/#${id}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "glass-panel shadow-[0_14px_38px_-18px_rgba(2,6,23,0.45)]"
            : "site-header-bar"
        }`}
      >
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              lockActiveDuringScroll("", 1150);
              smoothScrollTo(0);
              window.history.replaceState(null, "", "/");
            }
          }}
          className="group flex items-center gap-3 focus-visible:rounded-lg"
          aria-label="Mohd Sufiyan Home"
        >
          <span className="btn-cool-primary flex h-9 w-9 items-center justify-center rounded-xl font-mono text-sm font-extrabold tracking-tight transition-transform duration-200 group-hover:scale-105">
            {profile.initials}
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white">
              {profile.name}
            </span>
            <span className="hidden whitespace-nowrap font-mono text-[11px] text-slate-400 min-[360px]:block">
              Senior Software Engineer
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 xl:flex"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                data-nav-scroll="true"
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-xl px-3 py-1.5 text-sm font-medium ${
                  isActive ? "nav-link-active" : "nav-link-idle"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle />
          <Link
            href="/resume"
            aria-current={activeId === "resume" ? "page" : undefined}
            className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold ${
              activeId === "resume" ? "btn-cool-primary" : "btn-cool-secondary"
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-sky-400" />
            Resume
          </Link>
          <Link
            href="/#contact"
            data-nav-scroll="true"
            onClick={(e) => handleNavClick(e, "contact")}
            className="btn-cool-primary inline-flex min-h-[38px] items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
          >
            Connect
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="btn-cool-secondary inline-flex h-10 w-10 items-center justify-center rounded-xl"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="glass-panel mx-auto mt-2 max-w-7xl rounded-2xl p-4 shadow-2xl xl:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="grid grid-cols-2 gap-2"
            >
              {navItems.map((item, idx) => {
                const isActive = activeId === item.id;
                const isLastOdd =
                  navItems.length % 2 === 1 && idx === navItems.length - 1;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    data-nav-scroll="true"
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold ${
                      isLastOdd ? "col-span-2 text-center" : ""
                    } ${isActive ? "nav-link-active" : "btn-cool-secondary"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.08] pt-3 sm:flex-row">
              <Link
                href="/resume"
                onClick={() => setMobileOpen(false)}
                className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${
                  activeId === "resume" ? "btn-cool-primary" : "btn-cool-secondary"
                }`}
              >
                <FileText className="h-4 w-4 text-sky-400" />
                Review Resume PDF
              </Link>
              <Link
                href="/#contact"
                data-nav-scroll="true"
                onClick={(e) => handleNavClick(e, "contact")}
                className="btn-cool-primary inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
              >
                Direct Contact
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
