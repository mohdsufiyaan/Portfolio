import type { Project } from "../app/data";

interface ProjectDiagramProps {
  type: Project["diagramType"];
  compact?: boolean;
}

export function ProjectDiagram({ type, compact = false }: ProjectDiagramProps) {
  const heightClass = compact ? "h-40" : "h-56 sm:h-64";

  switch (type) {
    case "ai-ops":
      return (
        <div
          className={`preserve-dark relative ${heightClass} w-full overflow-hidden rounded-2xl border border-sky-400/20 bg-[#060c18] p-4`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-35" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-sky-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 left-8 h-32 w-32 rounded-full bg-orange-500/15 blur-3xl" />

          <svg
            viewBox="0 0 560 220"
            className="relative z-10 h-full w-full"
            role="img"
            aria-label="Enterprise AI Operations architecture: Autonomous Agent connected to Hybrid RAG (Pinecone and MySQL Full-Text Search) and Multi-LLM Failover Gateway"
          >
            {/* Animated data links */}
            <path d="M128 110 H195" stroke="#38bdf8" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M335 84 C365 84 370 52 400 52" fill="none" stroke="#22d3ee" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M335 110 H400" stroke="#fb923c" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M335 136 C365 136 370 168 400 168" fill="none" stroke="#34d399" strokeWidth="1.8" className="animate-signal-dash" />

            {/* Input Node */}
            <rect x="16" y="76" width="112" height="68" rx="12" fill="#0c1528" stroke="#38bdf8" strokeOpacity="0.45" />
            <text x="72" y="102" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="monospace">ZTD RBAC</text>
            <text x="72" y="120" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Agent Request</text>
            <text x="72" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">SSE · OTP 2FA</text>

            {/* Core Agent Node */}
            <rect x="195" y="54" width="140" height="112" rx="14" fill="#0e1b33" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="212" cy="72" r="4" fill="#34d399" />
            <text x="223" y="75" fill="#94a3b8" fontSize="9" fontFamily="monospace">LARAVEL AI SDK</text>
            <text x="265" y="102" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="700">39-Tool Agent</text>
            <text x="265" y="121" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">19 Skills · ≤6 Steps</text>
            <rect x="210" y="134" width="110" height="20" rx="6" fill="#082f49" />
            <text x="265" y="147" textAnchor="middle" fill="#bae6fd" fontSize="9" fontFamily="monospace">-30–50% Tokens</text>

            {/* Right Stack: Hybrid RAG */}
            <rect x="400" y="24" width="144" height="54" rx="11" fill="#0c1528" stroke="#22d3ee" strokeOpacity="0.45" />
            <text x="472" y="46" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="600">Hybrid RAG (RRF)</text>
            <text x="472" y="63" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Pinecone 1024d + MySQL</text>

            {/* Right Stack: Multi-LLM Gateway */}
            <rect x="400" y="85" width="144" height="50" rx="11" fill="#18120c" stroke="#fb923c" strokeOpacity="0.55" />
            <text x="472" y="106" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="600">LLM Circuit Breaker</text>
            <text x="472" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Groq → Gemini → OpenRouter</text>

            {/* Right Stack: OAuth Connectors */}
            <rect x="400" y="143" width="144" height="52" rx="11" fill="#091a16" stroke="#34d399" strokeOpacity="0.45" />
            <text x="472" y="164" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600">MS365 &amp; Workspace</text>
            <text x="472" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">AES-256 · 24h Undo · EOD</text>
          </svg>
        </div>
      );

    case "realtime":
      return (
        <div
          className={`preserve-dark relative ${heightClass} w-full overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#060f16] p-4`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-35" />
          <div className="pointer-events-none absolute -left-10 top-6 h-36 w-36 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="pointer-events-none absolute right-6 bottom-2 h-32 w-32 rounded-full bg-cyan-500/15 blur-3xl" />

          <svg
            viewBox="0 0 560 220"
            className="relative z-10 h-full w-full"
            role="img"
            aria-label="Real-time booking architecture: Next.js and React Native connected to Express 5 API, Socket.IO Redis Adapter, BullMQ queues, PostgreSQL, and AWS S3"
          >
            <path d="M138 66 L205 98" stroke="#34d399" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M138 154 L205 122" stroke="#38bdf8" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M345 96 L405 56" stroke="#22d3ee" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M345 110 H405" stroke="#fb923c" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M345 124 L405 164" stroke="#34d399" strokeWidth="1.8" className="animate-signal-dash" />

            {/* Web Client */}
            <rect x="18" y="34" width="120" height="58" rx="12" fill="#0b1824" stroke="#34d399" strokeOpacity="0.45" />
            <text x="78" y="59" textAnchor="middle" fill="#6ee7b7" fontSize="11.5" fontWeight="600">Next.js Web</text>
            <text x="78" y="76" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Live Bookings UI</text>

            {/* Mobile Client */}
            <rect x="18" y="126" width="120" height="58" rx="12" fill="#0b1824" stroke="#38bdf8" strokeOpacity="0.45" />
            <text x="78" y="151" textAnchor="middle" fill="#7dd3fc" fontSize="11.5" fontWeight="600">React Native</text>
            <text x="78" y="168" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">FCM · S3 Presigned</text>

            {/* Express 5 Cluster */}
            <rect x="205" y="54" width="140" height="112" rx="14" fill="#0b2029" stroke="#34d399" strokeWidth="1.5" />
            <text x="275" y="79" textAnchor="middle" fill="#6ee7b7" fontSize="9.5" fontFamily="monospace">EXPRESS 5 · PM2</text>
            <text x="275" y="104" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="700">Socket.IO Sync</text>
            <text x="275" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">JWT · Argon2 · Zod</text>
            <rect x="219" y="135" width="112" height="20" rx="6" fill="#052e2b" />
            <text x="275" y="148" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Pino · Prometheus</text>

            {/* Right Services */}
            <rect x="405" y="24" width="138" height="52" rx="11" fill="#0c1528" stroke="#22d3ee" strokeOpacity="0.45" />
            <text x="474" y="46" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="600">Redis Adapter + LRU</text>
            <text x="474" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Multi-Instance Sync</text>

            <rect x="405" y="84" width="138" height="52" rx="11" fill="#18120c" stroke="#fb923c" strokeOpacity="0.5" />
            <text x="474" y="106" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="600">BullMQ Workers</text>
            <text x="474" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Retries · Razorpay · Mail</text>

            <rect x="405" y="144" width="138" height="52" rx="11" fill="#0b1824" stroke="#34d399" strokeOpacity="0.45" />
            <text x="474" y="166" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600">PostgreSQL + S3</text>
            <text x="474" y="182" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Prisma ORM · Direct Upload</text>
          </svg>
        </div>
      );

    case "mobile-app":
      return (
        <div
          className={`preserve-dark relative ${heightClass} w-full overflow-hidden rounded-2xl border border-violet-400/25 bg-[#090918] p-4`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-35" />
          <div className="pointer-events-none absolute -right-10 top-4 h-36 w-36 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-6 h-32 w-32 rounded-full bg-sky-500/15 blur-3xl" />

          <svg
            viewBox="0 0 560 220"
            className="relative z-10 h-full w-full"
            role="img"
            aria-label="On-Demand Dual-Role Mobile Suite React Native 0.87 architecture with ETag Query Cache, Socket Resync Coordinator, and FCM Live Partner Alerts"
          >
            <path d="M150 110 H205" stroke="#a78bfa" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M350 86 L406 58" stroke="#38bdf8" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M350 110 H406" stroke="#34d399" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M350 134 L406 164" stroke="#fb923c" strokeWidth="1.8" className="animate-signal-dash" />

            <rect x="16" y="64" width="134" height="92" rx="14" fill="#131029" stroke="#a78bfa" strokeOpacity="0.55" />
            <text x="83" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="9.5" fontFamily="monospace">RN 0.87 NEW ARCH</text>
            <text x="83" y="112" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="700">Dual-Role App</text>
            <text x="83" y="131" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">20+ Feature Modules</text>
            <text x="83" y="146" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">Reanimated 4 · NativeWind</text>

            <rect x="205" y="54" width="145" height="112" rx="14" fill="#0d182d" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="277" y="78" textAnchor="middle" fill="#7dd3fc" fontSize="9.5" fontFamily="monospace">INFRASTRUCTURE</text>
            <text x="277" y="103" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="700">ETag + Resync</text>
            <text x="277" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">304 Cache · Socket Sync</text>
            <rect x="220" y="135" width="114" height="20" rx="6" fill="#082f49" />
            <text x="277" y="148" textAnchor="middle" fill="#bae6fd" fontSize="9" fontFamily="monospace">Zustand 5 · Zod 4</text>

            <rect x="406" y="24" width="138" height="52" rx="11" fill="#0c1528" stroke="#38bdf8" strokeOpacity="0.45" />
            <text x="475" y="46" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="600">Native Razorpay</text>
            <text x="475" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Geo · S3 Media Picker</text>

            <rect x="406" y="84" width="138" height="52" rx="11" fill="#091a16" stroke="#34d399" strokeOpacity="0.5" />
            <text x="475" y="106" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600">Live Ringing &amp; FCM</text>
            <text x="475" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Instant Vendor Dispatch</text>

            <rect x="406" y="144" width="138" height="52" rx="11" fill="#18120c" stroke="#fb923c" strokeOpacity="0.45" />
            <text x="475" y="166" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="600">CrashGuard &amp; Gate</text>
            <text x="475" y="182" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Error Boundary · Updates</text>
          </svg>
        </div>
      );

    case "m3m":
      return (
        <div
          className={`preserve-dark relative ${heightClass} w-full overflow-hidden rounded-2xl border border-amber-400/20 bg-[#0d0d16] p-4`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-amber-500/15 blur-3xl" />
          <svg
            viewBox="0 0 560 200"
            className="relative z-10 h-full w-full"
            role="img"
            aria-label="M3MIndia.com edge delivery architecture with AWS CloudFront, S3, Laravel, and OTP lead verification"
          >
            <path d="M168 100 H220" stroke="#fb923c" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M352 100 H402" stroke="#38bdf8" strokeWidth="1.8" className="animate-signal-dash" />

            <rect x="20" y="54" width="148" height="92" rx="13" fill="#171422" stroke="#fb923c" strokeOpacity="0.5" />
            <text x="94" y="82" textAnchor="middle" fill="#fdba74" fontSize="10" fontFamily="monospace">AWS EDGE CDN</text>
            <text x="94" y="104" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="700">CloudFront + S3</text>
            <text x="94" y="124" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Cached Media Assets</text>

            <rect x="220" y="46" width="132" height="108" rx="13" fill="#111829" stroke="#38bdf8" strokeOpacity="0.5" />
            <text x="286" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="monospace">LARAVEL + NGINX</text>
            <text x="286" y="99" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="700">M3MIndia.com</text>
            <text x="286" y="119" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Listings · SEO · Sitemaps</text>
            <text x="286" y="136" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace">4 Property Verticals</text>

            <rect x="402" y="54" width="138" height="92" rx="13" fill="#0d1c1d" stroke="#34d399" strokeOpacity="0.45" />
            <text x="471" y="82" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontFamily="monospace">LEAD ENGINE</text>
            <text x="471" y="104" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">OTP Verification</text>
            <text x="471" y="124" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">MySQL · Automated Backups</text>
          </svg>
        </div>
      );

    case "capital-bank":
      return (
        <div
          className={`preserve-dark relative ${heightClass} w-full overflow-hidden rounded-2xl border border-indigo-400/20 bg-[#080d1b] p-4`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute left-10 bottom-0 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />
          <svg
            viewBox="0 0 560 200"
            className="relative z-10 h-full w-full"
            role="img"
            aria-label="Capital.bank.in digital banking architecture with custom CMS, secure validation layer, and third-party banking APIs"
          >
            <path d="M168 100 H220" stroke="#818cf8" strokeWidth="1.8" className="animate-signal-dash" />
            <path d="M352 100 H402" stroke="#38bdf8" strokeWidth="1.8" className="animate-signal-dash" />

            <rect x="20" y="54" width="148" height="92" rx="13" fill="#10152b" stroke="#818cf8" strokeOpacity="0.5" />
            <text x="94" y="82" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontFamily="monospace">CUSTOM CMS</text>
            <text x="94" y="104" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">Banking Products</text>
            <text x="94" y="124" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Reusable UI Modules</text>

            <rect x="220" y="46" width="132" height="108" rx="13" fill="#0f1b2e" stroke="#38bdf8" strokeOpacity="0.55" />
            <text x="286" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="monospace">FINTECH SECURITY</text>
            <text x="286" y="99" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">Laravel Core</text>
            <text x="286" y="119" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Strict Input Validation</text>
            <text x="286" y="136" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace">Tuned MySQL Queries</text>

            <rect x="402" y="54" width="138" height="92" rx="13" fill="#0c1824" stroke="#34d399" strokeOpacity="0.45" />
            <text x="471" y="82" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontFamily="monospace">INTEGRATIONS</text>
            <text x="471" y="104" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">3rd-Party APIs</text>
            <text x="471" y="124" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Linux · Apache / Nginx</text>
          </svg>
        </div>
      );

    default: {
      const meta: Record<
        string,
        { tag: string; title: string; nodes: string[]; accent: string }
      > = {
        shabd: {
          tag: "PUBLISHING MARKETPLACE",
          title: "Shabd.in Author Engine",
          nodes: ["Multilingual Editor", "Category Search", "Monetization & Reviews"],
          accent: "border-sky-400/25 text-sky-300",
        },
        "crm-lms": {
          tag: "B2B CRM + EDTECH LMS",
          title: "4Achievers Suite",
          nodes: ["Sales & Campaigns", "Batch & Trainer LMS", "Counselling & Chat"],
          accent: "border-amber-400/25 text-amber-300",
        },
        jobhubster: {
          tag: "RECRUITMENT PORTAL",
          title: "Jobhubster.in Engine",
          nodes: ["Résumé Search", "ATS Pipeline", "Auto-Generated Jobs"],
          accent: "border-emerald-400/25 text-emerald-300",
        },
        attendance: {
          tag: "ELECTRON.JS DESKTOP",
          title: "Office Attendance Client",
          nodes: ["Office-Only Clock-In", "Shift Shutdown Prompt", "Admin Time Review"],
          accent: "border-violet-400/25 text-violet-300",
        },
      };

      const item = meta[type] ?? meta.shabd;

      return (
        <div
          className={`preserve-dark relative ${heightClass} flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.09] bg-[#070d19] p-4`}
        >
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative z-10 flex items-center justify-between">
            <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${item.accent}`}>
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
                className="rounded-lg border border-white/[0.08] bg-slate-950/75 px-2 py-2 text-center font-mono text-[10px] leading-tight text-slate-300"
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
