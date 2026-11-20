"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { profile } from "../app/data";
import { ThemeToggle } from "./ThemeToggle";

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

  // Deterministic, high-precision rAF scroll-spy that works reliably on tall & short sections
  const syncActiveSection = useCallback(() => {
    setScrolled(window.scrollY > 24);

    if (pathname !== "/") {
      setActiveId(pathname.startsWith("/projects") ? "projects" : "");
      return;
    }

    const scrollPos = window.scrollY + 150;
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 60;

    if (window.scrollY < 160) {
      setActiveId("");
      return;
    }

    let current = "";
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (scrollPos >= top) {
        current = item.id;
      }
    }

    if (atBottom) {
      current = navItems[navItems.length - 1].id;
    }

    setActiveId(current);
  }, [pathname]);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        syncActiveSection();
        rafId = 0;
      });
    };

    syncActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [syncActiveSection]);

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
    setActiveId(id);

    const top = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    window.history.replaceState(null, "", `/#${id}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "glass-panel shadow-[0_12px_40px_-15px_rgba(0,0,0,0.65)]"
            : "border border-white/[0.08] bg-[#070b14]/75 backdrop-blur-md"
        }`}
      >
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              setActiveId("");
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.replaceState(null, "", "/");
            }
          }}
          className="group flex items-center gap-3 focus-visible:rounded-lg"
          aria-label="Mohd Sufiyan Home"
        >
          <span className="btn-cool-primary preserve-dark flex h-9 w-9 items-center justify-center rounded-xl font-mono text-sm font-extrabold tracking-tight transition-transform duration-200 group-hover:scale-105">
            {profile.initials}
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              {profile.name}
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              Senior Software Engineer
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-xl px-3 py-1.5 text-sm font-medium ${
                  isActive
                    ? "nav-link-active preserve-dark"
                    : "nav-link-idle"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <a
            href={profile.resumePath}
            download
            className="btn-cool-secondary inline-flex min-h-[38px] items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
          >
            <Download className="h-3.5 w-3.5 text-sky-400" />
            Resume
          </a>
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="btn-cool-primary preserve-dark inline-flex min-h-[38px] items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
          >
            Connect
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
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
            className="glass-panel mx-auto mt-2 max-w-7xl rounded-2xl p-4 shadow-2xl lg:hidden"
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
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold ${
                      isLastOdd ? "col-span-2 text-center" : ""
                    } ${
                      isActive
                        ? "nav-link-active preserve-dark"
                        : "btn-cool-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.08] pt-3 sm:flex-row">
              <a
                href={profile.resumePath}
                download
                onClick={() => setMobileOpen(false)}
                className="btn-cool-secondary inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
              >
                <Download className="h-4 w-4 text-sky-400" />
                Download Resume
              </a>
              <Link
                href="/#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="btn-cool-primary preserve-dark inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
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
