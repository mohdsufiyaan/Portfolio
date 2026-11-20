"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { skillGroups, type SkillGroup } from "../app/data";
import { TiltSpotlightCard } from "./ScrollMotion";
import { D3SkillsGraph } from "./D3SkillsGraph";

const icons: Record<string, typeof Server> = {
  backend: Server,
  "ai-llm": BrainCircuit,
  "system-design": ShieldCheck,
  frontend: Layers,
  databases: Database,
  "cloud-testing": Cloud,
};

const accentBadge: Record<SkillGroup["accent"], string> = {
  cyan: "border-indigo-400/35 bg-indigo-500/15 text-indigo-200",
  amber: "border-amber-400/35 bg-amber-500/15 text-amber-200",
  emerald: "border-emerald-400/35 bg-emerald-500/15 text-emerald-200",
  violet: "border-violet-400/35 bg-violet-500/15 text-violet-200",
};

const accentDot: Record<SkillGroup["accent"], string> = {
  cyan: "bg-indigo-400",
  amber: "bg-amber-400",
  emerald: "bg-emerald-400",
  violet: "bg-violet-400",
};

const HIGHLIGHTED_SIGNATURE_SKILLS = [
  {
    name: "Laravel 12 & PHP 8.2",
    role: "Primary Enterprise Backend & AI SDK",
    metric: "28 Models · 22 Controllers",
    domain: "backend",
    color: "from-indigo-500/15 to-blue-500/5 border-indigo-400/35 text-indigo-200",
  },
  {
    name: "Autonomous AI Agents",
    role: "Laravel AI SDK · Custom Agentic Harness",
    metric: "39 Tools · 19 Domain Skills",
    domain: "ai-llm",
    color: "from-violet-500/15 to-indigo-500/5 border-violet-400/35 text-violet-200",
  },
  {
    name: "Hybrid RAG (RRF)",
    role: "Pinecone 1024d Jina + MySQL 8 Full-Text",
    metric: "Lexical & Cosine Grounding",
    domain: "ai-llm",
    color: "from-sky-500/15 to-cyan-500/5 border-sky-400/35 text-sky-200",
  },
  {
    name: "Node.js & Express 5.2",
    role: "High-Throughput REST & Real-Time APIs",
    metric: "56 Vitest & Supertest Suites",
    domain: "backend",
    color: "from-emerald-500/15 to-teal-500/5 border-emerald-400/35 text-emerald-200",
  },
  {
    name: "Next.js 16 & React 19",
    role: "SSR Web Portals & MFA Admin Control Plane",
    metric: "TypeScript · Tailwind v4 · Zustand 5",
    domain: "frontend",
    color: "from-indigo-500/15 to-violet-500/5 border-indigo-400/35 text-indigo-200",
  },
  {
    name: "React Native 0.87",
    role: "New Architecture Dual-Role Mobile Suite",
    metric: "20+ Modules · Reanimated 4 · ETag Cache",
    domain: "frontend",
    color: "from-sky-500/15 to-blue-500/5 border-sky-400/35 text-sky-200",
  },
  {
    name: "Socket.IO + Redis Mesh",
    role: "Multi-Node Pub/Sub & Live Partner Dispatch",
    metric: "Redis Adapter · Emitter · Presence",
    domain: "system-design",
    color: "from-emerald-500/15 to-cyan-500/5 border-emerald-400/35 text-emerald-200",
  },
  {
    name: "BullMQ & Priority Queues",
    role: "Async Workers, Task Slicer & Retries",
    metric: "6 BullMQ + 6 AI Queue Lanes",
    domain: "system-design",
    color: "from-violet-500/15 to-purple-500/5 border-violet-400/35 text-violet-200",
  },
  {
    name: "PostgreSQL & MySQL 8",
    role: "Prisma 7 (46 Models) · 15-Model Settlement",
    metric: "Composite Indexes · lockForUpdate",
    domain: "databases",
    color: "from-blue-500/15 to-indigo-500/5 border-blue-400/35 text-blue-200",
  },
  {
    name: "Multi-LLM Failover Gateway",
    role: "Groq → Google Gemini → OpenRouter",
    metric: "429/402 Circuit Breaker · -30–50% Tokens",
    domain: "ai-llm",
    color: "from-amber-500/15 to-orange-500/5 border-amber-400/35 text-amber-200",
  },
  {
    name: "3-Layer Zero-Trust Security",
    role: "RBAC · MFA Step-Up · AES-256 OAuth Vault",
    metric: "Argon2 · JWT · Zod 4 · Redis Rate Limit",
    domain: "system-design",
    color: "from-emerald-500/15 to-teal-500/5 border-emerald-400/35 text-emerald-200",
  },
  {
    name: "AWS & Observability",
    role: "EC2 · S3 Presigned · RDS · CloudFront CDN",
    metric: "PM2 · Pino · Prometheus · 145+ Tests",
    domain: "cloud-testing",
    color: "from-indigo-500/15 to-sky-500/5 border-indigo-400/35 text-indigo-200",
  },
];

