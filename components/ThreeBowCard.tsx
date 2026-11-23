"use client";

import {
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

export type BowAccent = "cyan" | "amber" | "emerald" | "violet";

const ACCENT_HEX: Record<
  BowAccent,
  { dark: number; light: number; glowDark: string; glowLight: string }
> = {
  cyan: {
    dark: 0x38bdf8,
    light: 0x0284c7,
    glowDark: "rgba(56, 189, 248, 0.22)",
    glowLight: "rgba(2, 132, 199, 0.14)",
  },
  amber: {
    dark: 0xfb923c,
    light: 0xd97706,
    glowDark: "rgba(251, 146, 60, 0.20)",
    glowLight: "rgba(217, 119, 6, 0.14)",
  },
  emerald: {
    dark: 0x34d399,
    light: 0x059669,
    glowDark: "rgba(52, 211, 153, 0.20)",
    glowLight: "rgba(5, 150, 105, 0.14)",
  },
  violet: {
    dark: 0xa78bfa,
    light: 0x7c3aed,
    glowDark: "rgba(167, 139, 250, 0.22)",
    glowLight: "rgba(124, 58, 237, 0.14)",
  },
};

/**
 * Single shared Three.js WebGL renderer reused across whichever card is hovered.
 * Deforms a subdivided 3D PlaneGeometry downward at the hovered corner/side while
 * staying within a single WebGL context across 30+ cards on the page.
 */
class SharedBowMeshEngine {
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private geometry: THREE.PlaneGeometry | null = null;
  private basePositions: Float32Array | null = null;
  private wireMat: THREE.MeshBasicMaterial | null = null;
  private fillMat: THREE.MeshBasicMaterial | null = null;
  private meshGroup: THREE.Group | null = null;
  private host: HTMLDivElement | null = null;
  private failed = false;

  private ensureInit() {
    if (this.failed || this.renderer) return !this.failed;
    if (typeof window === "undefined") return false;
    try {
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.pointerEvents = "none";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
      camera.position.set(0, 0, 3.85);

      const geometry = new THREE.PlaneGeometry(2.3, 2.3, 18, 18);
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      this.basePositions = new Float32Array(posAttr.array.length);
      this.basePositions.set(posAttr.array);

      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      });

      const fillMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.035,
        side: THREE.DoubleSide,
      });

      const group = new THREE.Group();
      group.add(new THREE.Mesh(geometry, fillMat));
      group.add(new THREE.Mesh(geometry, wireMat));
      scene.add(group);

      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;
      this.geometry = geometry;
      this.wireMat = wireMat;
      this.fillMat = fillMat;
      this.meshGroup = group;
      return true;
    } catch {
      this.failed = true;
      return false;
    }
  }

  attach(slot: HTMLDivElement, accent: BowAccent, isDark: boolean) {
    if (
      !this.ensureInit() ||
      !this.renderer ||
      !this.camera ||
      !this.wireMat ||
      !this.fillMat
    ) {
      return;
    }
    const canvas = this.renderer.domElement;
    if (this.host !== slot) {
      this.host = slot;
      slot.appendChild(canvas);
    }
    const w = Math.max(slot.clientWidth, 1);
    const h = Math.max(slot.clientHeight, 1);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    const hex = isDark ? ACCENT_HEX[accent].dark : ACCENT_HEX[accent].light;
    this.wireMat.color.setHex(hex);
    this.fillMat.color.setHex(hex);
    this.wireMat.opacity = isDark ? 0.16 : 0.12;
    this.fillMat.opacity = isDark ? 0.035 : 0.025;
  }

  renderDeformed(
    slot: HTMLDivElement,
    nx: number,
    ny: number,
    intensity: number,
    rotX: number,
    rotY: number,
  ) {
    if (
      this.host !== slot ||
      !this.renderer ||
      !this.scene ||
      !this.camera ||
      !this.geometry ||
      !this.basePositions ||
      !this.meshGroup
    ) {
      return;
    }

    const pos = this.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const base = this.basePositions;

    const targetX = nx * 1.12;
    const targetY = -ny * 1.12;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = base[i];
      const by = base[i + 1];
      const dx = bx - targetX;
      const dy = by - targetY;
      const distSq = dx * dx + dy * dy;
      const bowFalloff = Math.exp(-distSq * 1.35);
      arr[i + 2] = (-0.34 * bowFalloff + 0.06 * (1 - bowFalloff)) * intensity;
    }
    pos.needsUpdate = true;

    this.meshGroup.rotation.set(rotX * 0.7, rotY * 0.7, 0);
    const scaleX = Math.max(this.camera.aspect, 1);
    const scaleY =
      this.camera.aspect < 1 ? 1 / Math.max(this.camera.aspect, 0.4) : 1;
    this.meshGroup.scale.set(scaleX, scaleY, 1);

    this.renderer.render(this.scene, this.camera);
  }

  detach(slot: HTMLDivElement) {
    if (this.host === slot && this.renderer) {
      const canvas = this.renderer.domElement;
      if (canvas.parentElement === slot) {
        slot.removeChild(canvas);
      }
      this.host = null;
    }
  }
}

