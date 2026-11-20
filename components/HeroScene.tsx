"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Sparkles } from "lucide-react";

type EngineMode = "Initializing" | "WebGPU Ready · WebGL2" | "WebGL2 GPU" | "Static Vector";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [live, setLive] = useState(false);
  const [engineMode, setEngineMode] = useState<EngineMode>("Initializing");

  useEffect(() => {
    const host = containerRef.current;
    if (!host || reducedMotion || paused) return;

    let disposed = false;
    let isVisible = true;
    let loading = false;
    let cleanup = () => {};
    let resumeOrPause = () => {};

    async function bootThree() {
      if (!host || loading || disposed) return;
      loading = true;

      try {
        // Progressive WebGPU capability probe (non-blocking, WebGL2 primary renderer for universal support)
        let webGpuAvailable = false;
        if (typeof navigator !== "undefined" && "gpu" in navigator) {
          try {
            const gpu = (navigator as Navigator & { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu;
            const adapter = await gpu?.requestAdapter();
            webGpuAvailable = Boolean(adapter);
          } catch {
            webGpuAvailable = false;
          }
        }

        const THREE = await import("three");
        if (disposed || !host) return;

        const isMobile = window.innerWidth < 768;
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
        camera.position.set(0, 0.15, 6.2);

        const root = new THREE.Group();
        scene.add(root);

        // Lighting rig: cool cyan key + warm amber rim + soft ambient fill
        const ambient = new THREE.AmbientLight(0x93c5fd, 0.65);
        const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
        keyLight.position.set(4, 3, 5);
        const rimLight = new THREE.PointLight(0xfb923c, 3.2, 16);
        rimLight.position.set(-3.5, -2.2, 3.2);
        const topLight = new THREE.PointLight(0x22d3ee, 2.2, 14);
        topLight.position.set(0, 4, 1);
        scene.add(ambient, keyLight, rimLight, topLight);

        // 1. Inner crystalline obsidian core
        const coreGeo = new THREE.IcosahedronGeometry(1.08, 1);
        const coreMat = new THREE.MeshPhysicalMaterial({
          color: 0x0b172a,
          emissive: 0x0a2540,
          emissiveIntensity: 0.85,
          metalness: 0.72,
          roughness: 0.22,
          flatShading: true,
          clearcoat: 0.9,
          clearcoatRoughness: 0.15,
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        root.add(coreMesh);

        // 2. Luminous wireframe outer geodesic cage
        const cageGeo = new THREE.IcosahedronGeometry(1.32, 1);
        const cageEdges = new THREE.EdgesGeometry(cageGeo);
        const cageMat = new THREE.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.45,
        });
        const cageLines = new THREE.LineSegments(cageEdges, cageMat);
        root.add(cageLines);

        // 3. 39 Autonomous Agent Tool Nodes on a Fibonacci Sphere + Neural Lattice
        const nodeCount = 39;
        const nodePositions: InstanceType<typeof THREE.Vector3>[] = [];
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const sphereRadius = 1.92;

        const nodeGeo = new THREE.SphereGeometry(0.042, 10, 10);
        const cyanNodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const amberNodeMat = new THREE.MeshBasicMaterial({ color: 0xfb923c });
        const nodesGroup = new THREE.Group();

        for (let i = 0; i < nodeCount; i++) {
          const y = 1 - (i / (nodeCount - 1)) * 2;
          const r = Math.sqrt(1 - y * y);
          const theta = goldenAngle * i;
          const x = Math.cos(theta) * r;
          const z = Math.sin(theta) * r;
          const vec = new THREE.Vector3(
            x * sphereRadius,
            y * sphereRadius,
            z * sphereRadius,
          );
          nodePositions.push(vec);

          const mesh = new THREE.Mesh(
            nodeGeo,
            i % 5 === 0 ? amberNodeMat : cyanNodeMat,
          );
          mesh.position.copy(vec);
          nodesGroup.add(mesh);
        }
        root.add(nodesGroup);

        // Connect neighboring agent nodes with subtle luminous edges
        const linkVerts: number[] = [];
        const linkColors: number[] = [];
        const cCyan = new THREE.Color(0x38bdf8);
        const cAmber = new THREE.Color(0xfb923c);
        for (let i = 0; i < nodePositions.length; i++) {
          for (let j = i + 1; j < nodePositions.length; j++) {
            const dist = nodePositions[i].distanceTo(nodePositions[j]);
            if (dist < 1.18) {
              linkVerts.push(
                nodePositions[i].x,
                nodePositions[i].y,
                nodePositions[i].z,
                nodePositions[j].x,
                nodePositions[j].y,
                nodePositions[j].z,
              );
              const col = (i + j) % 7 === 0 ? cAmber : cCyan;
              linkColors.push(col.r, col.g, col.b, col.r, col.g, col.b);
            }
          }
        }
        const linksGeo = new THREE.BufferGeometry();
        linksGeo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(linkVerts, 3),
        );
        linksGeo.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(linkColors, 3),
        );
        const linksMat = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0.24,
        });
        const linksMesh = new THREE.LineSegments(linksGeo, linksMat);
        nodesGroup.add(linksMesh);

        // 4. Three tilted gyroscopic orbital rings + streaming data packets
        const ringsGroup = new THREE.Group();
        const ringConfigs = [
          { radius: 2.28, tube: 0.008, color: 0x38bdf8, rx: 1.15, ry: 0.35, speed: 0.32 },
          { radius: 2.52, tube: 0.007, color: 0x22d3ee, rx: -0.78, ry: 0.9, speed: -0.24 },
          { radius: 2.74, tube: 0.006, color: 0xfb923c, rx: 0.42, ry: -1.1, speed: 0.19 },
        ];

        const ringGeos: InstanceType<typeof THREE.BufferGeometry>[] = [];
        const ringMats: InstanceType<typeof THREE.Material>[] = [];
        const orbiters: {
          ring: InstanceType<typeof THREE.Group>;
          speed: number;
          packets: { mesh: InstanceType<typeof THREE.Mesh>; radius: number; phase: number }[];
        }[] = [];

        const packetGeo = new THREE.SphereGeometry(0.036, 8, 8);

        for (const cfg of ringConfigs) {
          const holder = new THREE.Group();
          holder.rotation.set(cfg.rx, cfg.ry, 0);

          const torusGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 10, isMobile ? 64 : 110);
          const torusMat = new THREE.MeshBasicMaterial({
            color: cfg.color,
            transparent: true,
            opacity: 0.28,
          });
          ringGeos.push(torusGeo);
          ringMats.push(torusMat);

          holder.add(new THREE.Mesh(torusGeo, torusMat));

          const packetMat = new THREE.MeshBasicMaterial({ color: cfg.color });
          ringMats.push(packetMat);

          const packets: { mesh: InstanceType<typeof THREE.Mesh>; radius: number; phase: number }[] = [];
          const packetCount = isMobile ? 2 : 3;
          for (let p = 0; p < packetCount; p++) {
            const pm = new THREE.Mesh(packetGeo, packetMat);
            holder.add(pm);
            packets.push({
              mesh: pm,
              radius: cfg.radius,
              phase: (p / packetCount) * Math.PI * 2,
            });
          }

          ringsGroup.add(holder);
          orbiters.push({ ring: holder, speed: cfg.speed, packets });
        }
        root.add(ringsGroup);

        // 5. Ambient deep-space telemetry dust particles
        const starCount = isMobile ? 110 : 220;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
          const r = 2.9 + Math.random() * 2.6;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          starPositions[i * 3 + 2] = r * Math.cos(phi);

          const col = i % 6 === 0 ? cAmber : cCyan;
          starColors[i * 3] = col.r;
          starColors[i * 3 + 1] = col.g;
          starColors[i * 3 + 2] = col.b;
        }
        const starsGeo = new THREE.BufferGeometry();
        starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        starsGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
        const starsMat = new THREE.PointsMaterial({
          size: isMobile ? 0.032 : 0.036,
          vertexColors: true,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
        });
        const stars = new THREE.Points(starsGeo, starsMat);
        scene.add(stars);

        // Interactive pointer parallax + drag-to-orbit
        let targetRotX = 0.14;
        let targetRotY = 0;
        let dragRotX = 0;
        let dragRotY = 0;
        let dragging = false;
        let lastX = 0;
        let lastY = 0;

        const onPointerDown = (e: PointerEvent) => {
          dragging = true;
          lastX = e.clientX;
          lastY = e.clientY;
        };
        const onPointerUp = () => {
          dragging = false;
        };
        const onPointerMove = (e: PointerEvent) => {
          const rect = host.getBoundingClientRect();
          if (dragging) {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            dragRotY += dx * 0.008;
            dragRotX = Math.max(-0.9, Math.min(0.9, dragRotX + dy * 0.008));
            lastX = e.clientX;
            lastY = e.clientY;
          } else {
            const nx = (e.clientX - rect.left) / rect.width - 0.5;
            const ny = (e.clientY - rect.top) / rect.height - 0.5;
            targetRotY = nx * 0.65;
            targetRotX = -ny * 0.45 + 0.12;
          }
        };

        const resize = () => {
          const w = Math.max(host.clientWidth, 1);
          const h = Math.max(host.clientHeight, 1);
          const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
          renderer.setPixelRatio(dpr);
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          const aspectFactor = Math.min(1, w / h);
          camera.position.z = aspectFactor < 0.9 ? 7.2 : 6.1;
          camera.updateProjectionMatrix();
        };

        const canvas = renderer.domElement;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        canvas.style.cursor = "grab";

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();
        host.appendChild(canvas);

        let rafId = 0;
        let elapsed = 0;
        let prevTime = performance.now();

        const renderLoop = (now: number) => {
          const dt = Math.min((now - prevTime) / 1000, 0.05);
          prevTime = now;
          elapsed += dt;

          coreMesh.rotation.y += dt * 0.28;
          coreMesh.rotation.x += dt * 0.14;

          cageLines.rotation.y -= dt * 0.16;
          cageLines.rotation.z += dt * 0.09;

          nodesGroup.rotation.y += dt * 0.11;
          stars.rotation.y -= dt * 0.03;

          for (const o of orbiters) {
            o.ring.rotation.z += dt * o.speed * 0.45;
            for (const pkt of o.packets) {
              const a = elapsed * o.speed * 2.2 + pkt.phase;
              pkt.mesh.position.set(
                Math.cos(a) * pkt.radius,
                Math.sin(a) * pkt.radius,
                0,
              );
            }
          }

          root.rotation.y += (targetRotY + dragRotY - root.rotation.y) * 0.06;
          root.rotation.x += (targetRotX + dragRotX - root.rotation.x) * 0.06;
          root.position.y = Math.sin(elapsed * 1.1) * 0.07;

          renderer.render(scene, camera);
          rafId = requestAnimationFrame(renderLoop);
        };

        resumeOrPause = () => {
          cancelAnimationFrame(rafId);
          if (isVisible && !document.hidden && !disposed) {
            prevTime = performance.now();
            rafId = requestAnimationFrame(renderLoop);
          }
        };

        host.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointerup", onPointerUp);
        host.addEventListener("pointermove", onPointerMove);
        document.addEventListener("visibilitychange", resumeOrPause);

        setEngineMode(webGpuAvailable ? "WebGPU Ready · WebGL2" : "WebGL2 GPU");
        setLive(true);
        resumeOrPause();

        cleanup = () => {
          cancelAnimationFrame(rafId);
          resizeObserver.disconnect();
          host.removeEventListener("pointerdown", onPointerDown);
          window.removeEventListener("pointerup", onPointerUp);
          host.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("visibilitychange", resumeOrPause);

          coreGeo.dispose();
          coreMat.dispose();
          cageGeo.dispose();
          cageEdges.dispose();
          cageMat.dispose();
          nodeGeo.dispose();
          cyanNodeMat.dispose();
          amberNodeMat.dispose();
          linksGeo.dispose();
          linksMat.dispose();
          packetGeo.dispose();
          starsGeo.dispose();
          starsMat.dispose();
          ringGeos.forEach((g) => g.dispose());
          ringMats.forEach((m) => m.dispose());

          renderer.dispose();
          renderer.forceContextLoss();
          canvas.remove();
          setLive(false);
        };
      } catch {
        setEngineMode("Static Vector");
        setLive(false);
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          void bootThree();
        }
        resumeOrPause();
      },
      { threshold: 0.05 },
    );
    io.observe(host);

    return () => {
      disposed = true;
      io.disconnect();
      cleanup();
    };
  }, [paused, reducedMotion]);

  return (
    <div className="preserve-dark relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-[#070d19]/95 shadow-[0_30px_90px_-30px_rgba(56,189,248,0.28)]">
      {/* Subtle architectural radial backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(56,189,248,0.16),transparent_62%),radial-gradient(circle_at_25%_75%,rgba(251,146,60,0.11),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-40"
      />

      {/* Top HUD Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
          <span
            className={`h-2 w-2 rounded-full ${
              live ? "bg-emerald-400 shadow-[0_0_10px_#34d399]" : "bg-sky-400"
            }`}
          />
          <span>NEURAL CORE // {engineMode}</span>
        </div>

        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume 3D animation" : "Pause 3D animation"}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-slate-950/70 px-2.5 py-1 font-mono text-[11px] text-slate-300 transition hover:border-sky-400/45 hover:text-white"
          >
            {paused ? (
              <>
                <Play className="h-3 w-3 text-sky-400" />
                Play
              </>
            ) : (
              <>
                <Pause className="h-3 w-3 text-sky-400" />
                Pause
              </>
            )}
          </button>
        )}
      </div>

      {/* 3D Canvas Host + Graceful Static SVG Fallback */}
      <div
        ref={containerRef}
        className="relative aspect-[4/3.6] w-full select-none sm:aspect-[4/3.4] lg:aspect-[1/0.96]"
        aria-label="Interactive 3D neural systems visualization representing 39 AI agent tools and real-time distributed telemetry rings"
      >
        {!live && (
          <svg
            viewBox="0 0 420 400"
            className="absolute inset-0 h-full w-full p-6"
            role="img"
            aria-label="Architectural geometric illustration of autonomous AI nodes and orbital rings"
          >
            <defs>
              <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#coreGrad)">
              <ellipse cx="210" cy="200" rx="158" ry="62" transform="rotate(-24 210 200)" strokeOpacity="0.45" strokeWidth="1.2" />
              <ellipse cx="210" cy="200" rx="145" ry="56" transform="rotate(32 210 200)" strokeOpacity="0.38" strokeWidth="1.2" />
              <ellipse cx="210" cy="200" rx="170" ry="66" transform="rotate(78 210 200)" strokeOpacity="0.26" strokeWidth="1.1" />
              <polygon points="210,115 284,158 284,242 210,285 136,242 136,158" strokeWidth="1.6" fill="rgba(14, 116, 144, 0.14)" />
              <polygon points="210,145 258,172 258,228 210,255 162,228 162,172" strokeWidth="1.2" strokeOpacity="0.7" />
              <line x1="210" y1="115" x2="210" y2="285" strokeOpacity="0.35" />
              <line x1="136" y1="158" x2="284" y2="242" strokeOpacity="0.35" />
              <line x1="284" y1="158" x2="136" y2="242" strokeOpacity="0.35" />
            </g>
            {[
              [210, 115], [284, 158], [284, 242], [210, 285], [136, 242], [136, 158],
              [96, 134], [326, 140], [336, 256], [92, 266], [210, 74], [210, 326],
            ].map(([cx, cy], idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={idx % 3 === 0 ? 4.5 : 3.2}
                fill={idx % 3 === 0 ? "#fb923c" : "#38bdf8"}
              />
            ))}
          </svg>
        )}
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] bg-slate-950/70 px-4 py-3 font-mono text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1.5 text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          39 Tool Nodes · Hybrid RAG · Multi-LLM Failover
        </span>
        <span className="text-sky-300/90">Drag or hover to orbit</span>
      </div>
    </div>
  );
}
