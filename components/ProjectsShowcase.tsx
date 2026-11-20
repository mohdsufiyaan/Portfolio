"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Layers, Sparkles } from "lucide-react";
import { projects, type Project } from "../app/data";
import { ProjectDiagram } from "./ProjectDiagram";
import { TiltSpotlightCard } from "./ScrollMotion";

const categories: ("All" | Project["category"])[] = [
  "All",
  "AI & RAG",
  "Real-Time",
  "Enterprise Web",
  "Earlier Products",
];

type DetailTab = "overview" | "challenge" | "solution" | "impact";

function FeaturedProjectCard({
  project,
  accent,
  spanFull = false,
}: {
  project: Project;
  accent: "cyan" | "amber";
  spanFull?: boolean;
}) {
  const [tab, setTab] = useState<DetailTab>("overview");

  const tabContent: Record<DetailTab, string> = {
    overview: project.summary,
    challenge: project.challenge,
    solution: project.solution,
    impact: project.impact,
  };

  return (
    <TiltSpotlightCard
      accent={accent}
      className={`flex flex-col rounded-3xl p-5 sm:p-7 ${
        spanFull ? "lg:col-span-2" : ""
      }`}
    >
      <div className={spanFull ? "grid gap-6 lg:grid-cols-12 lg:items-center" : ""}>
        <div className={spanFull ? "lg:col-span-5" : "mb-5"}>
          <ProjectDiagram type={project.diagramType} />
        </div>

        <div className={spanFull ? "lg:col-span-7" : ""}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/35 bg-indigo-500/15 px-3 py-1 font-mono text-[11px] font-medium text-indigo-200">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {project.status}
              </span>
            </div>
            <span className="font-mono text-xs text-slate-400">
              {project.company} · {project.period}
            </span>
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {project.name}
          </h3>

          {/* Interactive Storytelling Switcher */}
          <div className="mt-4 flex flex-wrap gap-1.5 border-b border-white/[0.08] pb-3">
            {(
              [
                ["overview", "Overview"],
                ["challenge", "Challenge"],
                ["solution", "Architecture"],
                ["impact", "Impact"],
              ] as [DetailTab, string][]
            ).map(([key, label]) => {
              const isTabActive = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold transition ${
                    isTabActive
                      ? "btn-cool-primary preserve-dark"
                      : "btn-cool-secondary"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <p className="mt-3 min-h-[76px] text-sm leading-relaxed text-slate-300">
            {tabContent[tab]}
          </p>

          {/* Metrics Grid */}
          <div
            className={`mt-4 grid gap-2.5 ${
              spanFull ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"
            }`}
          >
            {project.impactMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/[0.07] bg-slate-950/65 px-3 py-2.5"
              >
                <div className="font-mono text-sm font-semibold text-white">
                  {m.value}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Stack Chips */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, spanFull ? 11 : 8).map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-300"
              >
                {t}
              </span>
            ))}
            {project.tech.length > (spanFull ? 11 : 8) && (
              <span className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-slate-400">
                +{project.tech.length - (spanFull ? 11 : 8)} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-5">
            <Link
              href={`/projects/${project.slug}`}
              className="btn-cool-primary preserve-dark inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Full Case Study
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-white/[0.1] px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:border-indigo-400/45 hover:text-white"
              >
                Live Site
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltSpotlightCard>
  );
}

export function ProjectsShowcase() {
  const [filter, setFilter] = useState<"All" | Project["category"]>("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  const featuredList = filtered.filter((p) => p.featured);
  const earlierList = filtered.filter((p) => !p.featured);
  const featuredIsOdd = featuredList.length % 2 === 1;
  const earlierIsOdd = earlierList.length % 2 === 1;

  return (
    <div>
      {/* Filter Pills */}
      <div
        role="tablist"
        aria-label="Filter projects by domain"
        className="mb-8 flex flex-wrap gap-2.5"
      >
        {categories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(cat)}
              className={`relative min-h-[42px] rounded-xl px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                active
                  ? "btn-cool-primary preserve-dark"
                  : "btn-cool-secondary"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="space-y-8">
        {/* Flagship Featured Systems (Odd last card automatically spans full 2 columns so there is zero empty space) */}
        {featuredList.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredList.map((project, idx) => (
              <FeaturedProjectCard
                key={project.slug}
                project={project}
                accent={idx % 2 === 0 ? "cyan" : "amber"}
                spanFull={featuredIsOdd && idx === featuredList.length - 1}
              />
            ))}
          </div>
        )}

        {/* Notable Earlier Production Products */}
        {earlierList.length > 0 && (
          <div>
            {filter === "All" && (
              <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
                <Layers className="h-4 w-4 text-indigo-400" />
                Production Products Shipped at I3 Infosoft (2021 – 2024)
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {earlierList.map((project, idx) => {
                const spanLastOdd =
                  earlierIsOdd && idx === earlierList.length - 1;
                return (
                  <TiltSpotlightCard
                    key={project.slug}
                    accent="emerald"
                    className={`flex flex-col rounded-2xl p-5 ${
                      spanLastOdd ? "sm:col-span-2 xl:col-span-4" : ""
                    }`}
                  >
                    <div className="mb-4">
                      <ProjectDiagram type={project.diagramType} compact />
                    </div>
                    <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-slate-400">
                      <span>{project.company}</span>
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-white">
                      {project.shortName}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-300">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
                      >
                        Architecture details
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.shortName} live site`}
                          className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400 transition hover:text-white"
                        >
                          Live
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </TiltSpotlightCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
