import Link from "next/link";
import {
  Award,
  Briefcase,
  Download,
  Eye,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";
import {
  achievements,
  experience,
  heroMetrics,
  heroSkills,
  profile,
} from "../app/data";
import { HeroScene } from "./HeroScene";
import { Reveal } from "./Reveal";

const quickLinks = [
  { href: "#skills", label: "All skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

const buttonBase =
  "inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold sm:px-5";

export function HeroBanner({ className = "" }: { className?: string }) {
  const [current, ...previous] = experience;
  const award = achievements[0];
  // Total years already leads the banner, so it is not repeated here
  const impact = heroMetrics.filter(
    (metric) => metric.value !== profile.experienceYears,
  );

  const facts = [
    {
      icon: Briefcase,
      label: "Current",
      title: `${current.role}, ${current.company}`,
      detail: current.period,
    },
    ...previous.map((job) => ({
      icon: Briefcase,
      label: "Previous",
      title: `${job.role}, ${job.company}`,
      detail: job.period,
    })),
    {
      icon: GraduationCap,
      label: "Education",
      title: profile.education.degree,
      detail: profile.education.period,
    },
    {
      icon: Award,
      label: "Award",
      title: award.title,
      detail: award.organization,
    },
  ];

  return (
    <section
      aria-label="Introduction"
      className={`relative pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pt-32 ${className}`}
    >
      {/* Left: intro and core skills. Right: animated skill graph. */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 space-y-8 lg:col-span-7">
          <Reveal direction="up">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-sky-400" />
                {profile.location}
              </span>
              <span className="font-semibold text-white">
                {profile.experienceYears} years of experience
              </span>
            </p>

            <h1 className="mt-4 text-[clamp(2.5rem,9vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              {profile.name}
            </h1>
            <p className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
              <span className="text-gradient-hero">
                {profile.role} · Full-Stack &amp; AI Systems
              </span>
            </p>

            <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.7] text-slate-300 sm:text-[17px]">
              I build production Laravel, Node.js, Next.js and React Native
              systems, from real-time WebSocket and queue backends to a 39-tool
              autonomous LLM agent with Hybrid RAG.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/resume"
                className={`btn-cool-primary col-span-2 ${buttonBase}`}
              >
                <Eye className="h-4 w-4" />
                View Resume
              </Link>
              <a
                href={profile.resumePath}
                download="Mohd_Sufiyan_Resume.pdf"
                className={`btn-cool-secondary ${buttonBase}`}
              >
                <Download className="h-4 w-4 text-sky-400" />
                Download
              </a>
              <a
                href={`mailto:${profile.email}`}
                className={`btn-cool-secondary ${buttonBase}`}
              >
                <Mail className="h-4 w-4 text-sky-400" />
                Email Me
              </a>
            </div>

            <nav
              aria-label="Profile shortcuts"
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm"
            >
              {quickLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-1 font-medium text-sky-400 underline-offset-4 hover:underline"
                >
                  {item.label} →
                </a>
              ))}
            </nav>
          </Reveal>

          {/* Core skills with experience */}
          <Reveal delay={0.12} direction="up">
            <h2 className="text-sm font-semibold text-white">
              Core skills &amp; experience
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {heroSkills.map((skill) => (
                <li key={skill.area} className="glass-card rounded-2xl p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-white">
                      {skill.area}
                    </h3>
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                        skill.primary ? "chip-emerald" : "chip-accent"
                      }`}
                    >
                      {skill.experience}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {skill.stack}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal
          delay={0.14}
          direction="scale"
          className="mx-auto w-full min-w-0 max-w-[640px] lg:col-span-5 lg:max-w-none"
        >
          <HeroScene />
        </Reveal>
      </div>

      {/* Career facts */}
      <Reveal delay={0.16} direction="up" className="mt-10">
        <dl className="glass-panel grid grid-cols-1 gap-x-6 gap-y-4 rounded-2xl p-5 sm:grid-cols-2 xl:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.title} className="flex min-w-0 items-start gap-3">
              <span className="chip-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <fact.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs font-medium text-slate-400">
                  {fact.label} · {fact.detail}
                </dt>
                <dd className="mt-0.5 text-sm font-semibold leading-snug text-white">
                  {fact.title}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Impact numbers */}
      <Reveal delay={0.18} direction="up" className="mt-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-5 border-t border-white/[0.08] pt-6 min-[480px]:grid-cols-3">
          {impact.map((metric) => (
            <div key={metric.label} className="flex min-w-0 flex-col">
              <dt className="order-2 mt-1 text-sm font-medium text-slate-200">
                {metric.label}
              </dt>
              <dd className="order-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {metric.value}
              </dd>
              <dd className="order-3 mt-0.5 text-xs text-slate-400">
                {metric.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
