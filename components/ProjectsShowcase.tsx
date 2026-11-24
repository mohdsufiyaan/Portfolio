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
      maxTilt={spanFull ? 3.5 : 4.8}
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium">
                {project.category}
              </span>
              <span className="chip-emerald inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs">
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
          <div
            role="tablist"
            aria-label={`${project.shortName} case study sections`}
            className="surface-subcard mt-4 grid grid-cols-2 gap-1 rounded-xl p-1 sm:grid-cols-4"
          >
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
                  role="tab"
                  aria-selected={isTabActive}
                  onClick={() => setTab(key)}
                  className={`inline-flex min-h-[36px] w-full items-center justify-center rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                    isTabActive
                      ? "btn-cool-primary shadow-sm"
                      : "btn-cool-ghost border-transparent bg-transparent"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <p className="mt-3.5 min-h-[82px] text-sm leading-relaxed text-slate-300">
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
                className="surface-subcard rounded-xl px-3.5 py-2.5"
              >
                <div className="font-mono text-sm font-semibold text-white">
                  {m.value}
                </div>
                <div className="mt-0.5 text-xs text-slate-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Stack Chips */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, spanFull ? 10 : 7).map((t) => (
              <span
                key={t}
                className="chip-neutral rounded-lg px-2.5 py-1 font-mono text-xs"
              >
                {t}
              </span>
            ))}
            {project.tech.length > (spanFull ? 10 : 7) && (
              <span className="chip-neutral rounded-lg px-2.5 py-1 font-mono text-xs opacity-75">
                +{project.tech.length - (spanFull ? 10 : 7)} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-5">
            <Link
              href={`/projects/${project.slug}`}
              className="btn-cool-primary inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
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
                className="btn-cool-secondary inline-flex min-h-[42px] items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
              >
                Live Site
                <ExternalLink className="h-3.5 w-3.5 text-sky-400" />
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
              className={`relative min-h-[42px] rounded-xl px-4 py-2 text-xs font-semibold sm:text-sm ${
                active ? "btn-cool-primary" : "btn-cool-secondary"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="space-y-8">
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

        {earlierList.length > 0 && (
          <div>
            {filter === "All" && (
              <div className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                <Layers className="h-4 w-4 text-sky-400" />
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
                    maxTilt={6.5}
                    className={`flex flex-col rounded-2xl p-5 ${
                      spanLastOdd ? "sm:col-span-2 xl:col-span-4" : ""
                    }`}
                  >
                    <div className="mb-4">
                      <ProjectDiagram type={project.diagramType} compact />
                    </div>
                    <div className="mb-1.5 flex items-center justify-between font-mono text-xs text-slate-400">
                      <span>{project.company}</span>
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-white">
                      {project.shortName}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="chip-neutral rounded-md px-2 py-0.5 font-mono text-[11px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 transition hover:text-sky-300"
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
                          className="inline-flex items-center gap-1 font-mono text-xs text-slate-400 transition hover:text-sky-400"
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
