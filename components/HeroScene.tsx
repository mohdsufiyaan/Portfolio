"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import {
  Activity,
  ArrowDownRight,
  Compass,
  Orbit,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import { skillGroups, type SkillGroup } from "../app/data";
import { useTheme } from "./ThemeProvider";
import { smoothScrollTo } from "./SmoothScroll";

type ViewMode = "orbit" | "radar" | "wave";

interface DomainProfile {
  id: string;
  shortLabel: string;
  title: string;
  score: number;
  years: string;
  proof: string;
  accent: SkillGroup["accent"];
  count: number;
  topSkills: string[];
}

interface OrbitSkill {
  id: string;
  label: string;
  searchKey: string;
  domainId: string;
  domainTitle: string;
  detail: string;
  score: number;
  years: string;
  accent: SkillGroup["accent"];
  ring: 0 | 1;
  baseAngle: number;
}

const DOMAIN_META: Record<
  string,
  {
    shortLabel: string;
    score: number;
    years: string;
    proof: string;
    topSkills: string[];
  }
> = {
  backend: {
    shortLabel: "Backend",
    score: 96,
    years: "5.5+ yrs",
    proof: "High-throughput Laravel 12, Node.js, Express 5 & BullMQ APIs",
    topSkills: ["Laravel 12", "Node.js", "Express 5", "Socket.IO", "BullMQ"],
  },
  "ai-llm": {
    shortLabel: "AI & LLM",
    score: 94,
    years: "Since 2024",
    proof: "39-tool Autonomous LLM Agent, Hybrid RAG & multi-provider failover",
    topSkills: ["Laravel AI SDK", "Hybrid RAG", "Pinecone", "Jina 1024d", "MCP"],
  },
  "system-design": {
    shortLabel: "Architecture",
    score: 93,
    years: "Since 2024",
    proof: "Zero-Trust RBAC, distributed Redis locks & circuit breakers",
    topSkills: ["Event-Driven", "Horizontal Scale", "Redis & LRU", "Zero-Trust", "Concurrency"],
  },
  frontend: {
    shortLabel: "Web & Mobile",
    score: 90,
    years: "Since 2024",
    proof: "Next.js 16 SSR portals, React 19 & React Native 0.87 mobile suite",
    topSkills: ["Next.js 16", "React 19", "React Native", "TypeScript", "Tailwind"],
  },
  databases: {
    shortLabel: "Databases",
    score: 93,
    years: "5.5+ yrs",
    proof: "46-model PostgreSQL ledger, MySQL 8 indexing, Redis & Pinecone",
    topSkills: ["PostgreSQL", "MySQL 8", "Redis", "Pinecone", "Prisma ORM"],
  },
  "cloud-testing": {
    shortLabel: "Cloud & Ops",
    score: 89,
    years: "Since 2024",
    proof: "AWS EC2/S3/CloudFront, PM2 clusters, Prometheus & 145+ test suites",
    topSkills: ["AWS · CDN", "Nginx · Linux", "PM2 Cluster", "PHPUnit · Pest", "Vitest"],
  },
};

// Focused set of 10 core flagship skills across 2 clean, non-crowded orbital rings
const ORBIT_SKILLS: OrbitSkill[] = [
  // Inner Ring (4 Primary Core Pillars)
  {
    id: "laravel",
    label: "Laravel 12",
    searchKey: "Laravel",
    domainId: "backend",
    domainTitle: "Languages & Backend",
    detail: "Enterprise APIs, AI SDK harness, 28 models & 89 test suites",
    score: 96,
    years: "5.5+ yrs",
    accent: "cyan",
    ring: 0,
    baseAngle: -0.65,
  },
  {
    id: "rag",
    label: "Hybrid RAG",
    searchKey: "Hybrid RAG",
    domainId: "ai-llm",
    domainTitle: "AI & LLM Systems",
    detail: "Pinecone 1024d vectors + MySQL Full-Text fused via RRF",
    score: 94,
    years: "Since 2024",
    accent: "amber",
    ring: 0,
    baseAngle: 0.92,
  },
  {
    id: "node",
    label: "Node · Express 5",
    searchKey: "Express",
    domainId: "backend",
    domainTitle: "Languages & Backend",
    detail: "Horizontally scaled REST/WebSocket API with 56 Vitest suites",
    score: 95,
    years: "Since 2024",
    accent: "emerald",
    ring: 0,
    baseAngle: 2.5,
  },
  {
    id: "nextjs",
    label: "Next.js 16",
    searchKey: "Next.js",
    domainId: "frontend",
    domainTitle: "Frontend, Mobile & Desktop",
    detail: "SSR customer/partner portals & MFA Admin Control Plane",
    score: 91,
    years: "Since 2024",
    accent: "violet",
    ring: 0,
    baseAngle: 4.05,
  },

  // Outer Ring (6 Scale, Real-Time, AI & Data Core Pillars)
  {
    id: "agents",
    label: "AI Agents",
    searchKey: "Laravel AI",
    domainId: "ai-llm",
    domainTitle: "AI & LLM Systems",
    detail: "39-tool bounded 6-step autonomous agent cutting token spend 30–50%",
    score: 94,
    years: "Since 2024",
    accent: "amber",
    ring: 1,
    baseAngle: -0.35,
  },
  {
    id: "socketio",
    label: "Socket.IO",
    searchKey: "Socket.IO",
    domainId: "backend",
    domainTitle: "Languages & Backend",
    detail: "Multi-node Redis Pub/Sub real-time bookings & live presence",
    score: 93,
    years: "Since 2024",
    accent: "emerald",
    ring: 1,
    baseAngle: 0.7,
  },
  {
    id: "redis",
    label: "Redis · Queues",
    searchKey: "Redis",
    domainId: "databases",
    domainTitle: "Databases & Storage",
    detail: "L1/L2 caching, mutex locks, keyspace expiry & 6 BullMQ queues",
    score: 94,
    years: "Since 2024",
    accent: "cyan",
    ring: 1,
    baseAngle: 1.75,
  },
  {
    id: "rn",
    label: "React Native",
    searchKey: "React Native",
    domainId: "frontend",
    domainTitle: "Frontend, Mobile & Desktop",
    detail: "Dual-role New Architecture mobile suite with 304 ETag cache",
    score: 90,
    years: "Since 2024",
    accent: "violet",
    ring: 1,
    baseAngle: 2.8,
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    searchKey: "PostgreSQL",
    domainId: "databases",
    domainTitle: "Databases & Storage",
    detail: "46-model Prisma schema & 15-model double-entry settlement ledger",
    score: 93,
    years: "Since 2024",
    accent: "cyan",
    ring: 1,
    baseAngle: 3.85,
  },
  {
    id: "aws",
    label: "AWS · CDN",
    searchKey: "AWS",
    domainId: "cloud-testing",
    domainTitle: "Cloud, DevOps & Quality",
    detail: "EC2, S3 presigned uploads, RDS, CloudFront & 145+ test suites",
    score: 90,
    years: "Since 2024",
    accent: "amber",
    ring: 1,
    baseAngle: 4.9,
  },
];

