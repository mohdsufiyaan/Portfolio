import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  achievements,
  experience,
  heroMetrics,
  origin,
  profile,
  projects,
  skillGroups,
} from "../data";
import { ResumeViewer } from "../../components/ResumeViewer";
import { TiltSpotlightCard } from "../../components/ScrollMotion";
import { GitHubIcon, LinkedInIcon } from "../../components/SocialIcons";

export const metadata: Metadata = {
  title: "Resume & Interactive PDF Studio",
  description: `Review, search, zoom, and download ${profile.name}'s latest Senior Software Engineer resume (${profile.experienceYears} years — Laravel 12, Node.js, Next.js, React Native, Hybrid RAG & Autonomous AI Agents).`,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `${profile.name} — Interactive Resume PDF Studio`,
    description: profile.summary,
    url: `${origin}/resume`,
    type: "profile",
  },
};

const FLUID_CONTAINER =
  "mx-auto w-full max-w-[1680px] px-4 sm:px-8 lg:px-14 xl:px-20";

export default function ResumePage() {
  const flagshipProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <main
      id="main"
      className={`relative ${FLUID_CONTAINER} pb-24 pt-28 sm:pt-32`}
    >
      {/* Top Breadcrumb Action */}
      <Link
        href="/"
        className="btn-cool-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Portfolio
      </Link>

      {/* Case-Study Style Resume Header */}
      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
          <span className="chip-accent rounded-full px-3 py-1 font-medium">
            {profile.role}
          </span>
          <span className="chip-emerald inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {profile.experienceYears} Years Production Experience
          </span>
          <span className="inline-flex items-center gap-1 text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            {profile.location} · {profile.timezone}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12]">
          {profile.name} —{" "}
          <span className="text-gradient-cyan">Interactive Resume Studio.</span>
        </h1>

        <p className="mt-4 max-w-[72ch] text-base leading-[1.7] text-slate-300 sm:text-lg">
          {profile.summary}
        </p>

        {/* Direct Recruiter Action Row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={profile.resumePath}
            download="Mohd_Sufiyan_Resume.pdf"
            className="btn-cool-primary inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
          >
            <Download className="h-4 w-4" />
            Download PDF Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="btn-cool-secondary inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
          >
            <Mail className="h-4 w-4 text-sky-400" />
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="btn-cool-secondary inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            <Phone className="h-4 w-4 text-emerald-400" />
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cool-ghost inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            <LinkedInIcon className="h-4 w-4 text-sky-400" />
            LinkedIn
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cool-ghost inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            <GitHubIcon className="h-4 w-4 text-amber-400" />
            GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* 4 Impact Metric Cards (matching Case Study layout) */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {heroMetrics.map((m, idx) => (
          <TiltSpotlightCard
            key={m.label}
            accent={
              idx === 1
                ? "amber"
                : idx === 2
                  ? "emerald"
                  : idx === 3
                    ? "violet"
                    : "cyan"
            }
            className="rounded-2xl p-5"
          >
            <div className="font-mono text-2xl font-bold text-white sm:text-3xl">
              {m.value}
            </div>
            <div className="mt-1.5 text-sm font-semibold text-slate-200">
              {m.label}
            </div>
            <div className="mt-1 font-mono text-xs text-slate-400">
              {m.detail}
            </div>
          </TiltSpotlightCard>
        ))}
      </div>

      {/* Interactive Feature-Rich PDF Viewer Studio */}
      <section className="mt-10" aria-label="Interactive Resume PDF Viewer">
        <ResumeViewer />
      </section>

      {/* Structured ATS & Recruiter Executive Breakdown */}
      <section className="mt-14" aria-labelledby="ats-breakdown-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
              Structured Recruiter &amp; ATS Snapshot
            </p>
            <h2
              id="ats-breakdown-heading"
              className="mt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Experience, Core Stack &amp; Honors at a Glance
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400">
            Synced directly with the PDF above
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Experience Highlights */}
          <div className="space-y-5 lg:col-span-7">
            {experience.map((job) => (
              <TiltSpotlightCard
                key={job.company}
                accent={job.current ? "cyan" : "emerald"}
                className="rounded-3xl p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip-accent inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-semibold">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.role}
                      </span>
                      {job.current && (
                        <span className="chip-emerald rounded-full px-2.5 py-0.5 font-mono text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2.5 text-xl font-semibold text-white">
                      {job.company}
                    </h3>
                  </div>
                  <div className="font-mono text-xs text-slate-400 sm:text-right">
                    <div className="text-sm font-semibold text-white">
                      {job.period}
                    </div>
                    <div>{job.location}</div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((h) => (
                    <li
                      key={h.title}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>
                        <strong className="text-white">{h.title}:</strong>{" "}
                        {h.detail}
                      </span>
                    </li>
                  ))}
                </ul>

                {job.recognition && (
                  <div className="chip-amber mt-4 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium">
                    <Award className="h-4 w-4 shrink-0" />
                    <span>{job.recognition}</span>
                  </div>
                )}
              </TiltSpotlightCard>
            ))}
          </div>

          {/* Right Column: Core Skills + Education + Awards */}
          <div className="space-y-5 lg:col-span-5">
            <TiltSpotlightCard accent="cyan" className="rounded-3xl p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                <Sparkles className="h-4 w-4" />
                Core Technical Matrix
              </div>
              <div className="mt-4 space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.id}>
                    <div className="text-xs font-semibold text-white">
                      {group.title}
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item.name}
                          className="chip-neutral rounded-lg px-2.5 py-1 font-mono text-xs"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TiltSpotlightCard>

            <TiltSpotlightCard accent="emerald" className="rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <div className="chip-emerald flex h-10 w-10 items-center justify-center rounded-xl">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Education
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {profile.education.degree}
                  </h3>
                </div>
              </div>
              <p className="mt-2.5 text-sm text-slate-300">
                {profile.education.institution} ({profile.education.period})
              </p>

              <div className="mt-5 border-t border-white/[0.08] pt-4">
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Awards &amp; Recognition
                </div>
                <ul className="mt-2.5 space-y-2">
                  {achievements.slice(0, 3).map((a) => (
                    <li
                      key={a.title}
                      className="surface-subcard rounded-xl px-3.5 py-2.5 text-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white">
                          {a.title}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          {a.year}
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs text-slate-400">
                        {a.organization}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltSpotlightCard>
          </div>
        </div>
      </section>

      {/* Flagship Case Studies Jump Strip */}
      <section
        className="mt-14 border-t border-white/[0.08] pt-10"
        aria-labelledby="related-case-studies"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h2
            id="related-case-studies"
            className="text-xl font-semibold tracking-tight text-white sm:text-2xl"
          >
            Explore Flagship Architecture Case Studies
          </h2>
          <Link
            href="/#projects"
            className="font-mono text-xs font-semibold text-sky-400 transition hover:text-sky-300"
          >
            View All {projects.length} Projects →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {flagshipProjects.map((project, idx) => (
            <TiltSpotlightCard
              key={project.slug}
              accent={idx === 1 ? "amber" : idx === 2 ? "emerald" : "cyan"}
              className="rounded-2xl"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col justify-between p-5"
              >
                <div>
                  <span className="chip-accent rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-white transition group-hover:text-sky-400">
                    {project.shortName}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {project.tagline}
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-sky-400">
                  Open Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </Link>
            </TiltSpotlightCard>
          ))}
        </div>
      </section>
    </main>
  );
}
