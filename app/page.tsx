import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  Cpu,
  Download,
  Eye,
  GraduationCap,
  MapPin,
  Shield,
  Sparkles,
  Terminal,
  Trophy,
  Zap,
} from "lucide-react";
import {
  achievements,
  experience,
  faqs,
  heroMetrics,
  origin,
  profile,
  profiles,
  projects,
  skillGroups,
} from "./data";
import { getGitHubPortfolioData } from "../lib/github";
import { HeroScene } from "../components/HeroScene";
import { Reveal } from "../components/Reveal";
import {
  AnimatedStat,
  ScrollDepthFrame,
  ScrollParallax,
  ScrollTimelineWrapper,
  TiltSpotlightCard,
} from "../components/ScrollMotion";
import { SkillsShowcase } from "../components/SkillsShowcase";
import { ProjectsShowcase } from "../components/ProjectsShowcase";
import { D3ArchitectureBlueprints } from "../components/D3ArchitectureBlueprints";
import { D3GitHubShowcase } from "../components/D3GitHubShowcase";
import { ArchitectureShowcase } from "../components/ArchitectureShowcase";
import { ContactHub } from "../components/ContactHub";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Fluid full-width container for all page sections (while keeping Navbar header at max-w-7xl)
const CONTAINER =
  "mx-auto w-full max-w-[1680px] px-4 sm:px-8 lg:px-14 xl:px-20";

