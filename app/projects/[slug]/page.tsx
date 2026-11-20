import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  Mail,
  Target,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { origin, profile, projects } from "../../data";
import { ProjectDiagram } from "../../../components/ProjectDiagram";
import { D3ArchitectureBlueprints } from "../../../components/D3ArchitectureBlueprints";
import { TiltSpotlightCard } from "../../../components/ScrollMotion";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

async function resolveProject(params: PageProps["params"]) {
  const { slug } = await params;
  return projects.find((p) => p.slug === slug) ?? notFound();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = await resolveProject(params);
  return {
    title: `${project.name} — System Architecture Case Study`,
    description: project.summary,
    keywords: [
      project.shortName,
      project.category,
      profile.name,
      "System Design Case Study",
      ...project.tech.slice(0, 8),
    ],
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Case Study | ${profile.name}`,
      description: project.summary,
      url: `${origin}/projects/${project.slug}`,
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${project.name} — Architecture Case Study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.shortName} — Architecture Case Study`,
      description: project.tagline,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await resolveProject(params);
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: origin,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${origin}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: `${origin}/projects/${project.slug}`,
          },
        ],
      },
      {
        "@type": "TechArticle",
        headline: project.name,
        description: project.summary,
        url: `${origin}/projects/${project.slug}`,
        proficiencyLevel: "Expert",
        keywords: project.tech.join(", "),
        author: {
          "@type": "Person",
          name: profile.name,
          url: origin,
        },
        about: {
          "@type": "SoftwareApplication",
          name: project.shortName,
          applicationCategory: project.category,
          operatingSystem: "Web, Cloud, Mobile",
        },
      },
    ],
  };

  return (
    <main
      id="main"
      className="relative mx-auto w-full max-w-[1600px] px-4 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-14 xl:px-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-slate-900/60 px-3.5 py-2 font-mono text-xs text-slate-300 transition hover:border-sky-400/40 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sky-300">
            {project.category}
          </span>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">
            {project.status}
          </span>
          <span className="text-slate-400">
            {project.company} · {project.period}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {project.name}
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cool-primary preserve-dark inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
            >
              Visit Live Platform
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(`Regarding ${project.shortName}`)}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.14] bg-slate-900/75 px-5 py-2.5 text-sm font-medium text-white transition hover:border-sky-400/50"
          >
            <Mail className="h-4 w-4 text-sky-400" />
            Discuss This Architecture
          </a>
          <a
            href={profile.resumePath}
            download
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/[0.2] hover:text-white"
          >
            <Download className="h-4 w-4 text-sky-400" />
            Resume PDF
          </a>
        </div>
      </div>

      {/* Visual Architecture Schematic or Interactive D3 Blueprint Studio */}
      <div className="mt-10">
        {project.slug === "enterprise-ai-operations" ? (
          <D3ArchitectureBlueprints initialSystem="ai-agent" />
        ) : project.slug === "real-time-booking-platform" ? (
          <D3ArchitectureBlueprints initialSystem="realtime-platform" />
        ) : project.slug === "realtime-mobile-suite" ? (
          <D3ArchitectureBlueprints initialSystem="mobile-suite" />
        ) : (
          <ProjectDiagram type={project.diagramType} />
        )}
      </div>

      {/* Key Metrics */}
      <div
        className={`mt-8 grid gap-4 ${
          project.impactMetrics.length === 2
            ? "sm:grid-cols-2"
            : "sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {project.impactMetrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-white/[0.08] bg-slate-950/70 p-4"
          >
            <div className="font-mono text-xl font-bold text-white">
              {m.value}
            </div>
            <div className="mt-1 text-xs text-slate-400">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Deep Engineering Narrative: Challenge -> Solution -> Impact */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <TiltSpotlightCard accent="amber" maxTilt={3} className="rounded-2xl p-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-orange-300">
            <Target className="h-4 w-4" />
            Challenge
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {project.challenge}
          </p>
        </TiltSpotlightCard>

        <TiltSpotlightCard accent="cyan" maxTilt={3} className="rounded-2xl p-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-300">
            <Wrench className="h-4 w-4" />
            Engineering Solution
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {project.solution}
          </p>
        </TiltSpotlightCard>

        <TiltSpotlightCard accent="emerald" maxTilt={3} className="rounded-2xl p-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-300">
            <TrendingUp className="h-4 w-4" />
            Verified Impact
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {project.impact}
          </p>
        </TiltSpotlightCard>
      </div>

      {/* 4-Stage Delivery Progression */}
      <section className="mt-12" aria-labelledby="delivery-heading">
        <h2
          id="delivery-heading"
          className="text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          Delivery Progression &amp; Milestones
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {project.deliveryStages.map((stage, idx) => (
            <div
              key={stage.stage}
              className="rounded-2xl border border-white/[0.08] bg-slate-950/65 p-4"
            >
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-sky-300">STAGE 0{idx + 1}</span>
                <span className="text-emerald-400">Shipped</span>
              </div>
              <div className="mt-2 text-sm font-semibold text-white">
                {stage.stage}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                {stage.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Highlight Callout */}
      <TiltSpotlightCard accent="cyan" maxTilt={2.5} className="mt-10 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-sky-300">
          <Cpu className="h-4 w-4" />
          Core Architectural Strategy
        </div>
        <p className="mt-3 text-base leading-relaxed text-slate-200">
          {project.architectureHighlight}
        </p>
      </TiltSpotlightCard>

      {/* Detailed Engineering Contributions */}
      <section className="mt-12" aria-labelledby="contributions-heading">
        <h2
          id="contributions-heading"
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          Engineering Contributions &amp; Implementation
        </h2>
        <ul className="mt-6 space-y-3.5">
          {project.contributions.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3.5 rounded-2xl border border-white/[0.08] bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-200 sm:p-5 sm:text-base"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Full Technology Matrix */}
      <section className="mt-12" aria-labelledby="stack-heading">
        <h2
          id="stack-heading"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Technology Stack
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-xl border border-sky-400/20 bg-sky-400/[0.08] px-3.5 py-1.5 font-mono text-xs text-sky-200"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Next Case Study Navigation */}
      <div className="mt-16 border-t border-white/[0.08] pt-8">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-slate-950/70 p-6 transition hover:border-sky-400/40"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-slate-400">
              Next Case Study
            </div>
            <div className="mt-1 text-lg font-semibold text-white transition group-hover:text-sky-300 sm:text-xl">
              {nextProject.name}
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-300" />
        </Link>
      </div>
    </main>
  );
}
