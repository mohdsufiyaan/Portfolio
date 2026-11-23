"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as d3 from "d3";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Lock,
  Server,
  Smartphone,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

type ViewLayerId = "overview" | "security" | "data-caching" | "realtime-ops";

interface ArchNode {
  id: string;
  col: 0 | 1 | 2;
  row: number;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  whatItDoes: string;
  howBuilt: string;
  modules: string[];
}

interface ArchEdge {
  from: string;
  to: string;
  color: string;
}

interface DiagramView {
  id: ViewLayerId;
  label: string;
  caption: string;
  colHeaders: [string, string, string];
  nodes: ArchNode[];
  edges: ArchEdge[];
}

interface SystemBlueprint {
  id: "ai-agent" | "realtime-platform" | "mobile-suite";
  slug: string;
  tabLabel: string;
  tag: string;
  title: string;
  subtitle: string;
  verifiedMetrics: { value: string; label: string }[];
  techStack: string[];
  documentation: {
    overviewAndFeatures: string;
    systemAndDbArchitecture: string;
    authAndSecurity: string;
    dataFlowAndWorkflows: string;
    realtimeAndBackgroundJobs: string;
    scalabilityAndFaultTolerance: string;
    challengesAndSolutions: string;
  };
  views: Record<ViewLayerId, DiagramView>;
}

const VIEW_TABS: { id: ViewLayerId; label: string; icon: typeof Layers }[] = [
  { id: "overview", label: "High-Level & API Flow", icon: Layers },
  { id: "security", label: "Auth, RBAC & Security", icon: Lock },
  { id: "data-caching", label: "DB, Caching & Queues", icon: Database },
  { id: "realtime-ops", label: "Real-Time, Failover & Ops", icon: Activity },
];

