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

export function SkillsShowcase() {
  const [selected, setSelected] = useState<string>("all");

  const tabs = [
    { id: "all", label: `All Domains (${skillGroups.length})` },
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
      {/* 1. Interactive D3.js Force-Directed Skill Network */}
      <D3SkillsGraph activeDomain={selected} onSelectDomain={setSelected} />

      {/* 2. Domain Filter Bar */}
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

      {/* 3. Skill Clusters */}
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
