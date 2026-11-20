"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";
import { profile } from "../app/data";
import { SpotlightCard } from "./Reveal";

export function ContactHub() {
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
    <div className="contact-hub-shell relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-gradient-to-br from-[#0b1324] via-[#070c17] to-[#0a101d] p-6 sm:p-10 lg:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/18 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-12 h-64 w-64 rounded-full bg-orange-500/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
        {/* Left Direct Pitch */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 font-mono text-xs text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            Direct Channels · Instant Reach
          </div>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s build{" "}
            <span className="text-gradient-cyan">resilient systems.</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            Hiring for a Senior Full-Stack or AI Systems role, or architecting a
            production Laravel, Node.js, Next.js, or RAG platform? Skip the
            contact forms—reach out directly by email, phone, or LinkedIn.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-slate-950/60 px-3 py-1.5 text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-sky-400" />
              {profile.location}
            </span>
            <span className="rounded-lg border border-white/[0.08] bg-slate-950/60 px-3 py-1.5">
              {profile.timezone}
            </span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn-cool-primary preserve-dark inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              <Mail className="h-4 w-4" />
              Email Mohd Sufiyan
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={profile.resumePath}
              download
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-white/[0.14] bg-slate-950/70 px-5 py-3 text-sm font-medium text-white transition hover:border-sky-400/50"
            >
              <Download className="h-4 w-4 text-sky-400" />
              Download Resume PDF
            </a>
          </div>
        </div>

        {/* Right Verified Direct Channels Grid (No Form) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {/* Email Card */}
          <SpotlightCard accent="cyan" className="rounded-2xl p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300">
                <Mail className="h-5 w-5" />
              </div>
              <button
                type="button"
                onClick={() => copyValue(profile.email, "email")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-slate-950/70 px-2.5 py-1.5 font-mono text-[11px] text-slate-300 transition hover:border-sky-400/45 hover:text-white"
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
            <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-slate-400">
              Primary Email
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 block break-all text-sm font-semibold text-white transition hover:text-sky-300"
            >
              {profile.email}
            </a>
          </SpotlightCard>

          {/* Phone Card */}
          <SpotlightCard accent="emerald" className="rounded-2xl p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                <Phone className="h-5 w-5" />
              </div>
              <button
                type="button"
                onClick={() => copyValue(profile.phone, "phone")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-slate-950/70 px-2.5 py-1.5 font-mono text-[11px] text-slate-300 transition hover:border-emerald-400/45 hover:text-white"
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
            <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-slate-400">
              Direct Phone
            </div>
            <a
              href={profile.phoneHref}
              className="mt-1 block text-sm font-semibold text-white transition hover:text-emerald-300"
            >
              {profile.phone}
            </a>
          </SpotlightCard>

          {/* LinkedIn Card */}
          <SpotlightCard accent="cyan" className="rounded-2xl p-5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300">
                  <LinkedInIcon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-300" />
              </div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                LinkedIn Profile
              </div>
              <div className="mt-1 text-sm font-semibold text-white transition group-hover:text-sky-300">
                /in/mohd-sufiyan-it
              </div>
            </a>
          </SpotlightCard>

          {/* GitHub Card */}
          <SpotlightCard accent="amber" className="rounded-2xl p-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/30 bg-orange-400/10 text-orange-300">
                  <GitHubIcon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-300" />
              </div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                GitHub Repositories
              </div>
              <div className="mt-1 text-sm font-semibold text-white transition group-hover:text-orange-300">
                github.com/mohdsufiyaan
              </div>
            </a>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