const sharedBowEngine = new SharedBowMeshEngine();

interface ThreeBowCardProps {
  children: ReactNode;
  className?: string;
  accent?: BowAccent;
  maxTilt?: number;
  disabled?: boolean;
}

export function ThreeBowCard({
  children,
  className = "",
  accent = "cyan",
  maxTilt = 6.5,
  disabled = false,
}: ThreeBowCardProps) {
  const { theme } = useTheme();
  const isDarkRef = useRef(theme === "dark");
  isDarkRef.current = theme === "dark";

  const surfaceRef = useRef<HTMLDivElement>(null);
  const webglSlotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({
    hovered: false,
    targetNx: 0,
    targetNy: 0,
    nx: 0,
    ny: 0,
    intensity: 0,
    rafId: 0,
    lastTime: 0,
    currentQuat: new THREE.Quaternion(),
    targetQuat: new THREE.Quaternion(),
    euler: new THREE.Euler(0, 0, 0, "XYZ"),
    matrix: new THREE.Matrix4(),
    scaleVec: new THREE.Vector3(1, 1, 1),
    posVec: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    const st = stateRef.current;
    const slot = webglSlotRef.current;
    return () => {
      cancelAnimationFrame(st.rafId);
      if (slot) sharedBowEngine.detach(slot);
    };
  }, []);

  const stepAnimation = (now: number) => {
    const st = stateRef.current;
    const el = surfaceRef.current;
    const slot = webglSlotRef.current;
    const glowEl = glowRef.current;
    if (!el) {
      st.rafId = 0;
      return;
    }

    const dt = st.lastTime ? Math.min((now - st.lastTime) / 1000, 0.05) : 0.016;
    st.lastTime = now;

    const targetIntensity = st.hovered ? 1 : 0;
    const targetNx = st.hovered ? st.targetNx : 0;
    const targetNy = st.hovered ? st.targetNy : 0;

    st.nx = THREE.MathUtils.damp(st.nx, targetNx, 11, dt);
    st.ny = THREE.MathUtils.damp(st.ny, targetNy, 11, dt);
    st.intensity = THREE.MathUtils.damp(st.intensity, targetIntensity, 10, dt);

    // Corner-bow physics: hovered corner/side dips DOWN (-Z) into the plane
    const maxRad = THREE.MathUtils.degToRad(maxTilt);
    const rx = -st.ny * maxRad * st.intensity;
    const ry = st.nx * maxRad * st.intensity;

    const edgeMag = Math.min(1, Math.hypot(st.nx, st.ny));
    const pressZ = -(2.5 + edgeMag * 5.5) * st.intensity;
    const bowScale = 1 - 0.008 * st.intensity;

    st.euler.set(rx, ry, 0, "XYZ");
    st.targetQuat.setFromEuler(st.euler);
    st.currentQuat.slerp(st.targetQuat, Math.min(1, dt * 14));

    st.posVec.set(0, 0, pressZ);
    st.scaleVec.set(bowScale, bowScale, 1);
    st.matrix.compose(st.posVec, st.currentQuat, st.scaleVec);

    const m = st.matrix.elements;
    el.style.transform = `perspective(1050px) matrix3d(${m[0].toFixed(5)},${m[1].toFixed(5)},${m[2].toFixed(5)},${m[3].toFixed(5)},${m[4].toFixed(5)},${m[5].toFixed(5)},${m[6].toFixed(5)},${m[7].toFixed(5)},${m[8].toFixed(5)},${m[9].toFixed(5)},${m[10].toFixed(5)},${m[11].toFixed(5)},${m[12].toFixed(3)},${m[13].toFixed(3)},${m[14].toFixed(3)},${m[15].toFixed(5)})`;

    if (glowEl) {
      const px = ((st.nx + 1) * 50).toFixed(1);
      const py = ((st.ny + 1) * 50).toFixed(1);
      const glowColor = isDarkRef.current
        ? ACCENT_HEX[accent].glowDark
        : ACCENT_HEX[accent].glowLight;
      glowEl.style.opacity = st.intensity.toFixed(3);
      glowEl.style.background = `radial-gradient(420px circle at ${px}% ${py}%, ${glowColor}, transparent 66%)`;
    }

    if (slot) {
      slot.style.opacity = (st.intensity * 0.92).toFixed(3);
      if (st.intensity > 0.015) {
        sharedBowEngine.renderDeformed(slot, st.nx, st.ny, st.intensity, rx, ry);
      }
    }

    const settled =
      !st.hovered &&
      st.intensity < 0.004 &&
      Math.abs(st.nx) < 0.003 &&
      Math.abs(st.ny) < 0.003;

    if (settled) {
      el.style.transform = "";
      if (glowEl) glowEl.style.opacity = "0";
      if (slot) {
        slot.style.opacity = "0";
        sharedBowEngine.detach(slot);
      }
      st.rafId = 0;
      st.lastTime = 0;
      return;
    }

    st.rafId = requestAnimationFrame(stepAnimation);
  };

  const ensureLoop = () => {
    const st = stateRef.current;
    if (!st.rafId) {
      st.lastTime = 0;
      st.rafId = requestAnimationFrame(stepAnimation);
    }
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    const el = surfaceRef.current;
    const slot = webglSlotRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const st = stateRef.current;
    st.hovered = true;
    st.targetNx = Math.max(
      -1,
      Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1),
    );
    st.targetNy = Math.max(
      -1,
      Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1),
    );
    if (slot) {
      sharedBowEngine.attach(slot, accent, isDarkRef.current);
    }
    ensureLoop();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const el = surfaceRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const st = stateRef.current;
    if (!st.hovered) {
      st.hovered = true;
      if (webglSlotRef.current) {
        sharedBowEngine.attach(webglSlotRef.current, accent, isDarkRef.current);
      }
    }
    st.targetNx = Math.max(
      -1,
      Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1),
    );
    st.targetNy = Math.max(
      -1,
      Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1),
    );
    ensureLoop();
  };

  const handleMouseLeave = () => {
    stateRef.current.hovered = false;
    ensureLoop();
  };

  return (
    <div
      ref={surfaceRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bow-card-surface glass-card overflow-hidden ${className}`}
    >
      {/* Shared Three.js Deformed Bow-Mesh WebGL Layer */}
      <div
        ref={webglSlotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-200"
      />

      {/* Dynamic Specular Corner-Bow Spotlight */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-[1] rounded-[inherit] opacity-0"
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
