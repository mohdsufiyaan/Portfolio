import { ImageResponse } from "next/og";

export const alt =
  "Mohd Sufiyan — Senior Software Engineer · Full-Stack Architecture & AI Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 82% 24%, rgba(56,189,248,0.22), transparent 45%), radial-gradient(circle at 18% 85%, rgba(251,146,60,0.16), transparent 40%), #05080f",
          color: "#f4f7fb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 26,
              color: "#98a6bc",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(56,189,248,0.14)",
                border: "1px solid rgba(56,189,248,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#38bdf8",
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              MS
            </div>
            <span>Mohd Sufiyan · Senior Software Engineer</span>
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#34d399",
              border: "1px solid rgba(52,211,153,0.35)",
              background: "rgba(52,211,153,0.1)",
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            5.5+ Years · Noida, India
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
            }}
          >
            Full-Stack Architecture
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
              color: "#38bdf8",
            }}
          >
            &amp; Autonomous AI Systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(148,163,184,0.2)",
            paddingTop: 28,
            fontSize: 24,
            color: "#98a6bc",
          }}
        >
          <span>Laravel · Node.js · Next.js · React Native · AWS</span>
          <span style={{ color: "#fb923c" }}>
            39-Tool LLM Agent · Hybrid RAG · Real-Time Systems
          </span>
        </div>
      </div>
    ),
    size,
  );
}
