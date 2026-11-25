"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import {
  GitBranch,
  Pause,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { skillGroups, type SkillGroup } from "../app/data";
import { useTheme } from "./ThemeProvider";

interface ConstellationNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  fullName: string;
  group: string;
  context: string;
  tier: "core" | "domain" | "skill";
  radius: number;
  color: string;
  anchorX: number;
  anchorY: number;
  phase: number;
  angle: number;
  skillCount?: number;
}

interface ConstellationLink extends d3.SimulationLinkDatum<ConstellationNode> {
  source: string | ConstellationNode;
  target: string | ConstellationNode;
  group: string;
  color: string;
  kind: "core" | "skill" | "synergy";
  synergyNote?: string;
}

const DOMAIN_COLORS_DARK: Record<SkillGroup["accent"], string> = {
  cyan: "#38bdf8",
  amber: "#fb923c",
  emerald: "#34d399",
  violet: "#a78bfa",
};

const DOMAIN_COLORS_LIGHT: Record<SkillGroup["accent"], string> = {
  cyan: "#0284c7",
  amber: "#d97706",
  emerald: "#059669",
  violet: "#7c3aed",
};

const SHORT_DOMAIN_LABELS: Record<string, string> = {
  backend: "Backend",
  "ai-llm": "AI & LLM",
  "system-design": "System Design",
  frontend: "Frontend",
  databases: "Databases",
  "cloud-testing": "Cloud & Ops",
};

function conciseSkillLabel(raw: string): string {
  const map: Record<string, string> = {
    "PHP 8.2 & Laravel 12": "Laravel 12",
    "Node.js & Express 5": "Node · Express 5",
    "TypeScript & ES6+": "TypeScript",
    "Socket.IO": "Socket.IO",
    BullMQ: "BullMQ",
    "Prisma ORM & Zod": "Prisma · Zod",
    "OAuth 2.0, JWT & Sanctum": "OAuth · JWT",
    "Golang (Basic)": "Golang",
    "Laravel AI SDK & LangChain": "Laravel AI SDK",
    "Hybrid RAG (RRF)": "Hybrid RAG",
    "Jina & OpenAI Embeddings": "Jina 1024d",
    "LLM Agents & Tool Calling": "LLM Agents",
    "Multi-LLM Routing": "Multi-LLM",
    "MCP (Model Context Protocol)": "MCP Protocol",
    "Prompt Guardrails & Grounding": "AI Guardrails",
    "Event-Driven Architecture": "Event-Driven",
    "Horizontal Scaling": "Horizontal Scale",
    "Multi-Tier Caching (LRU & ETag)": "LRU & ETag",
    "Rate Limiting & Backpressure": "Rate Limiting",
    "Concurrency Control": "Row Locking",
    "Zero-Trust RBAC & Resilience": "Zero-Trust RBAC",
    "Next.js 16 & React 19": "Next.js 16",
    "React Native 0.87": "React Native",
    "Zustand & Redux": "Zustand · Redux",
    "Tailwind CSS & NativeWind": "Tailwind CSS",
    "Electron.js": "Electron",
    "Bootstrap & jQuery": "Bootstrap",
    PostgreSQL: "PostgreSQL",
    "MySQL 8": "MySQL 8",
    Redis: "Redis",
    "Pinecone Serverless": "Pinecone",
    MongoDB: "MongoDB",
    "AWS (EC2, S3, RDS, CloudFront)": "AWS · S3 · CDN",
    "Nginx, Apache & Linux": "Nginx · Linux",
    "PM2 & Supervisor": "PM2 · Workers",
    "PHPUnit & Pest": "PHPUnit · Pest",
    "Vitest & Supertest": "Vitest · API",
    "Pino & Prometheus": "Pino · Prom",
    "Razorpay & Firebase FCM": "Razorpay · FCM",
    "Git, Bitbucket, JIRA & Postman": "Git · JIRA",
  };
  return map[raw] ?? raw.split(" (")[0];
}

const SYNERGY_DEFINITIONS: {
  from: string;
  to: string;
  fromLabel: string;
  toLabel: string;
  note: string;
}[] = [
  {
    from: "backend::PHP 8.2 & Laravel 12",
    to: "ai-llm::Laravel AI SDK & LangChain",
    fromLabel: "Laravel 12",
    toLabel: "Laravel AI SDK",
    note: "39-tool autonomous AI operations platform",
  },
  {
    from: "backend::PHP 8.2 & Laravel 12",
    to: "databases::MySQL 8",
    fromLabel: "Laravel 12",
    toLabel: "MySQL 8",
    note: "Composite indexes & row locking",
  },
  {
    from: "ai-llm::Hybrid RAG (RRF)",
    to: "databases::Pinecone Serverless",
    fromLabel: "Hybrid RAG",
    toLabel: "Pinecone",
    note: "1024-dim vector + MySQL Full-Text RRF",
  },
  {
    from: "backend::Node.js & Express 5",
    to: "databases::PostgreSQL",
    fromLabel: "Node · Express 5",
    toLabel: "PostgreSQL",
    note: "46-model schema & settlement ledger",
  },
  {
    from: "backend::Socket.IO",
    to: "databases::Redis",
    fromLabel: "Socket.IO",
    toLabel: "Redis",
    note: "Multi-node WebSocket Pub/Sub sync",
  },
  {
    from: "system-design::Multi-Tier Caching (LRU & ETag)",
    to: "databases::Redis",
    fromLabel: "LRU & ETag",
    toLabel: "Redis",
    note: "Two-tier cache with HTTP 304 ETag purge",
  },
  {
    from: "frontend::Next.js 16 & React 19",
    to: "backend::TypeScript & ES6+",
    fromLabel: "Next.js 16",
    toLabel: "TypeScript",
    note: "End-to-end strict type safety",
  },
  {
    from: "system-design::Horizontal Scaling",
    to: "cloud-testing::AWS (EC2, S3, RDS, CloudFront)",
    fromLabel: "Horizontal Scale",
    toLabel: "AWS · S3 · CDN",
    note: "Edge CloudFront CDN & stateless nodes",
  },
  {
    from: "cloud-testing::PHPUnit & Pest",
    to: "ai-llm::Laravel AI SDK & LangChain",
    fromLabel: "PHPUnit · Pest",
    toLabel: "Laravel AI SDK",
    note: "89 automated agent & RBAC test suites",
  },
];

