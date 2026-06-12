import type { Metadata } from "next"
import Link from "next/link"
import ResearchSection from "@/components/research-section"

export const metadata: Metadata = {
  title: "Research & Publications",
  description:
    "Peer-reviewed research and preprints from Forhu on cognitive architecture, LLM hallucination theory, executable epistemology, and the Structured Cognitive Loop.",
  alternates: { canonical: "https://forhu.ai/research" },
  openGraph: {
    title: "Research & Publications | Forhu",
    description:
      "Academic research on cognitive architecture, AI hallucination, and the Structured Cognitive Loop — published by Forhu.",
    url: "https://forhu.ai/research",
  },
}

const publications = [
  {
    title: "Executable Epistemology",
    subtitle: "The Structured Cognitive Loop as an Architecture of Intentional Understanding",
    year: 2025,
    domains: ["Philosophy", "Cognitive Science"],
    abstract:
      "This paper presents a novel framework for understanding knowledge representation in artificial systems through the lens of executable philosophy. We propose that epistemology — the study of how we know what we know — can be formalized as computational processes.",
    contributions: [
      "Formal epistemological model for AI systems",
      "Structured Cognitive Loop architecture",
      "Integration of philosophical and computational frameworks",
    ],
    link: "https://philsci-archive.pitt.edu/26865/",
  },
  {
    title: "Structured Cognitive Loop",
    subtitle: "Behavioral Intelligence in Large Language Model Agents",
    year: 2025,
    domains: ["AI Architecture", "LLMs"],
    abstract:
      "We introduce the Structured Cognitive Loop (SCL), a hierarchical control architecture for LLM agents. SCL integrates perception, cognition, and action through recursive feedback mechanisms.",
    contributions: [
      "SCL hierarchical architecture design",
      "Behavioral intelligence framework",
      "Empirical validation on complex tasks",
    ],
    link: "https://arxiv.org/abs/2510.05107",
  },
  {
    title: "Emergent Cognitive Convergence",
    subtitle: "Implementation and Four Theories of Mind",
    year: 2025,
    domains: ["Cognitive Science", "AI Theory"],
    abstract:
      "This work demonstrates how different computational frameworks converge on similar cognitive principles. We map implementations to classical theories of mind from psychology and philosophy.",
    contributions: [
      "Multi-theory cognitive convergence mapping",
      "Empirical validation across 4 frameworks",
      "Unified cognitive principles extraction",
    ],
    link: "https://arxiv.org/abs/2507.16184",
  },
  {
    title: "Hallucination-Informed Intelligence",
    subtitle: "The Limits of Lossless Abstraction in Large Language Models",
    year: 2025,
    domains: ["LLM Analysis", "Epistemology"],
    abstract:
      "We analyze hallucinations in LLMs not as failures but as predictable artifacts of lossy information compression. This perspective reframes the epistemological status of model outputs.",
    contributions: [
      "Novel theoretical framework for LLM hallucinations",
      "Information-theoretic analysis",
      "Implications for AI safety and interpretability",
    ],
    link: "https://osf.io/preprints/psyarxiv/x2c8p_v1",
  },
  {
    title: "Hallucination as Byproduct",
    subtitle: "An Inevitable Property of Intelligence in Large Language Models",
    year: 2025,
    domains: ["LLM Theory", "AI Design"],
    abstract:
      "We argue that hallucinations emerge necessarily from the architectural constraints of LLMs and cannot be fully eliminated without sacrificing generalization capabilities.",
    contributions: [
      "Proof of hallucination inevitability",
      "Trade-off analysis: accuracy vs. generalization",
      "Architectural implications for future models",
    ],
    link: "https://osf.io/preprints/psyarxiv/q2c94_v1",
  },
  {
    title: "Understanding Architecture",
    subtitle: "Fundamental Principles of Cognitive and AI System Design",
    year: 2025,
    domains: ["Cognitive Architecture", "Systems Design"],
    abstract:
      "This foundational work synthesizes cognitive science and AI systems design into unified architectural principles applicable to both biological and artificial minds.",
    contributions: [
      "Unified cognitive architecture framework",
      "Cross-domain design principles",
      "Scalability and composability analysis",
    ],
    link: "https://osf.io/preprints/psyarxiv/j259k_v1",
  },
]

const researchJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Forhu Research & Publications",
  description:
    "Peer-reviewed research and preprints on cognitive architecture, LLM hallucination, and the Structured Cognitive Loop.",
  url: "https://forhu.ai/research",
  author: { "@type": "Organization", name: "Forhu", url: "https://forhu.ai" },
  hasPart: publications.map((p) => ({
    "@type": "ScholarlyArticle",
    headline: p.title,
    name: `${p.title}: ${p.subtitle}`,
    abstract: p.abstract,
    datePublished: `${p.year}`,
    url: p.link,
    author: { "@type": "Organization", name: "Forhu" },
    keywords: p.domains.join(", "),
  })),
}

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(researchJsonLd) }}
      />

      <main className="bg-background text-foreground min-h-screen pt-24">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Publications</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              Research &<br />Publications
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
              Peer-reviewed papers and preprints exploring cognitive architecture, AI epistemology, LLM hallucination theory, and the Structured Cognitive Loop.
            </p>
          </div>
        </section>

        {/* Research mission statement */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto border-b border-border/30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { label: "Research Mission", text: "Forhu's research program sits at the intersection of cognitive science, philosophy of mind, and AI systems engineering. We publish openly because trustworthy AI must be built on shared, auditable knowledge." },
              { label: "Focus Areas", text: "Our work centers on three problems: how AI agents can reason reliably, why hallucinations are structurally inevitable, and how cognitive architectures can be designed to govern their own errors." },
              { label: "Open Access", text: "All Forhu research is published through open-access channels — PhilSci Archive, arXiv, and OSF PsyArXiv — to ensure findings are freely available to researchers, engineers, and policymakers worldwide." },
            ].map((item) => (
              <div key={item.label} className="group p-6 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 hover:border-accent/30 transition-all duration-300">
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3">{item.label}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Existing research section component */}
        <ResearchSection />

        {/* Full paper list with citations */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Citation Guide</span>
              <h2 className="text-4xl font-bold tracking-tighter mt-4 mb-4">How to Cite Forhu Research</h2>
              <p className="text-muted-foreground max-w-2xl">All publications are available through open-access repositories. Use the links below to access the official records for citation purposes.</p>
            </div>
            <div className="space-y-6">
              {publications.map((p) => (
                <div key={p.title} className="p-6 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-md shadow-black/30 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {p.domains.map((d) => (
                        <span key={d} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground">{d}</span>
                      ))}
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{p.year}</span>
                    </div>
                    <p className="font-semibold text-foreground">{p.title}: {p.subtitle}</p>
                    <p className="text-sm text-muted-foreground mt-1">Forhu Research, {p.year}. Published via open access.</p>
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    View Paper →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <div className="group p-6 sm:p-8 md:p-10 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <div className="h-1 w-12 bg-accent/50 mb-4 rounded-full group-hover:w-20 transition-all duration-500" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Understand the architecture behind the research</h2>
                <p className="text-muted-foreground mt-2 text-sm">Learn how SCL puts these cognitive principles into practice.</p>
              </div>
              <div className="flex gap-4 shrink-0">
                <Link href="/scl" className="px-6 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-colors">
                  Explore SCL
                </Link>
                <Link href="/" className="px-6 py-3 rounded-md border border-white/15 text-foreground hover:bg-white/[0.08] transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
