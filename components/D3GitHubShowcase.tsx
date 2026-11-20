"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as d3 from "d3";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import type { GitHubPortfolioData } from "../lib/github";
import { GitHubIcon } from "./SocialIcons";
import { TiltSpotlightCard } from "./ScrollMotion";

// Authentic GitHub-inspired luminous emerald/cyan scale matching GitHub contribution levels 0–4
const LEVEL_COLORS = [
  "#111827",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

const PRIVATE_SYSTEMS = [
  {
    slug: "enterprise-ai-operations",
    code: "PRIVATE REPO · LARAVEL 12",
    name: "AI Task Management & EOD Platform",
    summary:
      "39-tool Laravel AI SDK agent, Slack AI Bot with voice transcription, 17 Mail/Calendar tools, Hybrid RAG (Pinecone 1024d + MySQL FTS RRF), Multi-LLM Gateway, and 89 PHPUnit/Pest test suites.",
    highlights: [
      "39 AI Tools",
      "89 Test Suites",
      "Slack + WhatsApp",
      "30–50% Token Saved",
    ],
    accent: "amber" as const,
  },
  {
    slug: "real-time-booking-platform",
    code: "PRIVATE REPO · EXPRESS 5 + NEXT.JS 16",
    name: "CarWash — Real-Time Booking & Settlement",
    summary:
      "3-app production monorepo (Express 5 API, Customer/Partner Web, MFA Admin Control Plane) with 46 Prisma PostgreSQL models, 15-model double-entry settlement ledger, dual Email/SMS OTP workers, and 56 Vitest suites.",
    highlights: [
      "46 Prisma Models",
      "15 Settlement Models",
      "Dual OTP + MFA",
      "56 API Tests",
    ],
    accent: "cyan" as const,
  },
  {
    slug: "realtime-mobile-suite",
    code: "PRIVATE REPO · REACT NATIVE 0.87",
    name: "CarWash Mobile App (Customer & Partner)",
    summary:
      "20+ modular feature domains on React Native 0.87 New Architecture with dual-sided live ringing modals, Order OTP timer/rotation, HTTP ETag 304 cache engine, Socket.IO resync, and Reanimated 4.",
    highlights: [
      "RN 0.87 New Arch",
      "20+ Feature Modules",
      "Order OTP Lifecycle",
      "Live Ringing Sync",
    ],
    accent: "emerald" as const,
  },
];

export function D3GitHubShowcase({ data }: { data: GitHubPortfolioData }) {
  const heatmapRef = useRef<SVGSVGElement>(null);
  const donutRef = useRef<SVGSVGElement>(null);

  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const [hoveredStack, setHoveredStack] = useState<{
    domain: string;
    share: number;
    focus: string;
    color: string;
  } | null>(null);

  // 1. Exact 52–53 Week GitHub Profile Contribution Squares Grid rendered with D3.js
  useEffect(() => {
    const svgEl = heatmapRef.current;
    if (!svgEl || data.squares.length === 0) return;

    const maxWeek = Math.max(...data.squares.map((s) => s.weekIndex), 0);
    const weeks = maxWeek + 1;
    const cell = 12;
    const gap = 3.5;
    const padX = 32;
    const padY = 22;
    const width = padX + weeks * (cell + gap) + 8;
    const height = padY + 7 * (cell + gap) + 8;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    // Day-of-week labels (Mon / Wed / Fri matching GitHub profile)
    const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
    svg
      .append("g")
      .selectAll("text")
      .data(dayLabels)
      .join("text")
      .attr("x", 0)
      .attr("y", (_d, i) => padY + i * (cell + gap) + cell - 2)
      .attr("fill", "#8b949e")
      .attr("font-size", "9.5px")
      .attr("font-family", "var(--font-mono), monospace")
      .text((d) => d);

    // Month labels across top columns (avoid overlapping first/last partial week)
    const seenMonths = new Set<string>();
    const monthTicks: { label: string; weekIndex: number }[] = [];
    data.squares.forEach((sq) => {
      const monthKey = sq.date.slice(0, 7);
      if (!seenMonths.has(monthKey) && (sq.dayOfWeek === 0 || sq.weekIndex === 0)) {
        seenMonths.add(monthKey);
        const prev = monthTicks[monthTicks.length - 1];
        if (!prev || sq.weekIndex - prev.weekIndex >= 3) {
          const mName = new Date(`${sq.date}T00:00:00Z`).toLocaleDateString(
            "en-US",
            { month: "short", timeZone: "UTC" },
          );
          monthTicks.push({ label: mName, weekIndex: sq.weekIndex });
        }
      }
    });

    svg
      .append("g")
      .selectAll("text")
      .data(monthTicks)
      .join("text")
      .attr("x", (d) => padX + d.weekIndex * (cell + gap))
      .attr("y", 12)
      .attr("fill", "#8b949e")
      .attr("font-size", "10px")
      .attr("font-family", "var(--font-mono), monospace")
      .text((d) => d.label);

    // Exact GitHub contribution squares
    const squaresSel = svg
      .append("g")
      .selectAll("rect")
      .data(data.squares)
      .join("rect")
      .attr("x", (d) => padX + d.weekIndex * (cell + gap))
      .attr("y", (d) => padY + d.dayOfWeek * (cell + gap))
      .attr("width", cell)
      .attr("height", cell)
      .attr("rx", 2.5)
      .attr("ry", 2.5)
      .attr("fill", (d) => LEVEL_COLORS[d.level])
      .attr("stroke", (d) =>
        d.level > 0 ? "rgba(57,211,83,0.28)" : "rgba(255,255,255,0.06)",
      )
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .style("transition", "stroke 140ms ease, stroke-width 140ms ease");

    squaresSel
      .on("mouseenter", function (_event, d) {
        d3.select(this).attr("stroke", "#ffffff").attr("stroke-width", 1.7);
        setHoveredTooltip(d.tooltip);
      })
      .on("mouseleave", function (_event, d) {
        d3.select(this)
          .attr(
            "stroke",
            d.level > 0 ? "rgba(57,211,83,0.28)" : "rgba(255,255,255,0.06)",
          )
          .attr("stroke-width", 1);
        setHoveredTooltip(null);
      });
  }, [data.squares]);

  // 2. D3.js Engineering Stack Focus Arc Chart
  useEffect(() => {
    const svgEl = donutRef.current;
    if (!svgEl || data.stackAllocation.length === 0) return;

    const size = 210;
    const radius = size / 2;
    const innerR = radius * 0.62;
    const outerR = radius * 0.86;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${size} ${size}`);

    const g = svg
      .append("g")
      .attr("transform", `translate(${radius}, ${radius})`);

    const pie = d3
      .pie<(typeof data.stackAllocation)[number]>()
      .value((d) => d.share)
      .sort(null)
      .padAngle(0.045);

    const arc = d3
      .arc<d3.PieArcDatum<(typeof data.stackAllocation)[number]>>()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .cornerRadius(6);

    const arcHover = d3
      .arc<d3.PieArcDatum<(typeof data.stackAllocation)[number]>>()
      .innerRadius(innerR)
      .outerRadius(outerR + 7)
      .cornerRadius(7);

    const arcs = g
      .selectAll("path")
      .data(pie(data.stackAllocation))
      .join("path")
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "#060c18")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .style("transition", "filter 180ms ease")
      .attr("d", arc);

    arcs
      .on("mouseenter", function (_event, d) {
        d3.select(this)
          .attr("d", arcHover(d) ?? "")
          .style("filter", "brightness(1.15)");
        setHoveredStack(d.data);
      })
      .on("mouseleave", function (_event, d) {
        d3.select(this)
          .attr("d", arc(d) ?? "")
          .style("filter", "none");
        setHoveredStack(null);
      });
  }, [data.stackAllocation]);

  const activeSlice = hoveredStack ?? data.stackAllocation[0];

  return (
    <div className="space-y-8">
      {/* Top Row: Exact GitHub Contribution Squares + Engineering Focus Donut */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="preserve-dark relative overflow-hidden rounded-3xl border border-white/[0.12] bg-[#060c18] p-5 shadow-[0_24px_60px_-28px_rgba(56,189,248,0.22)] sm:p-7 lg:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] text-emerald-300">
                <Lock className="h-3.5 w-3.5" />
                <span>
                  {data.source === "graphql"
                    ? "Live GitHub GraphQL · Private + Public Activity"
                    : "Synced Live from GitHub Profile · Private Repos Protected"}
                </span>
              </div>
              <h3 className="mt-3 flex items-center gap-2.5 text-xl font-semibold tracking-tight text-white">
                <GitHubIcon className="h-5 w-5 text-emerald-400" />
                {data.summaryText}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Exact 52-week contribution calendar synced directly from GitHub
                (private enterprise repositories remain confidential).
              </p>
            </div>

            <a
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-mono text-xs font-medium text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950"
            >
              <GitHubIcon className="h-4 w-4" />
              @{data.username}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Responsive 52-Week Exact GitHub Square Matrix */}
          <div className="mt-5 w-full overflow-x-auto pb-2">
            <svg
              ref={heatmapRef}
              className="block h-auto min-w-[620px] w-full"
              role="img"
              aria-label={`D3.js 52-week GitHub contribution square calendar showing ${data.summaryText}`}
            />
          </div>

          {/* Bottom Legend + Hover Tooltip (Never exposes any repository name) */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4 font-mono text-[11px]">
            <div className="text-slate-200">
              {hoveredTooltip ? (
                <span className="text-emerald-300">{hoveredTooltip}</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Hover any square to view exact daily contribution activity
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <span>Less</span>
              {LEVEL_COLORS.map((col, idx) => (
                <span
                  key={col}
                  title={`Contribution level ${idx}`}
                  className="h-3 w-3 rounded-[2.5px] border border-white/10"
                  style={{ backgroundColor: col }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* D3 Engineering Stack Allocation Arc Chart */}
        <div className="preserve-dark flex flex-col justify-between rounded-3xl border border-white/[0.12] bg-[#060c18] p-6 shadow-[0_24px_60px_-28px_rgba(56,189,248,0.22)] sm:p-7 lg:col-span-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-sky-400">
              D3.js Production Footprint
            </div>
            <h3 className="mt-1 text-lg font-semibold text-white">
              Engineering Focus Split
            </h3>
          </div>

          <div className="relative mx-auto my-4 flex items-center justify-center">
            <svg
              ref={donutRef}
              className="h-[200px] w-[200px]"
              role="img"
              aria-label="D3.js donut chart illustrating core production engineering focus areas"
            />
            {activeSlice && (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <span className="font-mono text-2xl font-bold text-white">
                  {activeSlice.share}%
                </span>
                <span className="text-xs font-medium text-slate-200">
                  {activeSlice.domain}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2 border-t border-white/[0.08] pt-4">
            {data.stackAllocation.map((item) => (
              <div
                key={item.domain}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <span className="flex items-center gap-2 text-slate-200">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.domain}
                </span>
                <span className="font-mono text-slate-400">{item.share}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Private Production Systems Cards (Confidential naming, zero public repo list) */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PRIVATE_SYSTEMS.map((sys, idx) => (
          <TiltSpotlightCard
            key={sys.slug}
            accent={sys.accent}
            className={`flex flex-col justify-between rounded-3xl p-6 ${
              idx === PRIVATE_SYSTEMS.length - 1
                ? "md:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-400/10 px-2.5 py-0.5 font-mono text-[10px] text-sky-300">
                  <Lock className="h-3 w-3" />
                  {sys.code}
                </span>
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                {sys.name}
              </h3>

              <p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                {sys.summary}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {sys.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-950/55 px-2.5 py-2 font-mono text-[11px] text-slate-200"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-white/[0.08] pt-4">
              <Link
                href={`/projects/${sys.slug}`}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-sky-300 transition hover:text-sky-200"
              >
                Inspect Architecture &amp; Case Study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </TiltSpotlightCard>
        ))}
      </div>
    </div>
  );
}
