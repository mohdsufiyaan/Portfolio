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
      "Sanctum · OTP 2FA · LogRedactor",
      "MS Graph & Google OAuth 2.0 (AES-256)",
      "6 Queue Worker Channels · 89 Tests",
    ],
    documentation: {
      overviewAndFeatures:
        "An autonomous enterprise operations platform enabling teams to delegate tasks via web chat or two-way Slack AI Bot (including Slack voice note transcription via `SlackVoiceTranscriptionService`), track execution time via live stopwatches (`TimeLog`), generate 0–100 End-of-Day employee scorecards (`EodReport`, `PerformanceEngineService`), search manuals via Hybrid RAG, and orchestrate 17 unified Microsoft 365 & Google Workspace mail/calendar tools (`MailUndoManager`, `CalendarFindFreeTimeTool`, 24-hour undoable `PendingAction`).",
      systemAndDbArchitecture:
        "Built on Laravel 12 & PHP 8.2 with 22 HTTP controllers, 28 Eloquent models (`Task`, `AiTask`, `AiAuditLog`, `TurnJob`, `MailConnection`, `MailMemory`, `SlackUserConnection`, `NotificationPreference`), a custom Agentic Harness (`app/Services/AI/Harness/`) driving 39 core tools + 17 unified mail/calendar tools, and dedicated `app/Slack/` and `app/Notifications/` subsystems.",
      authAndSecurity:
        "Enforces Sanctum auth + OTP 2FA (`SendAuthOtpJob`, `AuthOtpMail`) and 3-layer Zero-Trust Defense (ZTD) across Admin, Manager, and Employee roles (`AccessScope`, `DepartmentBoundaryGuard`, controller 403 checks, AI tool gates). Verifies Slack payloads cryptographically (`SlackWebhookVerifier`), blocks injections (`PromptInjectionPatterns`), encrypts OAuth tokens with AES-256, and scrubs PII/secrets in logs via `AiAgentLogger` + `LogRedactor` + `AuditLogService`.",
      dataFlowAndWorkflows:
        "Chat turns from Web SSE (`AIChatController`) or Slack (`SlackAiChatTaskHandler`, `SlackCommands`) pass through `RequestPreprocessor` → `IntentClassifier` & `SemanticIntentRouter` → `ModeGovernance` → `ToolSelector` & `TokenBudgetManager` → `AgentOrchestrator` (≤6 steps) → `ToolExecutor` → `GroundednessService` (lexical & cosine verification) with every step traced in `AiAuditLog` and `MailActionLog`.",
      realtimeAndBackgroundJobs:
        "Streams tokens via SSE, runs a Slack Socket Mode listener (`SlackListenCommand`), and dispatches multi-channel notifications across In-App, Firebase FCM (`SendFcmNotificationJob`), WhatsApp (`WhatsAppNotificationService`, `SendWhatsAppNotificationJob`), and Slack (`SlackNotificationBridge`, `SendSlackNotificationJob`) alongside 15+ async jobs (`ExecuteBackgroundTaskSliceJob`, `GenerateEmbeddingJob`, `DeltaSyncMailJob`, `ProcessGoogleMailWebhook`) across 6 priority queues.",
      scalabilityAndFaultTolerance:
        "Routes LLM calls through `MultiProviderLLMGateway` and `ModelRouter` (`GeminiCodec`, `OpenAiCompatibleCodec`) with `SharedQuotaService`, `ExternalBurstLimiter`, and automatic circuit breakers on HTTP 429/402 switching across Groq, Gemini, and OpenRouter (`LlmCooldownResumeHandler`, `DegradedModeService`).",
      challengesAndSolutions:
        "Solved context bloat and LLM spend (30–50% savings) via `ToolResultCompressor`, `ContextOptimizationService`, and `ConversationSummariser`. Eliminated concurrent task race conditions with MySQL 8 `lockForUpdate` row locks + optimistic `version` columns, and built CLI diagnostics (`AnalyzeAiLogs`, `AiUsageReport`, `DiagnoseNotifications`) for production triage.",
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
            title: "AIChatController",
            subtitle: "SSE Stream · TurnJobService",
            badge: "API INGRESS",
            color: "#38bdf8",
            whatItDoes: "Accepts authenticated chat turns, initializes `TurnJob` tracking, and streams live reasoning steps & tokens via Server-Sent Events.",
            howBuilt: "Implemented in `AIChatController.php` and `TurnJobService.php` with `EnsureAuthenticated` and `ResolveAuthenticatedUser` middleware.",
            modules: ["AIChatController", "TurnJobService", "TurnJob Model", "SSE Stream"],
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
            howBuilt: "Powered by `SlackAiChatTaskHandler`, `SlackVoiceTranscriptionService`, `SlackWebhookVerifier`, `UnifiedMailService`, and `MailUndoManager`.",
            modules: ["SlackAiChatTaskHandler", "SlackVoiceTranscription", "UnifiedMailService (17)", "MailUndoManager"],
          },
          {
            id: "orchestrator",
            col: 1,
            row: 0,
            title: "AgentOrchestrator",
            subtitle: "39 Tools · ≤6 Reasoning Steps",
            badge: "HARNESS",
            color: "#fb923c",
            whatItDoes: "Routes intent, selects permitted domain tools, enforces token budgets, and coordinates multi-step tool execution.",
            howBuilt: "Combines `AgentOrchestrator`, `SemanticIntentRouter`, `ModeGovernance`, `ToolSelector`, `ToolExecutor`, and `TokenBudgetManager`.",
            modules: ["AgentOrchestrator", "ToolSelector", "ToolRegistry (39)", "TokenBudgetManager"],
          },
          {
            id: "grounding",
            col: 1,
            row: 1,
            title: "Groundedness & EOD",
            subtitle: "Cosine Check · 0–100 Scores",
            badge: "VERIFICATION",
            color: "#a78bfa",
            whatItDoes: "Validates model claims against tool outputs using lexical & cosine similarity and computes 0–100 employee EOD scorecards.",
            howBuilt: "Powered by `GroundednessService`, `AgentVerificationGuard`, `AgentReplyGuard`, `PerformanceEngineService`, and `EodAnomalyService`.",
            modules: ["GroundednessService", "AgentVerificationGuard", "PerformanceEngineService", "EodAnomalyService"],
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
            howBuilt: "Implemented in `PineconeVectorService.php` (Jina 1024-dim embeddings), `AgentRagService.php`, and `AppManualService.php`.",
            modules: ["PineconeVectorService", "AgentRagService", "AppManualService", "SearchKnowledgeRagTool"],
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
            howBuilt: "Engineered in `MultiProviderLLMGateway`, `ModelRouter`, `GeminiCodec`, `OpenAiCompatibleCodec`, and `SharedQuotaService`.",
            modules: ["MultiProviderLLMGateway", "ModelRouter", "SharedQuotaService", "DegradedModeService"],
          },
          {
            id: "mysql-store",
            col: 2,
            row: 2,
            title: "MySQL 8 & Telemetry",
            subtitle: "28 Models · AiAuditLog",
            badge: "PERSISTENCE",
            color: "#38bdf8",
            whatItDoes: "Persists tasks, time logs, EOD reports, conversation sequence messages, and retrieval observability audit logs.",
            howBuilt: "28 Eloquent models with composite indexes, optimistic `version` locking, `AiMetricsCollector`, and `TracingService`.",
            modules: ["Task & TimeLog", "AiAuditLog", "AiMetricsCollector", "TracingService"],
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
            subtitle: "SendAuthOtpJob · Session Auth",
            badge: "IDENTITY",
            color: "#38bdf8",
            whatItDoes: "Verifies user identity with Laravel Sanctum tokens, OTP two-factor authentication, and email blacklist/change-request guards.",
            howBuilt: "Built with `AuthController`, `EnsureAuthenticated`, `RequireAuthenticatedUser`, and `SendAuthOtpJob`.",
            modules: ["AuthController", "EnsureAuthenticated", "SendAuthOtpJob", "Email Blacklist Migration"],
          },
          {
            id: "prompt-guard",
            col: 0,
            row: 1,
            title: "Prompt Injection Guard",
            subtitle: "RequestPreprocessor · Regex/AST",
            badge: "SANITIZER",
            color: "#fb923c",
            whatItDoes: "Intercepts jailbreaks, system-prompt extraction attempts, and cross-role privilege escalation payloads prior to planning.",
            howBuilt: "Implemented in `PromptInjectionPatterns.php`, `RequestPreprocessor.php`, and `TechnologyDisclosureGuard.php`.",
            modules: ["PromptInjectionPatterns", "RequestPreprocessor", "TechnologyDisclosureGuard", "QueryNormalizer"],
          },
          {
            id: "access-scope",
            col: 1,
            row: 0,
            title: "3-Layer ZTD RBAC",
            subtitle: "Admin · Manager · Employee",
            badge: "AUTHORIZATION",
            color: "#34d399",
            whatItDoes: "Enforces role hierarchy at three boundaries: Eloquent query scoping, HTTP controller 403 checks, and AI tool execution gates.",
            howBuilt: "Centralized in `AccessScope.php`, `AgentSecurityPolicy.php`, and `CapabilityPreflightValidator.php`.",
            modules: ["AccessScope", "AgentSecurityPolicy", "CapabilityPreflightValidator", "OverdueScope"],
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
            howBuilt: "Enforced by `DepartmentBoundaryGuard.php` and `ModeGovernance.php` before any tool invocation.",
            modules: ["DepartmentBoundaryGuard", "ModeGovernance", "Department Model", "MailPolicyAdminController"],
          },
          {
            id: "aes-vault",
            col: 2,
            row: 0,
            title: "AES-256 OAuth Vault",
            subtitle: "Encrypted Tokens · 24h Undo",
            badge: "ENCRYPTION",
            color: "#22d3ee",
            whatItDoes: "Encrypts Microsoft Graph and Google OAuth refresh/access tokens at rest and requires human confirmation/undo window for sensitive actions.",
            howBuilt: "Uses AES-256 encrypted attributes on `MailConnection`, scoped grants in `MailPermissionGrant`, and `PendingAction`.",
            modules: ["MailConnection (AES-256)", "MailPermissionGrant", "PendingAction (24h Undo)", "RefreshMailTokensJob"],
          },
          {
            id: "audit-log",
            col: 2,
            row: 1,
            title: "Redacted Logs & Audit",
            subtitle: "LogRedactor · AiAuditLog",
            badge: "LOGGING & AUDIT",
            color: "#38bdf8",
            whatItDoes: "Scrubs sensitive tokens/PII automatically via `LogRedactor`, writes structured `AiAgentLogger` traces, and records every tool, RAG, Slack, and mail action.",
            howBuilt: "Backed by `AiAgentLogger.php`, `LogRedactor.php`, `AuditLogService.php`, `AiAuditLog`, `MailActionLog`, and `AnalyzeAiLogs` CLI.",
            modules: ["AiAgentLogger", "LogRedactor", "AiAuditLog", "AnalyzeAiLogs CLI"],
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
            title: "ToolResultCompressor",
            subtitle: "30–50% Token Cost Savings",
            badge: "OPTIMIZER",
            color: "#fb923c",
            whatItDoes: "Prunes duplicate conversation history and compresses verbose JSON tool payloads before injecting them into the LLM context window.",
            howBuilt: "Built with `ToolResultCompressor.php`, `ContextOptimizationService.php`, and `TokenBudgetManager.php`.",
            modules: ["ToolResultCompressor", "ContextOptimizationService", "ContextBuilder", "TokenBudgetManager"],
          },
          {
            id: "memory-mgr",
            col: 0,
            row: 1,
            title: "Memory & Summariser",
            subtitle: "Sequence Ordering · MailMemory",
            badge: "MEMORY",
            color: "#38bdf8",
            whatItDoes: "Maintains deterministic message sequence numbers, summarizes long threads, and persists semantic mail memories.",
            howBuilt: "Handled by `ConversationMemoryManager.php`, `ConversationSummariser.php`, `ConversationPersistenceService.php`, and `MailMemory`.",
            modules: ["ConversationMemoryManager", "ConversationSummariser", "MailMemory", "ExtractMailMemoryJob"],
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
            howBuilt: "Managed by `PineconeVectorService`, `AgentRagService`, and artisan commands `rag:index` & `rag:index-manuals`.",
            modules: ["PineconeVectorService", "unique_pinecone_id", "MySQL Full-Text", "Reciprocal Rank Fusion"],
          },
          {
            id: "mysql-locks",
            col: 1,
            row: 1,
            title: "MySQL 8 Concurrency",
            subtitle: "lockForUpdate · Version Col",
            badge: "ACID STORAGE",
            color: "#34d399",
            whatItDoes: "Prevents race conditions when multiple workers or users update task statuses, timers, or EOD items simultaneously.",
            howBuilt: "Combines composite indexes (`harness_v2_usage_indexes`), eager loading, `lockForUpdate`, and optimistic `version` columns.",
            modules: ["lockForUpdate", "add_version_to_tasks_table", "Composite Indexes", "EodDraftManager"],
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
            howBuilt: "Implemented via `TaskManager.php`, `TaskSlicer.php`, `ExecuteBackgroundTaskSliceJob.php`, and `BulkMailArchiveHandler.php`.",
            modules: ["TaskSlicer", "ExecuteBackgroundTaskSliceJob", "Heartbeat Migration", "BulkMailArchiveHandler"],
          },
          {
            id: "six-queues",
            col: 2,
            row: 1,
            title: "6 Priority Queue Lanes",
            subtitle: "high · ai-fast · ai-long · rag",
            badge: "WORKERS",
            color: "#38bdf8",
            whatItDoes: "Isolates latency-sensitive interactive AI turns (`ai-fast`) from heavy document ingestion (`rag`, `embeddings`) and mail delta syncs.",
            howBuilt: "Configured in Composer worker scripts driving `GenerateEmbeddingJob`, `IngestDocumentJob`, `DeltaSyncMailJob`, and `ExecuteMailJob`.",
            modules: ["queue=high,ai-fast,ai-long", "GenerateEmbeddingJob", "IngestDocumentJob", "DeltaSyncMailJob"],
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
            whatItDoes: "Streams live tool invocation badges and LLM tokens to the browser while recording `AiTaskEvent` milestones.",
            howBuilt: "Built on Server-Sent Events in `AIChatController` with `AiTask` and `AiTaskEvent` persistence.",
            modules: ["SSE EventStream", "AiTaskEvent", "NotificationController", "SendSlackNotificationJob"],
          },
          {
            id: "mail-webhooks",
            col: 0,
            row: 1,
            title: "Slack, WhatsApp & FCM",
            subtitle: "4-Channel Dispatch · Webhooks",
            badge: "MULTI-CHANNEL",
            color: "#34d399",
            whatItDoes: "Dispatches task & EOD alerts across In-App, Firebase FCM, WhatsApp, and Slack Block Kit while syncing incoming Gmail/MS Graph & Slack webhooks.",
            howBuilt: "Engineered with `NotificationDispatcher`, `WhatsAppNotificationService`, `SendFcmNotificationJob`, `SlackNotificationBridge`, and `SlackListenCommand`.",
            modules: ["WhatsAppNotificationService", "SendFcmNotificationJob", "SlackNotificationBridge", "SlackListenCommand"],
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
            howBuilt: "Implemented in `MultiProviderLLMGateway`, `DegradedModeService`, and `LlmCooldownResumeHandler`.",
            modules: ["MultiProviderLLMGateway", "LlmCooldownResumeHandler", "DegradedModeService", "OpenRouterService"],
          },
          {
            id: "quota-governor",
            col: 1,
            row: 1,
            title: "Quota & Burst Limiter",
            subtitle: "SharedQuota · UsageTracker",
            badge: "GOVERNANCE",
            color: "#a78bfa",
            whatItDoes: "Tracks token spend per user/department, shapes burst concurrency against external APIs, and snapshots daily quota health.",
            howBuilt: "Powered by `SharedQuotaService`, `QuotaSnapshotService`, `ExternalBurstLimiter`, and `AgentUsageTracker`.",
            modules: ["SharedQuotaService", "QuotaSnapshotService", "ExternalBurstLimiter", "AgentUsageTracker"],
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
            howBuilt: "Built with `AiMetricsDashboardController`, `AiMetricsCollector`, `TracingService`, `AlertingService`, and `PerformanceMonitoringService`.",
            modules: ["AiMetricsDashboardController", "AiMetricsCollector", "TracingService", "AlertingService"],
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
            howBuilt: "89 automated test files across unit, feature, security, and golden agent scenario suites.",
            modules: ["89 Test Files", "Golden Agent Scenarios", "Prompt Injection Suite", "FeatureFlagService"],
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
      { value: "46 Models", label: "15 Modular Prisma PG Schemas" },
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
        "Uses a multi-file Prisma 7 PostgreSQL schema (`prisma/schema/`) with 46 models split cleanly across 13 domain modules: `settlement.prisma` (15 models), `support.prisma` (8 models + SLA policies & outbox), `booking.prisma`, `payment.prisma`, `vendor.prisma`, `slot.prisma`, `admin.prisma`, `inquiry.prisma`, `review.prisma`, `reminder.prisma`, `favorite.prisma`, and `session.prisma`.",
      authAndSecurity:
        "Secures customer/partner APIs with Argon2 password hashing, JWT + database `Session` & `Device` tracking, dual-channel OTP delivery (`otpEmailWorker.js` & `otpPhoneSmsWorker.js`), Cloudflare Turnstile (`turnstileService.js`), Helmet, Zod 4 validation, and Redis `rate-limiter-flexible`. The Admin Control Plane enforces stateful sessions (`verifyAdminStatefulSession.js`), MFA (`/mfa`), Step-Up re-authentication (`stepUpMiddleware.js`), and automatic `adminAuditInterceptor.js` logging.",
      dataFlowAndWorkflows:
        "Slot reservations acquire distributed Redis locks (`redisLocks.js`), transition via `bookingStateMachine.js` with `idempotencyMiddleware.js`, process async payment webhooks (`workers/payment/webhookWorker.js`), emit transactional `slotOutbox.js` events, verify on-site service completion via rotating OTP handshakes (`orderOtpService.js`), and accrue earnings into `SettlementLedgerEntry`.",
      realtimeAndBackgroundJobs:
        "Synchronizes live bookings, slot holds, support presence (`supportPresenceService.js`), and live admin support taps (`supportTap.js`) via Socket.IO 4.8 (`@socket.io/redis-adapter`, `slotKeyspaceListener.js`) while running specialized BullMQ queues across OTP (`otpEmailWorker`, `otpPhoneSmsWorker`), Payments (`webhookWorker`), Support (`supportOutboxWorker`, `supportSlaSweeper`), Core (`mail`, `notification`, `reminder`, `reminderSweeper`, `slotWarmer`, `cleanup`), and `settlementWorkers.js`.",
      scalabilityAndFaultTolerance:
        "Combines L1 In-Memory LRU (`l1CacheMiddleware.js`) + L2 Redis + automated HTTP 304 ETag invalidation (`etagService.js`, `etagInvalidation.js`). Protects automated RazorpayX partner payouts with a circuit breaker (`breaker.js`), `payoutStateMachine.js`, `reconciliationService.js`, structured Pino rolling logs (`utils/logger.js`, `settlementLogger.js`), and authenticated Prometheus metrics (`metricsAuth.js`).",
      challengesAndSolutions:
        "Prevented double-booking under high concurrency using Redis mutex locks + Redis keyspace TTL expiry listeners (`slotKeyspaceListener.js`) + `slotWarmer.js`. Eliminated silent audit gaps with `adminAuditInterceptor.js` + 4 domain audit tables (`AdminAuditLog`, `SettlementAuditLog`, `SupportAuditLog`, `InquiryAuditLog`) and automated PDF settlement slips (`slipPdf.js`).",
    },
    views: {
      overview: {
        id: "overview",
        label: "High-Level & API Flow",
        caption: "3-application monorepo connecting the Customer/Partner Portal and MFA Admin Control Plane to the Express 5 Cluster, Settlement Ledger, and PostgreSQL.",
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
            whatItDoes: "Powers service discovery, live slot reservation (`/book-slot`), Razorpay checkout, order tracking, and partner slot/payout dashboards.",
            howBuilt: "Next.js 16.2 App Router with React 19, Zustand 5, Zod 4, `react-razorpay`, `socket.io-client`, and Firebase Web Push.",
            modules: ["book-slot", "partner/dashboard", "slot-management", "partner/payouts"],
          },
          {
            id: "admin-web",
            col: 0,
            row: 1,
            title: "MFA Admin Control Plane",
            subtitle: "Next.js 16 · Step-Up · Audit Logs",
            badge: "ADMIN PORTAL",
            color: "#a78bfa",
            whatItDoes: "Provides operations & finance governance over bookings, refunds, settlement batches, payout holds, discrepancies, and SLA support.",
            howBuilt: "Dedicated Next.js 16 portal enforcing `server-only` boundaries, `/mfa`, `/step-up` auth, and real-time socket streams.",
            modules: ["finance/settlement", "finance/reconciliation", "finance/refunds", "audit-logs"],
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
            howBuilt: "Modular controllers/services with `bookingStateMachine.js`, `orderOtpService.js`, `idempotencyMiddleware.js`, and `redisLocks.js`.",
            modules: ["bookingStateMachine.js", "orderOtpService.js", "redisLocks.js", "idempotencyMiddleware.js"],
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
            howBuilt: "Built in `src/sockets/` (`adapter.js`, `emitter.js`, `presence.js`, `connectionHandler.js`) and `src/slots/slotSockets.js`.",
            modules: ["@socket.io/redis-adapter", "slotSockets.js", "presence.js", "statusPublisher.js"],
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
            howBuilt: "Engineered in `src/settlement/` (`accrualService`, `batchService`, `payoutStateMachine`, `reconciliationService`, `slipPdf.js`).",
            modules: ["accrualService.js", "payoutStateMachine.js", "reconciliationService.js", "slipPdf.js"],
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
            howBuilt: "Powered by BullMQ 5 & `ioredis` across `mailWorker`, `notificationWorker`, `reminderWorker`, `slotWarmerWorker`, and `settlementWorkers`.",
            modules: ["mailWorker.js", "notificationWorker.js", "slotWarmerWorker.js", "settlementWorkers.js"],
          },
          {
            id: "prisma-pg",
            col: 2,
            row: 2,
            title: "PostgreSQL & AWS S3",
            subtitle: "46 Prisma Models · Presigned URLs",
            badge: "DATA LAYER",
            color: "#34d399",
            whatItDoes: "Persists 46 relational models across 13 Prisma domain schemas and streams compliance documents/media directly to AWS S3.",
            howBuilt: "Uses `@prisma/adapter-pg`, `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`, and `fileStorageService.js`.",
            modules: ["46 Prisma Models", "@prisma/adapter-pg", "fileStorageService.js", "S3 Presigner"],
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
            subtitle: "RateLimiter · AppVersionGate",
            badge: "PERIMETER",
            color: "#38bdf8",
            whatItDoes: "Blocks abusive traffic, enforces compatible client versions, validates bot tokens, and shapes per-IP/user request rates.",
            howBuilt: "Implemented in `rateLimiter.js` (`rate-limiter-flexible`), `turnstileService.js`, `appVersionGate.js`, and `corsOptions.js`.",
            modules: ["rateLimiter.js", "turnstileService.js", "appVersionGate.js", "Helmet 8"],
          },
          {
            id: "zod-validator",
            col: 0,
            row: 1,
            title: "Strict Zod 4 Schemas",
            subtitle: "Payload & Webhook Signatures",
            badge: "VALIDATION",
            color: "#34d399",
            whatItDoes: "Validates every REST body, query param, and cryptographic Razorpay/RazorpayX webhook signature before controller execution.",
            howBuilt: "Centralized in `validate.js`, `paymentValidation.js`, `slotValidation.js`, and `settlementValidation.js`.",
            modules: ["validate.js (Zod 4)", "paymentWebhook.js", "razorpayXWebhook.js", "manualValidation.js"],
          },
          {
            id: "argon-jwt",
            col: 1,
            row: 0,
            title: "Argon2, Sessions & OTP",
            subtitle: "Email/SMS OTP Workers · Order OTP",
            badge: "AUTH & OTP",
            color: "#22d3ee",
            whatItDoes: "Hashes passwords with Argon2, tracks stateful `Session` & `Device` records, delivers async Email/SMS auth OTPs, and verifies service completion via rotating Order OTPs.",
            howBuilt: "Powered by `sessionService.js`, `otpService.js`, `otpEmailWorker.js`, `otpPhoneSmsWorker.js`, and `orderOtpService.js`.",
            modules: ["otpEmailWorker.js", "otpPhoneSmsWorker.js", "orderOtpService.js", "sessionService.js"],
          },
          {
            id: "step-up",
            col: 1,
            row: 1,
            title: "Admin Stateful MFA & Step-Up",
            subtitle: "verifyAdminStatefulSession · RBAC",
            badge: "ZERO TRUST",
            color: "#a78bfa",
            whatItDoes: "Enforces stateful admin sessions, MFA, Step-Up re-authentication, and automatic audit interception before financial mutations or payout releases.",
            howBuilt: "Enforced by `verifyAdminStatefulSession.js`, `adminAuditInterceptor.js`, `stepUpMiddleware.js`, and Admin DAL (`audit.dal.ts`, `session.dal.ts`).",
            modules: ["verifyAdminStatefulSession", "adminAuditInterceptor", "stepUpMiddleware.js", "audit.dal.ts"],
          },
          {
            id: "idempotency",
            col: 2,
            row: 0,
            title: "Redis Locks & Idempotency",
            subtitle: "Zero Double-Charge / Booking",
            badge: "CONSISTENCY",
            color: "#fb923c",
            whatItDoes: "Prevents concurrent double-booking of slots and guarantees payment/payout webhooks process exactly once.",
            howBuilt: "Uses distributed mutex locks (`redisLocks.js`), `idempotencyMiddleware.js`, `WebhookEvent`, and `integrity.js`.",
            modules: ["redisLocks.js", "idempotencyMiddleware.js", "models/integrity.js", "models/nameMatch.js"],
          },
          {
            id: "audit-trail",
            col: 2,
            row: 1,
            title: "3-Domain Audit Logs",
            subtitle: "Admin · Settlement · Support",
            badge: "COMPLIANCE",
            color: "#38bdf8",
            whatItDoes: "Maintains immutable audit trails across admin actions, financial ledger transitions, inquiries, and support tickets.",
            howBuilt: "Persisted in `AdminAuditLog`, `SettlementAuditLog`, `InquiryAuditLog`, and `SupportAuditLog` Prisma models.",
            modules: ["AdminAuditLog", "SettlementAuditLog", "SupportAuditLog", "InquiryAuditLog"],
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
            subtitle: "l1CacheMiddleware · Sub-ms Reads",
            badge: "L1 CACHE",
            color: "#38bdf8",
            whatItDoes: "Serves hot read endpoints directly from process memory with HTTP response compression for sub-millisecond latency.",
            howBuilt: "Implemented in `l1CacheMiddleware.js` using `lru-cache` v11 paired with `compression` middleware.",
            modules: ["l1CacheMiddleware.js", "lru-cache v11", "cacheStatus.js", "compression"],
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
            howBuilt: "Engineered in `etag.js`, `etagService.js`, `etagInvalidation.js`, and `slotWarmer.js`.",
            modules: ["etagService.js", "etagInvalidation.js", "slotWarmer.js", "ioredis v5"],
          },
          {
            id: "prisma-46",
            col: 1,
            row: 0,
            title: "46-Model Prisma Schema",
            subtitle: "13 Modular Domain Files · PG",
            badge: "RELATIONAL",
            color: "#34d399",
            whatItDoes: "Separates Bookings, Payments, Settlements (15 models), Support SLA (8 models), Slots, Vendors, and Sessions cleanly.",
            howBuilt: "Multi-file Prisma 7 architecture using `@prisma/adapter-pg` and repository layer (`ledgerRepository.js`, `payoutRepository.js`).",
            modules: ["settlement.prisma (15)", "support.prisma (8)", "booking.prisma", "ledgerRepository.js"],
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
            howBuilt: "Implemented via `slotOutbox.js`, `outboxService.js` (`SettlementOutbox`), and `SupportOutboxEvent`.",
            modules: ["slotOutbox.js", "SettlementOutbox", "SupportOutboxEvent", "BookingEvent"],
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
            howBuilt: "Built in `slotKeyspaceListener.js` and `slotEventBus.js` connected to `slotSockets.js`.",
            modules: ["slotKeyspaceListener.js", "slotEventBus.js", "VendorSlotState", "slotMetrics.js"],
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
            howBuilt: "Orchestrated across `otpEmailWorker`, `otpPhoneSmsWorker`, `webhookWorker`, `supportOutboxWorker`, `supportSlaSweeper`, `reminderSweeper`, and `settlementWorkers`.",
            modules: ["otpEmail & SmsWorkers", "payment/webhookWorker", "supportSlaSweeper", "settlementWorkers"],
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
            howBuilt: "Implemented in `src/sockets/connectionHandler.js`, `events.js`, `presence.js`, and `emitter.js`.",
            modules: ["connectionHandler.js", "sockets/events.js", "presence.js", "statusPublisher.js"],
          },
          {
            id: "fcm-mail",
            col: 0,
            row: 1,
            title: "FCM Push & Nodemailer",
            subtitle: "Firebase Admin · Order Alerts",
            badge: "NOTIFICATIONS",
            color: "#34d399",
            whatItDoes: "Delivers mobile push alerts via Firebase Admin SDK and transactional HTML emails with automatic queue retries.",
            howBuilt: "Driven by `notificationService.js`, `notificationWorker.js`, and `mailWorker.js`.",
            modules: ["notificationService.js", "firebase-admin v13", "notificationWorker.js", "mailWorker.js"],
          },
          {
            id: "payout-breaker",
            col: 1,
            row: 0,
            title: "Payout Circuit Breaker",
            subtitle: "breaker.js · RazorpayX Guard",
            badge: "FAULT TOLERANCE",
            color: "#fb923c",
            whatItDoes: "Halts automated payout dispatches if upstream banking APIs degrade or report balance/webhook anomalies.",
            howBuilt: "Engineered in `src/settlement/services/breaker.js`, `razorpayXClient.js`, and `SettlementControl`.",
            modules: ["settlement/services/breaker.js", "razorpayXClient.js", "SettlementControl", "holdService.js"],
          },
          {
            id: "reconciler",
            col: 1,
            row: 1,
            title: "Ledger Reconciliation",
            subtitle: "Discrepancy & Backfill Engine",
            badge: "FINTECH OPS",
            color: "#a78bfa",
            whatItDoes: "Cross-checks ledger debits/credits against gateway webhooks, flags `SettlementDiscrepancy` records, and generates PDF slips.",
            howBuilt: "Built in `reconciliationService.js`, `financialBackfillAdapter.js`, `statementService.js`, and `slipService.js`.",
            modules: ["reconciliationService.js", "SettlementDiscrepancy", "statementService.js", "slipPdf.js"],
          },
          {
            id: "pino-prom",
            col: 2,
            row: 0,
            title: "Pino & Prometheus",
            subtitle: "prom-client · PM2 Hot Reload",
            badge: "OBSERVABILITY",
            color: "#38bdf8",
            whatItDoes: "Exposes authenticated Prometheus metrics (`/metrics` with `metricsAuth.js`), rotating Pino JSON logs, and zero-downtime PM2 reloads.",
            howBuilt: "Configured with `prom-client`, `slotMetrics.js`, `pino-http`, `pino-roll`, and PM2 `ecosystem.config.cjs`.",
            modules: ["prom-client v15", "metricsAuth.js", "pino-roll", "PM2 Cluster"],
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
            howBuilt: "56 automated test suites using Vitest 4, Supertest 7, and Husky pre-commit linting.",
            modules: ["56 Test Files", "Vitest 4 + Supertest 7", "Settlement Ledger Tests", "Slot Concurrency Tests"],
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
      "Custom ETag & QueryCacheEngine",
      "GlobalResyncCoordinator",
      "Native Razorpay SDK",
      "Firebase Cloud Messaging (FCM)",
      "Geolocation & S3 Media Picker",
    ],
    documentation: {
      overviewAndFeatures:
        "A unified cross-platform native mobile application serving both customers and service partners across 20+ modular feature domains: outlet discovery, geolocation filtering, slot booking wizard (`WizardStepper`), native Razorpay checkout, live order tracking, interactive order OTP verification with countdown & rotation (`OtpTimerCard`, `VerifyOrderOtpModal`, `RotateOtpConfirmModal`), multi-device session management (`ActiveSessionsCard`), partner KPI charts (`InteractiveBarChart`), and dual-sided live ringing alerts (`GlobalRingingOverlay`, `UserRingingModal`, `VendorRingingModal`).",
      systemAndDbArchitecture:
        "Architected with strict feature-sliced design (`src/features/` across 20+ domains, `src/infrastructure/` across 10 core subsystems, and `src/shared/` reusable UI/theme primitives) running on React Native 0.87 New Architecture with React 19, TypeScript 6, Zustand 5 stores, and AsyncStorage persistence.",
      authAndSecurity:
        "Secures credentials with `secureStorage.ts`, `authStore.ts`, `AuthNavigator`, and 3 explicit role guards (`UserGuard`, `VendorGuard`, `UserVendorGuard`), enforces strict password policies (`passwordPolicy.ts`) and Zod 4 schemas (`authSchemas.ts`), lets users inspect & revoke logged-in devices (`ActiveSessionsCard`), and terminates revoked sessions instantly via `sessionInvalidator.ts`.",
      dataFlowAndWorkflows:
        "All API calls flow through `httpClient.ts` → `etagClient.ts` → `queryCacheEngine.ts`, attaching cached `If-None-Match` ETag headers and serving instant local snapshots on `304 Not Modified`. Interrupted booking flows persist across restarts via `bookingHandoffStorage.ts`, while `notificationSyncEngine.ts` & `notificationRouter.ts` keep notification state synchronized.",
      realtimeAndBackgroundJobs:
        "Maintains persistent room subscriptions via `socketManager.ts` paired with Firebase Cloud Messaging (`fcmService.ts`). Incoming bookings trigger a global dual-sided ringing state machine (`GlobalRingingOverlay`, `VendorRingingModal`, `UserRingingModal`, `ringingStore.ts`) syncing live accept/dispatch status across devices.",
      scalabilityAndFaultTolerance:
        "Monitors cellular/Wi-Fi transitions via `connectivityMonitor.ts` and surfaces `ConnectionStatusBanner`. Upon reconnection or foregrounding, `globalResyncCoordinator.ts` automatically reconciles missed socket events and invalidates stale ETag cache entries while structured logs stream through `infrastructure/logger/index.ts`.",
      challengesAndSolutions:
        "Eliminated white-screen native crashes and version drift with `AppErrorBoundary.tsx` + `crashGuard.ts` and enforced backend API contract compatibility via `AppUpdateGate.tsx` (`appUpdateStore.ts`). Delivered 60fps UI polish using Reanimated 4 Worklets (`ScreenTransition`, `StepTransition`, `SmoothFlatList`).",
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
            whatItDoes: "Guides customers through outlet search, geolocation filtering, multi-step slot booking (`WizardStepper`), favorites, and live order tracking.",
            howBuilt: "Feature-sliced modules (`home`, `search`, `station`, `booking`, `orders`, `favorites`) with Reanimated 4 transitions.",
            modules: ["features/booking", "features/orders", "WizardStepper.tsx", "bookingHandoffStorage.ts"],
          },
          {
            id: "partner-features",
            col: 0,
            row: 1,
            title: "Partner Hub & Ringing",
            subtitle: "Live Dispatch · KPIs · Payouts",
            badge: "PARTNER UX",
            color: "#a78bfa",
            whatItDoes: "Switches seamlessly via `RoleToggle` into partner operations: live ringing booking alerts, queue management, KPI bar charts, and payout tracking.",
            howBuilt: "Built across `features/vendor-hub`, `features/ringing`, `features/vendor-payouts`, `InteractiveBarChart.tsx`, and `KpiStatCard.tsx`.",
            modules: ["features/ringing", "InteractiveBarChart.tsx", "RoleToggle.tsx", "TimeRangeFilterBar.tsx"],
          },
          {
            id: "http-etag",
            col: 1,
            row: 0,
            title: "HTTP & ETag Engine",
            subtitle: "httpClient · queryCacheEngine",
            badge: "NETWORKING",
            color: "#22d3ee",
            whatItDoes: "Intercepts outgoing requests, injects `If-None-Match` ETags, and resolves `304 Not Modified` responses from local cache with zero payload overhead.",
            howBuilt: "Engineered in `src/infrastructure/network/httpClient.ts`, `cache/etagClient.ts`, and `cache/queryCacheEngine.ts`.",
            modules: ["httpClient.ts", "etagClient.ts", "queryCacheEngine.ts", "Zustand 5 Stores"],
          },
          {
            id: "socket-sync",
            col: 1,
            row: 1,
            title: "Socket & Resync Engine",
            subtitle: "socketManager · globalResync",
            badge: "REAL-TIME",
            color: "#34d399",
            whatItDoes: "Manages authenticated Socket.IO connections and reconciles missed state automatically whenever connectivity recovers.",
            howBuilt: "Coordinated by `socketManager.ts`, `globalResyncCoordinator.ts`, and `connectivityMonitor.ts`.",
            modules: ["socketManager.ts", "globalResyncCoordinator.ts", "connectivityMonitor.ts", "ConnectionStatusBanner"],
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
            howBuilt: "Wrapped in `razorpayCheckout.ts`, `geolocationService.ts`, `nativeMediaPicker.ts`, and `DocumentPreviewModal.tsx`.",
            modules: ["razorpayCheckout.ts", "geolocationService.ts", "nativeMediaPicker.ts", "DocumentPreviewModal"],
          },
          {
            id: "fcm-push",
            col: 2,
            row: 1,
            title: "FCM & Crash Resilience",
            subtitle: "fcmService · CrashGuard · Gate",
            badge: "RELIABILITY",
            color: "#38bdf8",
            whatItDoes: "Handles background/foreground Firebase push notifications, traps runtime errors, and enforces minimum app version gates.",
            howBuilt: "Implemented in `fcmService.ts`, `crashGuard.ts`, `AppErrorBoundary.tsx`, and `AppUpdateGate.tsx`.",
            modules: ["fcmService.ts", "crashGuard.ts", "AppErrorBoundary.tsx", "AppUpdateGate.tsx"],
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
            title: "SecureStorage & AuthStore",
            subtitle: "Encrypted Session Persistence",
            badge: "STORAGE",
            color: "#38bdf8",
            whatItDoes: "Stores JWT tokens and user role state securely on device and hydrates authenticated sessions on cold boot.",
            howBuilt: "Built in `src/infrastructure/storage/secureStorage.ts` and `src/infrastructure/auth/authStore.ts`.",
            modules: ["secureStorage.ts", "authStore.ts", "SplashScreen.tsx", "env.ts"],
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
            howBuilt: "Implemented across `passwordPolicy.ts`, `PasswordChecklist.tsx`, and per-feature `validations/` modules.",
            modules: ["passwordPolicy.ts", "PasswordChecklist.tsx", "features/*/validations", "Zod 4"],
          },
          {
            id: "auth-guards",
            col: 1,
            row: 0,
            title: "3 Role Guards & Sessions",
            subtitle: "User · Partner · ActiveSessionsCard",
            badge: "RBAC GUARDS",
            color: "#a78bfa",
            whatItDoes: "Enforces strict route boundaries via `UserGuard`, `VendorGuard`, and `UserVendorGuard` while letting users view & revoke active logged-in devices.",
            howBuilt: "Built across `infrastructure/auth/guards/`, `ActiveSessionsCard.tsx`, and `config/navigation.ts` with `RoleToggle.tsx`.",
            modules: ["UserGuard & VendorGuard", "UserVendorGuard", "ActiveSessionsCard.tsx", "RoleToggle.tsx"],
          },
          {
            id: "session-invalidator",
            col: 1,
            row: 1,
            title: "Live SessionInvalidator",
            subtitle: "Instant Remote Revocation",
            badge: "ZERO TRUST",
            color: "#fb923c",
            whatItDoes: "Listens for server-side session revocation or password-change socket events and immediately purges local cache & tokens.",
            howBuilt: "Implemented in `src/infrastructure/realtime/sessionInvalidator.ts` hooked into `authStore` and `queryCacheEngine`.",
            modules: ["sessionInvalidator.ts", "socketManager.ts", "authStore.ts", "GlobalToast.tsx"],
          },
          {
            id: "order-otp",
            col: 2,
            row: 0,
            title: "Order OTP Lifecycle",
            subtitle: "Timer · Verify · Rotate OTP Modals",
            badge: "OTP HANDSHAKE",
            color: "#22d3ee",
            whatItDoes: "Manages live countdown timers, cryptographic OTP verification, and secure OTP rotation before completing service bookings and triggering settlement accruals.",
            howBuilt: "Engineered with `OtpTimerCard.tsx`, `VerifyOrderOtpModal.tsx`, `RotateOtpConfirmModal.tsx`, and `OtpInput.tsx`.",
            modules: ["OtpTimerCard.tsx", "VerifyOrderOtpModal.tsx", "RotateOtpConfirmModal.tsx", "OtpInput.tsx"],
          },
          {
            id: "update-gate",
            col: 2,
            row: 1,
            title: "AppUpdateGate & Config",
            subtitle: "Contract & Version Enforcement",
            badge: "COMPLIANCE",
            color: "#38bdf8",
            whatItDoes: "Blocks outdated mobile builds when breaking backend API or security policy upgrades ship.",
            howBuilt: "Controlled by `AppUpdateGate.tsx`, `appUpdateStore.ts`, and `ConfigErrorScreen.tsx`.",
            modules: ["AppUpdateGate.tsx", "appUpdateStore.ts", "ConfigErrorScreen.tsx", "sync-version.js"],
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
            whatItDoes: "Maintains reactive UI state slices per feature domain (`booking/state`, `orders/state`, `favorites/state`, `ringing/state`).",
            howBuilt: "Modular Zustand 5 stores with selector memoization and `themeStore.ts` light/dark persistence.",
            modules: ["booking/state", "orders/state", "ringing/state", "themeStore.ts"],
          },
          {
            id: "handoff-store",
            col: 0,
            row: 1,
            title: "BookingHandoffStorage",
            subtitle: "Zero-Loss Checkout Recovery",
            badge: "PERSISTENCE",
            color: "#fb923c",
            whatItDoes: "Persists in-progress slot selections and payment intents locally so interrupted checkouts resume seamlessly.",
            howBuilt: "Implemented in `src/shared/services/bookingHandoffStorage.ts` over AsyncStorage.",
            modules: ["bookingHandoffStorage.ts", "AsyncStorage", "slotTimeUtils.ts", "dateIst.ts"],
          },
          {
            id: "etag-client",
            col: 1,
            row: 0,
            title: "ETag Conditional Client",
            subtitle: "If-None-Match · 304 Handling",
            badge: "ETAG ENGINE",
            color: "#22d3ee",
            whatItDoes: "Pairs with backend `etagService.js` to validate cached payloads via lightweight HTTP headers instead of re-downloading JSON.",
            howBuilt: "Built in `src/infrastructure/cache/etagClient.ts` integrated into `httpClient.ts`.",
            modules: ["etagClient.ts", "httpClient.ts", "If-None-Match", "304 Not Modified"],
          },
          {
            id: "query-cache",
            col: 1,
            row: 1,
            title: "QueryCacheEngine",
            subtitle: "TTL · Tag Invalidation · LRU",
            badge: "CACHE CORE",
            color: "#34d399",
            whatItDoes: "Indexes cached API responses by query key and invalidates affected slices automatically upon mutations or socket events.",
            howBuilt: "Engineered in `src/infrastructure/cache/queryCacheEngine.ts`.",
            modules: ["queryCacheEngine.ts", "Tag Invalidation", "Optimistic Updates", "stationFilterUtils.ts"],
          },
          {
            id: "resync-coord",
            col: 2,
            row: 0,
            title: "GlobalResyncCoordinator",
            subtitle: "Reconnect Delta Reconciliation",
            badge: "SYNC",
            color: "#a78bfa",
            whatItDoes: "Triggers targeted cache revalidation for active orders, notifications, and slot states whenever network or socket recovers.",
            howBuilt: "Implemented in `src/infrastructure/sync/globalResyncCoordinator.ts`.",
            modules: ["globalResyncCoordinator.ts", "connectivityMonitor.ts", "features/notifications", "features/status"],
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
            howBuilt: "Combines `nativeMediaPicker.ts`, `base64.ts`, and backend `@aws-sdk/s3-request-presigner`.",
            modules: ["nativeMediaPicker.ts", "DocumentPreviewModal", "features/station-register", "features/support"],
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
        caption: "Live partner ringing dispatch state machine, network drop recovery, Reanimated 4 60fps UI worklets, and CrashGuard telemetry.",
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
            title: "SocketManager 4.8",
            subtitle: "Auto-Reconnect · Room Subscriptions",
            badge: "WEBSOCKETS",
            color: "#22d3ee",
            whatItDoes: "Maintains authenticated Socket.IO channels for live booking updates, slot locks, and partner dispatch events.",
            howBuilt: "Built in `src/infrastructure/realtime/socketManager.ts`.",
            modules: ["socketManager.ts", "socket.io-client 4.8", "Room Subscriptions", "Heartbeat Ping"],
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
            howBuilt: "Implemented in `src/infrastructure/push/fcmService.ts` synced with backend `FcmToken` table.",
            modules: ["fcmService.ts", "features/notifications", "GlobalToast.tsx", "Device Token Sync"],
          },
          {
            id: "ringing-engine",
            col: 1,
            row: 0,
            title: "Dual-Sided Ringing Overlay",
            subtitle: "GlobalRinging · User & Partner Modals",
            badge: "LIVE DISPATCH",
            color: "#fb923c",
            whatItDoes: "Synchronizes real-time ringing modals for both customers (`UserRingingModal`) and service partners (`VendorRingingModal`) with countdown & one-tap acceptance.",
            howBuilt: "Engineered in `GlobalRingingOverlay.tsx`, `VendorRingingModal.tsx`, `UserRingingModal.tsx`, `ringingStore.ts`, and `notificationSyncEngine.ts`.",
            modules: ["GlobalRingingOverlay", "Vendor & UserRingingModal", "ringingStore.ts", "notificationSyncEngine"],
          },
          {
            id: "net-monitor",
            col: 1,
            row: 1,
            title: "ConnectivityMonitor",
            subtitle: "Offline Banner · Queue Replay",
            badge: "RESILIENCE",
            color: "#a78bfa",
            whatItDoes: "Detects cellular dropouts immediately, surfaces `ConnectionStatusBanner`, and triggers `globalResyncCoordinator` on recovery.",
            howBuilt: "Built in `src/infrastructure/network/connectivityMonitor.ts` and `ConnectionStatusBanner.tsx`.",
            modules: ["connectivityMonitor.ts", "ConnectionStatusBanner.tsx", "globalResyncCoordinator.ts", "Retry Policy"],
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
            howBuilt: "Built with `react-native-reanimated` v4, `react-native-worklets`, `ScreenTransition.tsx`, and `SmoothFlatList.tsx`.",
            modules: ["Reanimated 4 + Worklets", "ScreenTransition.tsx", "SmoothFlatList.tsx", "ThemePalette.tsx"],
          },
          {
            id: "crash-guard",
            col: 2,
            row: 1,
            title: "CrashGuard & Logger",
            subtitle: "AppErrorBoundary · Diagnostics",
            badge: "STABILITY",
            color: "#34d399",
            whatItDoes: "Captures unhandled JS/native exceptions, logs structured diagnostics, and offers graceful one-tap state recovery.",
            howBuilt: "Implemented in `src/infrastructure/resilience/crashGuard.ts`, `AppErrorBoundary.tsx`, and `logger/index.ts`.",
            modules: ["crashGuard.ts", "AppErrorBoundary.tsx", "infrastructure/logger", "Jest Test Suite"],
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

    const defs = svg.append("defs");
    const glow = defs
      .append("filter")
      .attr("id", "bp-glow")
      .attr("x", "-40%")
      .attr("y", "-40%")
      .attr("width", "180%")
      .attr("height", "180%");
    glow.append("feGaussianBlur").attr("stdDeviation", "3.5").attr("result", "b");
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
      .attr("fill", "#64748b")
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
      .attr("fill", "rgba(15, 23, 42, 0.35)")
      .attr("stroke", "rgba(148, 163, 184, 0.09)")
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

      edgesLayer
        .append("path")
        .attr("id", pathId)
        .attr("d", pathD)
        .attr("fill", "none")
        .attr("stroke", edge.color)
        .attr("stroke-width", isConnected ? 2.4 : 1.5)
        .attr("stroke-opacity", isConnected ? 0.85 : 0.3);

      edgesLayer
        .append("path")
        .attr("class", "animate-signal-dash")
        .attr("d", pathD)
        .attr("fill", "none")
        .attr("stroke", edge.color)
        .attr("stroke-width", isConnected ? 2.4 : 1.4)
        .attr("stroke-opacity", isConnected ? 0.95 : 0.45);

      const pkt = edgesLayer
        .append("circle")
        .attr("r", isConnected ? 4.2 : 3)
        .attr("fill", edge.color)
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
        d.id === selectedNodeId ? "#0f1e38" : "rgba(10, 18, 34, 0.95)",
      )
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", (d) => (d.id === selectedNodeId ? 2.4 : 1.2))
      .attr("stroke-opacity", (d) => (d.id === selectedNodeId ? 1 : 0.45))
      .attr("filter", (d) => (d.id === selectedNodeId ? "url(#bp-glow)" : null));

    nodeGroups
      .append("circle")
      .attr("cx", 18)
      .attr("cy", 21)
      .attr("r", 3.8)
      .attr("fill", (d) => d.color);

    nodeGroups
      .append("text")
      .attr("x", 29)
      .attr("y", 24.5)
      .attr("fill", (d) => d.color)
      .attr("font-size", "9.5px")
      .attr("font-weight", "700")
      .attr("letter-spacing", "0.08em")
      .attr("font-family", "var(--font-mono), monospace")
      .text((d) => d.badge);

    nodeGroups
      .append("text")
      .attr("x", 16)
      .attr("y", 50)
      .attr("fill", "#f8fafc")
      .attr("font-size", "13.5px")
      .attr("font-weight", "700")
      .text((d) => d.title);

    nodeGroups
      .append("text")
      .attr("x", 16)
      .attr("y", 71)
      .attr("fill", "#94a3b8")
      .attr("font-size", "10.5px")
      .attr("font-family", "var(--font-mono), monospace")
      .text((d) => d.subtitle);

    nodeGroups
      .on("click", (_event, d) => setSelectedNodeId(d.id))
      .on("mouseenter", (_event, d) => setSelectedNodeId(d.id));
  }, [blueprint.id, currentView, selectedNodeId, viewId]);

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
                className={`relative inline-flex min-h-[46px] items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition sm:px-5 sm:text-sm ${
                  active
                    ? "btn-cool-primary preserve-dark"
                    : "btn-cool-secondary"
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
          className="flex flex-wrap gap-1.5 rounded-2xl border border-white/[0.1] bg-slate-950/70 p-1.5"
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
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-[11px] font-semibold transition ${
                  active
                    ? "btn-cool-primary preserve-dark"
                    : "btn-cool-secondary border-transparent bg-transparent"
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
      <div className="preserve-dark relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#050b16] shadow-[0_30px_90px_-30px_rgba(56,189,248,0.28)]">
        <div
          aria-hidden="true"
          className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/15 blur-[100px]"
        />

        {/* Blueprint Header */}
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] bg-slate-950/65 px-6 py-5 sm:px-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-sky-400">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              {blueprint.tag} // {currentView.label.toUpperCase()}
            </div>
            <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {blueprint.title}
            </h3>
            <p className="mt-1 text-xs text-slate-300">{currentView.caption}</p>
          </div>

          <Link
            href={`/projects/${blueprint.slug}`}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-sky-400/35 bg-sky-400/15 px-4 py-2 font-mono text-xs font-medium text-sky-200 transition hover:bg-sky-400 hover:text-slate-950"
          >
            Full Case Study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Interactive D3 SVG Canvas */}
        <div className="relative z-10 w-full px-3 pt-4 sm:px-6">
          <svg
            ref={svgRef}
            className="mx-auto block h-auto w-full max-w-[980px] select-none"
            role="img"
            aria-label={`Interactive D3.js system architecture diagram for ${blueprint.title} (${currentView.label})`}
          />
        </div>

        {/* Live Node Inspector Drawer */}
        <div className="relative z-10 border-t border-white/[0.08] bg-slate-950/85 px-6 py-5 sm:px-8">
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
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: activeNode.color,
                      boxShadow: `0 0 12px ${activeNode.color}`,
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
                      className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-sky-200"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                <div className="rounded-2xl border border-white/[0.08] bg-[#081020] p-4">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-sky-300">
                    <Cpu className="h-3.5 w-3.5" />
                    Component Role &amp; Data Flow
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
                    {activeNode.whatItDoes}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#081020] p-4">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-amber-300">
                    <Wrench className="h-3.5 w-3.5" />
                    Codebase Implementation
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
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
          <div className="mb-5 flex items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-400">
              <Workflow className="h-4 w-4" />
              Complete Technical Architecture Documentation
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              Audited from Production Source
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {DOC_SECTIONS.map((sec, idx) => (
              <div
                key={sec.key}
                className={`rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4 ${
                  idx === DOC_SECTIONS.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-sky-400">
                  {sec.tag}
                </div>
                <h4 className="mt-1 text-sm font-semibold text-white">
                  {sec.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-[13px]">
                  {blueprint.documentation[sec.key]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel flex flex-col justify-between rounded-3xl p-6 sm:p-7 lg:col-span-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-sky-400">
              Verified System Scale
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {blueprint.verifiedMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-white/[0.08] bg-slate-950/60 p-3.5"
                >
                  <div className="font-mono text-lg font-bold text-white">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-400">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-white/[0.08] pt-5">
            <div className="mb-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Complete Technology Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {blueprint.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 font-mono text-[11px] text-sky-300"
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
