export interface Project {
  slug: string;
  name: string;
  shortName: string;
  company: string;
  period: string;
  status: string;
  category: "AI & RAG" | "Real-Time" | "Enterprise Web" | "Earlier Products";
  featured: boolean;
  liveUrl?: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  deliveryStages: {
    stage: string;
    detail: string;
  }[];
  impactMetrics: { label: string; value: string }[];
  tech: string[];
  architectureHighlight: string;
  contributions: string[];
  diagramType:
    | "ai-ops"
    | "realtime"
    | "mobile-app"
    | "m3m"
    | "capital-bank"
    | "shabd"
    | "crm-lms"
    | "jobhubster"
    | "attendance";
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: {
    title: string;
    detail: string;
  }[];
  stack: string[];
  recognition?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  accent: "cyan" | "amber" | "emerald" | "violet";
  items: {
    name: string;
    context: string;
  }[];
}

export interface ArchitecturePillar {
  id: string;
  code: string;
  title: string;
  summary: string;
  specs: string[];
  technologies: string[];
  metric: { value: string; label: string };
}

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
  category: "Honor" | "Engineering Impact" | "Education";
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

const rawOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const origin = new URL(rawOrigin).origin;

export const profile = {
  name: "Mohd Sufiyan",
  initials: "MS",
  role: "Senior Software Engineer",
  headline: "Full-Stack Architecture & Autonomous AI Systems",
  subheadline:
    "Laravel • Node.js • Next.js • AI Systems (RAG & LLM Agents) • Distributed System Design",
  location: "Noida, Uttar Pradesh, India",
  timezone: "IST (UTC+5:30)",
  experienceYears: "5.5+",
  email: "sufiyanmohd345@gmail.com",
  phone: "+91-9193221557",
  phoneHref: "tel:+919193221557",
  resumePath: "/mohd-sufiyan-resume.pdf",
  quote: "Make an effort to create things that have an impact!",
  github: "https://github.com/mohdsufiyaan",
  githubUsername: "mohdsufiyaan",
  linkedin: "https://www.linkedin.com/in/mohd-sufiyan-it",
  summary:
    "Full-stack software engineer with 5.5+ years of experience delivering secure, scalable production systems across Laravel/PHP, Node.js, Next.js, and React Native. Specialized in real-time distributed platforms, high-throughput queues, Hybrid RAG pipelines, and autonomous multi-tool LLM agents.",
  education: {
    degree: "Bachelor of Computer Science (BCS)",
    institution: "Mahatma Jyotiba Phule Rohilkhand University",
    period: "2017 – 2019",
  },
};

export const profiles = [profile.github, profile.linkedin];

export const heroMetrics = [
  {
    value: "5.5+",
    numericTarget: 5.5,
    suffix: "+",
    decimals: 1,
    label: "Years Shipping Production Systems",
    detail: "Laravel · Node.js · Next.js · AWS",
  },
  {
    value: "39",
    numericTarget: 39,
    suffix: "",
    decimals: 0,
    label: "Autonomous AI Agent Tools",
    detail: "19 domain-specific skills · max 6 steps",
  },
  {
    value: "30–50%",
    numericTarget: 50,
    prefix: "30–",
    suffix: "%",
    decimals: 0,
    label: "LLM Token Cost Reduction",
    detail: "History dedup & tool compression",
  },
  {
    value: "145+",
    numericTarget: 145,
    suffix: "+",
    decimals: 0,
    label: "Automated Agent & API Test Suites",
    detail: "89 PHPUnit/Pest · 56 Vitest/Supertest",
  },
];

