import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[75vh] max-w-2xl flex-col items-center justify-center px-4 text-center"
    >
      <span className="chip-accent rounded-full px-3.5 py-1 font-mono text-xs font-semibold">
        404 // ROUTE NOT FOUND
      </span>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        This endpoint doesn&apos;t exist.
      </h1>
      <p className="mt-4 text-sm text-slate-400 sm:text-base">
        The page or case study you requested has moved or isn&apos;t indexed on
        this deployment.
      </p>
      <Link
        href="/"
        className="btn-cool-primary mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Portfolio
      </Link>
    </main>
  );
}
