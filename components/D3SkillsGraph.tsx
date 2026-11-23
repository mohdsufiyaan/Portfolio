"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { RotateCcw, Sparkles } from "lucide-react";
import { skillGroups, type SkillGroup } from "../app/data";
import { useTheme } from "./ThemeProvider";

interface ForceNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  group: string;
  context: string;
  tier: "core" | "domain" | "skill";
  radius: number;
  color: string;
  anchorX: number;
  anchorY: number;
  phase: number;
  angle: number;
}

interface ForceLink extends d3.SimulationLinkDatum<ForceNode> {
  source: string | ForceNode;
  target: string | ForceNode;
  group: string;
  color: string;
  isCoreLink: boolean;
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
    "PHP 8.x & Laravel 12": "Laravel 12",
    "Node.js & Express 5": "Node · Express 5",
    "TypeScript & ES6+": "TypeScript",
    "Socket.IO": "Socket.IO",
    "Laravel AI SDK & LangChain": "Laravel AI SDK",
    "Hybrid RAG": "Hybrid RAG",
    "Pinecone Serverless": "Pinecone",
    "Jina AI & OpenAI Embeddings": "Jina 1024d",
    "Scalable & Event-Driven Design": "Event-Driven",
    "Horizontal Scaling": "Horizontal Scale",
    "Caching (Redis & LRU)": "Redis & LRU",
    "Message Queues & Rate Limiting": "Queues & RL",
    "Next.js & React.js": "Next.js · React",
    "React Native": "React Native",
    "TypeScript & Redux": "Zustand · Redux",
    "Tailwind CSS & HTML5/CSS3": "Tailwind CSS",
    PostgreSQL: "PostgreSQL",
    "MySQL 8": "MySQL 8",
    Redis: "Redis",
    Pinecone: "Pinecone DB",
    "AWS (EC2, S3, RDS, CloudFront)": "AWS · S3 · CDN",
    "Nginx, Apache & Linux": "Nginx · Linux",
    "PM2 & Supervisor": "PM2 · Workers",
    "PHPUnit & Pest": "PHPUnit · Pest",
  };
  return map[raw] ?? raw.split(" (")[0].slice(0, 16);
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
  const [hovered, setHovered] = useState<{
    label: string;
    context: string;
    domain: string;
    color: string;
  } | null>(null);
  const [simTick, setSimTick] = useState(0);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const palette = isDark ? DOMAIN_COLORS_DARK : DOMAIN_COLORS_LIGHT;
    const width = isCompact ? 620 : 1140;
    const height = 620;
    const cx = width / 2;
    const cy = height / 2;

    const hubRx = isCompact ? 132 : 235;
    const hubRy = isCompact ? 138 : 162;
    const skillRx = isCompact ? 242 : 445;
    const skillRy = isCompact ? 248 : 254;
    const skillsPerDomain = isCompact ? 3 : 4;

    const nodes: ForceNode[] = [
      {
        id: "core",
        label: "Mohd Sufiyan",
        group: "all",
        context: "Senior Software Engineer · 5.5+ Years Full-Stack & AI",
        tier: "core",
        radius: isCompact ? 34 : 38,
        color: isDark ? "#38bdf8" : "#0284c7",
        anchorX: cx,
        anchorY: cy,
        fx: cx,
        fy: cy,
        x: cx,
        y: cy,
        phase: 0,
        angle: 0,
      },
    ];

    const links: ForceLink[] = [];

    skillGroups.forEach((group, gIdx) => {
      const color = palette[group.accent];
      const baseAngle =
        -Math.PI / 2 + (gIdx * Math.PI * 2) / skillGroups.length + Math.PI / 6;
      const hx = cx + Math.cos(baseAngle) * hubRx;
      const hy = cy + Math.sin(baseAngle) * hubRy;
      const domainId = `domain-${group.id}`;

      nodes.push({
        id: domainId,
        label: SHORT_DOMAIN_LABELS[group.id] ?? group.title,
        group: group.id,
        context: group.subtitle,
        tier: "domain",
        radius: isCompact ? 22 : 25,
        color,
        anchorX: hx,
        anchorY: hy,
        x: cx + (hx - cx) * 0.4,
        y: cy + (hy - cy) * 0.4,
        phase: gIdx * 1.1,
        angle: baseAngle,
      });

      links.push({
        source: "core",
        target: domainId,
        group: group.id,
        color,
        isCoreLink: true,
      });

      const sliceSkills = group.items.slice(0, skillsPerDomain);
      const spread = isCompact ? 0.68 : 0.78;
      sliceSkills.forEach((skill, sIdx) => {
        const offsetRatio =
          sliceSkills.length === 1
            ? 0
            : sIdx / (sliceSkills.length - 1) - 0.5;
        const skillAngle = baseAngle + offsetRatio * spread;
        const radialBoost = sIdx % 2 === 0 ? 1 : 0.92;
        const sx = cx + Math.cos(skillAngle) * skillRx * radialBoost;
        const sy = cy + Math.sin(skillAngle) * skillRy * radialBoost;
        const skillId = `${group.id}-${skill.name}`;

        nodes.push({
          id: skillId,
          label: conciseSkillLabel(skill.name),
          group: group.id,
          context: skill.context,
          tier: "skill",
          radius: isCompact ? 7 : 8.5,
          color,
          anchorX: sx,
          anchorY: sy,
          x: hx + (sx - hx) * 0.45,
          y: hy + (sy - hy) * 0.45,
          phase: gIdx * 1.3 + sIdx * 0.85,
          angle: skillAngle,
        });

        links.push({
          source: domainId,
          target: skillId,
          group: group.id,
          color,
          isCoreLink: false,
        });
      });
    });

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const defs = svg.append("defs");
    const glow = defs
      .append("filter")
      .attr("id", "force-glow")
      .attr("x", "-60%")
      .attr("y", "-60%")
      .attr("width", "220%")
      .attr("height", "220%");
    glow.append("feGaussianBlur").attr("stdDeviation", isDark ? "4.5" : "2.5").attr("result", "b");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "b");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const coreGrad = defs
      .append("radialGradient")
      .attr("id", "force-core-grad")
      .attr("cx", "34%")
      .attr("cy", "34%");
    coreGrad.append("stop").attr("offset", "0%").attr("stop-color", isDark ? "#e0f2fe" : "#38bdf8");
    coreGrad.append("stop").attr("offset", "55%").attr("stop-color", isDark ? "#38bdf8" : "#0284c7");
    coreGrad.append("stop").attr("offset", "100%").attr("stop-color", "#0369a1");

    const guideLayer = svg.append("g").attr("fill", "none");
    [
      [hubRx, hubRy, isDark ? 0.22 : 0.28],
      [skillRx * 0.96, skillRy * 0.96, isDark ? 0.12 : 0.16],
    ].forEach(([rx, ry, op]) => {
      guideLayer
        .append("ellipse")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("rx", rx)
        .attr("ry", ry)
        .attr("stroke", isDark ? "#38bdf8" : "#0284c7")
        .attr("stroke-dasharray", "3 7")
        .attr("stroke-opacity", op);
    });

    const linkLayer = svg.append("g").attr("stroke-linecap", "round");
    const pulseLayer = svg.append("g");
    const nodeLayer = svg.append("g");

    const linkSel = linkLayer
      .selectAll<SVGLineElement, ForceLink>("line")
      .data(links)
      .join("line")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", (d) => (d.isCoreLink ? 2 : 1.3))
      .attr("stroke-opacity", (d) => {
        if (activeDomain === "all") return d.isCoreLink ? (isDark ? 0.55 : 0.5) : (isDark ? 0.34 : 0.36);
        return d.group === activeDomain ? 0.85 : 0.09;
      });

    const coreLinks = links.filter((l) => l.isCoreLink);
    const pulseDots = pulseLayer
      .selectAll<SVGCircleElement, ForceLink>("circle")
      .data(coreLinks)
      .join("circle")
      .attr("r", 3.4)
      .attr("fill", (d) => d.color)
      .attr("filter", "url(#force-glow)")
      .attr("opacity", (d) =>
        activeDomain === "all" || d.group === activeDomain ? 0.95 : 0.12,
      );

    const nodeSel = nodeLayer
      .selectAll<SVGGElement, ForceNode>("g")
      .data(nodes)
      .join("g")
      .style("cursor", (d) => (d.tier === "core" ? "pointer" : "grab"))
      .attr("opacity", (d) => {
        if (activeDomain === "all" || d.tier === "core") return 1;
        return d.group === activeDomain ? 1 : 0.22;
      });

    nodeSel
      .filter((d) => d.tier === "core")
      .append("circle")
      .attr("r", (d) => d.radius + 11)
      .attr("fill", isDark ? "rgba(56,189,248,0.12)" : "rgba(2,132,199,0.12)")
      .attr("stroke", isDark ? "rgba(56,189,248,0.38)" : "rgba(2,132,199,0.42)")
      .attr("stroke-width", 1.2);

    nodeSel
      .append("circle")
      .attr("class", "main-dot")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) =>
        d.tier === "core"
          ? "url(#force-core-grad)"
          : d.tier === "domain"
            ? isDark ? "#081226" : "#ffffff"
            : d.color,
      )
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", (d) =>
        d.tier === "core" ? 2.5 : d.tier === "domain" ? 2.2 : 1.5,
      )
      .attr("filter", (d) => (d.tier !== "skill" ? "url(#force-glow)" : null));

    nodeSel
      .filter((d) => d.tier === "core")
      .append("text")
      .text("Mohd Sufiyan")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", isDark ? "#03111c" : "#ffffff")
      .attr("font-size", isCompact ? "9.5px" : "10.5px")
      .attr("font-weight", "800")
      .attr("font-family", "var(--font-mono), monospace")
      .style("pointer-events", "none");

    const domainSel = nodeSel.filter((d) => d.tier === "domain");
    domainSel
      .append("text")
      .text((d) => String(skillGroups.find((g) => g.id === d.group)?.items.length ?? 0))
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", (d) => d.color)
      .attr("font-size", "12px")
      .attr("font-weight", "700")
      .attr("font-family", "var(--font-mono), monospace")
      .style("pointer-events", "none");

    domainSel
      .append("rect")
      .attr("x", (d) => -(d.label.length * 3.8 + 12))
      .attr("y", (d) => d.radius + 5)
      .attr("width", (d) => d.label.length * 7.6 + 24)
      .attr("height", 22)
      .attr("rx", 11)
      .attr("fill", isDark ? "rgba(5, 10, 22, 0.94)" : "rgba(255, 255, 255, 0.96)")
      .attr("stroke", (d) => d.color)
      .attr("stroke-opacity", isDark ? 0.55 : 0.65);

    domainSel
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("y", (d) => d.radius + 19.5)
      .attr("fill", isDark ? "#f8fafc" : "#0f172a")
      .attr("font-size", "11px")
      .attr("font-weight", "700")
      .attr("font-family", "var(--font-mono), monospace")
      .style("pointer-events", "none");

    const skillSel = nodeSel.filter((d) => d.tier === "skill");
    skillSel
      .append("rect")
      .attr("x", (d) => -(d.label.length * 3.5 + 10))
      .attr("y", (d) => d.radius + 5)
      .attr("width", (d) => d.label.length * 7.0 + 20)
      .attr("height", 20)
      .attr("rx", 10)
      .attr("fill", isDark ? "rgba(6, 12, 24, 0.9)" : "rgba(255, 255, 255, 0.95)")
      .attr("stroke", isDark ? "rgba(148, 163, 184, 0.28)" : "rgba(15, 23, 42, 0.16)")
      .attr("stroke-width", 1);

    skillSel
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("y", (d) => d.radius + 18)
      .attr("fill", isDark ? "#e2e8f0" : "#1e293b")
      .attr("font-size", isCompact ? "9.5px" : "10.5px")
      .attr("font-weight", "600")
      .attr("font-family", "var(--font-mono), monospace")
      .style("pointer-events", "none");

    const simulation = d3
      .forceSimulation<ForceNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<ForceNode, ForceLink>(links)
          .id((d) => d.id)
          .distance((d) =>
            d.isCoreLink ? (isCompact ? 132 : 205) : isCompact ? 105 : 170,
          )
          .strength(0.28),
      )
      .force(
        "x",
        d3
          .forceX<ForceNode>((d) => d.anchorX)
          .strength((d) => (d.tier === "domain" ? 0.36 : 0.44)),
      )
      .force(
        "y",
        d3
          .forceY<ForceNode>((d) => d.anchorY)
          .strength((d) => (d.tier === "domain" ? 0.36 : 0.44)),
      )
      .force(
        "collide",
        d3.forceCollide<ForceNode>().radius((d) =>
          d.tier === "core" ? 56 : d.tier === "domain" ? 48 : isCompact ? 38 : 46,
        ),
      )
      .velocityDecay(0.32)
      .alphaDecay(0.025);

    const drag = d3
      .drag<SVGGElement, ForceNode>()
      .on("start", (event, d) => {
        if (d.tier === "core") return;
        if (!event.active) simulation.alphaTarget(0.25).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        if (d.tier === "core") return;
        d.fx = Math.max(66, Math.min(width - 66, event.x));
        d.fy = Math.max(44, Math.min(height - 46, event.y));
      })
      .on("end", (event, d) => {
        if (d.tier === "core") return;
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeSel.call(drag);

    nodeSel
      .on("mouseenter", function (_event, d) {
        if (d.tier === "skill") {
          d3.select(this)
            .select("circle.main-dot")
            .attr("r", d.radius + 3)
            .attr("stroke", isDark ? "#ffffff" : "#0f172a");
        }
        const dom = skillGroups.find((g) => g.id === d.group);
        setHovered({
          label: d.label,
          context: d.context,
          domain: dom?.title ?? "Core Architecture",
          color: d.color,
        });
      })
      .on("mouseleave", function (_event, d) {
        if (d.tier === "skill") {
          d3.select(this)
            .select("circle.main-dot")
            .attr("r", d.radius)
            .attr("stroke", d.color);
        }
        setHovered(null);
      })
      .on("click", (_event, d) => {
        if (d.tier === "core") {
          onSelectDomain("all");
        } else {
          onSelectDomain(d.group === activeDomain ? "all" : d.group);
        }
      });

    const clampX = (x: number) => Math.max(66, Math.min(width - 66, x));
    const clampY = (y: number) => Math.max(40, Math.min(height - 46, y));

    let floatOffset = 0;

    const renderPositions = () => {
      linkSel
        .attr("x1", (d) => (d.source as ForceNode).x ?? cx)
        .attr("y1", (d) => (d.source as ForceNode).y ?? cy)
        .attr("x2", (d) => (d.target as ForceNode).x ?? cx)
        .attr("y2", (d) => (d.target as ForceNode).y ?? cy);

      nodeSel.attr("transform", (d) => {
        const bx = clampX(d.x ?? d.anchorX);
        const by = clampY(d.y ?? d.anchorY);
        if (d.tier === "core" || d.fx != null) {
          return `translate(${bx},${by})`;
        }
        const amp = d.tier === "domain" ? 2.4 : 4;
        const dx = Math.cos(floatOffset + d.phase) * amp;
        const dy = Math.sin(floatOffset * 1.15 + d.phase) * amp;
        return `translate(${bx + dx},${by + dy})`;
      });

      pulseDots
        .attr("cx", (d, i) => {
          const s = d.source as ForceNode;
          const t = d.target as ForceNode;
          const p = (floatOffset * 0.28 + i * 0.17) % 1;
          return (s.x ?? cx) + ((t.x ?? cx) - (s.x ?? cx)) * p;
        })
        .attr("cy", (d, i) => {
          const s = d.source as ForceNode;
          const t = d.target as ForceNode;
          const p = (floatOffset * 0.28 + i * 0.17) % 1;
          return (s.y ?? cy) + ((t.y ?? cy) - (s.y ?? cy)) * p;
        });
    };

    simulation.on("tick", renderPositions);

    let rafId = 0;
    let visible = true;
    let last = performance.now();

    const animateLoop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible && !document.hidden) {
        floatOffset += dt * 1.15;
        renderPositions();
      }
      rafId = requestAnimationFrame(animateLoop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    if (hostRef.current) io.observe(hostRef.current);

    rafId = requestAnimationFrame(animateLoop);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      simulation.stop();
    };
  }, [activeDomain, onSelectDomain, simTick, isCompact, isDark]);

  return (
    <div
      ref={hostRef}
      className="glass-panel relative mb-8 overflow-hidden rounded-3xl"
    >
      <div
        aria-hidden="true"
        className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[90px]"
      />

      {/* Toolbar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-3.5">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-200">
          <Sparkles className="h-3.5 w-3.5 text-sky-400" />
          <span className="font-semibold">D3.JS FORCE-DIRECTED SKILL NETWORK</span>
          <span className="hidden text-slate-400 md:inline">
            · Drag nodes with spring physics or click clusters to filter
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSimTick((t) => t + 1)}
          className="btn-cool-ghost inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-medium"
        >
          <RotateCcw className="h-3.5 w-3.5 text-sky-400" />
          Re-Simulate Physics
        </button>
      </div>

      {/* Responsive Animated D3 SVG */}
      <div className="relative w-full px-2 py-2 sm:px-4">
        <svg
          ref={svgRef}
          className="mx-auto block h-auto w-full max-w-[1140px] select-none"
          role="img"
          aria-label="Interactive animated D3.js force-directed node network of Mohd Sufiyan's engineering domains and skills"
        />
      </div>

      {/* Live Telemetry Footer Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] px-5 py-3">
        {hovered ? (
          <div className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor: hovered.color,
                boxShadow: `0 0 10px ${hovered.color}`,
              }}
            />
            <span className="font-mono text-xs font-semibold text-white">
              {hovered.label}
            </span>
            <span className="hidden text-slate-500 sm:inline">·</span>
            <span className="text-xs text-slate-300">{hovered.context}</span>
          </div>
        ) : (
          <span className="font-mono text-xs text-slate-400">
            Drag any node or click a domain cluster to filter skills below
          </span>
        )}
        <span className="font-mono text-xs text-sky-400">
          D3 Force Physics · Live Orbit
        </span>
      </div>
    </div>
  );
}