export function SkillsShowcase() {
  const [selected, setSelected] = useState<string>("all");

  const tabs = [
    { id: "all", label: "All Domains (6)" },
    ...skillGroups.map((g) => ({
      id: g.id,
      label: `${g.title} (${g.items.length})`,
    })),
  ];

  const visibleGroups =
    selected === "all"
      ? skillGroups
      : skillGroups.filter((g) => g.id === selected);

  return (
    <div className="space-y-10">
      {/* 1. Highlighted Signature Skills Command Deck */}
      <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/12 blur-3xl"
        />

        <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-indigo-400/40 bg-indigo-500/15 text-indigo-300">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-indigo-300">
                Highlighted Core Stack &amp; Production Specialties
              </div>
              <h3 className="text-lg font-semibold text-white sm:text-xl">
                12 Signature Engineering Capabilities
              </h3>
            </div>
          </div>
          <span className="rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-1 font-mono text-xs font-medium text-emerald-300">
            5.5+ Years Production Verified
          </span>
        </div>

        <div className="relative z-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {HIGHLIGHTED_SIGNATURE_SKILLS.map((item) => {
            const isDomainActive =
              selected === "all" || selected === item.domain;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() =>
                  setSelected(selected === item.domain ? "all" : item.domain)
                }
                className={`group relative flex flex-col justify-between rounded-2xl border bg-gradient-to-br p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  item.color
                } ${
                  isDomainActive
                    ? "opacity-100 shadow-[0_10px_28px_-16px_rgba(99,102,241,0.4)]"
                    : "opacity-45 hover:opacity-90"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold tracking-tight text-white">
                      {item.name}
                    </span>
                    <Zap className="h-3.5 w-3.5 shrink-0 opacity-75 transition group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-xs leading-snug text-slate-300">
                    {item.role}
                  </p>
                </div>
                <div className="mt-3 inline-flex w-fit items-center rounded-lg border border-white/10 bg-slate-950/65 px-2.5 py-1 font-mono text-[10px] text-slate-200">
                  {item.metric}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive D3.js Force-Directed Skill Network */}
      <D3SkillsGraph activeDomain={selected} onSelectDomain={setSelected} />

      {/* 3. Domain Filter Bar (Cool Indigo-Cobalt active pill with crisp white text) */}
      <div
        role="tablist"
        aria-label="Filter technical skills by domain"
        className="flex flex-wrap gap-2.5"
      >
        {tabs.map((tab) => {
          const active = selected === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(tab.id)}
              className={`relative min-h-[42px] rounded-xl px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                active
                  ? "btn-cool-primary preserve-dark"
                  : "btn-cool-secondary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Skill Clusters (2-column internal grid where odd last item automatically spans full width so there is never an empty slot) */}
      <div
        className={`grid gap-5 ${
          selected === "all"
            ? "md:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {visibleGroups.map((group) => {
          const Icon = icons[group.id] ?? Cpu;
          const isOddCount = group.items.length % 2 === 1;
          return (
            <TiltSpotlightCard
              key={group.id}
              accent={group.accent}
              className="rounded-3xl p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${accentBadge[group.accent]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {group.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {group.subtitle}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-lg border border-white/[0.1] bg-slate-950/75 px-2.5 py-1 font-mono text-xs font-semibold text-indigo-300">
                  {group.items.length}
                </span>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {group.items.map((skill, sIdx) => {
                  const isLastOdd =
                    isOddCount && sIdx === group.items.length - 1;
                  return (
                    <div
                      key={skill.name}
                      className={`group flex items-start justify-between gap-3 rounded-xl border border-white/[0.07] bg-slate-950/60 px-3.5 py-2.5 transition hover:border-indigo-400/35 hover:bg-slate-900/90 ${
                        isLastOdd ? "sm:col-span-2" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${accentDot[group.accent]}`}
                        />
                        <div>
                          <div className="text-sm font-semibold text-slate-100">
                            {skill.name}
                          </div>
                          <div className="font-mono text-[11px] text-slate-400">
                            {skill.context}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TiltSpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
