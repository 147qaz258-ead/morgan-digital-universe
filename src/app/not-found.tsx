import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArrowUpRight } from "lucide-react";
import { pageCopy } from "@/content/pages";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="grid min-h-[82svh] items-center gap-12 py-32 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="lab-kicker text-signal">{pageCopy.notFound.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-[54px] font-semibold leading-[0.9] tracking-[-0.055em] text-ink md:text-[86px]">{pageCopy.notFound.title}</h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-secondary">{pageCopy.notFound.body}</p>
          <div className="mt-9 flex flex-wrap gap-7">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 border-b border-ink/30 font-mono text-[11px] uppercase tracking-[0.12em] text-ink hover:text-signal">Back to home <ArrowUpRight size={14} aria-hidden /></Link>
            <Link href="/experiments" className="inline-flex min-h-11 items-center gap-2 border-b border-ink/30 font-mono text-[11px] uppercase tracking-[0.12em] text-ink hover:text-signal">Experiment index <ArrowUpRight size={14} aria-hidden /></Link>
          </div>
        </div>
        <div className="relative min-h-72 border-y border-line md:col-span-4 md:col-start-9">
          <div className="absolute inset-x-0 top-5 flex items-center justify-between border-b border-line pb-3">
            <span className="lab-kicker text-signal">NAV / NULL</span>
            <span className="lab-kicker text-ink-secondary">No route</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[96px] font-semibold tracking-[-0.08em] text-brand/10">404</div>
          <Link href="/experiments" className="absolute inset-x-0 bottom-5 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
            Resume at experiment index →
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