export const marqueeTech = [
  "Laravel 12",
  "PHP 8.2",
  "Node.js",
  "Express 5",
  "Next.js",
  "React Native",
  "TypeScript",
  "Hybrid RAG",
  "Pinecone Serverless",
  "Laravel AI SDK",
  "Jina 1024-dim",
  "Groq · Gemini · OpenRouter",
  "Socket.IO + Redis",
  "BullMQ Queues",
  "PostgreSQL & Prisma",
  "MySQL 8 Indexing",
  "Zero-Trust RBAC",
  "AWS EC2 · S3 · CloudFront",
  "MCP Protocol",
  "Pino & Prometheus",
];

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Languages & Backend",
    subtitle: "High-throughput APIs, microservices, and real-time servers",
    accent: "cyan",
    items: [
      { name: "PHP 8.x & Laravel 12", context: "Enterprise backends & AI SDK" },
      { name: "Node.js & Express 5", context: "Async REST & real-time APIs" },
      { name: "TypeScript & ES6+", context: "End-to-end strict type safety" },
      { name: "Socket.IO", context: "Multi-instance WebSocket sync" },
      { name: "BullMQ", context: "Retryable async job queues" },
      { name: "Prisma ORM & Zod", context: "Typed schemas & API validation" },
      { name: "OAuth 2.0, JWT & Sanctum", context: "Auth & encrypted tokens" },
      { name: "REST & Microservices", context: "Modular service design" },
      { name: "Golang (Basic)", context: "Systems & backend utility" },
    ],
  },
  {
    id: "ai-llm",
    title: "AI & LLM Systems",
    subtitle: "Production RAG, grounded autonomous agents, and failover gateways",
    accent: "amber",
    items: [
      { name: "Laravel AI SDK & LangChain", context: "Autonomous agent orchestration" },
      { name: "Hybrid RAG", context: "Vector + MySQL Full-Text RRF" },
      { name: "Pinecone Serverless", context: "1024-dim vector retrieval" },
      { name: "Jina AI & OpenAI Embeddings", context: "Sentence-aware chunking" },
      { name: "LLM Agents & Tool Calling", context: "39 tools & 19 skills" },
      { name: "Multi-LLM Failover", context: "Groq · Google Gemini · OpenRouter" },
      { name: "OpenAI API", context: "Enterprise workflow automation" },
      { name: "MCP (Model Context Protocol)", context: "Structured context tools" },
      { name: "Prompt Engineering & Guardrails", context: "Injection defense & grounding" },
    ],
  },
  {
    id: "system-design",
    title: "System Design & Security",
    subtitle: "Concurrency control, fault tolerance, and zero-trust defense",
    accent: "emerald",
    items: [
      { name: "Scalable & Event-Driven Design", context: "Decoupled async pipelines" },
      { name: "Horizontal Scaling", context: "Redis adapter & stateless APIs" },
      { name: "Caching (Redis & LRU)", context: "Multi-tier low-latency reads" },
      { name: "Message Queues & Rate Limiting", context: "Backpressure & traffic shaping" },
      { name: "Concurrency Control", context: "lockForUpdate & optimistic locking" },
      { name: "RBAC + Zero Trust (ZTD)", context: "3-layer query, route & AI scoping" },
      { name: "Circuit Breakers & Failover", context: "429/402 automatic recovery" },
      { name: "Observability", context: "Pino structured logs & Prometheus" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend, Mobile & Desktop",
    subtitle: "Responsive web apps, cross-platform mobile, and desktop clients",
    accent: "violet",
    items: [
      { name: "Next.js & React.js", context: "SSR/App Router web platforms" },
      { name: "React Native", context: "Live mobile booking clients" },
      { name: "TypeScript & Redux", context: "Predictable client state" },
      { name: "Tailwind CSS & HTML5/CSS3", context: "Responsive design systems" },
      { name: "Electron.js", context: "Desktop attendance software" },
      { name: "Bootstrap & jQuery", context: "Enterprise CMS & web maintenance" },
    ],
  },
  {
    id: "databases",
    title: "Databases & Storage",
    subtitle: "Schema modeling, composite indexing, and vector stores",
    accent: "cyan",
    items: [
      { name: "PostgreSQL", context: "Relational core with Prisma ORM" },
      { name: "MySQL 8", context: "Composite indexes & Full-Text Search" },
      { name: "Redis", context: "Cache, pub/sub adapter, BullMQ & rate limits" },
      { name: "Pinecone", context: "Serverless vector similarity index" },
      { name: "MongoDB", context: "Document data stores" },
    ],
  },
  {
    id: "cloud-testing",
    title: "Cloud, DevOps & Quality",
    subtitle: "AWS infrastructure, zero-downtime delivery, and test verification",
    accent: "emerald",
    items: [
      { name: "AWS (EC2, S3, RDS, CloudFront)", context: "Hosting, CDN & presigned uploads" },
      { name: "Nginx, Apache & Linux", context: "Reverse proxy, SSL & server hardening" },
      { name: "PM2 & Supervisor", context: "Process orchestration & hot reloads" },
      { name: "PHPUnit & Pest", context: "65+ backend & golden agent tests" },
      { name: "Vitest & Supertest", context: "Automated Node.js API verification" },
      { name: "Pino & Prometheus", context: "Production telemetry & metrics" },
      { name: "Razorpay & Firebase FCM", context: "Payments & push notifications" },
      { name: "Git, Bitbucket, JIRA & Postman", context: "Agile reviews & API workflows" },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Adtric Solution Pvt. Ltd.",
    role: "Software Engineer",
    location: "Noida, India",
    period: "May 2024 – Present",
    current: true,
    summary:
      "Architecting and shipping flagship autonomous AI systems, distributed real-time web/mobile platforms, fintech banking infrastructure, and high-traffic AWS-accelerated real estate applications.",
    highlights: [
      {
        title: "Enterprise Autonomous AI Task & Operations Platform",
        detail:
          "Architected a Laravel 12 + MySQL 8 + Pinecone autonomous AI operations system featuring a 39-tool / 19-skill LLM agent, Hybrid RAG (RRF), multi-provider circuit-breaker gateway, 3-layer Zero-Trust RBAC, and AES-256 encrypted MS365 & Google Workspace OAuth 2.0 connectors.",
      },
      {
        title: "Real-Time Web & Mobile Booking Platform",
        detail:
          "Built an end-to-end Next.js, React Native, and Node.js/Express 5 platform backed by PostgreSQL (Prisma), Socket.IO with Redis horizontal sync, BullMQ queues, AWS S3 presigned uploads, Razorpay payments, Firebase FCM, Pino logs, and Prometheus metrics.",
      },
      {
        title: "CapitalBank (Capital.bank.in — Fintech)",
        detail:
          "Engineered secure banking backend services, REST APIs, reusable product pages, and a custom CMS with strict input validation, query optimization, and third-party service integrations.",
      },
      {
        title: "M3MIndia.com (Real Estate)",
        detail:
          "Re-engineered dynamic property pages and OTP-verified lead flows across residential, commercial, retail, and office inventories; accelerated performance through frontend asset optimization, caching, AWS S3, and CloudFront.",
      },
      {
        title: "Internal AI Task Management & Production Operations",
        detail:
          "Delivered cross-team task assignment tooling integrated with OpenAI APIs and embeddings while managing deployments, server setup, backups, production support, and Agile code reviews via JIRA and Bitbucket.",
      },
    ],
    stack: [
      "Laravel 12",
      "PHP 8.2",
      "Node.js",
      "Express 5",
      "Next.js",
      "React Native",
      "PostgreSQL",
      "MySQL 8",
      "Redis",
      "Pinecone",
      "AWS S3/CloudFront",
      "BullMQ",
      "Socket.IO",
    ],
  },
  {
    company: "I3 Infosoft Pvt. Ltd.",
    role: "Software Engineer",
    location: "Noida, India",
    period: "Jan 2021 – Mar 2024",
    summary:
      "Designed, built, and scaled full-stack Laravel applications and desktop software across publishing, B2B EdTech CRM/LMS, recruitment portals, and internal workforce tools.",
    highlights: [
      {
        title: "Scalable Laravel Architecture & Database Tuning",
        detail:
          "Planned and built production Laravel architectures optimized for long-term maintainability and speed through careful MySQL schema design, query optimization, and composite indexing.",
      },
      {
        title: "Third-Party Payment, Auth & API Integrations",
        detail:
          "Integrated external payment gateways, authentication providers, and third-party services across commercial client products.",
      },
      {
        title: "Multi-Domain Production Shipments",
        detail:
          "Delivered Shabd.in (multilingual publishing marketplace), 4Achievers B2B CRM & LMS, Jobhubster.in (dual-sided job portal), and an Electron.js office-enforced Employee Attendance Desktop App.",
      },
    ],
    stack: [
      "PHP 8",
      "Laravel",
      "MySQL",
      "JavaScript",
      "React.js",
      "Electron.js",
      "REST APIs",
      "Linux",
      "Git",
    ],
    recognition:
      "Developer of the Year 2024 · Vintage Warrior (I3 Infosoft) · GemsBond (4Achievers)",
  },
];

export const projects: Project[] = [
  {
    slug: "enterprise-ai-operations",
    name: "AI Task Management & EOD Operations Platform",
    shortName: "AI Task & EOD Platform",
    company: "Adtric Solution Pvt. Ltd.",
    period: "2024 – Present",
    status: "Production · Active",
    category: "AI & RAG",
    featured: true,
    tagline:
      "Autonomous 39-tool LLM agent with Hybrid RAG, multi-provider circuit-breaker failover, and 3-layer Zero-Trust RBAC.",
    summary:
      "An enterprise AI operations engine built on Laravel 12, MySQL 8 (28 Eloquent models, 22 controllers), and Pinecone Serverless that delegates tasks across 39 tools and 19 domain skills, tracks work via live stopwatches, integrates with Microsoft 365 & Google Workspace, and generates automated 0–100 End-of-Day performance scorecards.",
    challenge:
      "Enterprise teams needed an AI operations assistant that could execute complex multi-step workflows (task delegation, stopwatch tracking, calendar/mail drafts, and EOD reporting) without hallucinating tool outputs, leaking cross-department data, blowing up token budgets, or failing whenever an LLM provider returned 429/402 errors.",
    solution:
      "Built a bounded 6-step autonomous agent on Laravel AI SDK with a custom Agentic Harness (`AgentOrchestrator`, `SemanticIntentRouter`, `ModeGovernance`, `ToolSelector`, `TokenBudgetManager`), 39 tools and 19 skills, Hybrid RAG (`PineconeVectorService` 1024-dim Jina + MySQL FTS via Reciprocal Rank Fusion), `MultiProviderLLMGateway` (Groq → Gemini → OpenRouter), `GroundednessService`, and 3-layer Zero-Trust RBAC (`AccessScope`, `DepartmentBoundaryGuard`).",
    impact:
      "Reduced production LLM token costs by 30–50% via `ToolResultCompressor` & `ConversationSummariser`, eliminated concurrent write race conditions using `lockForUpdate` & optimistic `version` columns, enabled 24-hour undoable AES-256 OAuth 2.0 MS365/Workspace drafts (`PendingAction`), and verified reliability across 89 PHPUnit 11 & Pest test suites.",
    deliveryStages: [
      { stage: "Agentic Harness", detail: "39 tools, 19 skills, 6-step reasoning loop" },
      { stage: "Hybrid RAG & Memory", detail: "Pinecone 1024d + MySQL FTS RRF + MailMemory" },
      { stage: "ZTD & Multi-LLM", detail: "429/402 circuit breaker + 3-layer RBAC" },
      { stage: "6 Queues & 89 Tests", detail: "Heartbeat task slicer + 89 PHPUnit/Pest suites" },
    ],
    impactMetrics: [
      { value: "39 / 19", label: "Agent Tools & Domain Skills" },
      { value: "30–50%", label: "LLM Token Cost Reduction" },
      { value: "89 Suites", label: "PHPUnit 11 & Pest Tests" },
      { value: "28 Models", label: "Eloquent Domain & Audit Schema" },
    ],
    tech: [
      "Laravel 12",
      "PHP 8.2",
      "Laravel AI SDK",
      "MySQL 8",
      "Pinecone Serverless",
      "Jina AI (1024-dim)",
      "Groq",
      "Google Gemini",
      "OpenRouter",
      "Laravel Sanctum",
      "SSE",
      "OAuth 2.0",
      "AES-256",
      "PHPUnit & Pest",
    ],
    architectureHighlight:
      "Hybrid retrieval fuses Pinecone 1024-dim Jina vector search with MySQL Full-Text Search via Reciprocal Rank Fusion (RRF), guarded by lexical/cosine tool-output verification and automatic 429/402 circuit-breaker LLM failover.",
    contributions: [
      "Architected a custom Agentic Harness (`AgentOrchestrator`, `RequestPreprocessor`, `IntentClassifier`, `SemanticIntentRouter`, `ModeGovernance`, `ToolSelector`, `TokenBudgetManager`) on Laravel 12 & Laravel AI SDK driving 39 tools and 19 domain skills across 28 Eloquent models and 22 controllers.",
      "Engineered a Hybrid RAG pipeline (`PineconeVectorService`, `AgentRagService`, `AppManualService`) combining Pinecone Serverless 1024-dim Jina embeddings with MySQL 8 Full-Text Search merged via Reciprocal Rank Fusion (RRF).",
      "Implemented `MultiProviderLLMGateway` and `ModelRouter` across Groq, Google Gemini, and OpenRouter with `SharedQuotaService`, `ExternalBurstLimiter`, and circuit breakers (`LlmCooldownResumeHandler`, `DegradedModeService`) that automatically fail over on HTTP 429/402 errors.",
      "Hardened response grounding and safety via `GroundednessService`, `AgentVerificationGuard`, `AgentReplyGuard`, `PromptInjectionPatterns`, and `TechnologyDisclosureGuard`.",
      "Cut LLM token expenditure by 30–50% using `ToolResultCompressor`, `ContextOptimizationService`, `ConversationMemoryManager`, and `ConversationSummariser`.",
      "Enforced 3-layer Zero-Trust Defense (ZTD) using `AccessScope`, `DepartmentBoundaryGuard`, `AgentSecurityPolicy`, controller 403 checks, and `CapabilityPreflightValidator`.",
      "Optimized MySQL 8 concurrency and throughput using composite usage indexes, eager loading, `lockForUpdate` row locks, optimistic `version` columns, and background task slicing (`TaskSlicer`, `ExecuteBackgroundTaskSliceJob` with heartbeat tracking) across 6 priority queue lanes.",
      "Built a full two-way Slack AI Bot (`SlackAuthController`, `SlackWebhookController`, `SlackWebhookVerifier`, `SlackCommands`, `SlackBlockKit`, `SlackAiChatTaskHandler`, `SlackVoiceTranscriptionService`, `SlackListenCommand`) allowing teams to delegate tasks via Slack chat and voice notes.",
      "Engineered a 4-channel notification dispatcher (`NotificationDispatcher`, `WhatsAppNotificationService`, `SendFcmNotificationJob`, `SendWhatsAppNotificationJob`, `SlackNotificationBridge`) plus 17 unified MS365 & Google Workspace mail/calendar tools (`UnifiedMailService`, `CalendarFindFreeTimeTool`, `MailUndoManager`) with AES-256 tokens and 24-hour undoable `PendingAction` drafts.",
      "Hardened production auth & observability with OTP 2FA (`SendAuthOtpJob`, `AuthOtpMail`), PII-scrubbed structured logs (`AiAgentLogger`, `LogRedactor`, `AuditLogService`, `AnalyzeAiLogs`), `PerformanceEngineService` (0–100 scorecards), `AiMetricsCollector`, `TracingService`, and 89 PHPUnit 11 & Pest test suites.",
    ],
    diagramType: "ai-ops",
  },
  {
    slug: "real-time-booking-platform",
    name: "CarWash — Real-Time Booking, Settlement & Admin Platform",
    shortName: "CarWash Booking & Settlement",
    company: "Adtric Solution Pvt. Ltd.",
    period: "2024 – Present",
    status: "Production · Active",
    category: "Real-Time",
    featured: true,
    tagline:
      "3-app production ecosystem: Express 5 API (46 Prisma models, 15 settlement models, 6 BullMQ workers), Next.js 16 Customer/Partner Portal & MFA Admin Control Plane.",
    summary:
      "A horizontally scalable real-time on-demand service marketplace spanning a Node.js/Express 5 REST & WebSocket API, a Next.js 16 Customer & Partner portal, and a dedicated MFA + Step-Up Auth Admin Control Plane featuring a 15-model double-entry financial settlement ledger, 6 BullMQ background workers, Socket.IO Redis sync, Razorpay payments, and 56 Vitest + Supertest suites.",
    challenge:
      "Bookings, dynamic time slots, partner payout settlements, and live dispatch alerts had to stay synchronized across web, admin, and mobile clients under multi-node horizontal scaling—while guaranteeing financial ledger auditability and zero blocking on emails, pushes, or media uploads.",
    solution:
      "Engineered a 3-app monorepo backed by PostgreSQL & Prisma 7 (46 models across 15 domain schemas including a 15-model double-entry Settlement Ledger & Outbox), Socket.IO with Redis Adapter/Emitter for multi-instance sync, 6 specialized BullMQ workers (`mail`, `notification`, `reminder`, `reminderSweeper`, `slotWarmer`, `cleanup`), AWS S3 presigned URLs, Argon2/JWT/Zod 4/Redis rate limiting, and MFA + Step-Up admin auth.",
    impact:
      "Delivered sub-second API performance with two-tier Redis + LRU caching, fully auditable partner settlement batches/holds/discrepancies, seamless Razorpay & Firebase FCM workflows, Pino + Prometheus observability, and 56 automated Vitest + Supertest test suites.",
    deliveryStages: [
      { stage: "3-App Ecosystem", detail: "Express 5 API + 2 Next.js 16 portals" },
      { stage: "Settlement Core", detail: "46 Prisma models · 15-model finance ledger" },
      { stage: "Realtime & 6 Workers", detail: "Socket.IO Redis mesh + 6 BullMQ queues" },
      { stage: "Hardened Ops", detail: "MFA Admin · PM2 · Pino · Prometheus · 56 tests" },
    ],
    impactMetrics: [
      { value: "46 Models", label: "Modular Prisma PG Schema" },
      { value: "15 Models", label: "Double-Entry Settlement Ledger" },
      { value: "6 Workers", label: "Dedicated BullMQ Queues" },
      { value: "56 Suites", label: "Vitest & Supertest Tests" },
    ],
    tech: [
      "Node.js",
      "Express 5.2",
      "Next.js 16.2",
      "React 19",
      "PostgreSQL",
      "Prisma 7 (46 Models)",
      "Redis & LRU Cache",
      "Socket.IO + Redis Adapter",
      "BullMQ (6 Workers)",
      "AWS S3 Presigned URLs",
      "Razorpay",
      "Firebase Admin FCM",
      "Argon2 & MFA/Step-Up",
      "Zod 4 & Zustand 5",
      "PM2",
      "Pino & Prometheus",
      "Vitest & Supertest",
    ],
    architectureHighlight:
      "Stateless Express 5 nodes stay synchronized over Socket.IO + Redis Adapter while offloading async work to 6 dedicated BullMQ workers and enforcing double-entry partner payout reconciliation across 15 PostgreSQL settlement models.",
    contributions: [
      "Architected a 3-application monorepo comprising the Express 5.2 REST/WebSocket API, a Next.js 16 Customer & Service-Partner Web Portal, and a hardened Next.js 16 Admin Control Plane with MFA (`/mfa`) and Step-Up authentication (`stepUpMiddleware.js`).",
      "Modeled 46 PostgreSQL tables across 13 modular Prisma 7 schema files—including a 15-model double-entry Financial Settlement Engine (`accrualService`, `batchService`, `payoutStateMachine`, `reconciliationService`, `holdService`, `breaker.js` RazorpayX circuit breaker, and `slipPdf.js` PDF settlement slips) plus an 8-model SLA Support system.",
      "Prevented concurrent double-booking and lost events using distributed Redis mutex locks (`redisLocks.js`), `bookingStateMachine.js`, `idempotencyMiddleware.js`, Redis keyspace TTL expiry listeners (`slotKeyspaceListener.js`), transactional outboxes (`slotOutbox.js`, `SettlementOutbox`, `SupportOutboxEvent`), and order completion OTP handshakes (`orderOtpService.js`).",
      "Engineered a multi-tier read cache pairing L1 In-Memory LRU (`l1CacheMiddleware.js`) and L2 Redis with deterministic HTTP 304 ETag revalidation and automatic mutation invalidation (`etagService.js`, `etagInvalidation.js`).",
      "Synchronized real-time booking updates, slot states, and presence across stateless PM2 instances using Socket.IO 4.8 (`@socket.io/redis-adapter`, `@socket.io/redis-emitter`, `slotSockets.js`) while offloading async jobs to 6 BullMQ workers (`mailWorker`, `notificationWorker`, `reminderWorker`, `reminderSweeper`, `slotWarmerWorker`, `cleanupWorker`) plus `settlementWorkers.js`.",
      "Secured auth & admin operations with Argon2 password hashing, stateful sessions (`verifyAdminStatefulSession.js`), dual-channel OTP BullMQ workers (`otpEmailWorker.js`, `otpPhoneSmsWorker.js`), MFA + Step-Up auth (`stepUpMiddleware.js`), automatic audit interception (`adminAuditInterceptor.js` across 4 immutable audit log tables), Cloudflare Turnstile, Helmet, Zod 4, Redis `rate-limiter-flexible`, Pino rolling logs (`utils/logger.js`, `settlementLogger.js`), authenticated Prometheus metrics, live SLA support sweeps (`supportSlaSweeper.js`, `supportTap.js`), async payment webhook worker (`webhookWorker.js`), and 56 Vitest + Supertest test suites.",
    ],
    diagramType: "realtime",
  },
  {
    slug: "realtime-mobile-suite",
    name: "CarWash Mobile App — Dual-Role Customer & Partner Suite",
    shortName: "CarWash Mobile App",
    company: "Adtric Solution Pvt. Ltd.",
    period: "2024 – Present",
    status: "Production · Active",
    category: "Real-Time",
    featured: true,
    tagline:
      "React Native 0.87 (New Architecture) dual-role Customer & Partner mobile app with ETag query caching, live socket resync, and instant dispatch alerts.",
    summary:
      "A unified cross-platform React Native 0.87 mobile application serving both customers and service partners across 20+ modular feature domains—engineered for mobile network resilience with a custom HTTP ETag query cache, automatic WebSocket resync coordinator, live partner booking dispatch alerts, native Razorpay checkout, and Reanimated 4 animations.",
    challenge:
      "Mobile users on fluctuating cellular networks experienced stale booking screens, dropped WebSocket events, and wasted bandwidth on repeated polling—while service partners needed instantaneous, unmistakable dispatch alerts when new paid bookings arrived.",
    solution:
      "Structured a clean feature-sliced React Native 0.87 (New Architecture + TypeScript 6) codebase with a custom `infrastructure/` layer: `etagClient` + `queryCacheEngine` for 304 conditional caching, `socketManager` + `connectivityMonitor` + `globalResyncCoordinator` for automatic reconnect reconciliation, live partner dispatch alerts + Firebase FCM, `crashGuard`, and `AppUpdateGate`.",
    impact:
      "Delivered fluid 60fps mobile interactions via NativeWind 4 and Reanimated 4 Worklets, dramatically reduced redundant API payloads via ETag caching, unified Customer and Partner workflows via instant RoleToggle, and ensured rock-solid session & crash safety.",
    deliveryStages: [
      { stage: "20+ Feature Modules", detail: "Customer booking & Partner hub in one binary" },
      { stage: "ETag Cache Engine", detail: "HTTP 304 conditional caching + Zustand 5" },
      { stage: "Realtime & Dispatch", detail: "Socket resync, FCM push & live partner alerts" },
      { stage: "Native Hardening", detail: "Razorpay SDK, CrashGuard & AppUpdateGate" },
    ],
    impactMetrics: [
      { value: "RN 0.87", label: "New Architecture + TS 6" },
      { value: "20+ Mods", label: "Feature-Sliced Domains" },
      { value: "ETag Cache", label: "Custom 304 Query Engine" },
      { value: "Live Sync", label: "Socket Resync + Alerts" },
    ],
    tech: [
      "React Native 0.87",
      "React 19",
      "TypeScript 6",
      "NativeWind 4",
      "Reanimated 4 & Worklets",
      "Zustand 5",
      "Zod 4",
      "Socket.IO Client 4.8",
      "Native Razorpay SDK",
      "Firebase FCM",
      "AsyncStorage & Secure Storage",
      "Geolocation & Media Picker",
    ],
    architectureHighlight:
      "Custom mobile infrastructure layer combining HTTP ETag conditional caching (`etagClient` + `queryCacheEngine`) with a `globalResyncCoordinator` that reconciles Socket.IO state automatically across offline/online transitions.",
    contributions: [
      "Built a dual-role React Native 0.87 (New Architecture) mobile application covering 20+ modular feature domains including Home, Search, Outlet Discovery, Slot Booking, Orders, Favorites, Partner Hub, Payouts, Live Dispatch Alerts, Support, and Inquiries.",
      "Engineered a custom `etagClient` and `queryCacheEngine` backed by AsyncStorage to serve cached views instantly and revalidate via HTTP 304 ETags.",
      "Implemented `socketManager`, `connectivityMonitor`, `sessionInvalidator`, and `globalResyncCoordinator` to recover gracefully from network drops and resynchronize live booking/order state.",
      "Built complete mobile auth & security lifecycle: `AuthNavigator`, 3 role route guards (`UserGuard`, `VendorGuard`, `UserVendorGuard`), multi-device session management (`ActiveSessionsCard`), live `sessionInvalidator`, and full Order OTP verification modals (`OtpTimerCard`, `VerifyOrderOtpModal`, `RotateOtpConfirmModal`).",
      "Created the dual-sided live ringing dispatch overlay (`GlobalRingingOverlay`, `VendorRingingModal`, `UserRingingModal`, `ringingStore`) paired with Firebase Cloud Messaging (`fcmService`) and `notificationSyncEngine`.",
      "Integrated native Razorpay checkout (`react-native-razorpay`), device geolocation, native camera/gallery media pickers for S3 presigned uploads, structured mobile logging (`infrastructure/logger`), `CrashGuard` error boundaries, `AppUpdateGate`, and native Light/Dark theming.",
    ],
    diagramType: "mobile-app",
  },
  {
    slug: "m3m-india",
    name: "M3MIndia.com — Real Estate Web Platform",
    shortName: "M3MIndia.com",
    company: "Adtric Solution Pvt. Ltd.",
    period: "2024 – Present",
    status: "Live · Production",
    category: "Enterprise Web",
    featured: true,
    liveUrl: "https://m3mindia.com",
    tagline:
      "High-speed enterprise real estate discovery, OTP-verified lead pipelines, and AWS CloudFront edge caching.",
    summary:
      "Enterprise web platform for one of India's prominent real estate portfolios covering residential, commercial, retail, and office properties—engineered for fast asset delivery via AWS S3 & CloudFront, strong organic SEO, and verified lead capture.",
    challenge:
      "Media-heavy real estate project pages across four property sectors needed significantly faster load performance, clean organic search migration without losing link equity, and spam-resistant lead capture.",
    solution:
      "Built dynamic Laravel property listings, project pages, and OTP-verified lead flows while offloading and caching media assets through AWS S3 and CloudFront CDN, backed by clean SEO redirects, XML sitemaps, and hardened Nginx hosting.",
    impact:
      "Improved frontend rendering speed and edge cache hit rates across residential, commercial, retail, and office catalogs while delivering dependable automated server deployments and backup routines.",
    deliveryStages: [
      { stage: "Property Engine", detail: "Dynamic listings & campaign landing pages" },
      { stage: "Lead Security", detail: "OTP-verified lead capture across 4 sectors" },
      { stage: "Edge Speed", detail: "Frontend optimization + AWS S3 & CloudFront" },
      { stage: "SEO & Hosting", detail: "Redirects, sitemaps, Nginx & backups" },
    ],
    impactMetrics: [
      { value: "4 Sectors", label: "Residential · Commercial · Retail · Office" },
      { value: "Edge CDN", label: "AWS S3 + CloudFront Delivery" },
      { value: "OTP Auth", label: "Verified Lead Generation" },
      { value: "Full Ops", label: "SEO · Sitemaps · Migration" },
    ],
    tech: [
      "PHP",
      "Laravel",
      "MySQL",
      "JavaScript",
      "HTML5",
      "CSS3",
      "AWS S3",
      "AWS CloudFront",
      "Nginx",
      "Linux",
      "Git",
    ],
    architectureHighlight:
      "Static media and property galleries offloaded to AWS S3 behind CloudFront CDN caching, paired with technical SEO redirects, XML sitemaps, and hardened Nginx production hosting.",
    contributions: [
      "Built dynamic web pages for property listings, flagship project showcases, campaign landing pages, and OTP-verified lead generation forms across residential, commercial, retail, and office categories.",
      "Improved storefront load speed by optimizing frontend assets, implementing caching layers, and serving media through AWS S3 and CloudFront CDN.",
      "Managed technical SEO foundations including URL redirects, dynamic XML sitemaps, and platform migration workflows.",
      "Handled production server setup, hosting configuration, deployments, and automated backup routines on Linux and Nginx.",
    ],
    diagramType: "m3m",
  },
  {
    slug: "capital-bank",
    name: "Capital.bank.in — Digital Banking Web Platform",
    shortName: "Capital.bank.in",
    company: "Adtric Solution Pvt. Ltd.",
    period: "2024 – Present",
    status: "Live · Production",
    category: "Enterprise Web",
    featured: true,
    liveUrl: "https://capital.bank.in",
    tagline:
      "Reusable banking product architecture, custom editorial CMS, and hardened fintech backend APIs.",
    summary:
      "Digital banking web presence and content management system built with Laravel and MySQL, prioritizing strict input validation, optimized relational queries, secure third-party integrations, and reliable cross-browser accessibility.",
    challenge:
      "Banking product teams required an agile CMS to publish and maintain financial service pages rapidly while meeting strict fintech security standards, database speed targets, and cross-browser compatibility.",
    solution:
      "Engineered a modular reusable component library backed by a custom Laravel CMS, hardened backend validation layers, tuned MySQL queries, and resilient third-party banking API integrations deployed on Linux/Apache/Nginx.",
    impact:
      "Accelerated product page rollout for banking teams while elevating API input safety, database query efficiency, responsive UX consistency, and production stability.",
    deliveryStages: [
      { stage: "Modular UI", detail: "Reusable banking product & service pages" },
      { stage: "Custom CMS", detail: "Structured editorial workflows in Laravel" },
      { stage: "Hardened Core", detail: "Strict input validation & query tuning" },
      { stage: "Production Ops", detail: "3rd-party APIs & Linux server management" },
    ],
    impactMetrics: [
      { value: "Fintech", label: "Hardened Banking Backend" },
      { value: "Custom CMS", label: "Reusable Product Components" },
      { value: "REST APIs", label: "Verified 3rd-Party Integrations" },
      { value: "Production", label: "Server Setup & Maintenance" },
    ],
    tech: [
      "PHP",
      "Laravel",
      "MySQL",
      "REST APIs",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Apache",
      "Nginx",
      "Linux",
      "Git",
    ],
    architectureHighlight:
      "Modular banking product templates powered by a custom Laravel CMS and strictly validated server-side API boundaries running on hardened Linux/Nginx infrastructure.",
    contributions: [
      "Developed responsive web pages for banking products and financial services using reusable UI components backed by a custom-built CMS.",
      "Implemented secure backend business logic with thorough request validation, optimized MySQL database queries, and resilient third-party API integrations.",
      "Improved frontend responsiveness, performance, and cross-browser compatibility for diverse banking customers.",
      "Supported production deployment pipelines, server configuration, and ongoing platform maintenance.",
    ],
    diagramType: "capital-bank",
  },
  {
    slug: "shabd-publishing-marketplace",
    name: "Shabd.in — Multilingual Publishing & Marketplace",
    shortName: "Shabd.in",
    company: "I3 Infosoft Pvt. Ltd.",
    period: "2021 – 2024",
    status: "Shipped · Production",
    category: "Earlier Products",
    featured: false,
    liveUrl: "https://shabd.in",
    tagline:
      "Multilingual writing, self-publishing, and monetization ecosystem for authors and readers.",
    summary:
      "An online writing, publishing, and sales marketplace empowering authors to write, publish, and monetize books and articles across multiple languages with category-driven discovery and reader reviews.",
    challenge:
      "Regional and multilingual authors needed a friction-free workspace to draft, publish, and monetize books and articles while helping readers discover works effortlessly by language and category.",
    solution:
      "Architected a full-stack Laravel & MySQL publishing engine with multilingual manuscript management, structured category search, reader review flows, and integrated author monetization.",
    impact:
      "Enabled scalable multilingual self-publishing and direct commerce workflows for authors and readers on Shabd.in.",
    deliveryStages: [
      { stage: "Author Studio", detail: "Multilingual book & article publishing" },
      { stage: "Discovery", detail: "Category search & reader review engine" },
      { stage: "Monetization", detail: "Marketplace sales & author workflows" },
      { stage: "Production", detail: "Optimized MySQL catalog indexing" },
    ],
    impactMetrics: [
      { value: "Multilingual", label: "Regional Author Publishing" },
      { value: "Commerce", label: "Book & Article Monetization" },
    ],
    tech: ["PHP", "Laravel", "MySQL", "JavaScript", "REST APIs", "HTML5/CSS3"],
    architectureHighlight:
      "End-to-end Laravel publishing workflow supporting multilingual manuscripts, category indexing, reader reviews, and author monetization.",
    contributions: [
      "Designed and developed a multilingual publishing and marketplace platform enabling authors to write, publish, and monetize books and articles.",
      "Implemented structured category search, reader review workflows, and scalable MySQL data modeling for large content catalogs.",
    ],
    diagramType: "shabd",
  },
  {
    slug: "4achievers-crm-lms",
    name: "4Achievers — B2B CRM & Learning Management System",
    shortName: "4Achievers CRM & LMS",
    company: "I3 Infosoft Pvt. Ltd.",
    period: "2021 – 2024",
    status: "Shipped · GemsBond Award",
    category: "Earlier Products",
    featured: false,
    liveUrl: "https://4achieversonline.com",
    tagline:
      "Unified B2B sales/support CRM paired with a batch, trainer, and student counselling LMS.",
    summary:
      "An operational B2B CRM covering sales pipelines, customer support, marketing campaigns, and team productivity alongside an integrated LMS managing batches, trainers, student counselling, feedback, and chat.",
    challenge:
      "EdTech operations were fragmented across separate sales spreadsheets and disconnected training portals, causing handoff friction between lead acquisition, student counselling, and batch execution.",
    solution:
      "Built an integrated Laravel B2B CRM (Sales, Support, Campaigns, Productivity Tracking) directly connected to a full LMS managing batches, trainers, student counselling records, feedback, and live chat.",
    impact:
      "Streamlined end-to-end lead-to-enrollment operations and earned the GemsBond recognition award for execution quality.",
    deliveryStages: [
      { stage: "B2B CRM", detail: "Sales, support, campaigns & productivity" },
      { stage: "EdTech LMS", detail: "Batch & trainer scheduling workflows" },
      { stage: "Student Care", detail: "Counselling tracking, feedback & chat" },
      { stage: "Recognition", detail: "Earned GemsBond delivery award" },
    ],
    impactMetrics: [
      { value: "CRM + LMS", label: "Unified Operations Suite" },
      { value: "GemsBond", label: "Award-Winning Delivery" },
    ],
    tech: ["PHP", "Laravel", "MySQL", "JavaScript", "Real-Time Chat", "REST APIs"],
    architectureHighlight:
      "Connected B2B lead-to-enrollment lifecycle bridging sales CRM tracking directly into active LMS batches, trainer schedules, and student support chat.",
    contributions: [
      "Designed and developed a B2B CRM covering Sales, Support, Marketing Campaigns, and team productivity tracking.",
      "Built the companion LMS featuring Batch and Trainer Management, Student Counselling Tracking, Feedback workflows, and integrated Chat.",
      "Earned the GemsBond recognition award for execution quality and business impact.",
    ],
    diagramType: "crm-lms",
  },
  {
    slug: "jobhubster-job-portal",
    name: "Jobhubster.in — Dual-Sided Job Portal",
    shortName: "Jobhubster.in",
    company: "I3 Infosoft Pvt. Ltd.",
    period: "2021 – 2024",
    status: "Shipped · Production",
    category: "Earlier Products",
    featured: false,
    liveUrl: "https://jobhubster.in",
    tagline:
      "Candidate discovery, résumé search, application tracking, and automated job recommendations.",
    summary:
      "A two-sided recruitment marketplace serving both job seekers and employer recruiters with profile/résumé indexing, application tracking, auto-generated job postings, and tailored job recommendations.",
    challenge:
      "Recruiters needed rapid candidate and résumé filtering while job seekers needed streamlined profile creation, application status visibility, and relevant opening discovery.",
    solution:
      "Engineered both the seeker and recruiter portals in Laravel & MySQL with auth-key recruiter onboarding, candidate/résumé search indexing, application tracking, auto-generated job posts, and job recommendations.",
    impact:
      "Unified employer sourcing and candidate tracking in a single responsive recruitment platform.",
    deliveryStages: [
      { stage: "Seeker Portal", detail: "Profiles, search & application tracking" },
      { stage: "Recruiter Suite", detail: "Auth-key onboarding & résumé search" },
      { stage: "Automation", detail: "Auto-generated job posts & recommendations" },
      { stage: "Production", detail: "Indexed MySQL search performance" },
    ],
    impactMetrics: [
      { value: "2-Sided", label: "Seeker & Recruiter Portals" },
      { value: "ATS + Search", label: "Résumé & Candidate Indexing" },
    ],
    tech: ["PHP", "Laravel", "MySQL", "JavaScript", "Full-Text Search"],
    architectureHighlight:
      "Indexed candidate and résumé search paired with recruiter auth-key onboarding, application pipeline tracking, and automated recommendation matching.",
    contributions: [
      "Built both the job seeker and employer recruiter portals end to end with role-specific onboarding and dashboards.",
      "Implemented Candidate Search, Résumé Search, Application Tracking, Auto-Generated Job Posts, and Job Recommendations.",
    ],
    diagramType: "jobhubster",
  },
  {
    slug: "employee-attendance-desktop",
    name: "Employee Attendance Desktop Application",
    shortName: "Attendance Desktop App",
    company: "I3 Infosoft Pvt. Ltd.",
    period: "2021 – 2024",
    status: "Shipped · Internal Desktop",
    category: "Earlier Products",
    featured: false,
    tagline:
      "Office-enforced Electron.js attendance client with automated shift-end prompts and admin review.",
    summary:
      "A dedicated Electron.js desktop timekeeping application that restricts clock-in strictly to office presence, prompts employees at shift end, and submits structured work logs for administrative review.",
    challenge:
      "Manual web attendance tracking allowed off-site check-ins and missed shift-end sign-offs, making administrative work-hour reviews error-prone.",
    solution:
      "Built a dedicated Electron.js desktop utility enforcing office-only clock-in rules, displaying automated shift-end alerts and shutdown prompts, and syncing daily work-time logs to admin review dashboards.",
    impact:
      "Standardized accurate in-office attendance logging and automated daily shift compliance across teams.",
    deliveryStages: [
      { stage: "Desktop Client", detail: "Electron.js native workstation app" },
      { stage: "Office Policy", detail: "In-office-only clock-in enforcement" },
      { stage: "Shift Automation", detail: "Automated alerts & shutdown prompts" },
      { stage: "Admin Audit", detail: "Structured daily work-time review logs" },
    ],
    impactMetrics: [
      { value: "Electron.js", label: "Cross-Platform Desktop Client" },
      { value: "Office-Only", label: "Policy-Enforced Clock-In" },
    ],
    tech: ["Electron.js", "JavaScript", "Node.js", "REST APIs"],
    architectureHighlight:
      "Lightweight native desktop wrapper communicating with attendance APIs to enforce office-boundary clock-in rules and automated end-of-day workstation reminders.",
    contributions: [
      "Designed and developed an Electron.js employee attendance desktop tracker enforcing in-office clock-in restrictions.",
      "Implemented automated shift-end alerts, workstation shutdown prompts, and structured work-time logging for admin review.",
    ],
    diagramType: "attendance",
  },
];

export const architecturePillars: ArchitecturePillar[] = [
  {
    id: "rag-agents",
    code: "ARCH-01",
    title: "Autonomous AI Agents & Hybrid RAG",
    summary:
      "Production agent orchestration combining semantic vector retrieval with exact lexical search and deterministic tool verification—built to eliminate hallucinations and prompt injection.",
    specs: [
      "39 bounded tools & 19 domain skills capped at 6 reasoning steps via Laravel AI SDK",
      "Pinecone Serverless (1024-dim Jina embeddings, sentence-aware chunking) + MySQL Full-Text fused via Reciprocal Rank Fusion",
      "Lexical & cosine similarity grounding checks against tool outputs + prompt injection sanitization",
    ],
    technologies: ["Laravel AI SDK", "Pinecone", "Jina AI", "MySQL FTS", "MCP"],
    metric: { value: "39 Tools", label: "Grounded Agent Execution" },
  },
  {
    id: "llm-gateway",
    code: "ARCH-02",
    title: "Resilient Multi-LLM Gateway & Token Economics",
    summary:
      "Provider-agnostic inference routing engineered to survive upstream rate limits and billing faults while keeping production LLM spend lean.",
    specs: [
      "Multi-provider failover across Groq, Google Gemini, and OpenRouter",
      "Automatic circuit breakers tripping on HTTP 429/402 errors with instant standby switchover",
      "30–50% token cost savings via duplicate conversation history removal and tool payload compression",
    ],
    technologies: ["Groq", "Google Gemini", "OpenRouter", "Circuit Breakers", "SSE"],
    metric: { value: "30–50%", label: "Lower LLM Token Cost" },
  },
  {
    id: "realtime-queues",
    code: "ARCH-03",
    title: "Real-Time Pub/Sub & Async Worker Queues",
    summary:
      "Responsive APIs that never block on slow side effects—decoupling live client updates from durable background execution across horizontally scaled nodes.",
    specs: [
      "Socket.IO paired with Redis adapter synchronizing live events across multiple Express 5 instances",
      "BullMQ + Redis queues handling notifications, emails, and payment reminders with reliable retries",
      "Server-Sent Events (SSE) for real-time AI streaming and AWS S3 presigned URLs for direct client uploads",
    ],
    technologies: ["Socket.IO", "Redis Adapter", "BullMQ", "SSE", "AWS S3"],
    metric: { value: "Multi-Node", label: "Horizontal Live Sync" },
  },
  {
    id: "db-concurrency",
    code: "ARCH-04",
    title: "Database Performance & Concurrency Control",
    summary:
      "Designing schemas and transaction boundaries that stay fast under read load and stay consistent when multiple workers touch the same records.",
    specs: [
      "Composite indexing, pre-calculated queries, and eager loading eliminating N+1 bottlenecks in MySQL 8 & PostgreSQL",
      "Row-level lockForUpdate and optimistic versioning preventing race conditions on concurrent updates",
      "Two-tier Redis + in-memory LRU caching with compressed HTTP responses for low-latency APIs",
    ],
    technologies: ["MySQL 8", "PostgreSQL", "Prisma", "Redis", "LRU Cache"],
    metric: { value: "ACID Safe", label: "Zero Race Conditions" },
  },
  {
    id: "zero-trust",
    code: "ARCH-05",
    title: "Zero-Trust Security & Enterprise Connectors",
    summary:
      "Defense-in-depth authorization across traditional REST endpoints, OAuth 2.0 integrations, and autonomous AI tool invocations.",
    specs: [
      "3-layer ZTD RBAC (Admin, Manager, Employee): database query scoping, controller 403 guards, and AI tool permissions",
      "AES-256 encrypted OAuth 2.0 token storage for Microsoft Graph & Google Workspace with 24-hour draft undo",
      "JWT, Argon2 password hashing, Helmet, Zod schema validation, OTP 2FA, and Redis rate limiting",
    ],
    technologies: ["RBAC + ZTD", "OAuth 2.0", "AES-256", "Argon2", "Zod"],
    metric: { value: "3-Layer", label: "Zero-Trust Enforcement" },
  },
  {
    id: "cloud-observability",
    code: "ARCH-06",
    title: "AWS Cloud Infrastructure & Observability",
    summary:
      "Production-grade deployment, edge caching, structured telemetry, and automated regression suites built for confident releases.",
    specs: [
      "AWS EC2, S3, RDS, and CloudFront CDN with Nginx/Apache reverse proxies on Linux",
      "PM2 hot-reload process orchestration, Supervisor workers, Pino structured logs, and Prometheus metrics",
      "65+ PHPUnit & Pest tests (including prompt injection & golden agent cases) plus Vitest & Supertest API tests",
    ],
    technologies: ["AWS", "CloudFront", "Nginx", "PM2", "Pino", "Prometheus"],
    metric: { value: "65+ Tests", label: "Verified Production Suites" },
  },
];

export const achievements: AchievementItem[] = [
  {
    title: "Developer of the Year 2024",
    organization: "I3 Infosoft Pvt. Ltd.",
    year: "2024",
    category: "Honor",
    description:
      "Recognized as top engineering performer for delivering scalable Laravel platforms, MySQL optimizations, and flagship multi-domain products.",
  },
  {
    title: "30–50% LLM Token Cost Reduction",
    organization: "Enterprise AI Operations Platform",
    year: "2024–2026",
    category: "Engineering Impact",
    description:
      "Significantly reduced production LLM inference expenditure through conversation history deduplication and structured tool-response compression.",
  },
  {
    title: "39-Tool Grounded Autonomous AI Agent",
    organization: "Adtric Solution Pvt. Ltd.",
    year: "2024–2026",
    category: "Engineering Impact",
    description:
      "Architected an enterprise AI agent with 19 domain skills, Hybrid RAG (Pinecone + MySQL RRF), multi-LLM circuit breakers, and 65+ PHPUnit/Pest tests.",
  },
  {
    title: "Vintage Warrior Award",
    organization: "I3 Infosoft Pvt. Ltd.",
    year: "2021–2024",
    category: "Honor",
    description:
      "Honored for sustained technical ownership, architectural reliability, and consistent delivery across long-term client platforms.",
  },
  {
    title: "GemsBond Recognition",
    organization: "4Achievers CRM & LMS",
    year: "2021–2024",
    category: "Honor",
    description:
      "Awarded for engineering excellence in building and shipping the 4Achievers B2B CRM and Learning Management System.",
  },
  {
    title: "Bachelor of Computer Science (BCS)",
    organization: "Mahatma Jyotiba Phule Rohilkhand University",
    year: "2017–2019",
    category: "Education",
    description:
      "Completed undergraduate studies in Computer Science, building the core foundation in algorithms, databases, and software engineering.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Who is Mohd Sufiyan and what does he specialize in?",
    answer:
      "Mohd Sufiyan is a Senior Software Engineer based in Noida, India with 5.5+ years of production experience specializing in full-stack architecture (Laravel 12/PHP 8.2, Node.js/Express 5, Next.js 16, React Native 0.87), distributed real-time systems (Socket.IO, Redis, BullMQ), database performance tuning (PostgreSQL, MySQL 8), AWS infrastructure, and production AI systems including Hybrid RAG and autonomous multi-tool LLM agents.",
  },
  {
    question: "How does his Enterprise AI Operations platform prevent LLM hallucinations, prompt injection, and provider outages?",
    answer:
      "Built on Laravel 12 and the Laravel AI SDK, it pairs a Hybrid RAG retrieval layer (Pinecone Serverless 1024-dim Jina embeddings fused with MySQL 8 Full-Text Search via Reciprocal Rank Fusion) with lexical and cosine similarity grounding verification (GroundednessService), prompt-injection sanitization, 3-layer Zero-Trust RBAC (Admin, Manager, Employee), and a multi-provider LLM gateway (Groq, Google Gemini, OpenRouter) with automatic 429/402 circuit breakers. History deduplication and tool payload compression cut LLM token costs by 30–50%, verified across 89 PHPUnit & Pest test suites.",
  },
  {
    question: "How does he architect scalable real-time booking and double-entry financial settlement systems?",
    answer:
      "In his 3-app Express 5 + Next.js 16 + PostgreSQL (Prisma 7, 46 models) platform, live bookings synchronize across stateless PM2 nodes via Socket.IO with a Redis adapter while distributed Redis mutex locks and keyspace expiry listeners prevent double-booking. Partner payouts run on a 15-model double-entry settlement ledger with transactional outboxes, MFA Step-Up authorization, a payout circuit breaker, L1 LRU + L2 Redis + HTTP 304 ETag caching, and 6 BullMQ worker queues backed by 56 Vitest & Supertest suites.",
  },
  {
    question: "How does he build offline-resilient React Native mobile applications?",
    answer:
      "His dual-role React Native 0.87 (New Architecture) mobile suite spans 20+ modular feature domains with a custom HTTP 304 ETag query cache engine, automatic Socket.IO reconnection and state reconciliation (GlobalResyncCoordinator), live partner ringing dispatch alerts via Firebase Cloud Messaging, native Razorpay checkout, Reanimated 4 60fps UI transitions, CrashGuard error boundaries, and AppUpdateGate version enforcement.",
  },
  {
    question: "What awards, education, and career milestones support his engineering background?",
    answer:
      "Mohd Sufiyan holds a Bachelor of Computer Science (BCS) from Mahatma Jyotiba Phule Rohilkhand University (2017–2019). He has engineered production systems at Adtric Solution Pvt. Ltd. (May 2024 – Present) and I3 Infosoft Pvt. Ltd. (Jan 2021 – Mar 2024), earning Developer of the Year 2024 and Vintage Warrior at I3 Infosoft plus the GemsBond award for the 4Achievers CRM & LMS platform.",
  },
  {
    question: "How can recruiters, engineering managers, or clients contact Mohd Sufiyan directly?",
    answer:
      "You can contact Mohd Sufiyan directly without any contact form via email at sufiyanmohd345@gmail.com, by phone at +91-9193221557, or connect via LinkedIn (linkedin.com/in/mohd-sufiyan-it) and GitHub (github.com/mohdsufiyaan). His latest resume PDF is also available for instant download on this portfolio.",
  },
];
