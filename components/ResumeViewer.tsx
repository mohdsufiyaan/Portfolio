"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Layers,
  Loader2,
  Mail,
  Maximize2,
  Minimize2,
  Moon,
  PanelLeft,
  Phone,
  Printer,
  RotateCw,
  Search,
  Sparkles,
  Sun,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { heroMetrics, profile } from "../app/data";
import { useTheme } from "./ThemeProvider";

interface ResumeViewerProps {
  onClose?: () => void;
  embedded?: boolean;
}

const QUICK_SEARCH_TERMS = ["Laravel", "Node.js", "RAG", "Redis", "AWS", "Next.js"];

function PdfPageCanvas({
  pdfDoc,
  pageNumber,
  scale,
  rotation,
  nightPaper,
  highlightMatch,
}: {
  pdfDoc: PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  rotation: number;
  nightPaper: boolean;
  highlightMatch: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    async function render() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      setRendering(true);
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (cancelled) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale, rotation });
        const outputViewport = page.getViewport({
          scale: scale * dpr,
          rotation,
        });

        canvas.width = Math.floor(outputViewport.width);
        canvas.height = Math.floor(outputViewport.height);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        renderTask = page.render({
          canvas,
          canvasContext: ctx,
          viewport: outputViewport,
        });
        await renderTask.promise;
        if (!cancelled) setRendering(false);
      } catch {
        /* ignore canceled render tasks during rapid zoom */
      }
    }

    void render();

    return () => {
      cancelled = true;
      try {
        renderTask?.cancel();
      } catch {
        /* ignore */
      }
    };
  }, [pdfDoc, pageNumber, scale, rotation]);

  return (
    <div
      className={`relative mx-auto w-fit overflow-hidden rounded-2xl border transition-all ${
        highlightMatch
          ? "border-sky-400 ring-2 ring-sky-400/40"
          : "border-slate-300/60 dark:border-white/15"
      } shadow-[0_24px_60px_-24px_rgba(2,6,23,0.45)]`}
    >
      <canvas
        ref={canvasRef}
        className={`block bg-white transition-[filter] duration-200 ${
          nightPaper ? "invert-[0.88] hue-rotate-180 contrast-[0.94]" : ""
        }`}
      />
      {rendering && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-[1px]">
          <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
        </div>
      )}
    </div>
  );
}

