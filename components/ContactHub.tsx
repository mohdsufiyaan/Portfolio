"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Eye,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";
import { profile } from "../app/data";
import { SpotlightCard } from "./Reveal";
import { useResumeModal } from "./ResumeModalProvider";

export function ContactHub() {
  const { openResume } = useResumeModal();
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);

  const copyValue = async (text: string, field: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField((prev) => (prev === field ? null : prev)), 2200);
    } catch {
      /* Fallback handled by direct mailto/tel links */
    }
  };

  return (
    <div className="contact-hub-shell relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/16 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
        {/* Left Direct Pitch */}
        <div className="lg:col-span-5">
          <div className="chip-emerald inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            Direct Channels · Instant Reach
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
            Let&apos;s build{" "}
            <span className="text-gradient-cyan">resilient systems.</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            Hiring for a Senior Full-Stack or AI Systems role, or architecting a
            production Laravel, Node.js, Next.js, or RAG platform? Reach out
            directly by email, phone, or LinkedIn—or inspect my resume right
            here in-app.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5 font-mono text-xs text-slate-400">
            <span className="chip-neutral inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-sky-400" />
              {profile.location}
            </span>
            <span className="chip-neutral rounded-lg px-3 py-1.5">
              {profile.timezone}
            </span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn-cool-primary inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              <Mail className="h-4 w-4" />
              Email Mohd Sufiyan
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={openResume}
              className="btn-cool-secondary inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              <Eye className="h-4 w-4 text-sky-400" />
              Preview Resume
            </button>
            <a
              href={profile.resumePath}
              download="Mohd_Sufiyan_Resume.pdf"
              className="btn-cool-ghost inline-flex min-h-[46px] items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
            >
              <Download className="h-4 w-4 text-sky-400" />
              Download PDF
            </a>
          </div>
        </div>

        {/* Right Verified Direct Channels Grid (Three.js Corner-Bow Cards) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {/* Email Card */}
          <SpotlightCard accent="cyan" maxTilt={7} className="rounded-2xl p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="chip-accent flex h-10 w-10 items-center justify-center rounded-xl">
                <Mail className="h-5 w-5" />
              </div>
              <button
                type="button"
                onClick={() => copyValue(profile.email, "email")}
                className="btn-cool-ghost inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="mt-4 font-mono text-xs uppercase tracking-wider text-slate-400">
              Primary Email
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 block break-all text-sm font-semibold text-white transition hover:text-sky-400"
            >
              {profile.email}
            </a>
          </SpotlightCard>

          {/* Phone Card */}
          <SpotlightCard accent="emerald" maxTilt={7} className="rounded-2xl p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="chip-emerald flex h-10 w-10 items-center justify-center rounded-xl">
                <Phone className="h-5 w-5" />
              </div>
              <button
                type="button"
                onClick={() => copyValue(profile.phone, "phone")}
                className="btn-cool-ghost inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs"
              >
                {copiedField === "phone" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="mt-4 font-mono text-xs uppercase tracking-wider text-slate-400">
              Direct Phone
            </div>
            <a
              href={profile.phoneHref}
              className="mt-1 block text-sm font-semibold text-white transition hover:text-emerald-400"
            >
              {profile.phone}
            </a>
          </SpotlightCard>

          {/* LinkedIn Card */}
          <SpotlightCard accent="cyan" maxTilt={7} className="rounded-2xl p-5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="chip-accent flex h-10 w-10 items-center justify-center rounded-xl">
                  <LinkedInIcon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-400" />
              </div>
              <div className="mt-4 font-mono text-xs uppercase tracking-wider text-slate-400">
                LinkedIn Profile
              </div>
              <div className="mt-1 text-sm font-semibold text-white transition group-hover:text-sky-400">
                /in/mohd-sufiyan-it
              </div>
            </a>
          </SpotlightCard>

          {/* GitHub Card */}
          <SpotlightCard accent="amber" maxTilt={7} className="rounded-2xl p-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="chip-amber flex h-10 w-10 items-center justify-center rounded-xl">
                  <GitHubIcon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" />
              </div>
              <div className="mt-4 font-mono text-xs uppercase tracking-wider text-slate-400">
                GitHub Repositories
              </div>
              <div className="mt-1 text-sm font-semibold text-white transition group-hover:text-amber-400">
                github.com/mohdsufiyaan
              </div>
            </a>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