function computeCurvedPath(
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  curveFactor: number,
) {
  const dx = tx - sx;
  const dy = ty - sy;
  const mx = (sx + tx) / 2;
  const my = (sy + ty) / 2;
  const nx = -dy * curveFactor;
  const ny = dx * curveFactor;
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${(mx + nx).toFixed(1)} ${(my + ny).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`;
}

function pointOnQuad(
  s: { x: number; y: number },
  c: { x: number; y: number },
  e: { x: number; y: number },
  t: number,
) {
  const inv = 1 - t;
  return {
    x: inv * inv * s.x + 2 * inv * t * c.x + t * t * e.x,
    y: inv * inv * s.y + 2 * inv * t * c.y + t * t * e.y,
  };
}

export function D3SkillsGraph({
  activeDomain,
  onSelectDomain,
}: {
  activeDomain: string;
  onSelectDomain: (id: string) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const svgRef = useRef<SVGSVGElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  // Direct DOM refs for zero-re-render, zero-layout-shift hover telemetry
  const hoverDotRef = useRef<HTMLSpanElement>(null);
  const hoverTitleRef = useRef<HTMLSpanElement>(null);
  const hoverContextRef = useRef<HTMLSpanElement>(null);
  const hoverSynergyRef = useRef<HTMLSpanElement>(null);
  const idleHintRef = useRef<HTMLSpanElement>(null);
  const activeTelemetryRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSynergies, setShowSynergies] = useState(true);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [simTick, setSimTick] = useState(0);
  const [focusPulse, setFocusPulse] = useState(false);
  const [viewportMode, setViewportMode] = useState<
    "mobile" | "tablet" | "desktop"
  >("desktop");

  useEffect(() => {
    let pulseTimer: number | undefined;
    const onFocusConstellation = (e: Event) => {
      const detail = (
        e as CustomEvent<{
          domainId?: string;
          skillQuery?: string;
          fromHero?: boolean;
        }>
      ).detail;
      if (!detail) return;
      if (typeof detail.domainId === "string") {
        onSelectDomain(detail.domainId);
      }
      if (typeof detail.skillQuery === "string") {
        setSearchQuery(detail.skillQuery);
      }
      setFocusPulse(true);
      if (pulseTimer) window.clearTimeout(pulseTimer);
      pulseTimer = window.setTimeout(() => setFocusPulse(false), 2400);
    };
    window.addEventListener(
      "portfolio:focus-constellation",
      onFocusConstellation,
    );
    return () => {
      if (pulseTimer) window.clearTimeout(pulseTimer);
      window.removeEventListener(
        "portfolio:focus-constellation",
        onFocusConstellation,
      );
    };
  }, [onSelectDomain]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Layout follows the panel's own width, not the window's
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setViewportMode(w < 560 ? "mobile" : w < 1000 ? "tablet" : "desktop");
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  const palette = isDark ? DOMAIN_COLORS_DARK : DOMAIN_COLORS_LIGHT;

  const totalSkillsCount = useMemo(
    () => skillGroups.reduce((sum, g) => sum + g.items.length, 0),
    [],
  );

  const searchMatchCount = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return 0;
    const perDomain = viewportMode === "mobile" ? 3 : 4;
    let count = 0;
    skillGroups.forEach((g) => {
      g.items.slice(0, perDomain).forEach((s) => {
        if (
          s.name.toLowerCase().includes(q) ||
          conciseSkillLabel(s.name).toLowerCase().includes(q) ||
          s.context.toLowerCase().includes(q) ||
          g.id.toLowerCase().includes(q)
        ) {
          count++;
        }
      });
    });
    return count;
  }, [searchQuery, viewportMode]);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const isMobile = viewportMode === "mobile";
    // Below desktop width the radial map is unreadable, so domains stack in
    // columns (2 on phones, 3 on tablets) with their skills listed underneath
    const isCompact = viewportMode !== "desktop";
    const skillsPerDomain = isMobile ? 3 : 4;
    const columns = isMobile ? 2 : 3;
    const rows = Math.ceil(skillGroups.length / columns);
    const hubTop = 150;
    const skillStart = 78;
    const skillStep = 28;
    const clusterDepth = skillStart + skillStep * (skillsPerDomain - 1);
    const rowPitch = clusterDepth + 62;

    const width = isMobile ? 340 : isCompact ? 720 : 1320;
    const height = isCompact
      ? hubTop + (rows - 1) * rowPitch + clusterDepth + 28
      : 600;
    const colWidth = width / columns;
    const cx = width / 2;
    const cy = height / 2;
    const coreY = isCompact ? 44 : cy;

    const hubRx = 248;
    const hubRy = 138;
    const skillRx = 448;
    const skillRy = 226;

    const compactPillWidth = (label: string) =>
      Math.round(label.length * 6.7 + 16);

    const colors = isDark ? DOMAIN_COLORS_DARK : DOMAIN_COLORS_LIGHT;
    const query = searchQuery.trim().toLowerCase();

    const nodes: ConstellationNode[] = [
      {
        id: "core",
        label: "MS",
        fullName: "Mohd Sufiyan · Systems Architecture",
        group: "all",
        context:
          "5.5+ years across Laravel 12, Node.js/Express 5, Next.js 16, React Native & Hybrid RAG AI",
        tier: "core",
        radius: isCompact ? 28 : 34,
        color: isDark ? "#38bdf8" : "#0284c7",
        anchorX: cx,
        anchorY: coreY,
        fx: cx,
        fy: coreY,
        x: cx,
        y: coreY,
        phase: 0,
        angle: 0,
      },
    ];

    const links: ConstellationLink[] = [];

    const degToRad = (deg: number) => (deg * Math.PI) / 180;
    const desktopOffsetsDeg = [-21, -7, 7, 21];

    skillGroups.forEach((group, gIdx) => {
      const color = colors[group.accent];
      const baseAngleDeg = gIdx * 60 - 60;
      const baseAngle = degToRad(baseAngleDeg);
      const colX = colWidth * ((gIdx % columns) + 0.5);
      const hx = isCompact ? colX : cx + Math.cos(baseAngle) * hubRx;
      const hy = isCompact
        ? hubTop + Math.floor(gIdx / columns) * rowPitch
        : cy + Math.sin(baseAngle) * hubRy;
      const domainId = `domain::${group.id}`;

      nodes.push({
        id: domainId,
        label: SHORT_DOMAIN_LABELS[group.id] ?? group.title,
        fullName: group.title,
        group: group.id,
        context: group.subtitle,
        tier: "domain",
        radius: isCompact ? 19 : 23,
        color,
        anchorX: hx,
        anchorY: hy,
        x: hx,
        y: hy,
        phase: gIdx * 1.15,
        angle: baseAngle,
        skillCount: group.items.length,
      });

      links.push({
        source: "core",
        target: domainId,
        group: group.id,
        color,
        kind: "core",
      });

      const sliceSkills = group.items.slice(0, skillsPerDomain);
      // Ensure any searched/clicked skill outside the initial slice is always visible
      if (query) {
        const extraMatches = group.items.slice(skillsPerDomain).filter((s) => {
          const short = conciseSkillLabel(s.name).toLowerCase();
          return (
            short.includes(query) ||
            s.name.toLowerCase().includes(query) ||
            s.context.toLowerCase().includes(query)
          );
        });
        extraMatches.forEach((matchItem, mIdx) => {
          const replaceIdx = sliceSkills.length - 1 - mIdx;
          if (replaceIdx >= 0) {
            sliceSkills[replaceIdx] = matchItem;
          }
        });
      }
      sliceSkills.forEach((skill, sIdx) => {
        const offsetDeg = desktopOffsetsDeg[sIdx] ?? 0;
        const skillAngle = degToRad(baseAngleDeg + offsetDeg);
        // Compact: dots share one rail, with the widest row centred in the column
        const rowWidth =
          Math.max(
            ...sliceSkills.map((s) =>
              compactPillWidth(conciseSkillLabel(s.name)),
            ),
          ) + 16;
        const sx = isCompact
          ? colX - rowWidth / 2 + 5
          : cx + Math.cos(skillAngle) * skillRx;
        const sy = isCompact
          ? hy + skillStart + sIdx * skillStep
          : cy + Math.sin(skillAngle) * skillRy;
        const skillId = `${group.id}::${skill.name}`;

        nodes.push({
          id: skillId,
          label: conciseSkillLabel(skill.name),
          fullName: skill.name,
          group: group.id,
          context: skill.context,
          tier: "skill",
          radius: isCompact ? 5 : 7.2,
          color,
          anchorX: sx,
          anchorY: sy,
          x: sx,
          y: sy,
          phase: gIdx * 1.25 + sIdx * 0.9,
          angle: skillAngle,
        });

        links.push({
          source: domainId,
          target: skillId,
          group: group.id,
          color,
          kind: "skill",
        });
      });
    });

    const nodeLookup = new Map(nodes.map((n) => [n.id, n]));

    if (showSynergies) {
      SYNERGY_DEFINITIONS.forEach((syn) => {
        if (nodeLookup.has(syn.from) && nodeLookup.has(syn.to)) {
          links.push({
            source: syn.from,
            target: syn.to,
            group: "synergy",
            color: isDark ? "#38bdf8" : "#0284c7",
            kind: "synergy",
            synergyNote: syn.note,
          });
        }
      });
    }

    const resolveNode = (
      ref: string | ConstellationNode | undefined,
    ): ConstellationNode | undefined => {
      if (!ref) return undefined;
      return typeof ref === "string" ? nodeLookup.get(ref) : ref;
    };

    const matchesSearch = (n: ConstellationNode | undefined): boolean => {
      if (!n) return false;
      if (!query) return true;
      if (n.tier === "core") return false;
      return (
        n.label.toLowerCase().includes(query) ||
        n.fullName.toLowerCase().includes(query) ||
        n.context.toLowerCase().includes(query) ||
        n.group.toLowerCase().includes(query)
      );
    };

    const isNodeHighlighted = (n: ConstellationNode) => {
      if (query) return n.tier === "core" || matchesSearch(n);
      if (activeDomain === "all" || n.tier === "core") return true;
      return n.group === activeDomain;
    };

    // Imperative zero-reflow telemetry updater (no React re-render on hover!)
    const showHoverTelemetry = (d: ConstellationNode | null) => {
      const idleEl = idleHintRef.current;
      const activeEl = activeTelemetryRef.current;
      if (!idleEl || !activeEl) return;

      if (!d) {
        idleEl.style.display = "inline";
        activeEl.style.display = "none";
        return;
      }

      idleEl.style.display = "none";
      activeEl.style.display = "flex";

      if (hoverDotRef.current) {
        hoverDotRef.current.style.backgroundColor = d.color;
        hoverDotRef.current.style.boxShadow = `0 0 10px ${d.color}`;
      }
      if (hoverTitleRef.current) {
        hoverTitleRef.current.textContent = d.fullName;
      }
      if (hoverContextRef.current) {
        hoverContextRef.current.textContent = d.context;
      }
      if (hoverSynergyRef.current) {
        const syn = SYNERGY_DEFINITIONS.find(
          (s) =>
            s.from === d.id ||
            s.to === d.id ||
            (d.tier === "domain" &&
              (s.from.startsWith(`${d.group}::`) ||
                s.to.startsWith(`${d.group}::`))),
        );
        if (syn) {
          hoverSynergyRef.current.textContent = `${syn.fromLabel} ↔ ${syn.toLabel}`;
          hoverSynergyRef.current.style.display = "inline-flex";
        } else {
          hoverSynergyRef.current.style.display = "none";
        }
      }
    };

    // Identify pointed node(s) when searching or filtering a domain so we visibly lock onto them
    const pointedNodes = query
      ? nodes.filter((n) => n.tier === "skill" && matchesSearch(n))
      : activeDomain !== "all"
        ? nodes.filter((n) => n.tier === "domain" && n.group === activeDomain)
        : [];
    const primaryPointed =
      pointedNodes.find((n) => n.group === activeDomain) ?? pointedNodes[0] ?? null;

    // Immediately show telemetry for the pointed node (or idle hint when showing full map)
    showHoverTelemetry(primaryPointed);

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const defs = svg.append("defs");

    const glow = defs
      .append("filter")
      .attr("id", "constellation-glow")
      .attr("x", "-60%")
      .attr("y", "-60%")
      .attr("width", "220%")
      .attr("height", "220%");
    glow
      .append("feGaussianBlur")
      .attr("stdDeviation", isDark ? "4.2" : "2.2")
      .attr("result", "blur");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const coreGrad = defs
      .append("radialGradient")
      .attr("id", "constellation-core-grad")
      .attr("cx", "32%")
      .attr("cy", "30%");
    coreGrad
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", isDark ? "#e0f2fe" : "#7dd3fc");
    coreGrad
      .append("stop")
      .attr("offset", "52%")
      .attr("stop-color", isDark ? "#38bdf8" : "#0284c7");
    coreGrad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", isDark ? "#0369a1" : "#0c4a6e");

    const auraGrad = defs
      .append("radialGradient")
      .attr("id", "constellation-aura");
    auraGrad
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", isDark ? "#38bdf8" : "#0284c7")
      .attr("stop-opacity", isDark ? 0.22 : 0.16);
    auraGrad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", isDark ? "#38bdf8" : "#0284c7")
      .attr("stop-opacity", 0);

    const sceneGroup = svg
      .append("g")
      .attr(
        "transform",
        `translate(${cx}, ${coreY}) scale(${zoom}) translate(${-cx}, ${-coreY})`,
      );

    // Architectural orbital rings & sector spokes
    const guideLayer = sceneGroup.append("g").attr("fill", "none");
    guideLayer
      .append("circle")
      .attr("cx", cx)
      .attr("cy", coreY)
      .attr("r", isCompact ? 102 : 155)
      .attr("fill", "url(#constellation-aura)");

    const rings = isCompact
      ? []
      : [
          { rx: hubRx, ry: hubRy, op: isDark ? 0.22 : 0.3, dash: "4 8" },
          { rx: skillRx, ry: skillRy, op: isDark ? 0.13 : 0.2, dash: "2 10" },
        ];

    rings.forEach((ring) => {
      guideLayer
        .append("ellipse")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("rx", ring.rx)
        .attr("ry", ring.ry)
        .attr("stroke", isDark ? "#38bdf8" : "#0284c7")
        .attr("stroke-dasharray", ring.dash)
        .attr("stroke-opacity", ring.op)
        .attr("stroke-width", 1.1);
    });

    (isCompact ? [] : skillGroups).forEach((group, idx) => {
      const ang = degToRad(idx * 60 - 60);
      guideLayer
        .append("line")
        .attr("x1", cx)
        .attr("y1", cy)
        .attr("x2", cx + Math.cos(ang) * (skillRx * 1.02))
        .attr("y2", cy + Math.sin(ang) * (skillRy * 1.02))
        .attr("stroke", colors[group.accent])
        .attr("stroke-opacity", isDark ? 0.08 : 0.14)
        .attr("stroke-dasharray", "2 8");
    });

    const synergyLayer = sceneGroup.append("g").attr("fill", "none");
    const linkLayer = sceneGroup
      .append("g")
      .attr("fill", "none")
      .attr("stroke-linecap", "round");
    const pulseLayer = sceneGroup.append("g");
    const nodeLayer = sceneGroup.append("g");

    const coreAndSkillLinks = links.filter((l) => l.kind !== "synergy");
    const synergyLinks = links.filter((l) => l.kind === "synergy");

    const synergySel = synergyLayer
      .selectAll<SVGPathElement, ConstellationLink>("path")
      .data(synergyLinks)
      .join("path")
      .attr("stroke", isDark ? "#38bdf8" : "#0284c7")
      .attr("stroke-width", 1.25)
      .attr("stroke-dasharray", "4 6")
      .style("transition", "stroke-opacity 180ms ease, stroke-width 180ms ease")
      .attr("stroke-opacity", (d) => {
        if (query) {
          const s = resolveNode(d.source);
          const t = resolveNode(d.target);
          return matchesSearch(s) || matchesSearch(t) ? 0.85 : 0.07;
        }
        return activeDomain === "all" ? (isDark ? 0.22 : 0.3) : 0.14;
      });

    const linkSel = linkLayer
      .selectAll<SVGPathElement, ConstellationLink>("path")
      .data(coreAndSkillLinks)
      .join("path")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", (d) => (d.kind === "core" ? 2.2 : 1.4))
      .attr("stroke-opacity", (d) => {
        if (query) {
          const s = resolveNode(d.source);
          const t = resolveNode(d.target);
          return matchesSearch(s) || matchesSearch(t) ? 0.9 : 0.08;
        }
        if (activeDomain === "all") {
          return d.kind === "core"
            ? isDark
              ? 0.62
              : 0.6
            : isDark
              ? 0.38
              : 0.42;
        }
        return d.group === activeDomain ? 0.88 : 0.09;
      });

    const pulseLinks = coreAndSkillLinks.filter(
      (l) =>
        l.kind === "core" || (activeDomain !== "all" && l.group === activeDomain),
    );
    const pulseDots = pulseLayer
      .selectAll<SVGCircleElement, ConstellationLink>("circle")
      .data(pulseLinks)
      .join("circle")
      .attr("r", (d) => (d.kind === "core" ? 3.5 : 2.6))
      .attr("fill", (d) => d.color)
      .attr("filter", "url(#constellation-glow)")
      .attr("opacity", (d) => {
        if (query) return 0.15;
        return activeDomain === "all" || d.group === activeDomain ? 0.95 : 0.1;
      });

    const nodeSel = nodeLayer
      .selectAll<SVGGElement, ConstellationNode>("g")
      .data(nodes)
      .join("g")
      .style("cursor", (d) =>
        d.tier === "core" || isCompact ? "pointer" : "grab",
      )
      .attr("opacity", (d) => (isNodeHighlighted(d) ? 1 : 0.18));

    // Generous invisible pointer hit target on skill dots to eliminate edge-hover flicker
    nodeSel
      .filter((d) => d.tier === "skill")
      .append("circle")
      .attr("r", 15)
      .attr("fill", "transparent");

    // Rotating dual compass rings around Core
    const coreSel = nodeSel.filter((d) => d.tier === "core");
    const coreOuterRing = coreSel
      .append("circle")
      .attr("r", (d) => d.radius + 14)
      .attr("fill", "none")
      .attr(
        "stroke",
        isDark ? "rgba(56, 189, 248, 0.48)" : "rgba(2, 132, 199, 0.5)",
      )
      .attr("stroke-width", 1.3)
      .attr("stroke-dasharray", "10 8");

    const coreInnerRing = coreSel
      .append("circle")
      .attr("r", (d) => d.radius + 7)
      .attr(
        "fill",
        isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.09)",
      )
      .attr(
        "stroke",
        isDark ? "rgba(34, 211, 238, 0.5)" : "rgba(8, 145, 178, 0.48)",
      )
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 6");

    // Outer radar ring for Domain Hubs
    const domainSel = nodeSel.filter((d) => d.tier === "domain");
    domainSel
      .append("circle")
      .attr("r", (d) => d.radius + 6)
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-opacity", (d) => (activeDomain === d.group ? 0.8 : 0.28))
      .attr("stroke-width", (d) => (activeDomain === d.group ? 1.8 : 1.1))
      .attr("stroke-dasharray", "5 5");

    // Animated pulsing target beacon ring on pointed skill or active domain
    const pointedIdSet = new Set(pointedNodes.map((n) => n.id));
    const beaconSel = nodeSel
      .filter((d) => pointedIdSet.has(d.id))
      .append("circle")
      .attr("class", "target-beacon")
      .attr("r", (d) => d.radius + 10)
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 2.2)
      .attr("stroke-opacity", 0.9)
      .style("pointer-events", "none");

    // Main orb circle (uses CSS transform scale instead of mutating r to prevent pointer flicker)
    nodeSel
      .append("circle")
      .attr("class", "main-dot")
      .attr("r", (d) => d.radius)
      .style("transition", "transform 160ms ease, stroke-width 160ms ease")
      .style("transform-box", "fill-box")
      .style("transform-origin", "center")
      .attr("fill", (d) =>
        d.tier === "core"
          ? "url(#constellation-core-grad)"
          : d.tier === "domain"
            ? isDark
              ? "#081226"
              : "#ffffff"
            : d.color,
      )
      .attr("stroke", (d) =>
        d.tier === "skill" && query && matchesSearch(d)
          ? isDark
            ? "#ffffff"
            : "#0f172a"
          : d.color,
      )
      .attr("stroke-width", (d) =>
        d.tier === "core"
          ? 2.4
          : d.tier === "domain"
            ? activeDomain === d.group
              ? 2.8
              : 2.1
            : query && matchesSearch(d)
              ? 2.5
              : 1.4,
      )
      .attr("filter", (d) =>
        d.tier !== "skill" ? "url(#constellation-glow)" : null,
      );

    // Core initials + crisp name badge
    coreSel
      .append("text")
      .text("MS")
      .attr("text-anchor", "middle")
      .attr("dy", "0.36em")
      .attr("fill", isDark ? "#03101e" : "#ffffff")
      .attr("font-size", isCompact ? "14px" : "18px")
      .attr("font-weight", "800")
      .attr("letter-spacing", "0.04em")
      .attr("font-family", "var(--font-mono), monospace")
      .style("pointer-events", "none");

    coreSel
      .append("rect")
      .attr("x", -58)
      .attr("y", (d) => d.radius + 9)
      .attr("width", 116)
      .attr("height", 23)
      .attr("rx", 11.5)
      .attr(
        "fill",
        isDark ? "rgba(5, 11, 24, 0.95)" : "rgba(255, 255, 255, 0.98)",
      )
      .attr(
        "stroke",
        isDark ? "rgba(56, 189, 248, 0.55)" : "rgba(2, 132, 199, 0.55)",
      )
      .attr("stroke-width", 1.15);

    coreSel
      .append("text")
      .text("Mohd Sufiyan")
      .attr("text-anchor", "middle")
      .attr("y", (d) => d.radius + 24)
      .attr("fill", isDark ? "#f8fafc" : "#0f172a")
      .attr("font-size", "11.5px")
      .attr("font-weight", "700")
      .attr("font-family", "var(--font-mono), monospace")
      .style("pointer-events", "none");

    // Domain Hub skill count + crisp label pill
    domainSel
      .append("text")
      .text((d) => String(d.skillCount ?? 0))
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", (d) => d.color)
      .attr("font-size", "13px")
      .attr("font-weight", "800")
      .attr("font-family", "var(--font-mono), monospace")
      .style("pointer-events", "none");

    domainSel
      .append("rect")
      .attr("x", (d) => -(d.label.length * 4.0 + 14))
      .attr("y", (d) => d.radius + 8)
      .attr("width", (d) => d.label.length * 8.0 + 28)
      .attr("height", 24)
      .attr("rx", 12)
      .attr("fill", (d) =>
        activeDomain === d.group
          ? d.color
          : isDark
            ? "rgba(6, 13, 27, 0.95)"
            : "rgba(255, 255, 255, 0.98)",
      )
      .attr("stroke", (d) => d.color)
      .attr("stroke-opacity", 0.72)
      .attr("stroke-width", 1.15);

    domainSel
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("y", (d) => d.radius + 23.5)
      .attr("fill", (d) =>
        activeDomain === d.group
          ? isDark
            ? "#03101e"
            : "#ffffff"
          : isDark
            ? "#f8fafc"
            : "#0f172a",
      )
      .attr("font-size", "11.5px")
      .attr("font-weight", "700")
      .attr("font-family", "var(--font-mono), monospace")
      .style("pointer-events", "none");

    // Non-overlapping outward radial pill placement
    const skillSel = nodeSel.filter((d) => d.tier === "skill");

    const skillPillLayout = (d: ConstellationNode) => {
      if (isCompact) {
        const pillW = compactPillWidth(d.label);
        const rectX = 11;
        return {
          rectX,
          rectY: -11.5,
          pillW,
          pillH: 23,
          textX: rectX + pillW / 2,
          textY: 3.8,
        };
      }

      const cosA = Math.cos(d.angle);
      const sinA = Math.sin(d.angle);
      const pillW = Math.round(d.label.length * 7.2 + 20);
      const pillH = 23;

      if (Math.abs(cosA) >= 0.2) {
        const isRight = cosA > 0;
        const rectX = isRight ? d.radius + 9 : -(d.radius + 9 + pillW);
        const rectY = -pillH / 2;
        return {
          rectX,
          rectY,
          pillW,
          pillH,
          textX: rectX + pillW / 2,
          textY: 3.8,
        };
      }

      const isRightSide = cosA >= 0;
      const isBottom = sinA >= 0;
      const rectX = isRightSide ? -12 : -(pillW - 12);
      const rectY = isBottom ? d.radius + 7 : -(d.radius + 7 + pillH);
      return {
        rectX,
        rectY,
        pillW,
        pillH,
        textX: rectX + pillW / 2,
        textY: rectY + pillH / 2 + 3.7,
      };
    };

    skillSel
      .append("rect")
      .attr("class", "skill-pill")
      .attr("x", (d) => skillPillLayout(d).rectX)
      .attr("y", (d) => skillPillLayout(d).rectY)
      .attr("width", (d) => skillPillLayout(d).pillW)
      .attr("height", (d) => skillPillLayout(d).pillH)
      .attr("rx", 11.5)
      .style("transition", "stroke 150ms ease, stroke-width 150ms ease")
      .attr("fill", (d) =>
        query && matchesSearch(d)
          ? isDark
            ? "rgba(56, 189, 248, 0.24)"
            : "#e0f2fe"
          : isDark
            ? "rgba(8, 15, 30, 0.94)"
            : "rgba(255, 255, 255, 0.98)",
      )
      .attr("stroke", (d) =>
        query && matchesSearch(d)
          ? d.color
          : isDark
            ? "rgba(148, 163, 184, 0.3)"
            : "rgba(15, 23, 42, 0.16)",
      )
      .attr("stroke-width", (d) => (query && matchesSearch(d) ? 1.6 : 1));

    skillSel
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("x", (d) => skillPillLayout(d).textX)
      .attr("y", (d) => skillPillLayout(d).textY)
      .attr("fill", isDark ? "#e2e8f0" : "#0f172a")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("font-family", "var(--font-mono), monospace")
      .style("pointer-events", "none");

    const simulation = d3
      .forceSimulation<ConstellationNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<ConstellationNode, ConstellationLink>(coreAndSkillLinks)
          .id((d) => d.id)
          // Link pull would crowd the stacked compact rows
          .strength(isCompact ? 0 : 0.05),
      )
      .force("x", d3.forceX<ConstellationNode>((d) => d.anchorX).strength(0.84))
      .force("y", d3.forceY<ConstellationNode>((d) => d.anchorY).strength(0.84))
      .velocityDecay(0.42)
      .alphaDecay(0.04);

    const padX = isCompact ? 12 : 158;
    const clampX = (x: number) => Math.max(padX, Math.min(width - padX, x));
    // Compact rows run close to the bottom edge, so they need less padding
    const padY = isCompact ? 14 : 44;
    const clampY = (y: number) => Math.max(44, Math.min(height - padY, y));

    const drag = d3
      .drag<SVGGElement, ConstellationNode>()
      .filter((event) => !event.ctrlKey && event.button === 0)
      .on("start", (event, d) => {
        if (d.tier === "core") return;
        if (!event.active) simulation.alphaTarget(0.25).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        if (d.tier === "core") return;
        d.fx = clampX(event.x);
        d.fy = clampY(event.y);
      })
      .on("end", (event, d) => {
        if (d.tier === "core") return;
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    // Dragging would swallow touch scrolling on the compact layout
    if (!isCompact) nodeSel.call(drag);

    const applyRestingSynergies = () => {
      if (primaryPointed) {
        synergySel
          .attr("stroke-opacity", (l) => {
            const s = resolveNode(l.source)?.id ?? "";
            const t = resolveNode(l.target)?.id ?? "";
            if (
              primaryPointed.tier === "skill" &&
              (s === primaryPointed.id || t === primaryPointed.id)
            ) {
              return 0.92;
            }
            if (
              primaryPointed.tier === "domain" &&
              (s.startsWith(`${primaryPointed.group}::`) ||
                t.startsWith(`${primaryPointed.group}::`))
            ) {
              return 0.68;
            }
            return isDark ? 0.1 : 0.14;
          })
          .attr("stroke-width", (l) => {
            const s = resolveNode(l.source)?.id ?? "";
            const t = resolveNode(l.target)?.id ?? "";
            return s === primaryPointed.id || t === primaryPointed.id ? 2.1 : 1.15;
          });
      } else {
        synergySel
          .attr(
            "stroke-opacity",
            activeDomain === "all" ? (isDark ? 0.22 : 0.3) : 0.14,
          )
          .attr("stroke-width", 1.25);
      }
    };

    applyRestingSynergies();

    // Zero-reflow, zero-re-render hover interactions
    nodeSel
      .on("mouseenter", function (_event, d) {
        if (d.tier === "skill") {
          d3.select(this)
            .select("circle.main-dot")
            .style("transform", "scale(1.38)")
            .attr("stroke", isDark ? "#ffffff" : "#0f172a");
          d3.select(this)
            .select("rect.skill-pill")
            .attr("stroke", d.color)
            .attr("stroke-width", 1.7);
        }
        synergySel
          .attr("stroke-opacity", (l) => {
            const s = resolveNode(l.source)?.id ?? "";
            const t = resolveNode(l.target)?.id ?? "";
            if (d.tier === "skill" && (s === d.id || t === d.id)) return 0.94;
            if (
              d.tier === "domain" &&
              (s.startsWith(`${d.group}::`) || t.startsWith(`${d.group}::`))
            ) {
              return 0.7;
            }
            return isDark ? 0.1 : 0.14;
          })
          .attr("stroke-width", (l) => {
            const s = resolveNode(l.source)?.id ?? "";
            const t = resolveNode(l.target)?.id ?? "";
            return s === d.id || t === d.id ? 2.2 : 1.15;
          });
        showHoverTelemetry(d);
      })
      .on("mouseleave", function (_event, d) {
        if (d.tier === "skill") {
          d3.select(this)
            .select("circle.main-dot")
            .style("transform", "scale(1)")
            .attr("stroke", d.color);
          d3.select(this)
            .select("rect.skill-pill")
            .attr(
              "stroke",
              query && matchesSearch(d)
                ? d.color
                : isDark
                  ? "rgba(148, 163, 184, 0.3)"
                  : "rgba(15, 23, 42, 0.16)",
            )
            .attr("stroke-width", query && matchesSearch(d) ? 1.6 : 1);
        }
        applyRestingSynergies();
        showHoverTelemetry(primaryPointed);
      })
      .on("click", (_event, d) => {
        if (d.tier === "core") {
          onSelectDomain("all");
        } else if (d.tier === "domain") {
          onSelectDomain(d.group === activeDomain ? "all" : d.group);
        } else {
          onSelectDomain(d.group);
        }
      });

    let floatPhase = 0;

    const getPos = (n: ConstellationNode) => {
      const bx = clampX(n.x ?? n.anchorX);
      const by = clampY(n.y ?? n.anchorY);
      if (n.tier === "core" || n.fx != null) return { x: bx, y: by };
      const amp = n.tier === "domain" ? 1.8 : 2.3;
      return {
        x: bx + Math.cos(floatPhase + n.phase) * amp,
        y: by + Math.sin(floatPhase * 1.12 + n.phase) * amp,
      };
    };

    // Quadratic control point for a hub or skill link
    const linkControl = (
      kind: ConstellationLink["kind"],
      s: { x: number; y: number },
      t: { x: number; y: number },
      i: number,
    ) => {
      if (isCompact && kind === "core") {
        // Run down the central gutter, then branch out to the hub
        const middleColumn = Math.abs(t.x - cx) < colWidth / 4;
        if (!middleColumn) return { x: cx, y: t.y };
        return t.y > hubTop + rowPitch / 2
          ? { x: cx + colWidth, y: (s.y + t.y) / 2 }
          : { x: cx, y: (s.y + t.y) / 2 };
      }
      // Compact skill links drop down the rail beside the pills
      if (isCompact) return { x: t.x, y: s.y };
      const bend =
        (kind === "core" ? 0.065 : 0.095) * (i % 2 === 0 ? 1 : -1);
      return {
        x: (s.x + t.x) / 2 - (t.y - s.y) * bend,
        y: (s.y + t.y) / 2 + (t.x - s.x) * bend,
      };
    };

    const renderFrame = () => {
      const posMap = new Map<string, { x: number; y: number }>();
      nodes.forEach((n) => posMap.set(n.id, getPos(n)));

      linkSel.attr("d", (d, i) => {
        const sId = resolveNode(d.source)?.id ?? "";
        const tId = resolveNode(d.target)?.id ?? "";
        const s = posMap.get(sId) ?? { x: cx, y: cy };
        const t = posMap.get(tId) ?? { x: cx, y: cy };
        const c = linkControl(d.kind, s, t, i);
        return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} Q ${c.x.toFixed(1)} ${c.y.toFixed(1)} ${t.x.toFixed(1)} ${t.y.toFixed(1)}`;
      });

      synergySel.attr("d", (d, i) => {
        const sId = resolveNode(d.source)?.id ?? "";
        const tId = resolveNode(d.target)?.id ?? "";
        const s = posMap.get(sId) ?? { x: cx, y: cy };
        const t = posMap.get(tId) ?? { x: cx, y: cy };
        return computeCurvedPath(s.x, s.y, t.x, t.y, i % 2 === 0 ? 0.15 : -0.15);
      });

      nodeSel.attr("transform", (d) => {
        const p = posMap.get(d.id) ?? { x: cx, y: cy };
        return `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`;
      });

      const deg = (floatPhase * 18) % 360;
      coreOuterRing.attr("transform", `rotate(${deg.toFixed(1)})`);
      coreInnerRing.attr("transform", `rotate(${(-deg * 1.4).toFixed(1)})`);

      if (!beaconSel.empty()) {
        const pulse = (floatPhase * 0.72) % 1;
        beaconSel
          .attr("r", (d) => (d.radius + 7 + pulse * 18).toFixed(1))
          .attr("stroke-opacity", ((1 - pulse) * 0.92).toFixed(3));
      }

      pulseDots.each(function (d, i) {
        const sId = resolveNode(d.source)?.id ?? "";
        const tId = resolveNode(d.target)?.id ?? "";
        const s = posMap.get(sId) ?? { x: cx, y: cy };
        const t = posMap.get(tId) ?? { x: cx, y: cy };
        const progress = (floatPhase * 0.28 + i * 0.19) % 1;
        const pt = pointOnQuad(s, linkControl(d.kind, s, t, i), t, progress);
        d3.select(this).attr("cx", pt.x.toFixed(1)).attr("cy", pt.y.toFixed(1));
      });
    };

    simulation.on("tick", renderFrame);

    let rafId = 0;
    let visible = true;
    let last = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible && !document.hidden && !paused) {
        floatPhase += dt * 0.95;
        renderFrame();
      }
      rafId = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    if (hostRef.current) io.observe(hostRef.current);

    renderFrame();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      simulation.stop();
    };
  }, [
    activeDomain,
    onSelectDomain,
    simTick,
    viewportMode,
    isDark,
    searchQuery,
    showSynergies,
    paused,
    zoom,
  ]);

  return (
    <div
      id="capability-constellation"
      ref={hostRef}
      className={`glass-panel relative scroll-mt-24 overflow-hidden rounded-3xl transition-shadow duration-500 ${
        focusPulse
          ? "ring-2 ring-sky-400/75 shadow-[0_0_52px_rgba(56,189,248,0.24)]"
          : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[110px]"
      />

      {/* Top Toolbar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="chip-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-xl">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white">
              Interactive Capability Constellation
            </div>
            <div className="hidden font-mono text-[11px] text-slate-400 sm:block">
              {skillGroups.length} domains · {totalSkillsCount} production
              skills · Drag, search, or click clusters to filter
            </div>
          </div>
        </div>

        {/* Search + Interactive Controls */}
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <label
            htmlFor="skill-spotlight-search"
            className={`search-field-shell h-10 min-w-0 basis-full rounded-xl pl-1.5 pr-2.5 sm:basis-auto ${
              searchQuery.trim() ? "search-field-active" : ""
            }`}
          >
            <span className="search-field-icon h-7 w-7 shrink-0">
              <Search className="h-3.5 w-3.5" />
            </span>
            <input
              id="skill-spotlight-search"
              name="skillSearch"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Spotlight skill (Redis, RAG)..."
              aria-label="Search skills in capability map"
              className="search-field-input w-full min-w-0 text-xs font-medium sm:w-52"
            />
            {searchQuery.trim() && (
              <span
                className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                  searchMatchCount > 0 ? "chip-emerald" : "chip-amber"
                }`}
              >
                {searchMatchCount}
              </span>
            )}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear skill search"
                className="search-field-clear h-5 w-5 shrink-0"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </label>

          <button
            type="button"
            onClick={() => setShowSynergies((v) => !v)}
            className={`inline-flex h-9 items-center gap-1.5 rounded-xl px-3 font-mono text-xs font-semibold ${
              showSynergies ? "btn-cool-primary" : "btn-cool-ghost"
            }`}
            title="Toggle cross-domain architectural synergy arcs"
          >
            <GitBranch className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Synergies</span>
          </button>

          <div className="hidden items-center gap-1 sm:flex">
            <button
              type="button"
              onClick={() =>
                setZoom((z) => Number(Math.max(0.85, z - 0.1).toFixed(2)))
              }
              aria-label="Zoom out skill map"
              className="btn-cool-ghost inline-flex h-9 w-9 items-center justify-center rounded-xl"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setZoom((z) => Number(Math.min(1.25, z + 0.1).toFixed(2)))
              }
              aria-label="Zoom in skill map"
              className="btn-cool-ghost inline-flex h-9 w-9 items-center justify-center rounded-xl"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={
              paused ? "Resume orbit animation" : "Pause orbit animation"
            }
            className="btn-cool-ghost inline-flex h-9 w-9 items-center justify-center rounded-xl"
            title={paused ? "Resume live orbit" : "Pause live orbit"}
          >
            {paused ? (
              <Play className="h-3.5 w-3.5 text-sky-400" />
            ) : (
              <Pause className="h-3.5 w-3.5 text-sky-400" />
            )}
          </button>

          <button
            type="button"
            aria-label="Reset capability constellation"
            onClick={() => {
              setZoom(1);
              setSearchQuery("");
              onSelectDomain("all");
              setSimTick((t) => t + 1);
            }}
            className="btn-cool-ghost inline-flex h-9 items-center gap-1.5 rounded-xl px-3 font-mono text-xs font-medium"
          >
            <RotateCcw className="h-3.5 w-3.5 text-sky-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Quick Domain Filter Strip */}
      <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto border-b border-white/[0.06] px-4 py-2.5 sm:flex-wrap sm:px-6">
        <button
          type="button"
          onClick={() => onSelectDomain("all")}
          className={`shrink-0 rounded-lg px-3 py-1 font-mono text-xs font-semibold ${
            activeDomain === "all" ? "btn-cool-primary" : "btn-cool-ghost"
          }`}
        >
          All ({totalSkillsCount})
        </button>
        {skillGroups.map((g) => {
          const isSel = activeDomain === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelectDomain(isSel ? "all" : g.id)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-xs font-semibold ${
                isSel ? "btn-cool-primary" : "btn-cool-ghost"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: isSel ? "currentColor" : palette[g.accent],
                }}
              />
              {SHORT_DOMAIN_LABELS[g.id] ?? g.title}
              <span className="opacity-70">({g.items.length})</span>
            </button>
          );
        })}
      </div>

      {/* Full-Width Responsive Constellation Canvas */}
      <div className="relative z-10 w-full px-2 py-2 sm:px-4 sm:py-3">
        <svg
          ref={svgRef}
          style={{ touchAction: "pan-y" }}
          className="mx-auto block h-auto max-h-[680px] w-full select-none"
          role="img"
          aria-label="Full-width interactive capability constellation mapping Mohd Sufiyan's engineering domains, production skills, and cross-domain integrations"
        />
      </div>

      {/* Fixed-Height Zero-Reflow Hover Telemetry Bar (No scroll jump / flicker!) */}
      <div className="relative z-10 flex h-[50px] items-center justify-between gap-3 overflow-hidden border-t border-white/[0.08] px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center">
          <span
            ref={idleHintRef}
            className="truncate font-mono text-xs text-slate-400"
          >
            {viewportMode === "desktop"
              ? "Hover any node to inspect production details · Click any domain hub to filter the skills above"
              : "Tap any node for details"}
          </span>

          <div
            ref={activeTelemetryRef}
            style={{ display: "none" }}
            className="min-w-0 flex-1 items-center gap-2.5 overflow-hidden"
          >
            <span
              ref={hoverDotRef}
              className="h-2.5 w-2.5 shrink-0 rounded-full"
            />
            <span
              ref={hoverTitleRef}
              className="min-w-0 truncate font-mono text-xs font-semibold text-white"
            />
            <span className="hidden text-slate-500 sm:inline">·</span>
            <span
              ref={hoverContextRef}
              className="hidden truncate text-xs text-slate-300 sm:inline"
            />
            <span
              ref={hoverSynergyRef}
              style={{ display: "none" }}
              className="chip-accent ml-1 hidden shrink-0 items-center rounded-md px-2 py-0.5 font-mono text-[11px] font-medium lg:inline-flex"
            />
          </div>
        </div>

        <span className="hidden shrink-0 font-mono text-xs text-sky-400 sm:inline">
          {paused
            ? "Orbit Paused"
            : showSynergies
              ? `Live Orbit · ${SYNERGY_DEFINITIONS.length} Synergies`
              : "Live Orbit"}
        </span>
      </div>
    </div>
  );
}