const BLUEPRINTS: SystemBlueprint[] = [
  /* ==========================================================================
     1. ENTERPRISE AUTONOMOUS AI OPERATIONS ENGINE (Laravel 12)
  ========================================================================== */
  {
    id: "ai-agent",
    slug: "enterprise-ai-operations",
    tabLabel: "AI Task Management & EOD",
    tag: "AI TASK MANAGEMENT & EOD PLATFORM · LARAVEL 12",
    title: "AI Task Management & EOD Operations Platform",
    subtitle:
      "Laravel 12 · PHP 8.2 · Laravel AI SDK · 28 Models · 39 Tools · Hybrid RAG · Multi-LLM Gateway · 89 Test Suites",
    verifiedMetrics: [
      { value: "39 Tools", label: "Autonomous Laravel AI Tools" },
      { value: "28 Models", label: "Eloquent Domain & Telemetry Schema" },
      { value: "30–50%", label: "LLM Token Cost Reduction" },
      { value: "89 Suites", label: "PHPUnit 11 & Pest Test Files" },
    ],
    techStack: [
      "Laravel 12",
      "PHP 8.2",
      "Laravel AI SDK",
      "MySQL 8 (FTS + Composite Indexes)",
      "Pinecone Serverless (1024-dim)",
      "Jina AI Embeddings",
      "Groq · Google Gemini · OpenRouter",
      "Slack Bot, Block Kit & Voice Transcription",
      "WhatsApp, FCM & Slack Notifications",
      "17 Unified Mail & Calendar Tools",
      "Sanctum · OTP 2FA · PII Redaction",
      "MS Graph & Google OAuth 2.0 (AES-256)",
      "6 Queue Worker Channels · 89 Tests",
    ],
    documentation: {
      overviewAndFeatures:
        "An autonomous enterprise operations platform enabling teams to delegate tasks via web chat or a two-way Slack AI Bot (including Slack voice note transcription), track execution time via live stopwatches, generate 0–100 End-of-Day employee performance scorecards, search operational manuals via Hybrid RAG, and orchestrate 17 unified Microsoft 365 & Google Workspace mail/calendar tools with 24-hour undoable drafts.",
      systemAndDbArchitecture:
        "Built on Laravel 12 & PHP 8.2 with 22 HTTP controllers, 28 relational domain models covering tasks, AI turns, audit telemetry, mail connections, semantic memory, Slack bindings, and notification preferences, backed by a custom Agentic Harness driving 39 core tools plus 17 mail/calendar connectors.",
      authAndSecurity:
        "Enforces Sanctum token auth with OTP 2FA and 3-layer Zero-Trust Defense (ZTD) across Admin, Manager, and Employee roles—spanning database query scoping, HTTP 403 controller checks, and AI tool execution gates. Cryptographically verifies Slack payloads, blocks prompt injections, encrypts OAuth tokens with AES-256, and automatically redacts PII/secrets from structured logs.",
      dataFlowAndWorkflows:
        "Chat turns from Web SSE or Slack flow through request preprocessing, semantic intent routing, mode governance, dynamic tool selection, and token budgeting into a bounded 6-step orchestration loop—with lexical and cosine grounding verification and full per-step audit tracing.",
      realtimeAndBackgroundJobs:
        "Streams reasoning tokens over Server-Sent Events (SSE), runs a Slack Socket Mode listener, and dispatches multi-channel alerts across In-App, Firebase FCM, WhatsApp, and Slack alongside 15+ async workers (background task slicing, embedding generation, document ingestion, and mail delta sync) across 6 priority queue lanes.",
      scalabilityAndFaultTolerance:
        "Routes LLM inference through a multi-provider gateway with provider-specific codecs, shared quota governance, burst rate limiting, and automatic circuit breakers on HTTP 429/402 errors that switch seamlessly across Groq, Google Gemini, and OpenRouter with graceful degraded fallback.",
      challengesAndSolutions:
        "Cut context bloat and LLM spend by 30–50% via structured tool-result compression and rolling conversation summarization. Eliminated concurrent task race conditions with MySQL 8 pessimistic row locking plus optimistic versioning, and built CLI operational diagnostics for production log and usage analysis.",
    },
    views: {
      overview: {
        id: "overview",
        label: "High-Level & API Flow",
        caption: "End-to-end request lifecycle from SSE chat ingress through the 39-tool Agentic Harness to Hybrid RAG and Multi-LLM providers.",
        colHeaders: [
          "01 · INGRESS & WORKSPACE",
          "02 · AGENTIC HARNESS CORE",
          "03 · RAG, GATEWAY & DATA",
        ],
        nodes: [
          {
            id: "chat-api",
            col: 0,
            row: 0,
            title: "Streaming Chat Ingress",
            subtitle: "SSE Stream · Turn Orchestration",
            badge: "API INGRESS",
            color: "#38bdf8",
            whatItDoes: "Accepts authenticated chat turns, initializes stateful turn tracking, and streams live reasoning steps and tokens over Server-Sent Events.",
            howBuilt: "Implemented as an authenticated Laravel streaming API layer with session/token validation and persistent turn-state tracking.",
            modules: ["SSE Streaming API", "Turn State Tracking", "Auth Middleware", "Session Guard"],
          },
          {
            id: "mail-oauth",
            col: 0,
            row: 1,
            title: "Slack AI Bot & OAuth",
            subtitle: "Voice · Block Kit · MS365/Gmail",
            badge: "INTEGRATIONS",
            color: "#34d399",
            whatItDoes: "Runs a two-way Slack AI Bot (slash commands, Block Kit cards, and voice note transcription) alongside 17 unified MS365 & Gmail/Calendar tools with 24-hour undo.",
            howBuilt: "Combines cryptographic Slack webhook verification, voice-to-text transcription, unified OAuth 2.0 mail/calendar connectors, and reversible draft queues.",
            modules: ["Slack AI Chat & Voice", "Block Kit Workflows", "17 Mail & Calendar Tools", "24h Draft Undo"],
          },
          {
            id: "orchestrator",
            col: 1,
            row: 0,
            title: "Agent Orchestration Core",
            subtitle: "39 Tools · ≤6 Reasoning Steps",
            badge: "HARNESS",
            color: "#fb923c",
            whatItDoes: "Routes intent, selects permitted domain tools, enforces token budgets, and coordinates bounded multi-step tool execution.",
            howBuilt: "Combines semantic intent classification, execution mode governance, dynamic tool registry selection, and per-turn token budget enforcement.",
            modules: ["Semantic Intent Router", "Dynamic Tool Selector", "39-Tool Registry", "Token Budget Manager"],
          },
          {
            id: "grounding",
            col: 1,
            row: 1,
            title: "Groundedness & EOD",
            subtitle: "Cosine Check · 0–100 Scores",
            badge: "VERIFICATION",
            color: "#a78bfa",
            whatItDoes: "Validates model claims against tool outputs using lexical and cosine similarity and computes 0–100 employee EOD performance scorecards.",
            howBuilt: "Pairs post-generation verification guards and reply safety checks with an automated performance scoring and anomaly detection engine.",
            modules: ["Cosine Grounding Check", "Reply Verification Guard", "0–100 EOD Scoring", "Anomaly Detection"],
          },
          {
            id: "hybrid-rag",
            col: 2,
            row: 0,
            title: "Hybrid RAG (RRF)",
            subtitle: "Pinecone 1024d + MySQL FTS",
            badge: "RETRIEVAL",
            color: "#22d3ee",
            whatItDoes: "Fuses semantic vector search with exact MySQL Full-Text Search using Reciprocal Rank Fusion across manuals and tasks.",
            howBuilt: "Indexes sentence-aware 1024-dim Jina embeddings in Pinecone Serverless alongside MySQL Full-Text indexes and merges results via RRF.",
            modules: ["Pinecone 1024d Index", "MySQL Full-Text Search", "Reciprocal Rank Fusion", "Knowledge Retrieval"],
          },
          {
            id: "llm-gateway",
            col: 2,
            row: 1,
            title: "Multi-LLM Gateway",
            subtitle: "Groq → Gemini → OpenRouter",
            badge: "FAILOVER",
            color: "#fb923c",
            whatItDoes: "Routes inference across providers and trips automatic circuit breakers on 429/402 errors to fail over without user disruption.",
            howBuilt: "Normalizes provider APIs behind unified codecs with shared quota tracking, automatic cooldown recovery, and degraded-mode fallback.",
            modules: ["Multi-Provider Router", "Shared Quota Governance", "429/402 Circuit Breaker", "Degraded Fallback"],
          },
          {
            id: "mysql-store",
            col: 2,
            row: 2,
            title: "MySQL 8 & Telemetry",
            subtitle: "28 Models · Audit Telemetry",
            badge: "PERSISTENCE",
            color: "#38bdf8",
            whatItDoes: "Persists tasks, time logs, EOD reports, conversation sequence messages, and retrieval observability audit trails.",
            howBuilt: "28 relational domain models with composite usage indexes, optimistic row versioning, latency metrics collection, and distributed tracing.",
            modules: ["Tasks & Time Logs", "Immutable Audit Trails", "AI Metrics Collector", "Distributed Tracing"],
          },
        ],
        edges: [
          { from: "chat-api", to: "orchestrator", color: "#38bdf8" },
          { from: "mail-oauth", to: "orchestrator", color: "#34d399" },
          { from: "orchestrator", to: "grounding", color: "#a78bfa" },
          { from: "orchestrator", to: "hybrid-rag", color: "#22d3ee" },
          { from: "orchestrator", to: "llm-gateway", color: "#fb923c" },
          { from: "grounding", to: "mysql-store", color: "#38bdf8" },
          { from: "hybrid-rag", to: "mysql-store", color: "#22d3ee" },
        ],
      },
      security: {
        id: "security",
        label: "Auth, RBAC & Security",
        caption: "3-Layer Zero-Trust Defense (ZTD), prompt-injection sanitization, department isolation, and AES-256 OAuth token protection.",
        colHeaders: [
          "01 · AUTH & INPUT SANITIZATION",
          "02 · 3-LAYER ZERO-TRUST RBAC",
          "03 · GUARDRAILS & AUDIT VAULT",
        ],
        nodes: [
          {
            id: "sanctum-otp",
            col: 0,
            row: 0,
            title: "Sanctum & OTP 2FA",
            subtitle: "Token Auth · Async 2FA Mail",
            badge: "IDENTITY",
            color: "#38bdf8",
            whatItDoes: "Verifies user identity with Laravel Sanctum tokens, OTP two-factor authentication, and email blocklist/change-request guards.",
            howBuilt: "Combines stateless API tokens, queued OTP verification emails, and strict session authentication middleware.",
            modules: ["Sanctum Token Auth", "Queued OTP 2FA", "Session Validation", "Email Safety Guards"],
          },
          {
            id: "prompt-guard",
            col: 0,
            row: 1,
            title: "Prompt Injection Guard",
            subtitle: "Input Preprocessor · Safety Rules",
            badge: "SANITIZER",
            color: "#fb923c",
            whatItDoes: "Intercepts jailbreaks, system-prompt extraction attempts, and cross-role privilege escalation payloads prior to planning.",
            howBuilt: "Runs deterministic pattern matching, query normalization, and technology-disclosure filtering before any LLM invocation.",
            modules: ["Injection Pattern Filter", "Request Preprocessor", "Disclosure Guard", "Query Normalizer"],
          },
          {
            id: "access-scope",
            col: 1,
            row: 0,
            title: "3-Layer ZTD RBAC",
            subtitle: "Admin · Manager · Employee",
            badge: "AUTHORIZATION",
            color: "#34d399",
            whatItDoes: "Enforces role hierarchy at three boundaries: database query scoping, HTTP controller 403 checks, and AI tool execution gates.",
            howBuilt: "Centralized authorization policies paired with automatic query scoping and pre-flight tool capability validation.",
            modules: ["Database Query Scope", "Controller 403 Guards", "AI Tool Capability Gate", "Role Hierarchy Policy"],
          },
          {
            id: "dept-guard",
            col: 1,
            row: 1,
            title: "Department Boundary",
            subtitle: "Tenant & Team Isolation",
            badge: "ISOLATION",
            color: "#a78bfa",
            whatItDoes: "Prevents managers or employees from querying or mutating tasks, EOD reports, or KPIs outside their assigned department.",
            howBuilt: "Enforces department boundary checks and mode governance policies prior to every query or tool invocation.",
            modules: ["Department Isolation", "Mode Governance", "Scoped KPI Access", "Admin Policy Controls"],
          },
          {
            id: "aes-vault",
            col: 2,
            row: 0,
            title: "AES-256 OAuth Vault",
            subtitle: "Encrypted Tokens · 24h Undo",
            badge: "ENCRYPTION",
            color: "#22d3ee",
            whatItDoes: "Encrypts Microsoft Graph and Google OAuth refresh/access tokens at rest and requires human confirmation with a 24-hour undo window for sensitive actions.",
            howBuilt: "Uses AES-256 encrypted credential storage, granular permission grants, scheduled token refresh workers, and reversible action queues.",
            modules: ["AES-256 Token Vault", "Scoped OAuth Grants", "24h Undoable Drafts", "Auto Token Refresh"],
          },
          {
            id: "audit-log",
            col: 2,
            row: 1,
            title: "Redacted Logs & Audit",
            subtitle: "PII Scrubbing · Audit Trail",
            badge: "LOGGING & AUDIT",
            color: "#38bdf8",
            whatItDoes: "Scrubs sensitive tokens and PII automatically, writes structured agent traces, and records every tool, RAG, Slack, and mail action.",
            howBuilt: "Backed by automated log redaction, structured JSON logging, immutable action audit tables, and CLI log analysis diagnostics.",
            modules: ["Automated PII Redactor", "Structured AI Logs", "Immutable Audit Trail", "CLI Diagnostics"],
          },
        ],
        edges: [
          { from: "sanctum-otp", to: "access-scope", color: "#38bdf8" },
          { from: "prompt-guard", to: "access-scope", color: "#fb923c" },
          { from: "prompt-guard", to: "dept-guard", color: "#a78bfa" },
          { from: "access-scope", to: "aes-vault", color: "#34d399" },
          { from: "access-scope", to: "audit-log", color: "#38bdf8" },
          { from: "dept-guard", to: "audit-log", color: "#a78bfa" },
        ],
      },
      "data-caching": {
        id: "data-caching",
        label: "DB, Caching & Queues",
        caption: "Token compression (-30–50%), Hybrid RAG indexing, MySQL optimistic & row locking, and 6 specialized background worker queues.",
        colHeaders: [
          "01 · CONTEXT & TOKEN ECONOMY",
          "02 · HYBRID VECTOR + SQL STORE",
          "03 · 6-CHANNEL QUEUE WORKERS",
        ],
        nodes: [
          {
            id: "compressor",
            col: 0,
            row: 0,
            title: "Context & Payload Optimizer",
            subtitle: "30–50% Token Cost Savings",
            badge: "OPTIMIZER",
            color: "#fb923c",
            whatItDoes: "Prunes duplicate conversation history and compresses verbose JSON tool payloads before injecting them into the LLM context window.",
            howBuilt: "Combines structured tool-result compression, context pruning pipelines, and strict per-turn token budget allocation.",
            modules: ["Tool Payload Compression", "Context Pruning", "Dynamic Prompt Builder", "Token Budget Caps"],
          },
          {
            id: "memory-mgr",
            col: 0,
            row: 1,
            title: "Memory & Summarizer",
            subtitle: "Sequence Ordering · Mail Memory",
            badge: "MEMORY",
            color: "#38bdf8",
            whatItDoes: "Maintains deterministic message sequence numbers, summarizes long threads, and persists semantic mail memories.",
            howBuilt: "Pairs ordered conversation persistence with rolling thread summarization and background semantic memory extraction.",
            modules: ["Ordered Thread State", "Rolling Summarizer", "Semantic Mail Memory", "Async Extraction"],
          },
          {
            id: "pinecone-fts",
            col: 1,
            row: 0,
            title: "Pinecone + MySQL FTS",
            subtitle: "1024-dim Jina · RRF Merge",
            badge: "HYBRID INDEX",
            color: "#22d3ee",
            whatItDoes: "Stores 1024-dimensional sentence-aware chunks in Pinecone Serverless with unique document IDs alongside MySQL Full-Text indexes.",
            howBuilt: "Managed by automated indexing CLI pipelines, deterministic vector IDs, MySQL full-text indexing, and Reciprocal Rank Fusion.",
            modules: ["1024d Vector Store", "Idempotent Vector IDs", "MySQL Full-Text", "Reciprocal Rank Fusion"],
          },
          {
            id: "mysql-locks",
            col: 1,
            row: 1,
            title: "MySQL 8 Concurrency",
            subtitle: "Row Locking · Optimistic Version",
            badge: "ACID STORAGE",
            color: "#34d399",
            whatItDoes: "Prevents race conditions when multiple workers or users update task statuses, timers, or EOD items simultaneously.",
            howBuilt: "Combines composite usage indexes, eager-loaded relations, pessimistic row-level locks, and optimistic version-column checks.",
            modules: ["Pessimistic Row Locks", "Optimistic Versioning", "Composite Indexes", "Atomic EOD Drafts"],
          },
          {
            id: "task-slicer",
            col: 2,
            row: 0,
            title: "Background Task Slicer",
            subtitle: "Heartbeat State · Long Jobs",
            badge: "ORCHESTRATION",
            color: "#a78bfa",
            whatItDoes: "Slices large multi-record AI operations into resumable background chunks with live heartbeat monitoring.",
            howBuilt: "Splits long-running workflows into bounded asynchronous slices with checkpoint persistence and stale-worker recovery.",
            modules: ["Resumable Task Slicing", "Worker Heartbeats", "Chunked Batch Jobs", "Bulk Mail Archiving"],
          },
          {
            id: "six-queues",
            col: 2,
            row: 1,
            title: "6 Priority Queue Lanes",
            subtitle: "high · ai-fast · ai-long · rag",
            badge: "WORKERS",
            color: "#38bdf8",
            whatItDoes: "Isolates latency-sensitive interactive AI turns from heavy document ingestion, embedding generation, and mail delta syncs.",
            howBuilt: "Dedicated priority worker pools separating interactive chat queues from background RAG indexing and external mail sync jobs.",
            modules: ["Priority Lane Isolation", "Embedding Workers", "Document Ingestion", "Mail Delta Sync"],
          },
        ],
        edges: [
          { from: "compressor", to: "pinecone-fts", color: "#22d3ee" },
          { from: "memory-mgr", to: "mysql-locks", color: "#38bdf8" },
          { from: "pinecone-fts", to: "six-queues", color: "#22d3ee" },
          { from: "mysql-locks", to: "task-slicer", color: "#a78bfa" },
          { from: "mysql-locks", to: "six-queues", color: "#34d399" },
        ],
      },
      "realtime-ops": {
        id: "realtime-ops",
        label: "Real-Time, Failover & Ops",
        caption: "Multi-LLM circuit-breaker failover, quota governance, live SSE streaming, and AI observability dashboard.",
        colHeaders: [
          "01 · STREAMING & WEBHOOKS",
          "02 · CIRCUIT BREAKER & QUOTAS",
          "03 · TELEMETRY & 89 TESTS",
        ],
        nodes: [
          {
            id: "sse-stream",
            col: 0,
            row: 0,
            title: "SSE Token Streaming",
            subtitle: "Real-Time Progress Events",
            badge: "REAL-TIME",
            color: "#38bdf8",
            whatItDoes: "Streams live tool invocation badges and LLM tokens to the browser while persisting task milestone events.",
            howBuilt: "Built on persistent Server-Sent Event streams with structured milestone event persistence and live notification delivery.",
            modules: ["SSE Event Stream", "Task Milestone Events", "Live Status Updates", "Slack Bridge"],
          },
          {
            id: "mail-webhooks",
            col: 0,
            row: 1,
            title: "Slack, WhatsApp & FCM",
            subtitle: "4-Channel Dispatch · Webhooks",
            badge: "MULTI-CHANNEL",
            color: "#34d399",
            whatItDoes: "Dispatches task & EOD alerts across In-App, Firebase FCM, WhatsApp, and Slack Block Kit while syncing incoming mail and Slack webhooks.",
            howBuilt: "Unified multi-channel notification dispatcher backed by dedicated delivery workers and a persistent Slack Socket Mode listener.",
            modules: ["WhatsApp Delivery", "Firebase FCM Push", "Slack Block Kit Alerts", "Webhook Ingestion"],
          },
          {
            id: "circuit-breaker",
            col: 1,
            row: 0,
            title: "LLM Circuit Breaker",
            subtitle: "429/402 Auto-Switchover",
            badge: "RESILIENCE",
            color: "#fb923c",
            whatItDoes: "Trips immediately on provider 429 rate-limit or 402 quota errors and fails over across Groq, Google Gemini, and OpenRouter.",
            howBuilt: "Tracks per-provider health states, cooldown windows, automatic recovery probes, and graceful degraded-mode responses.",
            modules: ["Multi-LLM Failover", "Cooldown Auto-Resume", "Degraded Mode Guard", "OpenRouter Fallback"],
          },
          {
            id: "quota-governor",
            col: 1,
            row: 1,
            title: "Quota & Burst Limiter",
            subtitle: "Shared Quotas · Usage Tracking",
            badge: "GOVERNANCE",
            color: "#a78bfa",
            whatItDoes: "Tracks token spend per user and department, shapes burst concurrency against external APIs, and snapshots daily quota health.",
            howBuilt: "Enforces cross-worker quota caps, burst concurrency throttling, daily usage snapshots, and per-department cost attribution.",
            modules: ["Shared Quota Caps", "Daily Quota Snapshots", "Burst Rate Limiter", "Usage Attribution"],
          },
          {
            id: "telemetry",
            col: 2,
            row: 0,
            title: "AI Telemetry & Tracing",
            subtitle: "Latency · Grounding · Alerts",
            badge: "OBSERVABILITY",
            color: "#22d3ee",
            whatItDoes: "Collects per-turn latency, retrieval recall, token compression ratios, and triggers operational alerts on anomalies.",
            howBuilt: "Internal observability dashboard backed by structured metric collectors, distributed turn tracing, and automated alerting.",
            modules: ["Metrics Dashboard", "Latency & Recall Stats", "Distributed Tracing", "Operational Alerting"],
          },
          {
            id: "test-harness",
            col: 2,
            row: 1,
            title: "89 PHPUnit & Pest Suites",
            subtitle: "Golden Agent · Injection Tests",
            badge: "VERIFICATION",
            color: "#34d399",
            whatItDoes: "Verifies deterministic tool selection, RBAC boundaries, prompt-injection resistance, EOD scoring, and failover behavior.",
            howBuilt: "89 automated test suites covering unit, feature, zero-trust security, and golden multi-step agent evaluation scenarios.",
            modules: ["89 Automated Suites", "Golden Agent Cases", "Prompt Injection Tests", "Feature Flag Guards"],
          },
        ],
        edges: [
          { from: "sse-stream", to: "circuit-breaker", color: "#38bdf8" },
          { from: "mail-webhooks", to: "quota-governor", color: "#34d399" },
          { from: "circuit-breaker", to: "telemetry", color: "#fb923c" },
          { from: "quota-governor", to: "telemetry", color: "#a78bfa" },
          { from: "circuit-breaker", to: "test-harness", color: "#34d399" },
        ],
      },
    },
  },

  /* ==========================================================================
     2. REAL-TIME SERVICE MARKETPLACE, SETTLEMENT LEDGER & ADMIN PLANE
  ========================================================================== */
  {
    id: "realtime-platform",
    slug: "real-time-booking-platform",
    tabLabel: "CarWash Booking & Settlement",
    tag: "CARWASH REAL-TIME MARKETPLACE & FINTECH SETTLEMENT",
    title: "CarWash — Real-Time Booking, Settlement & Admin Platform",
    subtitle:
      "Express 5.2 · 46 Prisma PG Models · 15 Settlement Models · 6 BullMQ Workers · Socket.IO Redis Mesh · 2 Next.js 16 Portals · 56 Tests",
    verifiedMetrics: [
      { value: "46 Models", label: "13 Modular PostgreSQL Domains" },
      { value: "15 Models", label: "Double-Entry Settlement Ledger" },
      { value: "6 Workers", label: "Dedicated BullMQ Job Queues" },
      { value: "56 Suites", label: "Vitest & Supertest API Tests" },
    ],
    techStack: [
      "Node.js & Express 5.2",
      "Next.js 16.2 & React 19 (2 Portals)",
      "PostgreSQL & Prisma 7 (46 Models)",
      "Socket.IO 4.8 + Redis Adapter/Emitter",
      "BullMQ 5 + ioredis (6 Workers)",
      "L1 LRU Cache + L2 Redis + HTTP ETag",
      "Razorpay & RazorpayX Payouts",
      "AWS S3 Presigned Uploads",
      "Firebase Admin FCM",
      "Argon2 · JWT · MFA · Step-Up Auth",
      "PM2 · Pino · Prometheus · Vitest",
    ],
    documentation: {
      overviewAndFeatures:
        "A multi-sided on-demand service booking marketplace and financial settlement platform spanning 3 production applications: a Next.js 16 Customer & Service-Partner Web Portal, a Next.js 16 MFA Admin Control Plane, and a horizontally scalable Express 5.2 REST & WebSocket API handling live slot reservations, dual-channel Email/SMS OTP auth, service-handoff OTP verification, Razorpay payments, partner payouts, and live SLA support tickets.",
      systemAndDbArchitecture:
        "Uses a modular Prisma 7 PostgreSQL schema with 46 models cleanly separated across 13 domain modules: double-entry financial settlements (15 models), SLA support ticketing & outbox (8 models), bookings, payments, service partners, dynamic slots, admin governance, inquiries, reviews, reminders, favorites, and device sessions.",
      authAndSecurity:
        "Secures customer and partner APIs with Argon2 password hashing, JWT plus database session and device tracking, dual-channel async Email/SMS OTP delivery, Cloudflare Turnstile bot protection, Helmet, Zod 4 validation, and Redis rate limiting. The Admin Control Plane enforces stateful sessions, MFA, Step-Up re-authentication for sensitive actions, and automatic immutable audit interception.",
      dataFlowAndWorkflows:
        "Slot reservations acquire distributed Redis mutex locks, transition through deterministic booking state machines with idempotency guards, process payment webhooks asynchronously, emit transactional outbox events, verify on-site service completion via rotating OTP handshakes, and accrue partner earnings into double-entry ledger entries.",
      realtimeAndBackgroundJobs:
        "Synchronizes live bookings, slot holds, support agent presence, and live admin monitoring via Socket.IO 4.8 with Redis Adapter and Redis keyspace expiry listeners while running specialized BullMQ queues across Email/SMS OTP, payment webhooks, support SLA sweeps, reminders, slot cache warming, cleanup, and settlement payouts.",
      scalabilityAndFaultTolerance:
        "Combines L1 In-Memory LRU caching with L2 Redis and automated HTTP 304 ETag invalidation on mutations. Protects automated RazorpayX partner payouts with a payout circuit breaker, payout state machine, bank reconciliation engine, structured rotating Pino logs, and authenticated Prometheus metrics.",
      challengesAndSolutions:
        "Prevented double-booking under high concurrency using distributed Redis mutex locks, Redis keyspace TTL expiry listeners, and proactive slot cache warming. Eliminated silent audit gaps with automatic admin audit interception across 4 domain audit tables and automated PDF settlement slip generation.",
    },
    views: {
      overview: {
        id: "overview",
        label: "High-Level & API Flow",
        caption: "3-application ecosystem connecting the Customer/Partner Portal and MFA Admin Control Plane to the Express 5 Cluster, Settlement Ledger, and PostgreSQL.",
        colHeaders: [
          "01 · NEXT.JS 16 WEB PORTALS",
          "02 · EXPRESS 5 & SOCKET MESH",
          "03 · LEDGER, QUEUES & STORAGE",
        ],
        nodes: [
          {
            id: "customer-web",
            col: 0,
            row: 0,
            title: "Customer & Partner Web",
            subtitle: "Next.js 16 · React 19 · Zustand 5",
            badge: "WEB PORTAL",
            color: "#38bdf8",
            whatItDoes: "Powers service discovery, live slot reservation, Razorpay checkout, order tracking, and partner slot and payout dashboards.",
            howBuilt: "Next.js 16.2 App Router with React 19, Zustand 5 state management, Zod 4 validation, Razorpay checkout, Socket.IO client, and Firebase Web Push.",
            modules: ["Live Slot Booking", "Partner Dashboard", "Slot Management", "Partner Payouts"],
          },
          {
            id: "admin-web",
            col: 0,
            row: 1,
            title: "MFA Admin Control Plane",
            subtitle: "Next.js 16 · Step-Up · Audit Logs",
            badge: "ADMIN PORTAL",
            color: "#a78bfa",
            whatItDoes: "Provides operations and finance governance over bookings, refunds, settlement batches, payout holds, discrepancies, and SLA support.",
            howBuilt: "Dedicated Next.js 16 control plane enforcing server-only data boundaries, MFA, step-up finance authorization, and real-time operational streams.",
            modules: ["Settlement Batches", "Bank Reconciliation", "Refund Controls", "Immutable Audit View"],
          },
          {
            id: "express-cluster",
            col: 1,
            row: 0,
            title: "Express 5.2 API Core",
            subtitle: "Booking & Order State Machines",
            badge: "REST API",
            color: "#34d399",
            whatItDoes: "Executes validated REST workflows across bookings, slots, payments, orders, reviews, inquiries, and SLA tickets.",
            howBuilt: "Modular Express 5 service layer enforcing deterministic booking state transitions, rotating order OTP handshakes, idempotency, and distributed Redis locks.",
            modules: ["Booking State Machine", "Order OTP Handshake", "Distributed Redis Locks", "Idempotency Guard"],
          },
          {
            id: "socket-mesh",
            col: 1,
            row: 1,
            title: "Socket.IO Redis Mesh",
            subtitle: "Adapter · Emitter · Presence",
            badge: "REAL-TIME",
            color: "#22d3ee",
            whatItDoes: "Synchronizes live slot availability, booking status transitions, and partner alerts across all stateless API instances.",
            howBuilt: "Horizontally scaled Socket.IO 4.8 cluster backed by Redis Pub/Sub adapter, emitter broadcasts, presence tracking, and targeted status channels.",
            modules: ["Redis Pub/Sub Adapter", "Live Slot Broadcasts", "Presence Tracking", "Status Publisher"],
          },
          {
            id: "settlement-engine",
            col: 2,
            row: 0,
            title: "15-Model Settlement Engine",
            subtitle: "Double-Entry Ledger · RazorpayX",
            badge: "FINTECH",
            color: "#fb923c",
            whatItDoes: "Automates partner earnings accruals, batch payouts, hold policies, bank reconciliation, and PDF settlement slip generation.",
            howBuilt: "Double-entry accounting core covering accrual journals, batch orchestration, payout state transitions, automated reconciliation, and PDF slips.",
            modules: ["Double-Entry Accruals", "Payout State Machine", "Ledger Reconciliation", "PDF Settlement Slips"],
          },
          {
            id: "bullmq-fleet",
            col: 2,
            row: 1,
            title: "6 BullMQ Worker Queues",
            subtitle: "Mail · Push · Reminders · Warmer",
            badge: "BACKGROUND",
            color: "#38bdf8",
            whatItDoes: "Executes emails, FCM push alerts, scheduled reminders, slot cache warming, and settlement batches asynchronously.",
            howBuilt: "Powered by BullMQ 5 and Redis across dedicated worker pools with exponential backoff retries and dead-letter monitoring.",
            modules: ["Transactional Mail", "FCM Push Alerts", "Slot Cache Warmer", "Settlement Workers"],
          },
          {
            id: "prisma-pg",
            col: 2,
            row: 2,
            title: "PostgreSQL & AWS S3",
            subtitle: "46 Prisma Models · Presigned URLs",
            badge: "DATA LAYER",
            color: "#34d399",
            whatItDoes: "Persists 46 relational models across 13 domain schemas and streams compliance documents and media directly to AWS S3.",
            howBuilt: "Uses Prisma 7 with native PostgreSQL driver pooling and AWS SDK presigned URL generation for zero-proxy client uploads.",
            modules: ["46 Relational Models", "PostgreSQL Pooling", "S3 Presigned Uploads", "Media Verification"],
          },
        ],
        edges: [
          { from: "customer-web", to: "express-cluster", color: "#38bdf8" },
          { from: "customer-web", to: "socket-mesh", color: "#22d3ee" },
          { from: "admin-web", to: "express-cluster", color: "#a78bfa" },
          { from: "express-cluster", to: "settlement-engine", color: "#fb923c" },
          { from: "express-cluster", to: "bullmq-fleet", color: "#38bdf8" },
          { from: "express-cluster", to: "prisma-pg", color: "#34d399" },
          { from: "socket-mesh", to: "bullmq-fleet", color: "#22d3ee" },
        ],
      },
      security: {
        id: "security",
        label: "Auth, RBAC & Security",
        caption: "Defense-in-depth across Argon2/JWT auth, Turnstile bot protection, Redis rate limiting, MFA + Step-Up finance authorization, and distributed payment locks.",
        colHeaders: [
          "01 · EDGE & BOT PROTECTION",
          "02 · IDENTITY & STEP-UP RBAC",
          "03 · FINANCIAL & AUDIT INTEGRITY",
        ],
        nodes: [
          {
            id: "edge-shield",
            col: 0,
            row: 0,
            title: "Helmet, CORS & Turnstile",
            subtitle: "Rate Limiting · Version Gate",
            badge: "PERIMETER",
            color: "#38bdf8",
            whatItDoes: "Blocks abusive traffic, enforces compatible client versions, validates bot challenges, and shapes per-IP and per-user request rates.",
            howBuilt: "Combines Redis-backed rate limiting, Cloudflare Turnstile verification, strict CORS policies, Helmet security headers, and client version gates.",
            modules: ["Redis Rate Limiter", "Cloudflare Turnstile", "App Version Gate", "Helmet Security"],
          },
          {
            id: "zod-validator",
            col: 0,
            row: 1,
            title: "Strict Zod 4 Schemas",
            subtitle: "Payload & Webhook Signatures",
            badge: "VALIDATION",
            color: "#34d399",
            whatItDoes: "Validates every REST body, query param, and cryptographic Razorpay and RazorpayX webhook signature before controller execution.",
            howBuilt: "Centralized Zod 4 request validation schemas paired with HMAC webhook signature verification across payments, slots, and settlements.",
            modules: ["Zod 4 Request Schemas", "Payment HMAC Verify", "Payout Webhook Verify", "Strict Sanitization"],
          },
          {
            id: "argon-jwt",
            col: 1,
            row: 0,
            title: "Argon2, Sessions & OTP",
            subtitle: "Email/SMS OTP · Order OTP",
            badge: "AUTH & OTP",
            color: "#22d3ee",
            whatItDoes: "Hashes passwords with Argon2, tracks stateful session and device records, delivers async Email/SMS auth OTPs, and verifies service completion via rotating Order OTPs.",
            howBuilt: "Combines Argon2 credential hashing, multi-device session persistence, queued Email/SMS OTP workers, and time-bound order completion handshakes.",
            modules: ["Email & SMS OTP Queues", "Rotating Order OTP", "Multi-Device Sessions", "Argon2 + JWT"],
          },
          {
            id: "step-up",
            col: 1,
            row: 1,
            title: "Admin Stateful MFA & Step-Up",
            subtitle: "Stateful Sessions · RBAC",
            badge: "ZERO TRUST",
            color: "#a78bfa",
            whatItDoes: "Enforces stateful admin sessions, MFA, Step-Up re-authentication, and automatic audit interception before financial mutations or payout releases.",
            howBuilt: "Combines server-verified admin sessions, MFA verification, step-up elevation checks, and automatic response audit logging.",
            modules: ["Stateful Admin Session", "MFA Verification", "Step-Up Elevation", "Auto Audit Interceptor"],
          },
          {
            id: "idempotency",
            col: 2,
            row: 0,
            title: "Redis Locks & Idempotency",
            subtitle: "Zero Double-Charge / Booking",
            badge: "CONSISTENCY",
            color: "#fb923c",
            whatItDoes: "Prevents concurrent double-booking of slots and guarantees payment and payout webhooks process exactly once.",
            howBuilt: "Uses distributed Redis mutex locks, request idempotency keys, webhook deduplication records, and beneficiary integrity verification.",
            modules: ["Distributed Mutex Locks", "Idempotency Keys", "Webhook Deduplication", "Integrity Checks"],
          },
          {
            id: "audit-trail",
            col: 2,
            row: 1,
            title: "4-Domain Audit Logs",
            subtitle: "Admin · Settlement · Support",
            badge: "COMPLIANCE",
            color: "#38bdf8",
            whatItDoes: "Maintains immutable audit trails across admin actions, financial ledger transitions, customer inquiries, and support tickets.",
            howBuilt: "Persisted across dedicated immutable PostgreSQL audit log tables covering Admin, Settlement, Support, and Inquiry domains.",
            modules: ["Admin Audit Trail", "Settlement Audit Trail", "Support Audit Trail", "Inquiry Audit Trail"],
          },
        ],
        edges: [
          { from: "edge-shield", to: "argon-jwt", color: "#38bdf8" },
          { from: "zod-validator", to: "argon-jwt", color: "#34d399" },
          { from: "zod-validator", to: "step-up", color: "#a78bfa" },
          { from: "argon-jwt", to: "idempotency", color: "#fb923c" },
          { from: "step-up", to: "idempotency", color: "#fb923c" },
          { from: "step-up", to: "audit-trail", color: "#38bdf8" },
        ],
      },
      "data-caching": {
        id: "data-caching",
        label: "DB, Caching & Queues",
        caption: "L1 In-Memory LRU + L2 Redis + HTTP ETag invalidation pipeline, transactional outboxes, and 46-model Prisma PostgreSQL architecture.",
        colHeaders: [
          "01 · MULTI-TIER CACHE & ETAG",
          "02 · 46-MODEL PRISMA & OUTBOX",
          "03 · REDIS KEYSPACE & WORKERS",
        ],
        nodes: [
          {
            id: "l1-lru",
            col: 0,
            row: 0,
            title: "L1 In-Memory LRU Cache",
            subtitle: "Process Cache · Sub-ms Reads",
            badge: "L1 CACHE",
            color: "#38bdf8",
            whatItDoes: "Serves hot read endpoints directly from process memory with HTTP response compression for sub-millisecond latency.",
            howBuilt: "Pairs bounded in-memory LRU caching middleware with gzip/brotli HTTP compression and cache-status telemetry headers.",
            modules: ["In-Memory LRU Cache", "HTTP Compression", "Cache Telemetry", "Sub-ms Hot Reads"],
          },
          {
            id: "etag-redis",
            col: 0,
            row: 1,
            title: "L2 Redis + ETag Engine",
            subtitle: "304 Revalidation · Auto-Purge",
            badge: "L2 & ETAG",
            color: "#22d3ee",
            whatItDoes: "Computes deterministic HTTP ETags stored in Redis and automatically invalidates dependent keys on mutations.",
            howBuilt: "Coordinates Redis-backed ETag hashing, conditional 304 responses, mutation-triggered invalidation, and proactive slot cache warming.",
            modules: ["HTTP 304 ETag Engine", "Mutation Invalidation", "Slot Cache Warming", "Redis L2 Layer"],
          },
          {
            id: "prisma-46",
            col: 1,
            row: 0,
            title: "46-Model Prisma Schema",
            subtitle: "13 Modular Domain Schemas · PG",
            badge: "RELATIONAL",
            color: "#34d399",
            whatItDoes: "Separates Bookings, Payments, Settlements (15 models), Support SLA (8 models), Slots, Partners, and Sessions cleanly.",
            howBuilt: "Multi-domain Prisma 7 PostgreSQL schema with native connection pooling and clean repository abstractions for ledger and payout queries.",
            modules: ["15 Settlement Models", "8 Support SLA Models", "Booking & Slot Core", "Ledger Repositories"],
          },
          {
            id: "outbox-pattern",
            col: 1,
            row: 1,
            title: "Transactional Outboxes",
            subtitle: "Slot · Settlement · Support",
            badge: "RELIABILITY",
            color: "#fb923c",
            whatItDoes: "Guarantees atomic database writes and event publishing so no booking, payout, or ticket event is ever lost on crash.",
            howBuilt: "Writes domain events inside the same PostgreSQL transaction as business mutations and relays them reliably via background sweepers.",
            modules: ["Slot Event Outbox", "Settlement Outbox", "Support Event Outbox", "At-Least-Once Relay"],
          },
          {
            id: "keyspace-listener",
            col: 2,
            row: 0,
            title: "Redis Keyspace Expiry",
            subtitle: "Auto-Release Unpaid Slot Holds",
            badge: "EVENT BUS",
            color: "#a78bfa",
            whatItDoes: "Listens to Redis TTL expiry events to immediately release unpaid slot reservations and broadcast availability via Socket.IO.",
            howBuilt: "Subscribes to Redis keyspace expiration notifications and bridges them directly into the real-time slot event bus and metrics counters.",
            modules: ["Keyspace TTL Listener", "Slot Event Bus", "Instant Hold Release", "Slot Metrics"],
          },
          {
            id: "bullmq-6",
            col: 2,
            row: 1,
            title: "11+ BullMQ Worker Fleet",
            subtitle: "OTP · Webhooks · SLA · Settlement",
            badge: "ASYNC JOBS",
            color: "#38bdf8",
            whatItDoes: "Processes Email/SMS OTPs, Razorpay webhooks, SLA support sweeps, reminders, slot warming, and settlement batches with automatic retries.",
            howBuilt: "Orchestrated across isolated BullMQ queues with concurrency controls, scheduled cron sweepers, and automatic retry policies.",
            modules: ["Email & SMS OTP Jobs", "Async Payment Webhooks", "SLA Escalation Sweeps", "Settlement Batch Jobs"],
          },
        ],
        edges: [
          { from: "l1-lru", to: "etag-redis", color: "#22d3ee" },
          { from: "etag-redis", to: "prisma-46", color: "#34d399" },
          { from: "prisma-46", to: "outbox-pattern", color: "#fb923c" },
          { from: "etag-redis", to: "keyspace-listener", color: "#a78bfa" },
          { from: "outbox-pattern", to: "bullmq-6", color: "#38bdf8" },
        ],
      },
      "realtime-ops": {
        id: "realtime-ops",
        label: "Real-Time, Failover & Ops",
        caption: "Horizontal Socket.IO synchronization, RazorpayX payout circuit breaker, Prometheus metrics, Pino rolling logs, and 56 Vitest suites.",
        colHeaders: [
          "01 · LIVE PUB/SUB & PUSH",
          "02 · PAYOUT CIRCUIT BREAKER",
          "03 · PM2, TELEMETRY & 56 TESTS",
        ],
        nodes: [
          {
            id: "socket-rooms",
            col: 0,
            row: 0,
            title: "Multi-Node Socket Rooms",
            subtitle: "Customer · Partner · Admin",
            badge: "PUB/SUB",
            color: "#22d3ee",
            whatItDoes: "Routes targeted real-time events to customer order trackers, partner dispatch dashboards, and admin monitors across PM2 nodes.",
            howBuilt: "Role-scoped WebSocket rooms synchronized across stateless PM2 cluster workers via Redis Pub/Sub emitters and presence trackers.",
            modules: ["Role-Scoped Rooms", "Live Order Streams", "Online Presence", "Status Broadcaster"],
          },
          {
            id: "fcm-mail",
            col: 0,
            row: 1,
            title: "FCM Push & Email",
            subtitle: "Firebase Admin · Order Alerts",
            badge: "NOTIFICATIONS",
            color: "#34d399",
            whatItDoes: "Delivers mobile push alerts via Firebase Admin SDK and transactional HTML emails with automatic queue retries.",
            howBuilt: "Decoupled notification dispatchers feeding BullMQ push and email workers with device token hygiene and delivery retries.",
            modules: ["Notification Dispatcher", "Firebase Admin SDK", "Push Worker Pool", "Transactional Email"],
          },
          {
            id: "payout-breaker",
            col: 1,
            row: 0,
            title: "Payout Circuit Breaker",
            subtitle: "RazorpayX Health Guard",
            badge: "FAULT TOLERANCE",
            color: "#fb923c",
            whatItDoes: "Halts automated payout dispatches if upstream banking APIs degrade or report balance and webhook anomalies.",
            howBuilt: "Combines payout circuit-breaker thresholds, RazorpayX gateway adapters, manual settlement freeze switches, and hold controls.",
            modules: ["Payout Circuit Breaker", "RazorpayX Adapter", "Settlement Controls", "Hold Policies"],
          },
          {
            id: "reconciler",
            col: 1,
            row: 1,
            title: "Ledger Reconciliation",
            subtitle: "Discrepancy & Backfill Engine",
            badge: "FINTECH OPS",
            color: "#a78bfa",
            whatItDoes: "Cross-checks ledger debits and credits against gateway webhooks, flags discrepancies automatically, and generates PDF settlement slips.",
            howBuilt: "Automated reconciliation sweeps paired with historical backfill adapters, partner financial statements, and PDF slip generation.",
            modules: ["Ledger Reconciler", "Discrepancy Flagging", "Partner Statements", "Automated PDF Slips"],
          },
          {
            id: "pino-prom",
            col: 2,
            row: 0,
            title: "Pino & Prometheus",
            subtitle: "Metrics · PM2 Zero-Downtime",
            badge: "OBSERVABILITY",
            color: "#38bdf8",
            whatItDoes: "Exposes authenticated Prometheus metrics, rotating Pino JSON logs, and zero-downtime PM2 cluster reloads.",
            howBuilt: "Instrumenting HTTP, slot, and queue telemetry for Prometheus alongside rotating structured Pino logs and PM2 cluster orchestration.",
            modules: ["Prometheus Metrics", "Authenticated Scrape", "Rotating Pino Logs", "PM2 Cluster Mode"],
          },
          {
            id: "vitest-56",
            col: 2,
            row: 1,
            title: "56 Vitest & Supertest Suites",
            subtitle: "API · Settlement · Slot Tests",
            badge: "QUALITY",
            color: "#34d399",
            whatItDoes: "Validates booking concurrency, ETag caching, settlement ledger math, step-up auth, and webhook idempotency.",
            howBuilt: "56 automated test suites using Vitest 4, Supertest 7, and automated pre-commit quality checks.",
            modules: ["56 Test Suites", "Vitest 4 + Supertest", "Settlement Math Tests", "Slot Concurrency Tests"],
          },
        ],
        edges: [
          { from: "socket-rooms", to: "payout-breaker", color: "#22d3ee" },
          { from: "fcm-mail", to: "reconciler", color: "#34d399" },
          { from: "payout-breaker", to: "reconciler", color: "#fb923c" },
          { from: "payout-breaker", to: "pino-prom", color: "#38bdf8" },
          { from: "reconciler", to: "vitest-56", color: "#34d399" },
        ],
      },
    },
  },

  /* ==========================================================================
     3. ON-DEMAND DUAL-ROLE NATIVE MOBILE SUITE (React Native 0.87 New Arch)
  ========================================================================== */
  {
    id: "mobile-suite",
    slug: "realtime-mobile-suite",
    tabLabel: "CarWash Mobile App",
    tag: "CARWASH DUAL-ROLE NATIVE MOBILE APP · RN 0.87",
    title: "CarWash Mobile App — Customer & Partner Suite",
    subtitle:
      "React Native 0.87 (New Architecture) · React 19 · TypeScript 6 · 20+ Feature Modules · ETag Cache Engine · Socket Resync",
    verifiedMetrics: [
      { value: "RN 0.87", label: "New Architecture + React 19" },
      { value: "20+ Mods", label: "Feature-Sliced Mobile Domains" },
      { value: "ETag 304", label: "Custom Conditional Query Cache" },
      { value: "Live Sync", label: "Global Resync + Partner Alerts" },
    ],
    techStack: [
      "React Native 0.87 (New Architecture)",
      "React 19 & TypeScript 6",
      "NativeWind 4 & Tailwind CSS",
      "Reanimated 4 & Worklets",
      "Zustand 5 & Zod 4",
      "Socket.IO Client 4.8",
      "HTTP 304 ETag Query Cache",
      "Automated Reconnect Resync",
      "Native Razorpay SDK",
      "Firebase Cloud Messaging (FCM)",
      "Geolocation & S3 Media Picker",
    ],
    documentation: {
      overviewAndFeatures:
        "A unified cross-platform native mobile application serving both customers and service partners across 20+ modular feature domains: outlet discovery, geolocation filtering, multi-step slot booking wizard, native Razorpay checkout, live order tracking, interactive order OTP verification with countdown and rotation, multi-device session management, partner KPI charts, and dual-sided live ringing dispatch alerts.",
      systemAndDbArchitecture:
        "Architected with strict feature-sliced design separating 20+ product domains, 10 core infrastructure subsystems, and shared UI/theme primitives—running on React Native 0.87 New Architecture with React 19, TypeScript 6, modular Zustand 5 stores, and encrypted/local persistence.",
      authAndSecurity:
        "Secures credentials with encrypted device token storage, 3 explicit role route guards (Customer, Partner, and Dual-Role), strict client-side password policies and Zod 4 validation, active multi-device session inspection and revocation, and instant live termination of revoked sessions over WebSockets.",
      dataFlowAndWorkflows:
        "All API traffic passes through a unified HTTP and conditional ETag caching layer that attaches If-None-Match headers and renders instant local snapshots on 304 Not Modified. Interrupted booking checkouts persist locally across restarts while notification routing stays synced across foreground and background states.",
      realtimeAndBackgroundJobs:
        "Maintains persistent authenticated WebSocket room subscriptions paired with Firebase Cloud Messaging push wakeups. Incoming bookings trigger a dual-sided live ringing dispatch overlay synchronizing real-time acceptance and order state across customer and partner devices.",
      scalabilityAndFaultTolerance:
        "Monitors cellular and Wi-Fi transitions in real time with an inline connectivity banner. Upon network recovery or app foregrounding, an automated global resync coordinator reconciles missed socket events and revalidates stale ETag entries while structured diagnostics capture anomalies.",
      challengesAndSolutions:
        "Eliminated white-screen native crashes and API version drift via global error recovery boundaries and backend-enforced minimum app version gates. Delivered consistent 60fps transitions and list scrolling using Reanimated 4 native worklets.",
    },
    views: {
      overview: {
        id: "overview",
        label: "High-Level & API Flow",
        caption: "Dual-role Customer & Partner feature modules powered by the custom ETag HTTP engine, Socket.IO manager, and Native Device bridges.",
        colHeaders: [
          "01 · DUAL-ROLE FEATURE MODULES",
          "02 · MOBILE INFRASTRUCTURE CORE",
          "03 · BACKEND & DEVICE BRIDGES",
        ],
        nodes: [
          {
            id: "customer-features",
            col: 0,
            row: 0,
            title: "Customer Booking Suite",
            subtitle: "Search · Slot Wizard · Orders",
            badge: "CUSTOMER UX",
            color: "#38bdf8",
            whatItDoes: "Guides customers through outlet search, geolocation filtering, multi-step slot booking, favorites, and live order tracking.",
            howBuilt: "Feature-sliced customer modules with checkout handoff recovery and smooth Reanimated 4 transitions.",
            modules: ["Outlet Discovery", "Multi-Step Slot Wizard", "Live Order Tracking", "Checkout Recovery"],
          },
          {
            id: "partner-features",
            col: 0,
            row: 1,
            title: "Partner Hub & Ringing",
            subtitle: "Live Dispatch · KPIs · Payouts",
            badge: "PARTNER UX",
            color: "#a78bfa",
            whatItDoes: "Switches seamlessly via instant role toggle into partner operations: live ringing booking alerts, queue management, KPI bar charts, and payout tracking.",
            howBuilt: "Dedicated partner operations modules featuring interactive analytics charts, time-range filters, and real-time dispatch queues.",
            modules: ["Live Dispatch Ringing", "Interactive KPI Charts", "Instant Role Toggle", "Payout Insights"],
          },
          {
            id: "http-etag",
            col: 1,
            row: 0,
            title: "HTTP & ETag Engine",
            subtitle: "Conditional 304 Query Cache",
            badge: "NETWORKING",
            color: "#22d3ee",
            whatItDoes: "Intercepts outgoing requests, injects If-None-Match ETags, and resolves 304 Not Modified responses from local cache with zero payload overhead.",
            howBuilt: "Unified mobile HTTP client integrated with a persistent ETag query cache engine and reactive Zustand 5 stores.",
            modules: ["Unified HTTP Client", "HTTP 304 ETag Layer", "Query Cache Engine", "Zustand 5 Stores"],
          },
          {
            id: "socket-sync",
            col: 1,
            row: 1,
            title: "Socket & Resync Engine",
            subtitle: "Auto-Reconnect · Delta Sync",
            badge: "REAL-TIME",
            color: "#34d399",
            whatItDoes: "Manages authenticated Socket.IO connections and reconciles missed state automatically whenever connectivity recovers.",
            howBuilt: "Coordinates WebSocket connection lifecycles with live network reachability monitoring and global delta reconciliation.",
            modules: ["Managed WebSockets", "Global Resync Engine", "Network Monitor", "Offline Status Banner"],
          },
          {
            id: "native-bridges",
            col: 2,
            row: 0,
            title: "Razorpay, Geo & Media",
            subtitle: "Native SDKs · S3 Uploads",
            badge: "NATIVE APIs",
            color: "#fb923c",
            whatItDoes: "Executes native Razorpay payment sheets, resolves device GPS coordinates, and uploads camera/gallery media to AWS S3 presigned URLs.",
            howBuilt: "Clean native bridge adapters wrapping Razorpay checkout, device GPS services, camera/gallery media pickers, and document previews.",
            modules: ["Native Razorpay SDK", "Device Geolocation", "Camera & Gallery Picker", "Document Previews"],
          },
          {
            id: "fcm-push",
            col: 2,
            row: 1,
            title: "FCM & Crash Resilience",
            subtitle: "Push Alerts · Recovery · Gate",
            badge: "RELIABILITY",
            color: "#38bdf8",
            whatItDoes: "Handles background and foreground Firebase push notifications, traps runtime errors, and enforces minimum app version gates.",
            howBuilt: "Combines Firebase Cloud Messaging delivery handlers, global crash recovery boundaries, and remote version enforcement.",
            modules: ["Firebase FCM Push", "Crash Recovery Guard", "Global Error Boundary", "App Update Gate"],
          },
        ],
        edges: [
          { from: "customer-features", to: "http-etag", color: "#38bdf8" },
          { from: "customer-features", to: "socket-sync", color: "#34d399" },
          { from: "partner-features", to: "http-etag", color: "#a78bfa" },
          { from: "partner-features", to: "socket-sync", color: "#34d399" },
          { from: "http-etag", to: "native-bridges", color: "#fb923c" },
          { from: "socket-sync", to: "fcm-push", color: "#38bdf8" },
        ],
      },
      security: {
        id: "security",
        label: "Auth, RBAC & Security",
        caption: "Encrypted mobile token storage, role-isolated navigation guards, live socket session revocation, and service-handoff OTP verification.",
        colHeaders: [
          "01 · CREDENTIAL & INPUT GUARDS",
          "02 · SESSION & ROLE ISOLATION",
          "03 · VERIFIED HANDOFF & GATING",
        ],
        nodes: [
          {
            id: "secure-store",
            col: 0,
            row: 0,
            title: "Encrypted Session Vault",
            subtitle: "Cold-Boot Token Hydration",
            badge: "STORAGE",
            color: "#38bdf8",
            whatItDoes: "Stores JWT tokens and user role state securely on device and hydrates authenticated sessions cleanly on cold boot.",
            howBuilt: "Encrypted native key-value storage synchronized with central authentication state and validated environment configuration.",
            modules: ["Encrypted Storage", "Auth State Hydration", "Cold-Boot Splash Gate", "Typed Config"],
          },
          {
            id: "zod-policy",
            col: 0,
            row: 1,
            title: "Zod 4 & Password Policy",
            subtitle: "Client-Side Schema Enforcement",
            badge: "VALIDATION",
            color: "#34d399",
            whatItDoes: "Validates forms, booking payloads, inquiry attachments, and live password strength checklists before network dispatch.",
            howBuilt: "Per-domain Zod 4 schema validators paired with real-time password strength policies and interactive feedback checklists.",
            modules: ["Password Strength Rules", "Interactive Checklist", "Domain Zod Validators", "Payload Safety"],
          },
          {
            id: "auth-guards",
            col: 1,
            row: 0,
            title: "3 Role Guards & Sessions",
            subtitle: "Customer · Partner · Devices",
            badge: "RBAC GUARDS",
            color: "#a78bfa",
            whatItDoes: "Enforces strict route boundaries across Customer, Partner, and Dual-Role views while letting users inspect and revoke active logged-in devices.",
            howBuilt: "Role-scoped navigation guards paired with multi-device session revocation cards and seamless role switching.",
            modules: ["Customer Route Guard", "Partner Route Guard", "Multi-Device Revocation", "Role Switcher"],
          },
          {
            id: "session-invalidator",
            col: 1,
            row: 1,
            title: "Live Session Revocation",
            subtitle: "Instant Remote Logout",
            badge: "ZERO TRUST",
            color: "#fb923c",
            whatItDoes: "Listens for server-side session revocation or password-change socket events and immediately purges local cache and tokens.",
            howBuilt: "Real-time revocation listener hooked into auth state, local query caches, and immediate user notifications.",
            modules: ["Remote Session Purge", "Socket Auth Listener", "Cache Wipe on Logout", "Security Toast Alerts"],
          },
          {
            id: "order-otp",
            col: 2,
            row: 0,
            title: "Order OTP Lifecycle",
            subtitle: "Timer · Verify · Rotate OTP",
            badge: "OTP HANDSHAKE",
            color: "#22d3ee",
            whatItDoes: "Manages live countdown timers, cryptographic OTP verification, and secure OTP rotation before completing service bookings and triggering settlement accruals.",
            howBuilt: "Interactive countdown timer cards, OTP verification modals, and confirmation-guarded OTP rotation flows.",
            modules: ["Live OTP Countdown", "OTP Verification Flow", "Safe OTP Rotation", "Settlement Trigger"],
          },
          {
            id: "update-gate",
            col: 2,
            row: 1,
            title: "Version & Update Gate",
            subtitle: "Contract & Policy Enforcement",
            badge: "COMPLIANCE",
            color: "#38bdf8",
            whatItDoes: "Blocks outdated mobile builds whenever breaking backend API or security policy upgrades ship.",
            howBuilt: "Server-checked minimum version gate with graceful upgrade prompts and configuration error fallbacks.",
            modules: ["Min-Version Check", "Upgrade Prompt Gate", "Config Fallback UI", "Release Sync"],
          },
        ],
        edges: [
          { from: "secure-store", to: "auth-guards", color: "#38bdf8" },
          { from: "zod-policy", to: "auth-guards", color: "#34d399" },
          { from: "secure-store", to: "session-invalidator", color: "#fb923c" },
          { from: "auth-guards", to: "order-otp", color: "#22d3ee" },
          { from: "session-invalidator", to: "update-gate", color: "#38bdf8" },
        ],
      },
      "data-caching": {
        id: "data-caching",
        label: "DB, Caching & Queues",
        caption: "Client-side HTTP 304 ETag query cache engine, booking handoff persistence, and delta resynchronization with backend Redis ETags.",
        colHeaders: [
          "01 · LOCAL STATE & STORAGE",
          "02 · ETAG 304 CACHE ENGINE",
          "03 · DELTA RESYNC & HANDOFF",
        ],
        nodes: [
          {
            id: "zustand-stores",
            col: 0,
            row: 0,
            title: "Domain Zustand 5 Stores",
            subtitle: "Booking · Orders · Favorites · Theme",
            badge: "STATE",
            color: "#38bdf8",
            whatItDoes: "Maintains reactive UI state slices per feature domain covering bookings, orders, favorites, dispatch ringing, and theme.",
            howBuilt: "Modular Zustand 5 state slices with selector memoization and persistent native Light/Dark theme preferences.",
            modules: ["Booking State Slice", "Order State Slice", "Ringing Dispatch State", "Theme Persistence"],
          },
          {
            id: "handoff-store",
            col: 0,
            row: 1,
            title: "Checkout Handoff Storage",
            subtitle: "Zero-Loss Checkout Recovery",
            badge: "PERSISTENCE",
            color: "#fb923c",
            whatItDoes: "Persists in-progress slot selections and payment intents locally so interrupted checkouts resume seamlessly.",
            howBuilt: "Durable AsyncStorage checkout state persistence paired with IST timezone-safe slot formatting helpers.",
            modules: ["Durable Handoff Cache", "AsyncStorage Layer", "Slot Time Formatting", "IST Date Utilities"],
          },
          {
            id: "etag-client",
            col: 1,
            row: 0,
            title: "ETag Conditional Client",
            subtitle: "If-None-Match · 304 Handling",
            badge: "ETAG ENGINE",
            color: "#22d3ee",
            whatItDoes: "Pairs with the backend Redis ETag layer to validate cached payloads via lightweight HTTP headers instead of re-downloading JSON.",
            howBuilt: "Conditional HTTP request interceptor managing ETag headers and transparent 304 cache hits.",
            modules: ["Conditional HTTP Layer", "If-None-Match Headers", "304 Not Modified", "Bandwidth Savings"],
          },
          {
            id: "query-cache",
            col: 1,
            row: 1,
            title: "Local Query Cache Engine",
            subtitle: "TTL · Tag Invalidation · LRU",
            badge: "CACHE CORE",
            color: "#34d399",
            whatItDoes: "Indexes cached API responses by query key and invalidates affected slices automatically upon mutations or socket events.",
            howBuilt: "Tag-indexed local query cache supporting TTL expiration, optimistic updates, and instant filtered outlet views.",
            modules: ["Keyed Query Cache", "Tag Invalidation", "Optimistic Updates", "Instant Filtering"],
          },
          {
            id: "resync-coord",
            col: 2,
            row: 0,
            title: "Global Resync Coordinator",
            subtitle: "Reconnect Delta Reconciliation",
            badge: "SYNC",
            color: "#a78bfa",
            whatItDoes: "Triggers targeted cache revalidation for active orders, notifications, and slot states whenever network or socket recovers.",
            howBuilt: "Centralized reconnect orchestration tying network state changes directly to prioritized domain cache refreshes.",
            modules: ["Reconnect Orchestrator", "Connectivity Monitor", "Notification Sync", "Order Delta Refresh"],
          },
          {
            id: "s3-direct",
            col: 2,
            row: 1,
            title: "Presigned S3 Streaming",
            subtitle: "Direct Bucket Media Upload",
            badge: "MEDIA IO",
            color: "#38bdf8",
            whatItDoes: "Uploads partner compliance documents and support attachments directly from device storage to AWS S3 without bogging down the API.",
            howBuilt: "Streams picked native media directly to presigned AWS S3 URLs with inline document preview verification.",
            modules: ["Native Media Picker", "Direct S3 Streaming", "Partner Onboarding Docs", "Support Attachments"],
          },
        ],
        edges: [
          { from: "zustand-stores", to: "etag-client", color: "#38bdf8" },
          { from: "handoff-store", to: "query-cache", color: "#fb923c" },
          { from: "etag-client", to: "query-cache", color: "#22d3ee" },
          { from: "query-cache", to: "resync-coord", color: "#a78bfa" },
          { from: "query-cache", to: "s3-direct", color: "#38bdf8" },
        ],
      },
      "realtime-ops": {
        id: "realtime-ops",
        label: "Real-Time, Failover & Ops",
        caption: "Live partner ringing dispatch state machine, network drop recovery, Reanimated 4 60fps UI worklets, and crash telemetry.",
        colHeaders: [
          "01 · SOCKET & FCM DISPATCH",
          "02 · RINGING & OFFLINE RECOVERY",
          "03 · 60FPS UI & CRASH GUARD",
        ],
        nodes: [
          {
            id: "socket-mgr",
            col: 0,
            row: 0,
            title: "Managed Socket.IO 4.8",
            subtitle: "Auto-Reconnect · Room Channels",
            badge: "WEBSOCKETS",
            color: "#22d3ee",
            whatItDoes: "Maintains authenticated Socket.IO channels for live booking updates, slot locks, and partner dispatch events.",
            howBuilt: "Resilient Socket.IO 4.8 client lifecycle with automatic room re-subscription and heartbeat health checks.",
            modules: ["Socket.IO 4.8 Client", "Auto Room Re-Join", "Heartbeat Monitoring", "Live Event Dispatch"],
          },
          {
            id: "fcm-service",
            col: 0,
            row: 1,
            title: "FCM Push Wakeup",
            subtitle: "Background & Foreground Alerts",
            badge: "PUSH",
            color: "#34d399",
            whatItDoes: "Wakes partner devices from background state when new bookings or support replies arrive.",
            howBuilt: "Firebase Cloud Messaging integration synchronized with server device tokens and in-app toast banners.",
            modules: ["Firebase Push Service", "Notification Router", "In-App Toast Alerts", "Device Token Sync"],
          },
          {
            id: "ringing-engine",
            col: 1,
            row: 0,
            title: "Dual-Sided Ringing Overlay",
            subtitle: "Customer & Partner Live Modals",
            badge: "LIVE DISPATCH",
            color: "#fb923c",
            whatItDoes: "Synchronizes real-time ringing alerts for both customers and service partners with countdown timers and one-tap acceptance.",
            howBuilt: "Global ringing overlay state machine coordinating partner acceptance, customer waiting status, and notification sync.",
            modules: ["Global Ringing Overlay", "Partner & User Modals", "Dispatch Countdown", "Notification Sync"],
          },
          {
            id: "net-monitor",
            col: 1,
            row: 1,
            title: "Connectivity Monitor",
            subtitle: "Offline Banner · Queue Replay",
            badge: "RESILIENCE",
            color: "#a78bfa",
            whatItDoes: "Detects cellular dropouts immediately, surfaces an inline connectivity banner, and triggers global resynchronization on recovery.",
            howBuilt: "Continuous network reachability tracking paired with automatic backoff retries and reconnect reconciliation.",
            modules: ["Network Reachability", "Offline Status Banner", "Reconnect Resync", "Backoff Retry Policy"],
          },
          {
            id: "reanimated-ui",
            col: 2,
            row: 0,
            title: "Reanimated 4 Worklets",
            subtitle: "NativeWind 4 · 60fps Gestures",
            badge: "UI ENGINE",
            color: "#38bdf8",
            whatItDoes: "Runs screen transitions, wizard steps, interactive charts, and list scrolling on the native UI thread at 60fps.",
            howBuilt: "Powered by Reanimated 4 worklets, NativeWind 4 utility styling, smooth list rendering, and adaptive Light/Dark palettes.",
            modules: ["Reanimated 4 Worklets", "Native Transitions", "60fps Smooth Lists", "Adaptive Theme Palette"],
          },
          {
            id: "crash-guard",
            col: 2,
            row: 1,
            title: "Crash Recovery & Logging",
            subtitle: "Error Boundaries · Diagnostics",
            badge: "STABILITY",
            color: "#34d399",
            whatItDoes: "Captures unhandled JS and native exceptions, logs structured diagnostics, and offers graceful one-tap state recovery.",
            howBuilt: "Global error recovery boundaries paired with structured mobile logging and automated Jest test coverage.",
            modules: ["Runtime Crash Guard", "Global Error Boundary", "Structured Diagnostics", "Jest Test Suite"],
          },
        ],
        edges: [
          { from: "socket-mgr", to: "ringing-engine", color: "#fb923c" },
          { from: "fcm-service", to: "ringing-engine", color: "#34d399" },
          { from: "socket-mgr", to: "net-monitor", color: "#a78bfa" },
          { from: "ringing-engine", to: "reanimated-ui", color: "#38bdf8" },
          { from: "net-monitor", to: "crash-guard", color: "#34d399" },
        ],
      },
    },
  },
];

