import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Structured Cognitive Loop (SCL)",
  description:
    "The Structured Cognitive Loop (SCL) is an epistemic operating system that transforms probabilistic LLMs into deterministic, glass-box engines through the R-CC[H]AM Cognitive Loop.",
  alternates: { canonical: "https://scl.institute" },
  openGraph: {
    title: "SCL - Structured Cognitive Loop",
    description:
      "An epistemic operating system that fixes the conditions of AI justification structurally - where the LLM proposes, and the structure decides admission.",
    url: "https://scl.institute",
  },
}

const sclJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Structured Cognitive Loop (SCL)",
  description:
    "The Structured Cognitive Loop (SCL) is an epistemic operating system developed by Forhu. It fixes the conditions of AI justification structurally through the R-CC[H]AM Cognitive Loop.",
  url: "https://scl.institute",
  author: { "@type": "Organization", name: "Forhu", url: "https://forhu.ai" },
}

export default function IntroductionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sclJsonLd) }} />

      <main className="text-foreground min-h-screen">

        {/* DOCUMENT HEADER */}
        <section id="overview" className="border-b border-border px-6 sm:px-10 lg:px-16 pt-14 pb-12 scroll-mt-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-8 text-[11px] font-mono text-muted-foreground/70 uppercase tracking-widest">
              <span className="border border-border rounded px-2 py-0.5">scl.institute</span>
              <span>·</span>
              <span>Forhu Research</span>
              <span>·</span>
              <span>v2025</span>
              <span>·</span>
              <a href="https://arxiv.org/abs/2510.05107" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">arXiv:2510.05107</a>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 leading-tight">
              Structured Cognitive Loop
            </h1>
            <p className="text-base text-accent font-mono mb-8">R-CC[H]AM · Epistemic Operating System</p>

            {/* Abstract box */}
            <div className="border-l-2 border-accent/40 pl-5 py-1 mb-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-accent/70 mb-3">Abstract</p>
              <p className="text-base text-muted-foreground leading-7">
                The Structured Cognitive Loop (SCL) is an epistemic operating system and AI architecture framework
                that transforms probabilistic large language models into deterministic, glass-box engines. Through
                the R-CC[H]AM Cognitive Loop - Retrieval, Cognition, Control, Human-in-the-Loop, Action, and Memory -
                SCL fixes the conditions of justification structurally: the LLM proposes, and the structure decides
                admission. Every judgment is traceable, reproducible, and governed by an immutable Regulation Layer.
              </p>
            </div>

            {/* Metadata row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-12">
              {[
                { label: "Status", value: "Active" },
                { label: "License", value: "Open Research" },
                { label: "Published", value: "2025" },
                { label: "Domain", value: "AI Architecture" },
              ].map((m) => (
                <div key={m.label} className="border border-border rounded-md px-3 py-2.5 bg-muted/20">
                  <p className="text-muted-foreground/60 text-[10px] uppercase tracking-wider mb-1">{m.label}</p>
                  <p className="text-foreground font-semibold">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Link href="/the-loop" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
                Explore The Loop
              </Link>
              <Link href="/core-premise" className="px-5 py-2.5 rounded-md border border-border text-sm text-foreground hover:bg-muted/20 transition-colors">
                Core Premise
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="px-6 sm:px-10 lg:px-16 py-14">
          <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold">Explore the research behind SCL</h2>
              <p className="text-base text-muted-foreground mt-1.5 leading-relaxed">
                Peer-reviewed papers on arXiv, PsyArXiv, and PhilSci.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/research" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
                Read Research
              </Link>
              <a href="https://forhu.ai" className="px-5 py-2.5 rounded-md border border-border text-sm text-foreground hover:bg-muted/20 transition-colors">
                Forhu.ai
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