function jumpToConstellation(domainId = "all", skillQuery = "") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("portfolio:focus-constellation", {
        detail: { domainId, skillQuery, fromHero: true },
      }),
    );
    // Scroll immediately, then confirm target offset after any filter layout frame
    smoothScrollTo("#capability-constellation", -96);
    requestAnimationFrame(() => {
      smoothScrollTo("#capability-constellation", -96);
    });
  }
}

const COLORS_DARK: Record<SkillGroup["accent"], string> = {
  cyan: "#38bdf8",
  amber: "#fb923c",
  emerald: "#34d399",
  violet: "#a78bfa",
};

const COLORS_LIGHT: Record<SkillGroup["accent"], string> = {
  cyan: "#0284c7",
  amber: "#d97706",
  emerald: "#059669",
  violet: "#7c3aed",
};

export function HeroScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const palette = isDark ? COLORS_DARK : COLORS_LIGHT;

  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Direct DOM refs for zero-reflow, zero-re-render telemetry bar
  const dotRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const detailRef = useRef<HTMLParagraphElement>(null);

  const domains: DomainProfile[] = useMemo(
    () =>
      skillGroups.map((g) => {
        const meta = DOMAIN_META[g.id] ?? {
          shortLabel: g.title.split(" ")[0],
          score: 88,
          years: "Since 2024",
          proof: g.subtitle,
          topSkills: g.items.slice(0, 4).map((i) => i.name),
        };
        return {
          id: g.id,
          shortLabel: meta.shortLabel,
          title: g.title,
          score: meta.score,
          years: meta.years,
          proof: meta.proof,
          accent: g.accent,
          count: g.items.length,
          topSkills: meta.topSkills,
        };
      }),
    [],
  );

  const totalSkills = useMemo(
    () => domains.reduce((acc, d) => acc + d.count, 0),
    [domains],
  );

  const [viewMode, setViewMode] = useState<ViewMode>("orbit");
  const [paused, setPaused] = useState(false);
  // Narrow cards get a tighter coordinate space so SVG labels stay legible
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(([entry]) => {
      setCompact(entry.contentRect.width < 480);
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const focusedTargetRef = useRef<{ domainId: string; skillQuery: string }>({
    domainId: "backend",
    skillQuery: "Laravel 12",
  });

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = compact ? 360 : 580;
    const height = compact ? 390 : 440;
    const cx = width / 2;
    const cy = height / 2;

    const inkPrimary = isDark ? "#f8fafc" : "#0f172a";
    const inkSecondary = isDark ? "#94a3b8" : "#475569";
    const ringStroke = isDark
      ? "rgba(148, 163, 184, 0.16)"
      : "rgba(15, 23, 42, 0.12)";
    const pillBg = isDark
      ? "rgba(8, 15, 32, 0.94)"
      : "rgba(255, 255, 255, 0.97)";
    const pillBorder = isDark
      ? "rgba(148, 163, 184, 0.3)"
      : "rgba(15, 23, 42, 0.16)";

    const updateTelemetry = (info: {
      title: string;
      badge: string;
      detail: string;
      color: string;
      domainId?: string;
      skillQuery?: string;
    }) => {
      if (dotRef.current) {
        dotRef.current.style.backgroundColor = info.color;
        dotRef.current.style.boxShadow = `0 0 12px ${info.color}`;
      }
      if (titleRef.current) titleRef.current.textContent = info.title;
      if (badgeRef.current) badgeRef.current.textContent = info.badge;
      if (detailRef.current) detailRef.current.textContent = info.detail;
      if (info.domainId !== undefined) {
        focusedTargetRef.current = {
          domainId: info.domainId,
          skillQuery: info.skillQuery ?? "",
        };
      }
    };

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const defs = svg.append("defs");

    // Soft bloom filter
    const glow = defs
      .append("filter")
      .attr("id", "hero-live-glow")
      .attr("x", "-60%")
      .attr("y", "-60%")
      .attr("width", "220%")
      .attr("height", "220%");
    glow
      .append("feGaussianBlur")
      .attr("stdDeviation", isDark ? "5" : "2.4")
      .attr("result", "blur");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    // Center ambient aura
    const auraGrad = defs
      .append("radialGradient")
      .attr("id", "hero-core-aura");
    auraGrad
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", isDark ? "#38bdf8" : "#0284c7")
      .attr("stop-opacity", isDark ? 0.24 : 0.16);
    auraGrad
      .append("stop")
      .attr("offset", "65%")
      .attr("stop-color", isDark ? "#22d3ee" : "#0891b2")
      .attr("stop-opacity", isDark ? 0.06 : 0.04);
    auraGrad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", isDark ? "#38bdf8" : "#0284c7")
      .attr("stop-opacity", 0);

    let rafId = 0;
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    if (hostRef.current) io.observe(hostRef.current);

    /* ========================================================================
       MODE 1: LIVE ANIMATED SKILL GALAXY ORBIT (D3 Arcs + 60fps Signal Beams)
    ======================================================================== */
    if (viewMode === "orbit") {
      const rings = [
        { rx: compact ? 86 : 120, ry: compact ? 92 : 98, speed: 0.22, dash: "4 6", op: isDark ? 0.28 : 0.34 },
        { rx: compact ? 150 : 208, ry: compact ? 172 : 164, speed: -0.13, dash: "3 7", op: isDark ? 0.22 : 0.28 },
      ];

      const g = svg.append("g").attr("transform", `translate(${cx}, ${cy})`);

      // Ambient glow + concentric orbital ellipses
      g.append("circle").attr("r", 150).attr("fill", "url(#hero-core-aura)");

      // Subtle expanding pulse wave rings
      const pulseWave1 = g
        .append("circle")
        .attr("fill", "none")
        .attr("stroke", isDark ? "#38bdf8" : "#0284c7")
        .attr("stroke-width", 1.2);
      const pulseWave2 = g
        .append("circle")
        .attr("fill", "none")
        .attr("stroke", isDark ? "#22d3ee" : "#0891b2")
        .attr("stroke-width", 1);

      rings.forEach((r) => {
        g.append("ellipse")
          .attr("rx", r.rx)
          .attr("ry", r.ry)
          .attr("fill", "none")
          .attr("stroke", isDark ? "#38bdf8" : "#0284c7")
          .attr("stroke-opacity", r.op)
          .attr("stroke-dasharray", r.dash)
          .attr("stroke-width", 1.15);
      });

      // Dynamic signal beams from hovered/focused skill to core
      const beamLayer = g.append("g").attr("fill", "none");
      const activeBeam = beamLayer
        .append("path")
        .attr("stroke", palette.cyan)
        .attr("stroke-width", 2.2)
        .attr("stroke-dasharray", "5 6")
        .attr("filter", "url(#hero-live-glow)")
        .attr("opacity", 0.85);

      const beamDot = beamLayer
        .append("circle")
        .attr("r", 3.6)
        .attr("fill", palette.cyan)
        .attr("filter", "url(#hero-live-glow)");

      // Subtle background constellation chords between core skills
      const chordPaths = [
        { a: 0, b: 1, col: palette.amber },
        { a: 2, b: 6, col: palette.emerald },
        { a: 3, b: 7, col: palette.violet },
        { a: 1, b: 4, col: palette.amber },
      ].map((c) => ({
        ...c,
        el: beamLayer
          .append("path")
          .attr("stroke", c.col)
          .attr("stroke-width", 1)
          .attr("stroke-opacity", isDark ? 0.22 : 0.26)
          .attr("stroke-dasharray", "3 6"),
      }));

      // Center Core Architectural Gauge (d3.arc)
      const coreGroup = g.append("g");
      // Static wrapper scale; child rotations keep their own transforms
      if (compact) coreGroup.attr("transform", "scale(0.78)");
      const compassOuter = coreGroup
        .append("circle")
        .attr("r", 54)
        .attr("fill", "none")
        .attr("stroke", isDark ? "rgba(56,189,248,0.42)" : "rgba(2,132,199,0.45)")
        .attr("stroke-width", 1.3)
        .attr("stroke-dasharray", "8 6");

      const compassInner = coreGroup
        .append("circle")
        .attr("r", 46)
        .attr("fill", isDark ? "#071022" : "#ffffff")
        .attr("stroke", isDark ? "rgba(148,163,184,0.2)" : "rgba(15,23,42,0.12)")
        .attr("stroke-width", 1.2);

      const gaugeArcGen = d3
        .arc<{ endAngle: number }>()
        .innerRadius(40)
        .outerRadius(45)
        .startAngle(0)
        .cornerRadius(4);

      const gaugeTrack = coreGroup
        .append("circle")
        .attr("r", 42.5)
        .attr("fill", "none")
        .attr("stroke", ringStroke)
        .attr("stroke-width", 4.5);
      void gaugeTrack;

      const gaugeFill = coreGroup
        .append("path")
        .attr("fill", palette.cyan)
        .attr("filter", "url(#hero-live-glow)");

      const coreScoreText = coreGroup
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", -3)
        .attr("fill", inkPrimary)
        .attr("font-size", "18px")
        .attr("font-weight", "800")
        .attr("font-family", "var(--font-mono), monospace")
        .text("96%");

      const coreSubText = coreGroup
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", 13)
        .attr("fill", palette.cyan)
        .attr("font-size", "9.5px")
        .attr("font-weight", "700")
        .attr("font-family", "var(--font-mono), monospace")
        .text("5.5+ yrs");

      // Orbiting interactive skill pills
      let focusedIdx = 0;
      let hoveredIdx: number | null = null;
      let currentGaugeScore = ORBIT_SKILLS[0].score;

      const setFocusedSkill = (idx: number) => {
        focusedIdx = idx;
        const sk = ORBIT_SKILLS[idx];
        const col = palette[sk.accent];
        coreScoreText.text(`${sk.score}%`);
        coreSubText.text(sk.years).attr("fill", col);
        gaugeFill.attr("fill", col);
        activeBeam.attr("stroke", col);
        beamDot.attr("fill", col);
        updateTelemetry({
          title: `${sk.label} · ${sk.domainTitle}`,
          badge: `${sk.score}% · ${sk.years}`,
          detail: sk.detail,
          color: col,
          domainId: sk.domainId,
          skillQuery: sk.searchKey,
        });
      };

      coreGroup
        .style("cursor", "pointer")
        .on("click", () => {
          const sk = ORBIT_SKILLS[focusedIdx];
          jumpToConstellation(sk.domainId, sk.searchKey);
        });

      const nodesLayer = g.append("g");
      const skillNodes = ORBIT_SKILLS.map((sk, idx) => {
        const col = palette[sk.accent];
        const pillW = Math.round(sk.label.length * (compact ? 6.7 : 6.4) + 26);
        const pillH = 24;

        const nodeG = nodesLayer
          .append("g")
          .style("cursor", "pointer")
          .on("mouseenter", () => {
            hoveredIdx = idx;
            setFocusedSkill(idx);
          })
          .on("mouseleave", () => {
            hoveredIdx = null;
          })
          .on("click", (event: MouseEvent) => {
            event.stopPropagation();
            setFocusedSkill(idx);
            jumpToConstellation(sk.domainId, sk.searchKey);
          });

        nodeG
          .append("title")
          .text(`Click to locate ${sk.label} in Interactive Capability Constellation`);

        const rect = nodeG
          .append("rect")
          .attr("x", -pillW / 2)
          .attr("y", -pillH / 2)
          .attr("width", pillW)
          .attr("height", pillH)
          .attr("rx", 12)
          .attr("fill", pillBg)
          .attr("stroke", pillBorder)
          .attr("stroke-width", 1.15);

        const dot = nodeG
          .append("circle")
          .attr("cx", -pillW / 2 + 10)
          .attr("cy", 0)
          .attr("r", 3.4)
          .attr("fill", col);

        const label = nodeG
          .append("text")
          .attr("x", 4)
          .attr("y", 3.5)
          .attr("text-anchor", "middle")
          .attr("fill", inkPrimary)
          .attr("font-size", compact ? "10.8px" : "10.2px")
          .attr("font-weight", "700")
          .attr("font-family", "var(--font-mono), monospace")
          .style("pointer-events", "none")
          .text(sk.label);

        return { sk, col, nodeG, rect, dot, label, x: 0, y: 0 };
      });

      setFocusedSkill(0);

      let elapsed = 0;
      let cycleTimer = 0;
      let prev = performance.now();

      const tick = (now: number) => {
        const dt = Math.min((now - prev) / 1000, 0.05);
        prev = now;

        if (isVisible && !document.hidden) {
          // Freeze orbit while hovering a pill so clicking never misses
          const speedMult = pausedRef.current || hoveredIdx !== null ? 0 : 1;
          elapsed += dt * speedMult;

          if (!pausedRef.current && hoveredIdx === null) {
            cycleTimer += dt;
            if (cycleTimer > 3.2) {
              cycleTimer = 0;
              setFocusedSkill((focusedIdx + 1) % ORBIT_SKILLS.length);
            }
          }

          // Smooth gauge arc interpolation
          const targetScore = ORBIT_SKILLS[focusedIdx].score;
          currentGaugeScore += (targetScore - currentGaugeScore) * Math.min(1, dt * 8);
          gaugeFill.attr(
            "d",
            gaugeArcGen({ endAngle: (currentGaugeScore / 100) * Math.PI * 2 }) ?? "",
          );

          // Breathing center pulse waves
          const p1 = (elapsed * 0.45) % 1;
          const p2 = (elapsed * 0.45 + 0.5) % 1;
          const pulseSpan = compact ? 120 : 145;
          pulseWave1.attr("r", 46 + p1 * pulseSpan).attr("stroke-opacity", (1 - p1) * (isDark ? 0.28 : 0.22));
          pulseWave2.attr("r", 46 + p2 * pulseSpan).attr("stroke-opacity", (1 - p2) * (isDark ? 0.24 : 0.18));

          // Counter-rotate center compass
          const deg = (elapsed * 22) % 360;
          compassOuter.attr("transform", `rotate(${deg.toFixed(1)})`);
          compassInner.attr("transform", `rotate(${(-deg * 0.6).toFixed(1)})`);

          // Update every orbiting skill pill smoothly on its elliptical track
          skillNodes.forEach((item, idx) => {
            const rCfg = rings[item.sk.ring];
            const ang = item.sk.baseAngle + elapsed * rCfg.speed;
            if (compact) {
              // No room to orbit without collisions: two columns that drift gently
              const row = Math.floor(idx / 2);
              const side = idx % 2 === 0 ? -1 : 1;
              item.x = side * [94, 100, 112, 106, 94][row] + Math.cos(elapsed * 0.9 + idx) * 3;
              item.y = [-158, -90, 0, 90, 158][row] + Math.sin(elapsed * 1.1 + idx) * 5;
            } else {
              item.x = Math.cos(ang) * rCfg.rx;
              item.y = Math.sin(ang) * rCfg.ry;
            }

            const isAct = idx === focusedIdx;
            // Subtle depth scale based on vertical orbital position
            const depthScale = (isAct ? 1.12 : 0.94 + ((item.y / 190) + 1) * 0.05);
            item.nodeG.attr(
              "transform",
              `translate(${item.x.toFixed(1)}, ${item.y.toFixed(1)}) scale(${depthScale.toFixed(3)})`,
            );
            item.rect
              .attr("fill", isAct ? item.col : pillBg)
              .attr("stroke", isAct ? item.col : pillBorder)
              .attr("stroke-width", isAct ? 1.8 : 1.1)
              .attr("filter", isAct ? "url(#hero-live-glow)" : null);
            item.dot.attr("fill", isAct ? (isDark ? "#03101e" : "#ffffff") : item.col);
            item.label.attr("fill", isAct ? (isDark ? "#03101e" : "#ffffff") : inkPrimary);
          });

          // Curved live signal beam from active skill to center core
          const act = skillNodes[focusedIdx];
          const qx = act.x * 0.5 - act.y * 0.18;
          const qy = act.y * 0.5 + act.x * 0.18;
          activeBeam
            .attr("d", `M ${act.x.toFixed(1)} ${act.y.toFixed(1)} Q ${qx.toFixed(1)} ${qy.toFixed(1)} 0 0`)
            .attr("stroke-dashoffset", (-elapsed * 32).toFixed(1));

          const tBeam = (elapsed * 0.9) % 1;
          const inv = 1 - tBeam;
          const bx = inv * inv * act.x + 2 * inv * tBeam * qx;
          const by = inv * inv * act.y + 2 * inv * tBeam * qy;
          beamDot.attr("cx", bx.toFixed(1)).attr("cy", by.toFixed(1));

          // Update background chords
          chordPaths.forEach((c) => {
            const na = skillNodes[c.a];
            const nb = skillNodes[c.b];
            const mx = (na.x + nb.x) * 0.5;
            const my = (na.y + nb.y) * 0.5;
            c.el.attr(
              "d",
              `M ${na.x.toFixed(1)} ${na.y.toFixed(1)} Q ${(mx * 0.72).toFixed(1)} ${(my * 0.72).toFixed(1)} ${nb.x.toFixed(1)} ${nb.y.toFixed(1)}`,
            );
          });
        }

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(rafId);
        io.disconnect();
      };
    }

    /* ========================================================================
       MODE 2: ANIMATED RADAR WITH LIVE 360° TELEMETRY SWEEP (d3.lineRadial)
    ======================================================================== */
    if (viewMode === "radar") {
      const maxR = compact ? 108 : 138;
      const angleStep = (Math.PI * 2) / domains.length;
      const rScale = d3.scaleLinear().domain([0, 100]).range([0, maxR]);

      const polyGrad = defs
        .append("radialGradient")
        .attr("id", "radar-poly-grad");
      polyGrad
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", isDark ? "#38bdf8" : "#0284c7")
        .attr("stop-opacity", isDark ? 0.36 : 0.26);
      polyGrad
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", isDark ? "#22d3ee" : "#0891b2")
        .attr("stop-opacity", isDark ? 0.08 : 0.06);

      const sweepGrad = defs
        .append("linearGradient")
        .attr("id", "radar-sweep-grad")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
      sweepGrad
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", isDark ? "#38bdf8" : "#0284c7")
        .attr("stop-opacity", isDark ? 0.28 : 0.2);
      sweepGrad
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", isDark ? "#38bdf8" : "#0284c7")
        .attr("stop-opacity", 0);

      const g = svg.append("g").attr("transform", `translate(${cx}, ${cy})`);

      // Concentric hexagons
      [0.25, 0.5, 0.75, 1].forEach((lvl, lIdx) => {
        const r = maxR * lvl;
        const pts = domains.map((_, i) => {
          const a = i * angleStep - Math.PI / 2;
          return [Math.cos(a) * r, Math.sin(a) * r];
        });
        g.append("polygon")
          .attr("points", pts.map((p) => p.join(",")).join(" "))
          .attr(
            "fill",
            lIdx === 3
              ? isDark
                ? "rgba(12, 21, 40, 0.45)"
                : "rgba(241, 245, 249, 0.55)"
              : "none",
          )
          .attr("stroke", ringStroke)
          .attr("stroke-dasharray", lIdx < 3 ? "3 5" : "none")
          .attr("stroke-width", lIdx === 3 ? 1.2 : 1);
      });

      // Live rotating telemetry sweep cone
      const sweepArc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(maxR)
        .startAngle(-0.55)
        .endAngle(0);
      const sweepCone = g
        .append("path")
        .attr("d", sweepArc({} as d3.DefaultArcObject) ?? "")
        .attr("fill", "url(#radar-sweep-grad)");

      // Axis spokes
      const spokeEls = domains.map((_, i) => {
        const a = i * angleStep - Math.PI / 2;
        return g
          .append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", Math.cos(a) * maxR)
          .attr("y2", Math.sin(a) * maxR)
          .attr("stroke", ringStroke)
          .attr("stroke-width", 1);
      });

      // Smoothly animated D3 radial radar polygon via rAF (Turbopack-safe, no prototype .transition())
      const buildRadarPath = (progress: number) =>
        d3
          .lineRadial<DomainProfile>()
          .angle((_d, i) => i * angleStep)
          .radius((d) => rScale(d.score) * progress)
          .curve(d3.curveCardinalClosed.tension(0.65));

      const radarPoly = g
        .append("path")
        .datum(domains)
        .attr("d", buildRadarPath(0.05))
        .attr("fill", "url(#radar-poly-grad)")
        .attr("stroke", isDark ? "#38bdf8" : "#0284c7")
        .attr("stroke-width", 2.3)
        .attr("filter", "url(#hero-live-glow)");

      // Center readout
      const centerCircle = g
        .append("circle")
        .attr("r", 34)
        .attr("fill", isDark ? "#071022" : "#ffffff")
        .attr("stroke", palette[domains[0].accent])
        .attr("stroke-width", 2);
      const centerScore = g
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", -2)
        .attr("fill", inkPrimary)
        .attr("font-size", "17px")
        .attr("font-weight", "800")
        .attr("font-family", "var(--font-mono), monospace");
      const centerYears = g
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", 13)
        .attr("fill", palette[domains[0].accent])
        .attr("font-size", "9.5px")
        .attr("font-weight", "700")
        .attr("font-family", "var(--font-mono), monospace");

      let focusedIdx = 0;
      let hoveredIdx: number | null = null;

      const vertexItems = domains.map((d, i) => {
        const a = i * angleStep - Math.PI / 2;
        const vx = Math.cos(a) * rScale(d.score);
        const vy = Math.sin(a) * rScale(d.score);
        const col = palette[d.accent];

        const halo = g
          .append("circle")
          .attr("cx", vx)
          .attr("cy", vy)
          .attr("r", 12)
          .attr("fill", col)
          .attr("opacity", 0);

        const dot = g
          .append("circle")
          .attr("cx", vx)
          .attr("cy", vy)
          .attr("r", 5.5)
          .attr("fill", col)
          .attr("stroke", isDark ? "#071022" : "#ffffff")
          .attr("stroke-width", 2)
          .style("cursor", "pointer");

        const sinA = Math.sin(a);
        const cosA = Math.cos(a);
        const labelR = maxR + (Math.abs(sinA) > 0.75 ? 30 : compact ? 42 : 52);
        const ly = sinA * labelR;
        const txt = `${d.shortLabel} · ${d.score}%`;
        const pillW = Math.round(txt.length * 6.5 + 18);
        // Keep side labels inside the viewBox
        const maxLx = width / 2 - pillW / 2 - 4;
        const lx = Math.max(-maxLx, Math.min(maxLx, cosA * labelR));

        const pillG = g
          .append("g")
          .attr("transform", `translate(${lx.toFixed(1)}, ${ly.toFixed(1)})`)
          .style("cursor", "pointer");

        const pillRect = pillG
          .append("rect")
          .attr("x", -pillW / 2)
          .attr("y", -12)
          .attr("width", pillW)
          .attr("height", 24)
          .attr("rx", 12)
          .attr("fill", pillBg)
          .attr("stroke", pillBorder);

        const pillText = pillG
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "0.35em")
          .attr("fill", inkPrimary)
          .attr("font-size", "10.5px")
          .attr("font-weight", "700")
          .attr("font-family", "var(--font-mono), monospace")
          .text(txt);

        const onFocus = () => {
          hoveredIdx = i;
          applyRadarFocus(i);
        };
        const onBlur = () => {
          hoveredIdx = null;
        };
        const onSelect = () => {
          applyRadarFocus(i);
          jumpToConstellation(d.id, "");
        };

        dot.on("mouseenter", onFocus).on("mouseleave", onBlur).on("click", onSelect);
        pillG.on("mouseenter", onFocus).on("mouseleave", onBlur).on("click", onSelect);

        return { d, col, halo, dot, pillRect, pillText };
      });

      const applyRadarFocus = (idx: number) => {
        focusedIdx = idx;
        const d = domains[idx];
        const col = palette[d.accent];
        centerCircle.attr("stroke", col);
        centerScore.text(`${d.score}%`);
        centerYears.text(d.years).attr("fill", col);

        vertexItems.forEach((v, i) => {
          const isAct = i === idx;
          v.halo.attr("opacity", isAct ? 0.25 : 0);
          v.dot.attr("r", isAct ? 7.5 : 5);
          v.pillRect
            .attr("fill", isAct ? v.col : pillBg)
            .attr("stroke", isAct ? v.col : pillBorder)
            .attr("filter", isAct ? "url(#hero-live-glow)" : null);
          v.pillText.attr("fill", isAct ? (isDark ? "#03101e" : "#ffffff") : inkPrimary);
          spokeEls[i]
            .attr("stroke", isAct ? v.col : ringStroke)
            .attr("stroke-width", isAct ? 2 : 1);
        });

        updateTelemetry({
          title: d.title,
          badge: `${d.count} skills · ${d.years}`,
          detail: d.proof,
          color: col,
          domainId: d.id,
          skillQuery: "",
        });
      };

      applyRadarFocus(0);

      let sweepDeg = 0;
      let morphT = 0;
      let prev = performance.now();

      const tickRadar = (now: number) => {
        const dt = Math.min((now - prev) / 1000, 0.05);
        prev = now;
        if (isVisible && !document.hidden) {
          if (morphT < 1) {
            morphT = Math.min(1, morphT + dt * 1.65);
            const eased = 1 - Math.pow(1 - morphT, 3);
            radarPoly.attr("d", buildRadarPath(eased));
          }
          if (!pausedRef.current) {
            sweepDeg = (sweepDeg + dt * 52) % 360;
            sweepCone.attr("transform", `rotate(${sweepDeg.toFixed(1)})`);
            if (hoveredIdx === null) {
              const sweptSector = Math.floor(((sweepDeg + 30) % 360) / 60);
              if (sweptSector !== focusedIdx) {
                applyRadarFocus(sweptSector);
              }
            }
          }
        }
        rafId = requestAnimationFrame(tickRadar);
      };

      rafId = requestAnimationFrame(tickRadar);
      return () => {
        cancelAnimationFrame(rafId);
        io.disconnect();
      };
    }

    /* ========================================================================
       MODE 3: LIVE SIGNAL SPLINE WAVE (d3.area + Traveling Light Particles)
    ======================================================================== */
    const padL = compact ? 32 : 44;
    const padR = compact ? 34 : 36;
    const padT = compact ? 48 : 64;
    const padB = compact ? 96 : 76;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    const xScale = d3
      .scalePoint<string>()
      .domain(domains.map((d) => d.id))
      .range([padL, padL + plotW])
      .padding(0.12);

    const yScale = d3
      .scaleLinear()
      .domain([72, 100])
      .range([padT + plotH, padT]);

    const waveAreaGrad = defs
      .append("linearGradient")
      .attr("id", "hero-wave-area")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    waveAreaGrad
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", isDark ? "#38bdf8" : "#0284c7")
      .attr("stop-opacity", isDark ? 0.36 : 0.25);
    waveAreaGrad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", isDark ? "#38bdf8" : "#0284c7")
      .attr("stop-opacity", 0);

    const waveStrokeGrad = defs
      .append("linearGradient")
      .attr("id", "hero-wave-stroke")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    waveStrokeGrad.append("stop").attr("offset", "0%").attr("stop-color", palette.cyan);
    waveStrokeGrad.append("stop").attr("offset", "35%").attr("stop-color", palette.amber);
    waveStrokeGrad.append("stop").attr("offset", "70%").attr("stop-color", palette.emerald);
    waveStrokeGrad.append("stop").attr("offset", "100%").attr("stop-color", palette.violet);

    // Subtle horizontal proficiency gridlines
    [80, 88, 96].forEach((val) => {
      const y = yScale(val);
      svg
        .append("line")
        .attr("x1", padL)
        .attr("y1", y)
        .attr("x2", padL + plotW)
        .attr("y2", y)
        .attr("stroke", ringStroke)
        .attr("stroke-dasharray", "3 6");
      svg
        .append("text")
        .attr("x", padL - 8)
        .attr("y", y + 3)
        .attr("text-anchor", "end")
        .attr("fill", inkSecondary)
        .attr("font-size", "9.5px")
        .attr("font-family", "var(--font-mono), monospace")
        .text(`${val}%`);
    });

    const areaGen = d3
      .area<DomainProfile>()
      .x((d) => xScale(d.id) ?? padL)
      .y0(padT + plotH)
      .y1((d) => yScale(d.score))
      .curve(d3.curveCatmullRom.alpha(0.55));

    const lineGen = d3
      .line<DomainProfile>()
      .x((d) => xScale(d.id) ?? padL)
      .y((d) => yScale(d.score))
      .curve(d3.curveCatmullRom.alpha(0.55));

    const waveArea = svg
      .append("path")
      .datum(domains)
      .attr("d", areaGen)
      .attr("fill", "url(#hero-wave-area)")
      .attr("opacity", 0);

    const curvePath = svg
      .append("path")
      .datum(domains)
      .attr("d", lineGen)
      .attr("fill", "none")
      .attr("stroke", "url(#hero-wave-stroke)")
      .attr("stroke-width", 3)
      .attr("filter", "url(#hero-live-glow)");

    const pathNode = curvePath.node();
    const totalLen = pathNode ? pathNode.getTotalLength() : 0;

    // Animated traveling light bead along the mastery curve
    const traveler = svg
      .append("circle")
      .attr("r", 5)
      .attr("fill", isDark ? "#ffffff" : "#0284c7")
      .attr("filter", "url(#hero-live-glow)");

    let focusedIdx = 0;
    let hoveredIdx: number | null = null;

    const peakNodes = domains.map((d, i) => {
      const x = xScale(d.id) ?? padL;
      const y = yScale(d.score);
      const col = palette[d.accent];

      const dropLine = svg
        .append("line")
        .attr("x1", x)
        .attr("y1", y)
        .attr("x2", x)
        .attr("y2", padT + plotH)
        .attr("stroke", col)
        .attr("stroke-dasharray", "3 4")
        .attr("stroke-opacity", 0.35);

      const halo = svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 13)
        .attr("fill", col)
        .attr("opacity", 0);

      const dot = svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 6)
        .attr("fill", col)
        .attr("stroke", isDark ? "#071022" : "#ffffff")
        .attr("stroke-width", 2)
        .style("cursor", "pointer");

      const valBadge = svg
        .append("text")
        .attr("x", x)
        .attr("y", y - 16)
        .attr("text-anchor", "middle")
        .attr("fill", inkPrimary)
        .attr("font-size", "11px")
        .attr("font-weight", "800")
        .attr("font-family", "var(--font-mono), monospace")
        .text(`${d.score}%`);

      // Narrow cards stagger axis labels on two rows to avoid collisions
      const labelY = padT + plotH + 22 + (compact && i % 2 === 1 ? 34 : 0);

      const axisLabel = svg
        .append("text")
        .attr("x", x)
        .attr("y", labelY)
        .attr("text-anchor", "middle")
        .attr("fill", inkPrimary)
        .attr("font-size", "10.5px")
        .attr("font-weight", "700")
        .attr("font-family", "var(--font-mono), monospace")
        .style("cursor", "pointer")
        .text(d.shortLabel);

      svg
        .append("text")
        .attr("x", x)
        .attr("y", labelY + 15)
        .attr("text-anchor", "middle")
        .attr("fill", inkSecondary)
        .attr("font-size", "9.5px")
        .attr("font-family", "var(--font-mono), monospace")
        .text(`${d.count} skills`);

      // Invisible interactive column target for silky hover
      const hitRect = svg
        .append("rect")
        .attr("x", x - (compact ? 23 : 34))
        .attr("y", padT - 20)
        .attr("width", compact ? 46 : 68)
        .attr("height", plotH + 68)
        .attr("fill", "transparent")
        .style("cursor", "pointer");

      const onFocus = () => {
        hoveredIdx = i;
        applyWaveFocus(i);
      };
      const onBlur = () => {
        hoveredIdx = null;
      };
      const onSelect = () => {
        applyWaveFocus(i);
        jumpToConstellation(d.id, "");
      };
      hitRect.on("mouseenter", onFocus).on("mouseleave", onBlur).on("click", onSelect);

      return { d, col, dropLine, halo, dot, valBadge, axisLabel };
    });

    const applyWaveFocus = (idx: number) => {
      focusedIdx = idx;
      const d = domains[idx];
      const col = palette[d.accent];

      peakNodes.forEach((p, i) => {
        const isAct = i === idx;
        p.halo.attr("opacity", isAct ? 0.25 : 0);
        p.dot.attr("r", isAct ? 8 : 5.5);
        p.dropLine.attr("stroke-opacity", isAct ? 0.85 : 0.25).attr("stroke-width", isAct ? 1.8 : 1);
        p.valBadge.attr("fill", isAct ? p.col : inkSecondary).attr("font-size", isAct ? "13px" : "10.5px");
        p.axisLabel.attr("fill", isAct ? p.col : inkPrimary);
      });

      updateTelemetry({
        title: d.title,
        badge: `${d.score}% · ${d.years}`,
        detail: d.proof,
        color: col,
        domainId: d.id,
        skillQuery: "",
      });
    };

    applyWaveFocus(0);

    let waveT = 0;
    let fadeT = 0;
    let prev = performance.now();

    const tickWave = (now: number) => {
      // The first frame timestamp can precede `prev`; a negative step would index domains[-1]
      const dt = Math.max(0, Math.min((now - prev) / 1000, 0.05));
      prev = now;
      if (isVisible && !document.hidden) {
        if (fadeT < 1) {
          fadeT = Math.min(1, fadeT + dt * 2.0);
          waveArea.attr("opacity", fadeT.toFixed(3));
        }
        if (!pausedRef.current && pathNode && totalLen > 0) {
          waveT = (waveT + dt * 0.18) % 1;
          const pt = pathNode.getPointAtLength(waveT * totalLen);
          traveler.attr("cx", pt.x.toFixed(1)).attr("cy", pt.y.toFixed(1));
          if (hoveredIdx === null) {
            const idx = Math.min(domains.length - 1, Math.floor(waveT * domains.length));
            if (idx !== focusedIdx) applyWaveFocus(idx);
          }
        }
      }
      rafId = requestAnimationFrame(tickWave);
    };

    rafId = requestAnimationFrame(tickWave);
    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, [viewMode, domains, isDark, palette, compact]);

  return (
    <div
      ref={hostRef}
      className="glass-panel @container relative flex flex-col overflow-hidden rounded-3xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(56,189,248,0.14),transparent_62%),radial-gradient(circle_at_24%_78%,rgba(251,146,60,0.09),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-35"
      />

      {/* Top Interactive Studio HUD */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          <span className="font-semibold text-white">SKILL PULSE</span>
          <span className="hidden text-slate-400 @md:inline">
            · {totalSkills} Production Skills
          </span>
        </div>

        <div className="flex items-center gap-1">
          {(
            [
              ["orbit", "Orbit", Orbit],
              ["radar", "Radar", Compass],
              ["wave", "Wave", Activity],
            ] as [ViewMode, string, typeof Orbit][]
          ).map(([mode, label, Icon]) => {
            const isSel = viewMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`inline-flex h-7 items-center gap-1 rounded-lg px-2.5 font-mono text-[11px] font-semibold ${
                  isSel ? "btn-cool-primary" : "btn-cool-ghost"
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{label}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume animation" : "Pause animation"}
            title={paused ? "Resume animation" : "Pause animation"}
            className="btn-cool-ghost ml-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg"
          >
            {paused ? (
              <Play className="h-3 w-3 text-sky-400" />
            ) : (
              <Pause className="h-3 w-3 text-sky-400" />
            )}
          </button>
        </div>
      </div>

      {/* Animated D3 Visualization Canvas */}
      <div className="relative z-10 w-full px-2 py-2 sm:px-3">
        <svg
          ref={svgRef}
          style={{ touchAction: "pan-y" }}
          className="mx-auto block h-auto w-full select-none"
          role="img"
          aria-label={`Animated interactive skill mastery ${viewMode} graph covering ${totalSkills} production technologies`}
        />
      </div>

      {/* Fixed-Height Zero-Reflow Live Telemetry Bar */}
      <div className="relative z-10 flex h-[96px] flex-col justify-center gap-1 border-t border-white/[0.08] px-4 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() =>
              jumpToConstellation(
                focusedTargetRef.current.domainId,
                focusedTargetRef.current.skillQuery,
              )
            }
            title="Jump to this skill in Interactive Capability Constellation"
            className="group flex min-w-0 flex-1 items-center gap-2 rounded-lg py-0.5 text-left transition hover:opacity-90"
          >
            <span
              ref={dotRef}
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]"
            />
            <span
              ref={titleRef}
              className="min-w-0 truncate text-xs font-semibold text-white group-hover:underline sm:text-sm"
            >
              Laravel 12 · Languages &amp; Backend
            </span>
            <span
              ref={badgeRef}
              className="chip-accent hidden shrink-0 rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold @md:inline"
            >
              96% · 5.5+ yrs
            </span>
          </button>

          <button
            type="button"
            onClick={() => jumpToConstellation("all", "")}
            title="Jump to full Interactive Capability Constellation"
            className="btn-cool-ghost inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold text-sky-400"
          >
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span className="hidden @xl:inline">Capability Constellation</span>
            <span className="@xl:hidden">Full Map</span>
            <ArrowDownRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <p
          ref={detailRef}
          className="line-clamp-2 font-mono text-[11px] leading-[1.45] text-slate-400"
        >
          Enterprise APIs, AI SDK harness, 28 models &amp; 89 test suites
        </p>
      </div>
    </div>
  );
}
