"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
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
  const mapTopRef = useRef<number | null>(null);

  // The cards sit above the map, so filtering from inside the map changes the
  // height above it. Remember where the map was so it does not jump away.
  const selectFromMap = useCallback((id: string) => {
    const rect = document
      .getElementById("capability-constellation")
      ?.getBoundingClientRect();
    if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
      mapTopRef.current = rect.top;
    }
    setSelected(id);
  }, []);

  useLayoutEffect(() => {
    const previousTop = mapTopRef.current;
    mapTopRef.current = null;
    const map = document.getElementById("capability-constellation");
    if (previousTop === null || !map) return;
    const shift = map.getBoundingClientRect().top - previousTop;
    if (Math.abs(shift) > 1) {
      window.scrollBy({ top: shift, behavior: "instant" });
    }
  }, [selected]);

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
    <div className="space-y-6 sm:space-y-10">
      {/* 1. Domain Filter Bar */}
      <div
        role="tablist"
        aria-label="Filter technical skills by domain"
        className="flex flex-wrap gap-2 sm:gap-2.5"
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
              className={`relative min-h-[42px] rounded-xl px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm ${
                active ? "btn-cool-primary" : "btn-cool-secondary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. Skill Clusters: plain, scannable lists for quick review */}
      <div
        className={`grid grid-cols-1 gap-5 ${
          selected === "all"
            ? "md:grid-cols-2 xl:grid-cols-3"
            : ""
        }`}
      >
        {visibleGroups.map((group) => {
          const Icon = icons[group.id] ?? Cpu;
          return (
            <TiltSpotlightCard
              key={group.id}
              accent={group.accent}
              maxTilt={5.5}
              className="min-w-0 rounded-3xl p-4 sm:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
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

              <ul
                className={`grid grid-cols-1 gap-x-8 ${
                  selected === "all" ? "" : "md:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-start gap-3 border-t border-white/[0.08] py-3"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${accentDot[group.accent]}`}
                    />
                    <div className="min-w-0">
                      <div className="text-[15px] font-semibold leading-snug text-slate-100">
                        {skill.name}
                      </div>
                      <div className="mt-0.5 text-[13px] leading-snug text-slate-400">
                        {skill.context}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </TiltSpotlightCard>
          );
        })}
      </div>

      {/* 3. Interactive D3.js Force-Directed Skill Network */}
      <D3SkillsGraph activeDomain={selected} onSelectDomain={selectFromMap} />
    </div>
  );
}
