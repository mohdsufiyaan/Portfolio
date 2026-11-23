"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  Check,
  Command,
  Copy,
  Download,
  Eye,
  FolderKanban,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { profile, projects } from "../app/data";
import { useTheme } from "./ThemeProvider";
import { useResumeModal } from "./ResumeModalProvider";
import { setSmoothScrollLocked, smoothScrollTo } from "./SmoothScroll";

interface CommandItem {
  id: string;
  label: string;
  group: "Sections" | "Case Studies" | "Quick Actions";
  hint: string;
  run: () => void;
}

export function QuickDock() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { openResume } = useResumeModal();

  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 380);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSmoothScrollLocked(open);
    return () => setSmoothScrollLocked(false);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const jumpToSection = (id: string) => {
    setOpen(false);
    setQuery("");
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        smoothScrollTo(el, -88);
        window.history.replaceState(null, "", `/#${id}`);
        return;
      }
    }
    router.push(`/#${id}`);
  };

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedToast(`${label} copied`);
      setTimeout(() => setCopiedToast(null), 2000);
    } catch {
      /* noop */
    }
    setOpen(false);
    setQuery("");
  };

  const commands = useMemo<CommandItem[]>(() => {
    const sections: CommandItem[] = [
      { id: "s-skills", label: "Highlighted Skills & D3 Physics Graph", group: "Sections", hint: "#skills", run: () => jumpToSection("skills") },
      { id: "s-about", label: "About & Engineering Philosophy", group: "Sections", hint: "#about", run: () => jumpToSection("about") },
      { id: "s-studio", label: "Flagship D3.js Architecture Studio", group: "Sections", hint: "#flagship-studio", run: () => jumpToSection("flagship-studio") },
      { id: "s-projects", label: "Featured Projects & Case Studies", group: "Sections", hint: "#projects", run: () => jumpToSection("projects") },
      { id: "s-exp", label: "Professional Experience Timeline", group: "Sections", hint: "#experience", run: () => jumpToSection("experience") },
      { id: "s-github", label: "Live GitHub Contribution Matrix", group: "Sections", hint: "#github", run: () => jumpToSection("github") },
      { id: "s-arch", label: "System Architecture & Engineering Q&A", group: "Sections", hint: "#architecture", run: () => jumpToSection("architecture") },
      { id: "s-contact", label: "Direct Contact Hub", group: "Sections", hint: "#contact", run: () => jumpToSection("contact") },
    ];

    const caseStudies: CommandItem[] = projects.map((p) => ({
      id: `p-${p.slug}`,
      label: p.shortName,
      group: "Case Studies",
      hint: p.category,
      run: () => {
        setOpen(false);
        setQuery("");
        router.push(`/projects/${p.slug}`);
      },
    }));

    const actions: CommandItem[] = [
      {
        id: "a-resume-preview",
        label: "Preview Resume PDF (In-App Viewer)",
        group: "Quick Actions",
        hint: "Preview",
        run: () => {
          setOpen(false);
          setQuery("");
          openResume();
        },
      },
      {
        id: "a-theme",
        label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        group: "Quick Actions",
        hint: "Theme",
        run: () => {
          toggleTheme();
          setOpen(false);
        },
      },
      {
        id: "a-email",
        label: `Copy Email (${profile.email})`,
        group: "Quick Actions",
        hint: "Clipboard",
        run: () => void copyText(profile.email, "Email"),
      },
      {
        id: "a-phone",
        label: `Copy Phone (${profile.phone})`,
        group: "Quick Actions",
        hint: "Clipboard",
        run: () => void copyText(profile.phone, "Phone"),
      },
      {
        id: "a-resume",
        label: "Download Latest Resume (PDF)",
        group: "Quick Actions",
        hint: "Download",
        run: () => {
          setOpen(false);
          const a = document.createElement("a");
          a.href = profile.resumePath;
          a.download = "Mohd_Sufiyan_Resume.pdf";
          a.click();
        },
      },
    ];

    return [...actions, ...sections, ...caseStudies];
  }, [openResume, pathname, router, theme, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  return (
    <>
      {/* Copied Toast */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="btn-cool-primary fixed bottom-20 right-5 z-50 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-semibold shadow-xl"
          >
            <Check className="h-3.5 w-3.5" />
            {copiedToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom-Right Control Dock */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={openResume}
          aria-label="Open in-app Resume PDF preview"
          className="btn-cool-secondary inline-flex h-11 items-center gap-2 rounded-2xl px-3.5 font-mono text-xs font-semibold shadow-lg"
        >
          <Eye className="h-3.5 w-3.5 text-sky-400" />
          <span className="hidden md:inline">Resume</span>
        </button>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open quick navigation command palette (Ctrl+K)"
          className="btn-cool-secondary inline-flex h-11 items-center gap-2 rounded-2xl px-3.5 font-mono text-xs font-semibold shadow-lg"
        >
          <Command className="h-3.5 w-3.5 text-sky-400" />
          <span className="hidden sm:inline">Quick Jump</span>
          <kbd className="chip-neutral rounded-md px-1.5 py-0.5 text-[10px]">
            Ctrl K
          </kbd>
        </button>

        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.18 }}
              onClick={() => smoothScrollTo(0)}
              aria-label="Scroll smoothly back to top"
              className="btn-cool-primary inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/65 px-4 pt-[12vh] backdrop-blur-md"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio command palette"
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/[0.1] px-4 py-3.5">
                <Search className="h-4 w-4 shrink-0 text-sky-400" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to skills, resume preview, D3 blueprints, or projects..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close command palette"
                  className="btn-cool-secondary inline-flex h-8 w-8 items-center justify-center rounded-lg"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div data-lenis-prevent className="max-h-[55vh] overflow-y-auto p-3">
                {filtered.length === 0 ? (
                  <div className="py-10 text-center font-mono text-xs text-slate-400">
                    No matching sections or case studies.
                  </div>
                ) : (
                  (["Quick Actions", "Sections", "Case Studies"] as const).map(
                    (group) => {
                      const items = filtered.filter((i) => i.group === group);
                      if (items.length === 0) return null;
                      return (
                        <div key={group} className="mb-3 last:mb-0">
                          <div className="px-2.5 pb-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                            {group}
                          </div>
                          <div className="space-y-1">
                            {items.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={item.run}
                                className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 transition hover:bg-sky-500/15 hover:text-white"
                              >
                                <span className="flex items-center gap-2.5">
                                  {item.id === "a-theme" ? (
                                    theme === "dark" ? (
                                      <Sun className="h-4 w-4 text-amber-400" />
                                    ) : (
                                      <Moon className="h-4 w-4 text-sky-600" />
                                    )
                                  ) : item.id === "a-resume-preview" ? (
                                    <Eye className="h-4 w-4 text-sky-400" />
                                  ) : item.id === "a-resume" ? (
                                    <Download className="h-4 w-4 text-sky-400" />
                                  ) : item.id.startsWith("a-") ? (
                                    <Copy className="h-4 w-4 text-emerald-400" />
                                  ) : item.group === "Case Studies" ? (
                                    <FolderKanban className="h-4 w-4 text-sky-400" />
                                  ) : (
                                    <Sparkles className="h-4 w-4 text-sky-400" />
                                  )}
                                  <span className="font-medium">
                                    {item.label}
                                  </span>
                                </span>
                                <span className="font-mono text-xs text-slate-400">
                                  {item.hint}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    },
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
