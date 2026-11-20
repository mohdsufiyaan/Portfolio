"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CloudCog,
  Database,
  LockKeyhole,
  Workflow,
} from "lucide-react";
import { architecturePillars, faqs } from "../app/data";

const pillarIcons: Record<string, typeof BrainCircuit> = {
  "rag-agents": BrainCircuit,
  "llm-gateway": Workflow,
  "realtime-queues": Activity,
  "db-concurrency": Database,
  "zero-trust": LockKeyhole,
  "cloud-observability": CloudCog,
};

export function ArchitectureShowcase() {
  const [activeId, setActiveId] = useState(architecturePillars[0].id);
  const [openFaq, setOpenFaq] = useState<number>(0);

  const active =
    architecturePillars.find((p) => p.id === activeId) ?? architecturePillars[0];
  const ActiveIcon = pillarIcons[active.id] ?? BrainCircuit;

  return (
    <div className="space-y-12">
      {/* Interactive Blueprint Explorer */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Pillar Selector */}
        <div
          role="tablist"
          aria-label="Engineering architecture pillars"
          className="grid gap-2.5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
        >
          {architecturePillars.map((pillar) => {
            const Icon = pillarIcons[pillar.id] ?? BrainCircuit;
            const isSelected = pillar.id === active.id;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveId(pillar.id)}
                className={`group flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? "btn-cool-primary preserve-dark"
                    : "btn-cool-secondary"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                      isSelected
                        ? "border-sky-400/40 bg-sky-400/15 text-sky-300"
                        : "border-white/[0.08] bg-slate-900 text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div
                      className={`font-mono text-[10px] uppercase tracking-wider ${
                        isSelected ? "text-sky-100" : "text-slate-400"
                      }`}
                    >
                      {pillar.code}
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        isSelected ? "text-white" : "text-slate-100"
                      }`}
                    >
                      {pillar.title}
                    </div>
                  </div>
                </div>
                <span
                  className={`hidden shrink-0 rounded-lg px-2 py-1 font-mono text-[10px] sm:inline-block ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-white/[0.05] text-slate-400"
                  }`}
                >
                  {pillar.metric.value}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Architectural Specification Panel */}
        <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-7">
          <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-25" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex h-full flex-col justify-between gap-6"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/35 bg-sky-400/10 text-sky-300">
                      <ActiveIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-sky-300">
                        {active.code} // PRODUCTION BLUEPRINT
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {active.title}
                      </h3>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-orange-400/25 bg-orange-400/10 px-4 py-2 text-right">
                    <div className="font-mono text-base font-bold text-orange-300">
                      {active.metric.value}
                    </div>
                    <div className="font-mono text-[10px] text-orange-200/80">
                      {active.metric.label}
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {active.summary}
                </p>

                <ul className="mt-6 space-y-3.5">
                  {active.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-slate-950/65 p-3.5 text-sm leading-relaxed text-slate-200"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/[0.08] pt-5">
                <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Core Implementation Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-xl border border-sky-400/25 bg-sky-400/10 px-3 py-1 font-mono text-xs text-sky-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Structured Engineering Q&A (SEO + AEO friendly) */}
      <div className="rounded-3xl border border-white/[0.09] bg-slate-950/55 p-6 sm:p-8">
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-sky-400">
              Engineering Q&amp;A
            </p>
            <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-white">
              Technical Expertise &amp; Architecture Decisions
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400">
            Structured answers for technical teams &amp; recruiters
          </span>
        </div>

        <div className="divide-y divide-white/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-4 py-1 text-left text-sm font-semibold text-white transition hover:text-sky-300 sm:text-base"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-400" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pr-6 text-sm leading-relaxed text-slate-300">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
