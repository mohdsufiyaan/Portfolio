import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "../data";
import { ResumeViewer } from "../../components/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume PDF Reviewer",
  description: `Interactive in-app Resume PDF preview and download for ${profile.name}, ${profile.role}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="btn-cool-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Portfolio
        </Link>
        <span className="font-mono text-xs text-slate-400">
          Interactive Resume Studio · Search, Zoom, Rotate &amp; Download
        </span>
      </div>

      <ResumeViewer embedded />
    </main>
  );
}
