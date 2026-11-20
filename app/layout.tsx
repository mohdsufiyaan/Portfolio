import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../components/SocialIcons";
import "./style.css";
import { origin, profile } from "./data";
import { MotionProvider } from "../components/MotionProvider";
import { ThemeProvider } from "../components/ThemeProvider";
import { ScrollParallaxBackdrop } from "../components/ScrollMotion";
import { Navbar } from "../components/Navbar";

export const viewport: Viewport = {
  themeColor: "#05080f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  applicationName: `${profile.name} Portfolio`,
  category: "technology",
  classification: "Software Engineering & AI Systems Portfolio",
  title: {
    default: `${profile.name} — Senior Software Engineer | Full-Stack, Laravel, Node.js & AI Systems`,
    template: `%s | ${profile.name} — Senior Software Engineer`,
  },
  description:
    "Mohd Sufiyan is a Senior Software Engineer in Noida, India with 5.5+ years of experience building scalable Laravel 12, Node.js, Express 5, Next.js 16 & React Native platforms, real-time Socket.IO/BullMQ architectures, Hybrid RAG pipelines, and 39-tool autonomous LLM agents.",
  keywords: [
    "Mohd Sufiyan",
    "Mohd Sufiyan Portfolio",
    "Senior Software Engineer India",
    "Full-Stack Engineer Noida",
    "Laravel 12 Senior Developer",
    "Node.js Express 5 Architect",
    "Next.js React Native Developer",
    "AI Systems Engineer",
    "Hybrid RAG Engineer",
    "Autonomous LLM Agents",
    "Laravel AI SDK",
    "Pinecone Vector Search",
    "Socket.IO Redis BullMQ",
    "System Design Portfolio",
  ],
  authors: [{ name: profile.name, url: origin }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: origin,
    siteName: `${profile.name} — Senior Software Engineer`,
    title: `${profile.name} — Senior Software Engineer | Full-Stack & Autonomous AI Systems`,
    description:
      "5.5+ years delivering scalable Laravel 12, Node.js, Next.js & React Native platforms, real-time Socket.IO/BullMQ architectures, and 39-tool Hybrid RAG AI agents.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name} — Senior Software Engineer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Senior Software Engineer | Full-Stack & AI Systems`,
    description:
      "Full-stack architecture, real-time distributed systems, Hybrid RAG & 39-tool autonomous LLM agents.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-[#04070e] text-slate-100 antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <ThemeProvider>
          <MotionProvider>
            <ScrollParallaxBackdrop />
            <Navbar />
            {children}

          <footer className="relative border-t border-white/[0.08] bg-[#04070d]">
            <div className="mx-auto w-full max-w-[1680px] px-4 py-12 sm:px-8 lg:px-14 xl:px-20">
              <div className="grid gap-10 md:grid-cols-12 md:items-start">
                <div className="md:col-span-5">
                  <Link href="/" className="inline-flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/35 bg-sky-400/10 font-mono text-sm font-bold text-sky-300">
                      {profile.initials}
                    </span>
                    <div>
                      <div className="text-base font-semibold text-white">
                        {profile.name}
                      </div>
                      <div className="font-mono text-xs text-slate-400">
                        {profile.role} · {profile.location}
                      </div>
                    </div>
                  </Link>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                    Building resilient full-stack applications, distributed
                    real-time backends, and grounded enterprise AI agents.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-slate-400">
                      Navigation
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>
                        <Link href="/#about" className="transition hover:text-sky-300">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link href="/#skills" className="transition hover:text-sky-300">
                          Technical Skills
                        </Link>
                      </li>
                      <li>
                        <Link href="/#experience" className="transition hover:text-sky-300">
                          Experience
                        </Link>
                      </li>
                      <li>
                        <Link href="/#projects" className="transition hover:text-sky-300">
                          Projects
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-slate-400">
                      Deep Dives
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>
                        <Link href="/#architecture" className="transition hover:text-sky-300">
                          Architecture
                        </Link>
                      </li>
                      <li>
                        <Link href="/#achievements" className="transition hover:text-sky-300">
                          Awards &amp; Impact
                        </Link>
                      </li>
                      <li>
                        <Link href="/#contact" className="transition hover:text-sky-300">
                          Direct Contact
                        </Link>
                      </li>
                      <li>
                        <a
                          href={profile.resumePath}
                          download
                          className="inline-flex items-center gap-1.5 text-sky-300 transition hover:text-sky-200"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Resume PDF
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <div className="font-mono text-xs uppercase tracking-wider text-slate-400">
                      Verified Profiles
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 transition hover:text-sky-300"
                        >
                          <LinkedInIcon className="h-4 w-4 text-slate-400" />
                          LinkedIn
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 transition hover:text-sky-300"
                        >
                          <GitHubIcon className="h-4 w-4 text-slate-400" />
                          GitHub
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`mailto:${profile.email}`}
                          className="inline-flex items-center gap-2 transition hover:text-sky-300"
                        >
                          <Mail className="h-4 w-4 text-slate-400" />
                          Email Direct
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] pt-6 font-mono text-xs text-slate-500 sm:flex-row sm:items-center">
                <span>
                  © {new Date().getFullYear()} {profile.name}. Engineered with
                  Next.js, TypeScript &amp; Three.js.
                </span>
                <span>&ldquo;{profile.quote}&rdquo;</span>
              </div>
            </div>
          </footer>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