const SYSTEM_ICONS = {
  "ai-agent": BrainCircuit,
  "realtime-platform": Server,
  "mobile-suite": Smartphone,
};

const DOC_SECTIONS: {
  key: keyof SystemBlueprint["documentation"];
  title: string;
  tag: string;
}[] = [
  {
    key: "overviewAndFeatures",
    title: "Overview, Purpose & Key Features",
    tag: "01 // PURPOSE",
  },
  {
    key: "systemAndDbArchitecture",
    title: "Frontend, Backend, API & Database Architecture",
    tag: "02 // ARCHITECTURE",
  },
  {
    key: "authAndSecurity",
    title: "Authentication, Authorization & Zero-Trust Security",
    tag: "03 // SECURITY",
  },
  {
    key: "dataFlowAndWorkflows",
    title: "Data Flow & Application Workflows",
    tag: "04 // WORKFLOWS",
  },
  {
    key: "realtimeAndBackgroundJobs",
    title: "Integrations, Real-Time Events & Background Workers",
    tag: "05 // REAL-TIME & JOBS",
  },
  {
    key: "scalabilityAndFaultTolerance",
    title: "Scalability, Caching, Performance & Fault Tolerance",
    tag: "06 // SCALABILITY",
  },
  {
    key: "challengesAndSolutions",
    title: "Engineering Challenges, Decisions & Solutions",
    tag: "07 // DECISIONS",
  },
];

