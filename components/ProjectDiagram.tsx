"use client";

import type { Project } from "../app/data";
import { useTheme } from "./ThemeProvider";

interface ProjectDiagramProps {
  type: Project["diagramType"];
  compact?: boolean;
}

export function ProjectDiagram({ type, compact = false }: ProjectDiagramProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const heightClass = compact ? "h-40" : "h-56 sm:h-64";

  const shell = isDark
    ? "border-white/[0.1] bg-[#060c18]"
    : "border-slate-200/90 bg-slate-50/95";

  const nodeFill = isDark ? "#0c1528" : "#ffffff";
  const nodeFillCore = isDark ? "#0e1b33" : "#f0f9ff";
  const nodeFillAmber = isDark ? "#18120c" : "#fffbeb";
  const nodeFillEmerald = isDark ? "#091a16" : "#ecfdf5";
  const nodeFillViolet = isDark ? "#131029" : "#f5f3ff";
  const pillFill = isDark ? "#082f49" : "#e0f2fe";
  const pillFillEmerald = isDark ? "#052e2b" : "#d1fae5";

  const inkTitle = isDark ? "#ffffff" : "#0f172a";
  const inkSub = isDark ? "#94a3b8" : "#475569";
  const sky = isDark ? "#38bdf8" : "#0284c7";
  const skyLabel = isDark ? "#7dd3fc" : "#0369a1";
  const cyan = isDark ? "#22d3ee" : "#0891b2";
  const cyanLabel = isDark ? "#67e8f9" : "#0e7490";
  const emerald = isDark ? "#34d399" : "#059669";
  const emeraldLabel = isDark ? "#6ee7b7" : "#047857";
  const amber = isDark ? "#fb923c" : "#d97706";
  const amberLabel = isDark ? "#fdba74" : "#b45309";
  const violet = isDark ? "#a78bfa" : "#7c3aed";
  const violetLabel = isDark ? "#c4b5fd" : "#6d28d9";

  // Shown only when the diagram is wider than its card
  const swipeHint = `pointer-events-none absolute bottom-1.5 right-3 z-20 font-mono text-[10px] @min-[460px]:hidden ${
    isDark ? "text-slate-400" : "text-slate-600"
  }`;

  switch (type) {
    case "ai-ops":
      return (
        <div
          className={`@container relative ${heightClass} w-full overflow-hidden rounded-2xl border p-4 ${shell}`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-35" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-sky-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 left-8 h-32 w-32 rounded-full bg-amber-500/12 blur-3xl" />

          <div className="relative z-10 h-full w-full overflow-x-auto overflow-y-hidden">
          <svg
            viewBox="0 0 560 220"
            className="h-full w-full min-w-[460px]"
            role="img"
            aria-label="Enterprise AI Operations architecture: Autonomous Agent connected to Hybrid RAG and Multi-LLM Failover Gateway"
          >
            <path d="M128 110 H195" stroke={sky} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M335 84 C365 84 370 52 400 52" fill="none" stroke={cyan} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M335 110 H400" stroke={amber} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M335 136 C365 136 370 168 400 168" fill="none" stroke={emerald} strokeWidth="1.8" className="animate-signal-dash" />

            <rect x="16" y="76" width="112" height="68" rx="12" fill={nodeFill} stroke={sky} strokeOpacity="0.5" />
            <text x="72" y="102" textAnchor="middle" fill={skyLabel} fontSize="10" fontFamily="monospace">ZTD RBAC</text>
            <text x="72" y="120" textAnchor="middle" fill={inkTitle} fontSize="12" fontWeight="600">Agent Request</text>
            <text x="72" y="135" textAnchor="middle" fill={inkSub} fontSize="9" fontFamily="monospace">SSE · OTP 2FA</text>

            <rect x="195" y="54" width="140" height="112" rx="14" fill={nodeFillCore} stroke={sky} strokeWidth="1.5" />
            <circle cx="212" cy="72" r="4" fill={emerald} />
            <text x="223" y="75" fill={inkSub} fontSize="9" fontFamily="monospace">LARAVEL AI SDK</text>
            <text x="265" y="102" textAnchor="middle" fill={inkTitle} fontSize="14" fontWeight="700">39-Tool Agent</text>
            <text x="265" y="121" textAnchor="middle" fill={sky} fontSize="10" fontFamily="monospace">19 Skills · ≤6 Steps</text>
            <rect x="210" y="134" width="110" height="20" rx="6" fill={pillFill} />
            <text x="265" y="147" textAnchor="middle" fill={skyLabel} fontSize="9" fontFamily="monospace">-30–50% Tokens</text>

            <rect x="400" y="24" width="144" height="54" rx="11" fill={nodeFill} stroke={cyan} strokeOpacity="0.5" />
            <text x="472" y="46" textAnchor="middle" fill={cyanLabel} fontSize="11" fontWeight="600">Hybrid RAG (RRF)</text>
            <text x="472" y="63" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Pinecone 1024d + MySQL</text>

            <rect x="400" y="85" width="144" height="50" rx="11" fill={nodeFillAmber} stroke={amber} strokeOpacity="0.55" />
            <text x="472" y="106" textAnchor="middle" fill={amberLabel} fontSize="11" fontWeight="600">LLM Circuit Breaker</text>
            <text x="472" y="122" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Groq → Gemini → OpenRouter</text>

            <rect x="400" y="143" width="144" height="52" rx="11" fill={nodeFillEmerald} stroke={emerald} strokeOpacity="0.5" />
            <text x="472" y="164" textAnchor="middle" fill={emeraldLabel} fontSize="11" fontWeight="600">MS365 &amp; Workspace</text>
            <text x="472" y="180" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">AES-256 · 24h Undo · EOD</text>
          </svg>
          </div>
          <span aria-hidden="true" className={swipeHint}>
            Swipe →
          </span>
        </div>
      );

    case "realtime":
      return (
        <div
          className={`@container relative ${heightClass} w-full overflow-hidden rounded-2xl border p-4 ${shell}`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-35" />
          <div className="pointer-events-none absolute -left-10 top-6 h-36 w-36 rounded-full bg-emerald-500/14 blur-3xl" />
          <div className="pointer-events-none absolute bottom-2 right-6 h-32 w-32 rounded-full bg-cyan-500/14 blur-3xl" />

          <div className="relative z-10 h-full w-full overflow-x-auto overflow-y-hidden">
          <svg
            viewBox="0 0 560 220"
            className="h-full w-full min-w-[460px]"
            role="img"
            aria-label="Real-time booking architecture with Express 5 API, Socket.IO Redis Adapter, BullMQ queues, PostgreSQL, and AWS S3"
          >
            <path d="M138 66 L205 98" stroke={emerald} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M138 154 L205 122" stroke={sky} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M345 96 L405 56" stroke={cyan} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M345 110 H405" stroke={amber} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M345 124 L405 164" stroke={emerald} strokeWidth="1.8" className="animate-signal-dash" />

            <rect x="18" y="34" width="120" height="58" rx="12" fill={nodeFill} stroke={emerald} strokeOpacity="0.5" />
            <text x="78" y="59" textAnchor="middle" fill={emeraldLabel} fontSize="11.5" fontWeight="600">Next.js Web</text>
            <text x="78" y="76" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Live Bookings UI</text>

            <rect x="18" y="126" width="120" height="58" rx="12" fill={nodeFill} stroke={sky} strokeOpacity="0.5" />
            <text x="78" y="151" textAnchor="middle" fill={skyLabel} fontSize="11.5" fontWeight="600">React Native</text>
            <text x="78" y="168" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">FCM · S3 Presigned</text>

            <rect x="205" y="54" width="140" height="112" rx="14" fill={nodeFillEmerald} stroke={emerald} strokeWidth="1.5" />
            <text x="275" y="79" textAnchor="middle" fill={emeraldLabel} fontSize="9.5" fontFamily="monospace">EXPRESS 5 · PM2</text>
            <text x="275" y="104" textAnchor="middle" fill={inkTitle} fontSize="13.5" fontWeight="700">Socket.IO Sync</text>
            <text x="275" y="122" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">JWT · Argon2 · Zod</text>
            <rect x="219" y="135" width="112" height="20" rx="6" fill={pillFillEmerald} />
            <text x="275" y="148" textAnchor="middle" fill={emeraldLabel} fontSize="9" fontFamily="monospace">Pino · Prometheus</text>

            <rect x="405" y="24" width="138" height="52" rx="11" fill={nodeFill} stroke={cyan} strokeOpacity="0.5" />
            <text x="474" y="46" textAnchor="middle" fill={cyanLabel} fontSize="11" fontWeight="600">Redis Adapter + LRU</text>
            <text x="474" y="62" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Multi-Instance Sync</text>

            <rect x="405" y="84" width="138" height="52" rx="11" fill={nodeFillAmber} stroke={amber} strokeOpacity="0.5" />
            <text x="474" y="106" textAnchor="middle" fill={amberLabel} fontSize="11" fontWeight="600">BullMQ Workers</text>
            <text x="474" y="122" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Retries · Razorpay · Mail</text>

            <rect x="405" y="144" width="138" height="52" rx="11" fill={nodeFill} stroke={emerald} strokeOpacity="0.5" />
            <text x="474" y="166" textAnchor="middle" fill={emeraldLabel} fontSize="11" fontWeight="600">PostgreSQL + S3</text>
            <text x="474" y="182" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Prisma ORM · Direct Upload</text>
          </svg>
          </div>
          <span aria-hidden="true" className={swipeHint}>
            Swipe →
          </span>
        </div>
      );

    case "mobile-app":
      return (
        <div
          className={`@container relative ${heightClass} w-full overflow-hidden rounded-2xl border p-4 ${shell}`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-35" />
          <div className="pointer-events-none absolute -right-10 top-4 h-36 w-36 rounded-full bg-violet-500/16 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-6 h-32 w-32 rounded-full bg-sky-500/14 blur-3xl" />

          <div className="relative z-10 h-full w-full overflow-x-auto overflow-y-hidden">
          <svg
            viewBox="0 0 560 220"
            className="h-full w-full min-w-[460px]"
            role="img"
            aria-label="On-Demand Dual-Role Mobile Suite React Native 0.87 architecture"
          >
            <path d="M150 110 H205" stroke={violet} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M350 86 L406 58" stroke={sky} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M350 110 H406" stroke={emerald} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M350 134 L406 164" stroke={amber} strokeWidth="1.8" className="animate-signal-dash" />

            <rect x="16" y="64" width="134" height="92" rx="14" fill={nodeFillViolet} stroke={violet} strokeOpacity="0.55" />
            <text x="83" y="90" textAnchor="middle" fill={violetLabel} fontSize="9.5" fontFamily="monospace">RN 0.87 NEW ARCH</text>
            <text x="83" y="112" textAnchor="middle" fill={inkTitle} fontSize="13.5" fontWeight="700">Dual-Role App</text>
            <text x="83" y="131" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">20+ Feature Modules</text>
            <text x="83" y="146" textAnchor="middle" fill={sky} fontSize="9" fontFamily="monospace">Reanimated 4 · NativeWind</text>

            <rect x="205" y="54" width="145" height="112" rx="14" fill={nodeFillCore} stroke={sky} strokeWidth="1.5" />
            <text x="277" y="78" textAnchor="middle" fill={skyLabel} fontSize="9.5" fontFamily="monospace">INFRASTRUCTURE</text>
            <text x="277" y="103" textAnchor="middle" fill={inkTitle} fontSize="13.5" fontWeight="700">ETag + Resync</text>
            <text x="277" y="122" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">304 Cache · Socket Sync</text>
            <rect x="220" y="135" width="114" height="20" rx="6" fill={pillFill} />
            <text x="277" y="148" textAnchor="middle" fill={skyLabel} fontSize="9" fontFamily="monospace">Zustand 5 · Zod 4</text>

            <rect x="406" y="24" width="138" height="52" rx="11" fill={nodeFill} stroke={sky} strokeOpacity="0.5" />
            <text x="475" y="46" textAnchor="middle" fill={skyLabel} fontSize="11" fontWeight="600">Native Razorpay</text>
            <text x="475" y="62" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Geo · S3 Media Picker</text>

            <rect x="406" y="84" width="138" height="52" rx="11" fill={nodeFillEmerald} stroke={emerald} strokeOpacity="0.5" />
            <text x="475" y="106" textAnchor="middle" fill={emeraldLabel} fontSize="11" fontWeight="600">Live Ringing &amp; FCM</text>
            <text x="475" y="122" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Instant Vendor Dispatch</text>

            <rect x="406" y="144" width="138" height="52" rx="11" fill={nodeFillAmber} stroke={amber} strokeOpacity="0.5" />
            <text x="475" y="166" textAnchor="middle" fill={amberLabel} fontSize="11" fontWeight="600">Crash Recovery &amp; Gate</text>
            <text x="475" y="182" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Error Boundary · Updates</text>
          </svg>
          </div>
          <span aria-hidden="true" className={swipeHint}>
            Swipe →
          </span>
        </div>
      );

    case "m3m":
      return (
        <div
          className={`@container relative ${heightClass} w-full overflow-hidden rounded-2xl border p-4 ${shell}`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-amber-500/14 blur-3xl" />
          <div className="relative z-10 h-full w-full overflow-x-auto overflow-y-hidden">
          <svg
            viewBox="0 0 560 200"
            className="h-full w-full min-w-[460px]"
            role="img"
            aria-label="M3MIndia.com edge delivery architecture with AWS CloudFront, S3, Laravel, and OTP lead verification"
          >
            <path d="M168 100 H220" stroke={amber} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M352 100 H402" stroke={sky} strokeWidth="1.8" className="animate-signal-dash" />

            <rect x="20" y="54" width="148" height="92" rx="13" fill={nodeFillAmber} stroke={amber} strokeOpacity="0.5" />
            <text x="94" y="82" textAnchor="middle" fill={amberLabel} fontSize="10" fontFamily="monospace">AWS EDGE CDN</text>
            <text x="94" y="104" textAnchor="middle" fill={inkTitle} fontSize="13.5" fontWeight="700">CloudFront + S3</text>
            <text x="94" y="124" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Cached Media Assets</text>

            <rect x="220" y="46" width="132" height="108" rx="13" fill={nodeFillCore} stroke={sky} strokeOpacity="0.55" />
            <text x="286" y="75" textAnchor="middle" fill={skyLabel} fontSize="10" fontFamily="monospace">LARAVEL + NGINX</text>
            <text x="286" y="99" textAnchor="middle" fill={inkTitle} fontSize="13.5" fontWeight="700">M3MIndia.com</text>
            <text x="286" y="119" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Listings · SEO · Sitemaps</text>
            <text x="286" y="136" textAnchor="middle" fill={emerald} fontSize="9" fontFamily="monospace">4 Property Verticals</text>

            <rect x="402" y="54" width="138" height="92" rx="13" fill={nodeFillEmerald} stroke={emerald} strokeOpacity="0.5" />
            <text x="471" y="82" textAnchor="middle" fill={emeraldLabel} fontSize="10" fontFamily="monospace">LEAD ENGINE</text>
            <text x="471" y="104" textAnchor="middle" fill={inkTitle} fontSize="13" fontWeight="700">OTP Verification</text>
            <text x="471" y="124" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">MySQL · Auto Backups</text>
          </svg>
          </div>
          <span aria-hidden="true" className={swipeHint}>
            Swipe →
          </span>
        </div>
      );

    case "capital-bank":
      return (
        <div
          className={`@container relative ${heightClass} w-full overflow-hidden rounded-2xl border p-4 ${shell}`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute bottom-0 left-10 h-32 w-32 rounded-full bg-sky-500/16 blur-3xl" />
          <div className="relative z-10 h-full w-full overflow-x-auto overflow-y-hidden">
          <svg
            viewBox="0 0 560 200"
            className="h-full w-full min-w-[460px]"
            role="img"
            aria-label="Capital.bank.in digital banking architecture"
          >
            <path d="M168 100 H220" stroke={violet} strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M352 100 H402" stroke={sky} strokeWidth="1.8" className="animate-signal-dash" />

            <rect x="20" y="54" width="148" height="92" rx="13" fill={nodeFillViolet} stroke={violet} strokeOpacity="0.5" />
            <text x="94" y="82" textAnchor="middle" fill={violetLabel} fontSize="10" fontFamily="monospace">CUSTOM CMS</text>
            <text x="94" y="104" textAnchor="middle" fill={inkTitle} fontSize="13" fontWeight="700">Banking Products</text>
            <text x="94" y="124" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Reusable UI Modules</text>

            <rect x="220" y="46" width="132" height="108" rx="13" fill={nodeFillCore} stroke={sky} strokeOpacity="0.55" />
            <text x="286" y="75" textAnchor="middle" fill={skyLabel} fontSize="10" fontFamily="monospace">FINTECH SECURITY</text>
            <text x="286" y="99" textAnchor="middle" fill={inkTitle} fontSize="13" fontWeight="700">Laravel Core</text>
            <text x="286" y="119" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Strict Input Validation</text>
            <text x="286" y="136" textAnchor="middle" fill={emerald} fontSize="9" fontFamily="monospace">Tuned MySQL Queries</text>

            <rect x="402" y="54" width="138" height="92" rx="13" fill={nodeFillEmerald} stroke={emerald} strokeOpacity="0.5" />
            <text x="471" y="82" textAnchor="middle" fill={emeraldLabel} fontSize="10" fontFamily="monospace">INTEGRATIONS</text>
            <text x="471" y="104" textAnchor="middle" fill={inkTitle} fontSize="13" fontWeight="700">3rd-Party APIs</text>
            <text x="471" y="124" textAnchor="middle" fill={inkSub} fontSize="9.5" fontFamily="monospace">Linux · Apache / Nginx</text>
          </svg>
          </div>
          <span aria-hidden="true" className={swipeHint}>
            Swipe →
          </span>
        </div>
      );

    default: {
      const meta: Record<
        string,
        { tag: string; title: string; nodes: string[]; chip: string }
      > = {
        shabd: {
          tag: "PUBLISHING MARKETPLACE",
          title: "Shabd.in Author Engine",
          nodes: ["Multilingual Editor", "Category Search", "Monetization & Reviews"],
          chip: "chip-accent",
        },
        "crm-lms": {
          tag: "B2B CRM + EDTECH LMS",
          title: "4Achievers Suite",
          nodes: ["Sales & Campaigns", "Batch & Trainer LMS", "Counselling & Chat"],
          chip: "chip-amber",
        },
        jobhubster: {
          tag: "RECRUITMENT PORTAL",
          title: "Jobhubster.in Engine",
          nodes: ["Résumé Search", "ATS Pipeline", "Auto-Generated Jobs"],
          chip: "chip-emerald",
        },
        attendance: {
          tag: "ELECTRON.JS DESKTOP",
          title: "Office Attendance Client",
          nodes: ["Office-Only Clock-In", "Shift Shutdown Prompt", "Admin Time Review"],
          chip: "chip-violet",
        },
      };

      const item = meta[type] ?? meta.shabd;

      return (
        <div
          className={`@container relative ${heightClass} flex w-full flex-col justify-between overflow-hidden rounded-2xl border p-4 ${shell}`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative z-10 flex items-center justify-between">
            <span className={`${item.chip} rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold`}>
              {item.tag}
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          </div>
          <div className="relative z-10 text-base font-semibold tracking-tight text-white">
            {item.title}
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-2">
            {item.nodes.map((node) => (
              <div
                key={node}
                className="surface-subcard rounded-lg px-2 py-2 text-center font-mono text-[10px] leading-tight text-slate-300"
              >
                {node}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