function PdfThumbnail({
  pdfDoc,
  pageNumber,
  active,
  matchCount,
  onSelect,
}: {
  pdfDoc: PDFDocumentProxy;
  pageNumber: number;
  active: boolean;
  matchCount: number;
  onSelect: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function renderThumb() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (cancelled) return;
        const vp = page.getViewport({ scale: 0.24 });
        canvas.width = Math.floor(vp.width);
        canvas.height = Math.floor(vp.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        await page.render({ canvas, canvasContext: ctx, viewport: vp }).promise;
      } catch {
        /* ignore */
      }
    }
    void renderThumb();
    return () => {
      cancelled = true;
    };
  }, [pdfDoc, pageNumber]);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full flex-col items-center rounded-xl border p-2 transition ${
        active
          ? "border-sky-500 bg-sky-500/15 ring-1 ring-sky-500/40"
          : "surface-subcard"
      }`}
    >
      <div className="relative overflow-hidden rounded-lg border border-slate-300/50 bg-white shadow-sm">
        <canvas ref={canvasRef} className="block max-w-full" />
        {matchCount > 0 && (
          <span className="absolute right-1 top-1 rounded-full bg-sky-500 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white shadow">
            {matchCount}
          </span>
        )}
      </div>
      <span className="mt-1.5 font-mono text-[11px] font-semibold text-slate-300">
        Page {pageNumber}
      </span>
    </button>
  );
}

export function ResumeViewer({ onClose, embedded = false }: ResumeViewerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fallbackMode, setFallbackMode] = useState(false);

  const [scale, setScale] = useState(1.15);
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState<"continuous" | "single">("continuous");
  const [showSidebar, setShowSidebar] = useState(true);
  const [nightPaper, setNightPaper] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [pageTexts, setPageTexts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Load PDF via pdfjs-dist and extract searchable plain text
  useEffect(() => {
    let mounted = true;
    let loadingTask: { promise: Promise<PDFDocumentProxy>; destroy: () => Promise<void> } | null = null;

    async function loadPdf() {
      setLoading(true);
      setFallbackMode(false);
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        loadingTask = pdfjs.getDocument({ url: profile.resumePath });
        const doc = await loadingTask.promise;
        if (!mounted) {
          void loadingTask.destroy();
          return;
        }
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);

        // Compute optimal initial fit-to-width scale
        const firstPage = await doc.getPage(1);
        const baseViewport = firstPage.getViewport({ scale: 1 });
        const stageWidth = stageRef.current?.clientWidth ?? 860;
        const targetW = Math.min(Math.max(stageWidth - 64, 300), 860);
        const fitScale = Math.max(0.65, Math.min(1.5, targetW / baseViewport.width));
        if (mounted) {
          setScale(Number(fitScale.toFixed(2)));
          setLoading(false);
        }

        // Extract text across all pages for instant in-PDF search & copy
        const extracted: string[] = [];
        for (let p = 1; p <= doc.numPages; p++) {
          const pg = await doc.getPage(p);
          const content = await pg.getTextContent();
          const text = content.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ");
          extracted.push(text);
        }
        if (mounted) setPageTexts(extracted);
      } catch {
        if (mounted) {
          setFallbackMode(true);
          setLoading(false);
        }
      }
    }

    void loadPdf();
    return () => {
      mounted = false;
      if (loadingTask) {
        void loadingTask.destroy();
      }
    };
  }, []);

  // Collapse sidebar by default on small screens
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  }, []);

  const fitToWidth = useCallback(async () => {
    if (!pdfDoc || !stageRef.current) return;
    try {
      const page = await pdfDoc.getPage(currentPage);
      const vp = page.getViewport({ scale: 1, rotation });
      const avail = Math.max(stageRef.current.clientWidth - 56, 280);
      setScale(Number(Math.max(0.55, Math.min(2.2, avail / vp.width)).toFixed(2)));
    } catch {
      /* ignore */
    }
  }, [pdfDoc, currentPage, rotation]);

  const fitToPage = useCallback(async () => {
    if (!pdfDoc || !stageRef.current) return;
    try {
      const page = await pdfDoc.getPage(currentPage);
      const vp = page.getViewport({ scale: 1, rotation });
      const availW = Math.max(stageRef.current.clientWidth - 56, 280);
      const availH = Math.max(stageRef.current.clientHeight - 48, 360);
      const ratio = Math.min(availW / vp.width, availH / vp.height);
      setScale(Number(Math.max(0.5, Math.min(2.0, ratio)).toFixed(2)));
    } catch {
      /* ignore */
    }
  }, [pdfDoc, currentPage, rotation]);

  const goToPage = useCallback(
    (pageNum: number) => {
      const clamped = Math.max(1, Math.min(numPages || 1, pageNum));
      setCurrentPage(clamped);
      if (viewMode === "continuous") {
        pageRefs.current[clamped]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [numPages, viewMode],
  );

  // Search matches per page
  const pageMatchCounts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pageTexts.map(() => 0);
    return pageTexts.map((txt) => {
      const lower = txt.toLowerCase();
      let count = 0;
      let idx = lower.indexOf(q);
      while (idx !== -1) {
        count++;
        idx = lower.indexOf(q, idx + q.length);
      }
      return count;
    });
  }, [pageTexts, searchQuery]);

  const totalMatches = useMemo(
    () => pageMatchCounts.reduce((acc, n) => acc + n, 0),
    [pageMatchCounts],
  );

  // Auto-jump to first page with search match
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const firstMatchIdx = pageMatchCounts.findIndex((c) => c > 0);
    if (firstMatchIdx !== -1) {
      goToPage(firstMatchIdx + 1);
    }
  }, [searchQuery, pageMatchCounts, goToPage]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inInput = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
        return;
      }

      if (e.key === "Escape" && onClose && !inInput) {
        onClose();
        return;
      }

      if (inInput) return;

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setScale((s) => Number(Math.min(2.4, s + 0.15).toFixed(2)));
      } else if (e.key === "-") {
        e.preventDefault();
        setScale((s) => Number(Math.max(0.55, s - 0.15).toFixed(2)));
      } else if (e.key === "0") {
        e.preventDefault();
        void fitToWidth();
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        if (viewMode === "single") {
          e.preventDefault();
          goToPage(currentPage + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (viewMode === "single") {
          e.preventDefault();
          goToPage(currentPage - 1);
        }
      } else if (e.key.toLowerCase() === "r") {
        setRotation((r) => (r + 90) % 360);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPage, fitToWidth, goToPage, onClose, viewMode]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = async () => {
    const el = rootRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore browser restrictions */
    }
  };

  const handlePrint = () => {
    const win = window.open(profile.resumePath, "_blank", "noopener,noreferrer");
    if (win) {
      win.addEventListener("load", () => {
        try {
          win.print();
        } catch {
          /* ignore */
        }
      });
    }
  };

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedState(label);
      setTimeout(() => setCopiedState((cur) => (cur === label ? null : cur)), 2000);
    } catch {
      /* ignore */
    }
  };

  const pagesToRender = useMemo(() => {
    if (!numPages) return [];
    if (viewMode === "single") return [currentPage];
    return Array.from({ length: numPages }, (_, i) => i + 1);
  }, [numPages, viewMode, currentPage]);

  return (
    <div
      ref={rootRef}
      className={`glass-panel flex w-full flex-col overflow-hidden ${
        embedded
          ? "min-h-[82vh] rounded-3xl"
          : "h-[92vh] max-h-[960px] max-w-[1340px] rounded-3xl shadow-2xl"
      }`}
    >
      {/* Top Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.1] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="btn-cool-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
            <FileText className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white sm:text-base">
                {profile.name} — Resume PDF
              </h2>
              <span className="chip-emerald hidden rounded-full px-2 py-0.5 font-mono text-[11px] font-medium sm:inline-flex">
                In-App Preview
              </span>
            </div>
            <p className="font-mono text-xs text-slate-400">
              {profile.role} · {profile.experienceYears} Years ·{" "}
              {numPages > 0 ? `${numPages} Page${numPages > 1 ? "s" : ""}` : "Loading PDF"}
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              void copyToClipboard(
                pageTexts.join("\n\n").trim() || `${profile.name} — ${profile.summary}`,
                "resume-text",
              )
            }
            className="btn-cool-ghost inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold"
            title="Copy full resume text"
          >
            {copiedState === "resume-text" ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Copied Text
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Copy Text</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="btn-cool-ghost inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold"
            title="Print resume"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Print</span>
          </button>

          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cool-ghost inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold"
            title="Open raw PDF in new tab"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">New Tab</span>
          </a>

          <a
            href={profile.resumePath}
            download="Mohd_Sufiyan_Resume.pdf"
            className="btn-cool-primary inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </a>

          <button
            type="button"
            onClick={() => void toggleFullscreen()}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="btn-cool-ghost hidden h-9 w-9 items-center justify-center rounded-xl sm:inline-flex"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="btn-cool-secondary inline-flex h-9 w-9 items-center justify-center rounded-xl"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Rich Feature Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/[0.08] px-4 py-2.5 sm:px-6">
        {/* Left: Sidebar, Page Nav & View Mode */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowSidebar((v) => !v)}
            className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold ${
              showSidebar ? "btn-cool-primary" : "btn-cool-ghost"
            }`}
            title="Toggle thumbnails & quick info rail"
          >
            <PanelLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Outline</span>
          </button>

          {!fallbackMode && numPages > 0 && (
            <>
              <div className="mx-1 hidden h-4 w-px bg-slate-500/30 sm:block" />
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Previous page"
                className="btn-cool-ghost inline-flex h-8 w-8 items-center justify-center rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-1.5 font-mono text-xs font-semibold text-slate-200">
                {currentPage} / {numPages}
              </span>
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= numPages}
                aria-label="Next page"
                className="btn-cool-ghost inline-flex h-8 w-8 items-center justify-center rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setViewMode((m) => (m === "continuous" ? "single" : "continuous"))
                }
                className="btn-cool-ghost inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 font-mono text-[11px] font-semibold"
                title="Switch continuous scroll or single page mode"
              >
                <Layers className="h-3.5 w-3.5" />
                {viewMode === "continuous" ? "Scroll" : "Single"}
              </button>
            </>
          )}
        </div>

        {/* Center: Zoom, Fit, Rotate, Night Paper */}
        {!fallbackMode && (
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setScale((s) => Number(Math.max(0.55, s - 0.15).toFixed(2)))}
              aria-label="Zoom out"
              className="btn-cool-ghost inline-flex h-8 w-8 items-center justify-center rounded-lg"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[46px] text-center font-mono text-xs font-semibold text-slate-200">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setScale((s) => Number(Math.min(2.4, s + 0.15).toFixed(2)))}
              aria-label="Zoom in"
              className="btn-cool-ghost inline-flex h-8 w-8 items-center justify-center rounded-lg"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => void fitToWidth()}
              className="btn-cool-ghost hidden h-8 items-center rounded-lg px-2.5 font-mono text-[11px] font-semibold sm:inline-flex"
            >
              Fit Width
            </button>
            <button
              type="button"
              onClick={() => void fitToPage()}
              className="btn-cool-ghost hidden h-8 items-center rounded-lg px-2.5 font-mono text-[11px] font-semibold md:inline-flex"
            >
              Fit Page
            </button>

            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              aria-label="Rotate page 90 degrees"
              title="Rotate 90° (R)"
              className="btn-cool-ghost inline-flex h-8 w-8 items-center justify-center rounded-lg"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setNightPaper((n) => !n)}
              aria-label={nightPaper ? "Standard paper view" : "Night reading paper filter"}
              title={nightPaper ? "Standard Paper" : "Night Reading Mode"}
              className={`inline-flex h-8 items-center gap-1 rounded-lg px-2.5 font-mono text-[11px] font-semibold ${
                nightPaper ? "btn-cool-primary" : "btn-cool-ghost"
              }`}
            >
              {nightPaper ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              <span className="hidden lg:inline">{nightPaper ? "Paper" : "Night"}</span>
            </button>
          </div>
        )}

        {/* Right: In-PDF Instant Keyword Search */}
        {!fallbackMode && (
          <div className="flex items-center gap-1.5">
            <div className="surface-subcard flex h-8 items-center gap-1.5 rounded-lg px-2.5">
              <Search className="h-3.5 w-3.5 shrink-0 text-sky-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resume (Ctrl+F)..."
                className="w-36 bg-transparent text-xs text-white placeholder:text-slate-400 focus:outline-none sm:w-44"
              />
              {searchQuery && (
                <>
                  <span className="font-mono text-[11px] font-semibold text-sky-400">
                    {totalMatches}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Split Workspace: Left Thumbnails + Quick Info | Center PDF Stage */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {showSidebar && (
          <aside
            data-lenis-prevent
            className="flex w-64 shrink-0 flex-col gap-5 overflow-y-auto border-r border-white/[0.08] p-4"
          >
            {/* Quick Keyword Jump Chips */}
            {!fallbackMode && (
              <div>
                <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                  Quick Keyword Check
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SEARCH_TERMS.map((term) => {
                    const active =
                      searchQuery.toLowerCase() === term.toLowerCase();
                    return (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(active ? "" : term)}
                        className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-medium transition ${
                          active ? "btn-cool-primary" : "btn-cool-ghost"
                        }`}
                      >
                        {term}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Page Thumbnails */}
            {pdfDoc && numPages > 0 && (
              <div>
                <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Pages ({numPages})
                </div>
                <div className="space-y-2.5">
                  {Array.from({ length: numPages }, (_, idx) => idx + 1).map(
                    (pg) => (
                      <PdfThumbnail
                        key={pg}
                        pdfDoc={pdfDoc}
                        pageNumber={pg}
                        active={currentPage === pg}
                        matchCount={pageMatchCounts[pg - 1] ?? 0}
                        onSelect={() => goToPage(pg)}
                      />
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Quick Recruiter Contact & Highlights */}
            <div className="space-y-2 border-t border-white/[0.08] pt-4">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Quick Contact
              </div>
              <button
                type="button"
                onClick={() => void copyToClipboard(profile.email, "email")}
                className="surface-subcard flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs text-slate-200"
              >
                <span className="flex items-center gap-2 truncate">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                  <span className="truncate">{profile.email}</span>
                </span>
                {copiedState === "email" ? (
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                )}
              </button>
              <button
                type="button"
                onClick={() => void copyToClipboard(profile.phone, "phone")}
                className="surface-subcard flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs text-slate-200"
              >
                <span className="flex items-center gap-2 truncate">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span className="truncate">{profile.phone}</span>
                </span>
                {copiedState === "phone" ? (
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                )}
              </button>

              <div className="grid grid-cols-2 gap-1.5 pt-2">
                {heroMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="surface-subcard rounded-xl p-2 text-center"
                  >
                    <div className="font-mono text-xs font-bold text-white">
                      {m.value}
                    </div>
                    <div className="mt-0.5 truncate text-[10px] text-slate-400">
                      {m.label.split(" ").slice(0, 2).join(" ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* PDF Canvas Viewport */}
        <div
          ref={stageRef}
          data-lenis-prevent
          className={`relative flex-1 overflow-auto p-4 sm:p-6 ${
            isDark ? "bg-[#04070f]" : "bg-slate-200/75"
          }`}
        >
          {loading ? (
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
              <p className="font-mono text-xs text-slate-400">
                Rendering high-resolution resume preview...
              </p>
            </div>
          ) : fallbackMode || !pdfDoc ? (
            <iframe
              src={`${profile.resumePath}#view=FitH`}
              title={`${profile.name} Resume PDF`}
              className="h-full min-h-[640px] w-full rounded-2xl border border-white/10 bg-white"
            />
          ) : (
            <div className="space-y-6 pb-8">
              {pagesToRender.map((pg) => (
                <div
                  key={pg}
                  ref={(el) => {
                    pageRefs.current[pg] = el;
                  }}
                  onMouseEnter={() => setCurrentPage(pg)}
                  className="scroll-mt-4"
                >
                  <PdfPageCanvas
                    pdfDoc={pdfDoc}
                    pageNumber={pg}
                    scale={scale}
                    rotation={rotation}
                    nightPaper={nightPaper}
                    highlightMatch={(pageMatchCounts[pg - 1] ?? 0) > 0}
                  />
                  <div className="mt-2 flex items-center justify-center gap-2 font-mono text-[11px] text-slate-400">
                    <span>
                      Page {pg} of {numPages}
                    </span>
                    {(pageMatchCounts[pg - 1] ?? 0) > 0 && (
                      <span className="chip-accent rounded-full px-2 py-0.5 text-[10px] font-semibold">
                        {pageMatchCounts[pg - 1]} match
                        {pageMatchCounts[pg - 1] === 1 ? "" : "es"} for &ldquo;
                        {searchQuery}&rdquo;
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Keyboard Shortcuts Hint */}
      <div className="hidden items-center justify-between border-t border-white/[0.08] px-6 py-2 font-mono text-[11px] text-slate-400 sm:flex">
        <span className="inline-flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5 text-sky-400" />
          Shortcuts: <kbd className="chip-neutral rounded px-1.5 py-0.5">+</kbd> /{" "}
          <kbd className="chip-neutral rounded px-1.5 py-0.5">-</kbd> Zoom ·{" "}
          <kbd className="chip-neutral rounded px-1.5 py-0.5">0</kbd> Fit Width ·{" "}
          <kbd className="chip-neutral rounded px-1.5 py-0.5">R</kbd> Rotate ·{" "}
          <kbd className="chip-neutral rounded px-1.5 py-0.5">Ctrl+F</kbd> Search
        </span>
        <span>Mohd_Sufiyan_Resume.pdf</span>
      </div>
    </div>
  );
}