export function D3ArchitectureBlueprints({
  initialSystem = "ai-agent",
}: {
  initialSystem?: SystemBlueprint["id"];
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [systemId, setSystemId] = useState<SystemBlueprint["id"]>(initialSystem);
  const [viewId, setViewId] = useState<ViewLayerId>("overview");

  const blueprint =
    BLUEPRINTS.find((b) => b.id === systemId) ?? BLUEPRINTS[0];
  const currentView = blueprint.views[viewId] ?? blueprint.views.overview;

  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    currentView.nodes[2]?.id ?? currentView.nodes[0].id,
  );
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const bp = BLUEPRINTS.find((b) => b.id === systemId) ?? BLUEPRINTS[0];
    const vw = bp.views[viewId] ?? bp.views.overview;
    setSelectedNodeId(vw.nodes[2]?.id ?? vw.nodes[0].id);
  }, [systemId, viewId]);

  const activeNode =
    currentView.nodes.find((n) => n.id === selectedNodeId) ??
    currentView.nodes[0];

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = 940;
    const height = 430;
    const nodeW = 224;
    const nodeH = 88;
    const colX = [36, 358, 680];

    const colCounts = [0, 0, 0];
    currentView.nodes.forEach((n) => {
      colCounts[n.col] += 1;
    });

    const positioned = currentView.nodes.map((n) => {
      const count = colCounts[n.col];
      const totalH = count * nodeH + (count - 1) * 34;
      const startY = (height - totalH) / 2 + 8;
      const x = colX[n.col];
      const y = startY + n.row * (nodeH + 34);
      return {
        ...n,
        x,
        y,
        cx: x + nodeW / 2,
        cy: y + nodeH / 2,
      };
    });

    const nodeMap = new Map(positioned.map((n) => [n.id, n]));

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const lightColorMap: Record<string, string> = {
      "#38bdf8": "#0284c7",
      "#22d3ee": "#0891b2",
      "#34d399": "#059669",
      "#fb923c": "#d97706",
      "#a78bfa": "#7c3aed",
    };
    const tone = (hex: string) => (isDark ? hex : (lightColorMap[hex] ?? hex));

    const defs = svg.append("defs");
    const glow = defs
      .append("filter")
      .attr("id", "bp-glow")
      .attr("x", "-40%")
      .attr("y", "-40%")
      .attr("width", "180%")
      .attr("height", "180%");
    glow
      .append("feGaussianBlur")
      .attr("stdDeviation", isDark ? "3.5" : "2.0")
      .attr("result", "b");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "b");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    svg
      .append("g")
      .selectAll("text")
      .data(currentView.colHeaders)
      .join("text")
      .attr("x", (_d, i) => colX[i] + nodeW / 2)
      .attr("y", 24)
      .attr("text-anchor", "middle")
      .attr("fill", isDark ? "#94a3b8" : "#475569")
      .attr("font-size", "10.5px")
      .attr("font-weight", "600")
      .attr("letter-spacing", "0.1em")
      .attr("font-family", "var(--font-mono), monospace")
      .text((d) => d);

    svg
      .append("g")
      .selectAll("rect")
      .data([0, 1, 2])
      .join("rect")
      .attr("x", (i) => colX[i] - 12)
      .attr("y", 36)
      .attr("width", nodeW + 24)
      .attr("height", height - 48)
      .attr("rx", 20)
      .attr("fill", isDark ? "rgba(15, 23, 42, 0.35)" : "rgba(241, 245, 249, 0.85)")
      .attr("stroke", isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(15, 23, 42, 0.1)")
      .attr("stroke-dasharray", "4 6");

    const linkGen = d3
      .linkHorizontal<
        { source: [number, number]; target: [number, number] },
        [number, number]
      >()
      .x((d) => d[0])
      .y((d) => d[1]);

    const edgesLayer = svg.append("g");

    currentView.edges.forEach((edge, idx) => {
      const src = nodeMap.get(edge.from);
      const dst = nodeMap.get(edge.to);
      if (!src || !dst) return;

      const sameCol = src.col === dst.col;
      const pathD = sameCol
        ? `M ${src.cx} ${src.y + nodeH} L ${dst.cx} ${dst.y}`
        : (linkGen({
            source: [src.x + nodeW, src.cy],
            target: [dst.x, dst.cy],
          }) ?? "");

      const isConnected =
        edge.from === selectedNodeId || edge.to === selectedNodeId;
      const pathId = `bp-edge-${blueprint.id}-${viewId}-${idx}`;
      const edgeColor = tone(edge.color);

      edgesLayer
        .append("path")
        .attr("id", pathId)
        .attr("d", pathD)
        .attr("fill", "none")
        .attr("stroke", edgeColor)
        .attr("stroke-width", isConnected ? 2.4 : 1.5)
        .attr("stroke-opacity", isConnected ? 0.85 : 0.34);

      edgesLayer
        .append("path")
        .attr("class", "animate-signal-dash")
        .attr("d", pathD)
        .attr("fill", "none")
        .attr("stroke", edgeColor)
        .attr("stroke-width", isConnected ? 2.4 : 1.4)
        .attr("stroke-opacity", isConnected ? 0.95 : 0.5);

      const pkt = edgesLayer
        .append("circle")
        .attr("r", isConnected ? 4.2 : 3)
        .attr("fill", edgeColor)
        .attr("filter", "url(#bp-glow)");

      pkt
        .append("animateMotion")
        .attr("dur", `${2.0 + (idx % 3) * 0.45}s`)
        .attr("repeatCount", "indefinite")
        .append("mpath")
        .attr("href", `#${pathId}`);
    });

    const nodesLayer = svg.append("g");
    const nodeGroups = nodesLayer
      .selectAll("g")
      .data(positioned)
      .join("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer");

    nodeGroups
      .append("rect")
      .attr("width", nodeW)
      .attr("height", nodeH)
      .attr("rx", 16)
      .attr("fill", (d) =>
        d.id === selectedNodeId
          ? isDark ? "#0f1e38" : "#f0f9ff"
          : isDark ? "rgba(10, 18, 34, 0.95)" : "#ffffff",
      )
      .attr("stroke", (d) => tone(d.color))
      .attr("stroke-width", (d) => (d.id === selectedNodeId ? 2.4 : 1.3))
      .attr("stroke-opacity", (d) => (d.id === selectedNodeId ? 1 : 0.5))
      .attr("filter", (d) => (d.id === selectedNodeId ? "url(#bp-glow)" : null));

    nodeGroups
      .append("circle")
      .attr("cx", 18)
      .attr("cy", 21)
      .attr("r", 3.8)
      .attr("fill", (d) => tone(d.color));

    nodeGroups
      .append("text")
      .attr("x", 29)
      .attr("y", 24.5)
      .attr("fill", (d) => tone(d.color))
      .attr("font-size", "9.5px")
      .attr("font-weight", "700")
      .attr("letter-spacing", "0.08em")
      .attr("font-family", "var(--font-mono), monospace")
      .text((d) => d.badge);

    nodeGroups
      .append("text")
      .attr("x", 16)
      .attr("y", 50)
      .attr("fill", isDark ? "#f8fafc" : "#0f172a")
      .attr("font-size", "13.5px")
      .attr("font-weight", "700")
      .text((d) => d.title);

    nodeGroups
      .append("text")
      .attr("x", 16)
      .attr("y", 71)
      .attr("fill", isDark ? "#94a3b8" : "#475569")
      .attr("font-size", "10.5px")
      .attr("font-family", "var(--font-mono), monospace")
      .text((d) => d.subtitle);

    nodeGroups
      .on("click", (_event, d) => setSelectedNodeId(d.id))
      .on("mouseenter", (_event, d) => setSelectedNodeId(d.id));
  }, [blueprint.id, currentView, selectedNodeId, viewId, isDark]);

  return (
    <div className="space-y-6">
      {/* Top Bar: 3-System Selector Tabs */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div
          role="tablist"
          aria-label="Select flagship system architecture"
          className="flex flex-wrap gap-2.5"
        >
          {BLUEPRINTS.map((bp) => {
            const Icon = SYSTEM_ICONS[bp.id];
            const active = bp.id === blueprint.id;
            return (
              <button
                key={bp.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSystemId(bp.id)}
                className={`relative inline-flex min-h-[44px] items-center gap-2 rounded-2xl px-4 py-2 text-xs font-semibold sm:px-5 sm:text-sm ${
                  active ? "btn-cool-primary" : "btn-cool-secondary"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{bp.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* 4 Architectural View Layer Switcher */}
        <div
          role="tablist"
          aria-label="Switch architectural diagram layer"
          className="surface-subcard flex flex-wrap gap-1.5 rounded-2xl p-1.5"
        >
          {VIEW_TABS.map((vt) => {
            const VIcon = vt.icon;
            const active = viewId === vt.id;
            return (
              <button
                key={vt.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setViewId(vt.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 font-mono text-xs font-semibold ${
                  active ? "btn-cool-primary" : "btn-cool-ghost border-transparent bg-transparent"
                }`}
              >
                <VIcon className="h-3.5 w-3.5" />
                {vt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main D3 Interactive Architecture Studio Canvas */}
      <div className="glass-panel relative overflow-hidden rounded-[2rem]">
        <div
          aria-hidden="true"
          className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/12 blur-[100px]"
        />

        {/* Blueprint Header */}
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] px-6 py-5 sm:px-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-sky-400">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              {blueprint.tag} // {currentView.label.toUpperCase()}
            </div>
            <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {blueprint.title}
            </h3>
            <p className="mt-1 text-sm text-slate-300">{currentView.caption}</p>
          </div>

          <Link
            href={`/projects/${blueprint.slug}`}
            className="btn-cool-secondary inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-4 py-2 font-mono text-xs font-semibold"
          >
            Full Case Study
            <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" />
          </Link>
        </div>

        {/* Interactive System Diagram Canvas */}
        <div className="relative z-10 w-full px-3 pt-4 sm:px-6">
          <svg
            ref={svgRef}
            className="mx-auto block h-auto w-full max-w-[980px] select-none"
            role="img"
            aria-label={`Interactive system architecture blueprint for ${blueprint.title} (${currentView.label})`}
          />
        </div>

        {/* Live Node Inspector Drawer */}
        <div className="relative z-10 border-t border-white/[0.08] px-6 py-5 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${blueprint.id}-${viewId}-${activeNode.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid gap-5 lg:grid-cols-12 lg:items-start"
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: activeNode.color,
                      boxShadow: `0 0 10px ${activeNode.color}`,
                    }}
                  />
                  SELECTED COMPONENT // {activeNode.badge}
                </div>
                <h4 className="mt-1.5 text-lg font-semibold text-white">
                  {activeNode.title}
                </h4>
                <p className="font-mono text-xs text-slate-400">
                  {activeNode.subtitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeNode.modules.map((m) => (
                    <span
                      key={m}
                      className="chip-accent rounded-lg px-2.5 py-1 font-mono text-xs"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                <div className="surface-subcard rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                    <Cpu className="h-3.5 w-3.5" />
                    Component Role &amp; Data Flow
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    {activeNode.whatItDoes}
                  </p>
                </div>

                <div className="surface-subcard rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
                    <Wrench className="h-3.5 w-3.5" />
                    Codebase Implementation
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    {activeNode.howBuilt}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Comprehensive 7-Section Technical Documentation Matrix + Stack */}
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:col-span-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
              <Workflow className="h-4 w-4" />
              Complete Technical Architecture Documentation
            </div>
            <span className="font-mono text-xs text-slate-400">
              Audited from Production Source
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {DOC_SECTIONS.map((sec, idx) => (
              <div
                key={sec.key}
                className={`surface-subcard rounded-2xl p-4 ${
                  idx === DOC_SECTIONS.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                  {sec.tag}
                </div>
                <h4 className="mt-1 text-sm font-semibold text-white">
                  {sec.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {blueprint.documentation[sec.key]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel flex flex-col justify-between rounded-3xl p-6 sm:p-7 lg:col-span-4">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
              Verified System Scale
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {blueprint.verifiedMetrics.map((m) => (
                <div
                  key={m.label}
                  className="surface-subcard rounded-2xl p-3.5"
                >
                  <div className="font-mono text-lg font-bold text-white">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-white/[0.08] pt-5">
            <div className="mb-3 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Complete Technology Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {blueprint.techStack.map((t) => (
                <span
                  key={t}
                  className="chip-accent rounded-lg px-2.5 py-1 font-mono text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