export default async function HomePage() {
  const githubData = await getGitHubPortfolioData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: `${profile.name} — Senior Software Engineer Portfolio`,
        description: profile.summary,
        inLanguage: "en-US",
        publisher: { "@id": `${origin}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${origin}/#profilepage`,
        url: origin,
        name: `${profile.name} — Senior Software Engineer | Full-Stack & AI Systems`,
        isPartOf: { "@id": `${origin}/#website` },
        mainEntity: { "@id": `${origin}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${origin}/#person`,
        name: profile.name,
        jobTitle: profile.role,
        description: profile.summary,
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        url: origin,
        sameAs: profiles,
        hasOccupation: {
          "@type": "Occupation",
          name: "Senior Software Engineer",
          occupationLocation: {
            "@type": "City",
            name: "Noida, India",
          },
          skills:
            "Laravel 12, PHP 8.2, Node.js, Express 5, Next.js 16, React Native, TypeScript, Hybrid RAG, LLM Agents, Pinecone, PostgreSQL, MySQL 8, Redis, Socket.IO, BullMQ, AWS",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Noida",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        worksFor: {
          "@type": "Organization",
          name: "Adtric Solution Pvt. Ltd.",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: profile.education.institution,
        },
        award: [
          "Developer of the Year 2024 — I3 Infosoft",
          "Vintage Warrior — I3 Infosoft",
          "GemsBond — 4Achievers",
        ],
        knowsAbout: skillGroups.flatMap((g) => g.items.map((i) => i.name)),
      },
      {
        "@type": "ItemList",
        "@id": `${origin}/#projects-list`,
        name: "Featured Software Engineering & AI Architecture Case Studies",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.name,
          description: project.summary,
          url: `${origin}/projects/${project.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${origin}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <main id="main" className="relative overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient Top Grid + Aurora Layer */}
      <div
        aria-hidden="true"
        className="aurora-hero bg-grid-pattern pointer-events-none absolute inset-x-0 top-0 h-[920px] [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
      />

      {/* ================================================================
          1. HERO SECTION (3D Neural Core + Impact Telemetry Strip)
      ================================================================ */}
      <section
        aria-label="Introduction"
        className={`relative ${CONTAINER} pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-36`}
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Narrative */}
          <div className="lg:col-span-7">
            <Reveal delay={0.02} direction="left">
              <div className="chip-accent inline-flex flex-wrap items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span>{profile.role}</span>
                <span className="opacity-50">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Noida, India
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08} direction="up">
              <h1 className="mt-6 text-3xl font-semibold tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                Engineering{" "}
                <span className="text-gradient-hero">Scalable Platforms</span>
                <br />
                &amp; Autonomous AI Systems.
              </h1>
            </Reveal>

            <Reveal delay={0.14} direction="up">
              <p className="mt-6 max-w-[60ch] text-base leading-[1.7] text-slate-300 sm:text-lg">
                I&apos;m{" "}
                <strong className="font-semibold text-white">
                  {profile.name}
                </strong>
                , a full-stack engineer with{" "}
                <strong className="font-semibold text-white">5.5+ years</strong>{" "}
                architecting production Laravel, Node.js, Next.js, and React
                Native systems—from horizontally scaled WebSocket &amp; queue
                backends to a{" "}
                <span className="font-medium text-sky-400">
                  39-tool Autonomous LLM Agent
                </span>{" "}
                and Hybrid RAG pipelines.
              </p>
            </Reveal>

            <Reveal delay={0.2} direction="up">
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#skills"
                  className="btn-cool-primary inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                >
                  Explore Skills
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/resume"
                  className="btn-cool-secondary inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                >
                  <Eye className="h-4 w-4 text-sky-400" />
                  Review Resume PDF
                </Link>

                <a
                  href={profile.resumePath}
                  download="Mohd_Sufiyan_Resume.pdf"
                  className="btn-cool-ghost inline-flex min-h-[46px] items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
                >
                  <Download className="h-4 w-4 text-sky-400" />
                  Download
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Interactive 3D Neural Systems Core */}
          <Reveal delay={0.14} direction="scale" className="lg:col-span-5">
            <ScrollParallax offset={24}>
              <HeroScene />
            </ScrollParallax>
          </Reveal>
        </div>

        {/* Animated Impact Telemetry Strip (Three.js Corner-Bow Cards) */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroMetrics.map((metric, idx) => (
            <Reveal key={metric.label} delay={0.05 * idx} direction="up">
              <TiltSpotlightCard
                accent={
                  idx === 1
                    ? "amber"
                    : idx === 2
                      ? "emerald"
                      : idx === 3
                        ? "violet"
                        : "cyan"
                }
                maxTilt={7.5}
                className="h-full rounded-2xl p-5"
              >
                <div className="font-mono text-3xl font-bold tracking-tight text-white sm:text-[2.15rem]">
                  <AnimatedStat
                    target={metric.numericTarget}
                    prefix={metric.prefix ?? ""}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                    fallback={metric.value}
                  />
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-200">
                  {metric.label}
                </div>
                <div className="mt-1 font-mono text-xs text-slate-400">
                  {metric.detail}
                </div>
              </TiltSpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================================================
          2. HIGHLIGHTED TECHNICAL SKILLS + D3.JS FORCE NETWORK
      ================================================================ */}
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className={`${CONTAINER} border-t border-white/[0.08] py-16 sm:py-20 lg:py-24`}
      >
        <Reveal direction="up">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
                01 // Highlighted Skills &amp; D3.js Physics Network
              </p>
              <h2
                id="skills-heading"
                className="mt-2.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
              >
                Core Engineering{" "}
                <span className="text-gradient-cyan">
                  Skills &amp; Capabilities.
                </span>
              </h2>
            </div>
            <p className="max-w-[42ch] text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Click any highlighted specialty card, drag floating physics nodes
              in the D3.js network, or filter by engineering domain.
            </p>
          </div>
        </Reveal>

        <ScrollDepthFrame>
          <SkillsShowcase />
        </ScrollDepthFrame>
      </section>

      {/* ================================================================
          3. ABOUT ME & ENGINEERING PHILOSOPHY
      ================================================================ */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className={`${CONTAINER} border-t border-white/[0.08] py-16 sm:py-20 lg:py-24`}
      >
        <Reveal direction="left">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
              02 // About &amp; Philosophy
            </p>
            <h2
              id="about-heading"
              className="mt-2.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
            >
              Systems engineered for{" "}
              <span className="text-gradient-cyan">production reality.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal direction="left" className="lg:col-span-7">
            <TiltSpotlightCard
              accent="cyan"
              maxTilt={4.5}
              className="h-full rounded-3xl p-6 sm:p-8"
            >
              <div className="chip-accent inline-flex items-center gap-2 rounded-lg px-3 py-1 font-mono text-xs font-medium">
                <Terminal className="h-3.5 w-3.5" />
                5.5+ Years Full-Stack Progression
              </div>

              <p className="mt-5 text-lg font-medium leading-relaxed text-white sm:text-xl">
                My engineering journey evolved from building high-traffic
                publishing marketplaces, B2B CRM/LMS suites, and job portals to
                architecting horizontally scaled real-time platforms and
                autonomous multi-tool enterprise AI agents.
              </p>

              <p className="mt-4 text-sm leading-[1.7] text-slate-300 sm:text-base">
                Across roles at{" "}
                <strong className="font-semibold text-white">
                  I3 Infosoft Pvt. Ltd.
                </strong>{" "}
                and{" "}
                <strong className="font-semibold text-white">
                  Adtric Solution Pvt. Ltd.
                </strong>
                , I have owned full delivery lifecycles—schema design and
                composite indexing, secure REST &amp; WebSocket APIs, OAuth 2.0
                enterprise connectors, AWS CloudFront/S3 infrastructure, and
                production observability.
              </p>

              <p className="mt-4 text-sm leading-[1.7] text-slate-300 sm:text-base">
                I design around real-world failure modes: two workers mutating
                the same row simultaneously, an upstream LLM hitting 429/402
                limits mid-workflow, or slow email/notification jobs blocking
                checkout responses. Those edge cases shape the locks, queues,
                circuit breakers, and zero-trust permissions I ship.
              </p>

              <div className="mt-7 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
                <div className="surface-subcard rounded-xl p-3.5">
                  <div className="font-mono text-xs font-semibold text-sky-400">
                    Backend Core
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    Laravel 12 &amp; Node.js
                  </div>
                </div>
                <div className="surface-subcard rounded-xl p-3.5">
                  <div className="font-mono text-xs font-semibold text-amber-400">
                    Applied AI
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    Hybrid RAG &amp; Agents
                  </div>
                </div>
                <div className="surface-subcard rounded-xl p-3.5">
                  <div className="font-mono text-xs font-semibold text-emerald-400">
                    Scale &amp; Ops
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    Redis · BullMQ · AWS
                  </div>
                </div>
              </div>
            </TiltSpotlightCard>
          </Reveal>

          <div className="grid gap-6 lg:col-span-5">
            <Reveal delay={0.08} direction="right">
              <TiltSpotlightCard
                accent="amber"
                maxTilt={5.5}
                className="rounded-3xl p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="chip-amber flex h-10 w-10 items-center justify-center rounded-xl">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Engineering Principles
                  </h3>
                </div>
                <ul className="mt-4 space-y-3.5 text-sm leading-relaxed text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <span>
                      <strong className="text-white">Design for failure:</strong>{" "}
                      circuit breakers, idempotent retries, and row-level locking
                      built in from day one.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span>
                      <strong className="text-white">
                        Grounded AI, not hype:
                      </strong>{" "}
                      verify LLM claims against tool results, enforce RBAC on
                      every tool, and optimize token budgets.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>
                      <strong className="text-white">
                        Measurable reliability:
                      </strong>{" "}
                      structured Pino logs, Prometheus telemetry, and automated
                      PHPUnit/Pest &amp; Vitest suites.
                    </span>
                  </li>
                </ul>
              </TiltSpotlightCard>
            </Reveal>

            <Reveal delay={0.14} direction="right">
              <TiltSpotlightCard
                accent="emerald"
                maxTilt={5.5}
                className="rounded-3xl p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="chip-emerald flex h-10 w-10 items-center justify-center rounded-xl">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Education &amp; Honors
                      </div>
                      <h3 className="text-base font-semibold text-white">
                        {profile.education.degree}
                      </h3>
                    </div>
                  </div>
                  <span className="chip-neutral rounded-lg px-2.5 py-1 font-mono text-xs">
                    {profile.education.period}
                  </span>
                </div>
                <p className="mt-2.5 text-sm text-slate-300">
                  {profile.education.institution}
                </p>
                <div className="chip-amber mt-4 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-medium">
                  <Trophy className="h-4 w-4 shrink-0" />
                  <span>
                    Developer of the Year 2024 · Vintage Warrior · GemsBond
                  </span>
                </div>
              </TiltSpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. FLAGSHIP ARCHITECTURE STUDIO (4-LAYER D3.JS SYSTEM DIAGRAMS)
      ================================================================ */}
      <section
        id="flagship-studio"
        aria-labelledby="studio-heading"
        className={`${CONTAINER} border-t border-white/[0.08] py-16 sm:py-20 lg:py-24`}
      >
        <Reveal direction="up">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
                03 // Interactive 4-Layer D3.js System Blueprints
              </p>
              <h2
                id="studio-heading"
                className="mt-2.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
              >
                Flagship Systems{" "}
                <span className="text-gradient-cyan">
                  Architecture Studio.
                </span>
              </h2>
            </div>
            <p className="max-w-[44ch] text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Switch across 3 flagship platforms and 4 D3.js architectural views
              (<strong className="text-slate-200">High-Level Flow</strong>,{" "}
              <strong className="text-slate-200">Auth &amp; Security</strong>,{" "}
              <strong className="text-slate-200">DB &amp; Caching</strong>,{" "}
              <strong className="text-slate-200">Real-Time &amp; Failover</strong>
              ). Click any node to inspect its codebase implementation.
            </p>
          </div>
        </Reveal>

        <ScrollDepthFrame>
          <D3ArchitectureBlueprints />
        </ScrollDepthFrame>
      </section>

      {/* ================================================================
          5. FEATURED PROJECTS & CASE STUDIES
      ================================================================ */}
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className={`${CONTAINER} border-t border-white/[0.08] py-16 sm:py-20 lg:py-24`}
      >
        <Reveal direction="up">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
                04 // Production Systems &amp; Case Studies
              </p>
              <h2
                id="projects-heading"
                className="mt-2.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
              >
                Featured <span className="text-gradient-cyan">Projects.</span>
              </h2>
            </div>
            <p className="max-w-[42ch] text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Switch between Overview, Challenge, Architecture, and Impact on
              any flagship system, or open the full case study.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05} direction="up">
          <ProjectsShowcase />
        </Reveal>
      </section>

      {/* ================================================================
          6. PROFESSIONAL EXPERIENCE
      ================================================================ */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className={`${CONTAINER} border-t border-white/[0.08] py-16 sm:py-20 lg:py-24`}
      >
        <Reveal direction="left">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
              05 // Career Trajectory
            </p>
            <h2
              id="experience-heading"
              className="mt-2.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
            >
              Professional{" "}
              <span className="text-gradient-cyan">Experience.</span>
            </h2>
          </div>
        </Reveal>

        <ScrollTimelineWrapper>
          {experience.map((job, idx) => (
            <Reveal key={job.company} delay={idx * 0.08} direction="up">
              <article className="relative md:pl-14">
                <span
                  aria-hidden="true"
                  className={`absolute left-[13px] top-8 hidden h-4 w-4 rounded-full border-2 md:block ${
                    job.current
                      ? "border-sky-200 bg-sky-400 shadow-[0_0_20px_#38bdf8]"
                      : "border-amber-300 bg-amber-400 shadow-[0_0_16px_rgba(251,146,60,0.65)]"
                  }`}
                />

                <TiltSpotlightCard
                  accent={job.current ? "cyan" : "emerald"}
                  maxTilt={3.2}
                  className="rounded-3xl p-6 sm:p-8"
                >
                  <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="chip-accent inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-medium">
                          <Briefcase className="h-3.5 w-3.5" />
                          {job.role}
                        </span>
                        {job.current && (
                          <span className="chip-emerald inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Current Role
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {job.company}
                      </h3>
                      <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                        {job.summary}
                      </p>
                    </div>

                    <div className="shrink-0 font-mono text-xs text-slate-400 sm:text-right">
                      <div className="text-sm font-semibold text-white">
                        {job.period}
                      </div>
                      <div className="mt-1">{job.location}</div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3.5 md:grid-cols-2">
                    {job.highlights.map((item, hIdx) => {
                      const isLastOdd =
                        job.highlights.length % 2 === 1 &&
                        hIdx === job.highlights.length - 1;
                      return (
                        <div
                          key={item.title}
                          className={`surface-subcard rounded-2xl p-4 ${
                            isLastOdd ? "md:col-span-2" : ""
                          }`}
                        >
                          <h4 className="text-sm font-semibold text-white sm:text-[15px]">
                            {item.title}
                          </h4>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                            {item.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {job.recognition && (
                    <div className="chip-amber mt-5 flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs font-medium sm:text-sm">
                      <Award className="h-4 w-4 shrink-0" />
                      <span>Recognition: {job.recognition}</span>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-5">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="chip-neutral rounded-lg px-2.5 py-1 font-mono text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TiltSpotlightCard>
              </article>
            </Reveal>
          ))}
        </ScrollTimelineWrapper>
      </section>

      {/* ================================================================
          7. LIVE GITHUB CONTRIBUTIONS & PRIVATE SYSTEMS (D3.JS)
      ================================================================ */}
      <section
        id="github"
        aria-labelledby="github-heading"
        className={`${CONTAINER} border-t border-white/[0.08] py-16 sm:py-20 lg:py-24`}
      >
        <Reveal direction="up">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
                06 // Exact GitHub Profile Calendar &amp; Private Systems
              </p>
              <h2
                id="github-heading"
                className="mt-2.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
              >
                GitHub Contributions &amp;{" "}
                <span className="text-gradient-cyan">Private Systems.</span>
              </h2>
            </div>
            <p className="max-w-[42ch] text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Live 52-week contribution square calendar synced directly from
              GitHub while keeping private client repositories confidential.
            </p>
          </div>
        </Reveal>

        <ScrollDepthFrame>
          <D3GitHubShowcase data={githubData} />
        </ScrollDepthFrame>
      </section>

      {/* ================================================================
          8. ENGINEERING & ARCHITECTURE DEEP DIVE
      ================================================================ */}
      <section
        id="architecture"
        aria-labelledby="architecture-heading"
        className={`${CONTAINER} border-t border-white/[0.08] py-16 sm:py-20 lg:py-24`}
      >
        <Reveal direction="left">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
              07 // Engineering &amp; System Architecture
            </p>
            <h2
              id="architecture-heading"
              className="mt-2.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
            >
              How I architect for{" "}
              <span className="text-gradient-cyan">
                scale, safety &amp; speed.
              </span>
            </h2>
          </div>
        </Reveal>

        <ScrollDepthFrame>
          <ArchitectureShowcase />
        </ScrollDepthFrame>
      </section>

      {/* ================================================================
          9. ACHIEVEMENTS, HONORS & HIGHLIGHTS
      ================================================================ */}
      <section
        id="achievements"
        aria-labelledby="achievements-heading"
        className={`${CONTAINER} border-t border-white/[0.08] py-16 sm:py-20 lg:py-24`}
      >
        <Reveal direction="up">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-400">
              08 // Recognition &amp; Measurable Outcomes
            </p>
            <h2
              id="achievements-heading"
              className="mt-2.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
            >
              Awards &amp;{" "}
              <span className="text-gradient-cyan">Career Highlights.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.05} direction="scale">
              <TiltSpotlightCard
                accent={
                  item.category === "Honor"
                    ? "amber"
                    : item.category === "Education"
                      ? "emerald"
                      : "cyan"
                }
                maxTilt={6.5}
                className="flex h-full flex-col justify-between rounded-2xl p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                        item.category === "Honor"
                          ? "chip-amber"
                          : item.category === "Education"
                            ? "chip-emerald"
                            : "chip-accent"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <div className="mt-1 font-mono text-xs text-slate-400">
                    {item.organization}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </div>
              </TiltSpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================================================
          10. DIRECT CONTACT HUB
      ================================================================ */}
      <section
        id="contact"
        aria-label="Direct Contact"
        className={`${CONTAINER} border-t border-white/[0.08] py-16 sm:py-20 lg:py-24`}
      >
        <ScrollDepthFrame>
          <ContactHub />
        </ScrollDepthFrame>
      </section>
    </main>
  );
}
