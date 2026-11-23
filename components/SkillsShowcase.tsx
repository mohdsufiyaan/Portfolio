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
import type { BowAccent } from "./ThreeBowCard";

const icons: Record<string, typeof Server> = {
  backend: Server,
  "ai-llm": BrainCircuit,
  "system-design": ShieldCheck,
  frontend: Layers,
  databases: Database,
  "cloud-testing": Cloud,
};

const accentBadge: Record<SkillGroup["accent"], string> = {
  cyan: "chip-accent",
  amber: "chip-amber",
  emerald: "chip-emerald",
  violet: "chip-violet",
};

const accentDot: Record<SkillGroup["accent"], string> = {
  cyan: "bg-sky-400",
  amber: "bg-amber-400",
  emerald: "bg-emerald-400",
  violet: "bg-violet-400",
};

const HIGHLIGHTED_SIGNATURE_SKILLS: {
  name: string;
  role: string;
  metric: string;
  domain: string;
  accent: BowAccent;
}[] = [
  {
    name: "Laravel 12 & PHP 8.2",
    role: "Primary Enterprise Backend & AI SDK",
    metric: "28 Models · 22 Controllers",
    domain: "backend",
    accent: "cyan",
  },
  {
    name: "Autonomous AI Agents",
    role: "Laravel AI SDK · Custom Agentic Harness",
    metric: "39 Tools · 19 Domain Skills",
    domain: "ai-llm",
    accent: "violet",
  },
  {
    name: "Hybrid RAG (RRF)",
    role: "Pinecone 1024d Jina + MySQL 8 Full-Text",
    metric: "Lexical & Cosine Grounding",
    domain: "ai-llm",
    accent: "cyan",
  },
  {
    name: "Node.js & Express 5.2",
    role: "High-Throughput REST & Real-Time APIs",
    metric: "56 Vitest & Supertest Suites",
    domain: "backend",
    accent: "emerald",
  },
  {
    name: "Next.js 16 & React 19",
    role: "SSR Web Portals & MFA Admin Control Plane",
    metric: "TypeScript · Tailwind v4 · Zustand 5",
    domain: "frontend",
    accent: "violet",
  },
  {
    name: "React Native 0.87",
    role: "New Architecture Dual-Role Mobile Suite",
    metric: "20+ Modules · Reanimated 4 · ETag Cache",
    domain: "frontend",
    accent: "cyan",
  },
  {
    name: "Socket.IO + Redis Mesh",
    role: "Multi-Node Pub/Sub & Live Partner Dispatch",
    metric: "Redis Adapter · Emitter · Presence",
    domain: "system-design",
    accent: "emerald",
  },
  {
    name: "BullMQ & Priority Queues",
    role: "Async Workers, Task Slicer & Retries",
    metric: "6 BullMQ + 6 AI Queue Lanes",
    domain: "system-design",
    accent: "violet",
  },
  {
    name: "PostgreSQL & MySQL 8",
    role: "Prisma 7 (46 Models) · 15-Model Settlement",
    metric: "Composite Indexes · lockForUpdate",
    domain: "databases",
    accent: "cyan",
  },
  {
    name: "Multi-LLM Failover Gateway",
    role: "Groq → Google Gemini → OpenRouter",
    metric: "429/402 Circuit Breaker · -30–50% Tokens",
    domain: "ai-llm",
    accent: "amber",
  },
  {
    name: "3-Layer Zero-Trust Security",
    role: "RBAC · MFA Step-Up · AES-256 OAuth Vault",
    metric: "Argon2 · JWT · Zod 4 · Redis Rate Limit",
    domain: "system-design",
    accent: "emerald",
  },
  {
    name: "AWS & Observability",
    role: "EC2 · S3 Presigned · RDS · CloudFront CDN",
    metric: "PM2 · Pino · Prometheus · 145+ Tests",
    domain: "cloud-testing",
    accent: "amber",
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
      {/* 1. Highlighted Signature Skills Command Deck (Three.js Corner-Bow Cards) */}
      <div className="glass-panel relative overflow-hidden rounded-3xl p-5 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/12 blur-3xl"
        />

        <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="chip-accent flex h-9 w-9 items-center justify-center rounded-xl">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-sky-400">
                Highlighted Core Stack &amp; Specialties
              </div>
              <h3 className="text-lg font-semibold text-white sm:text-xl">
                12 Signature Engineering Capabilities
              </h3>
            </div>
          </div>
          <span className="chip-emerald rounded-full px-3 py-1 font-mono text-xs font-semibold">
            5.5+ Years Production Verified
          </span>
        </div>

        <div className="relative z-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {HIGHLIGHTED_SIGNATURE_SKILLS.map((item) => {
            const isDomainActive =
              selected === "all" || selected === item.domain;
            const isSpecificallySelected = selected === item.domain;
            return (
              <TiltSpotlightCard
                key={item.name}
                accent={item.accent}
                maxTilt={7.5}
                className={`rounded-2xl transition-opacity duration-200 ${
                  isSpecificallySelected
                    ? "ring-2 ring-sky-400/70"
                    : ""
                } ${isDomainActive ? "opacity-100" : "opacity-45 hover:opacity-95"}`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setSelected(selected === item.domain ? "all" : item.domain)
                  }
                  className="group flex h-full w-full flex-col justify-between p-4 text-left"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold tracking-tight text-white">
                        {item.name}
                      </span>
                      <Zap className="h-3.5 w-3.5 shrink-0 text-sky-400 opacity-75 transition group-hover:opacity-100" />
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                      {item.role}
                    </p>
                  </div>
                  <div className="chip-neutral mt-3 inline-flex w-fit items-center rounded-lg px-2.5 py-1 font-mono text-[11px]">
                    {item.metric}
                  </div>
                </button>
              </TiltSpotlightCard>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive D3.js Force-Directed Skill Network */}
      <D3SkillsGraph activeDomain={selected} onSelectDomain={setSelected} />

      {/* 3. Domain Filter Bar */}
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
              className={`relative min-h-[42px] rounded-xl px-4 py-2 text-xs font-semibold sm:text-sm ${
                active ? "btn-cool-primary" : "btn-cool-secondary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Skill Clusters */}
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
              maxTilt={5.5}
              className="rounded-3xl p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accentBadge[group.accent]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {group.title}
                    </h3>
                    <p className="mt-0.5 text-xs leading-snug text-slate-400">
                      {group.subtitle}
                    </p>
                  </div>
                </div>
                <span className="chip-accent shrink-0 rounded-lg px-2.5 py-1 font-mono text-xs font-semibold">
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
                      className={`surface-subcard flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 ${
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
                          <div className="font-mono text-xs text-slate-400">
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
