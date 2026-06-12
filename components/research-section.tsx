"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"
import { NetworkGraphDiagram, LayeredModelDiagram, SchemaDiagram, NeuralDiagram, TradeoffDiagram, CrossDomainDiagram } from "./research-diagrams"

export default function ResearchSection() {
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null)
  const [clickedId, setClickedId] = useState<string | null>(null)

  const publications = [
    {
      id: "executable-epistemology-1",
      title: "Executable Epistemology",
      subtitle: "The Structured Cognitive Loop as an Architecture of Intentional Understanding",
      year: 2025,
      // authors: "Forhu et al.",
      domains: ["Philosophy", "Cognitive Science"],
      // archiveId: "26865",
      // doi: "10.31234/osf.io/preprints/psyarxiv",
      abstract:
        "This paper presents a novel framework for understanding knowledge representation in artificial systems through the lens of executable philosophy. We propose that epistemology—the study of how we know what we know—can be formalized as computational processes.",
      keyContributions: [
        "Formal epistemological model for AI systems",
        "Structured Cognitive Loop architecture",
        "Integration of philosophical and computational frameworks",
      ],
      diagram: "schema",
      link: "https://philsci-archive.pitt.edu/26865/",
    },
    {
      id: "structured-cognitive",
      title: "Structured Cognitive Loop",
      subtitle: "Behavioral Intelligence in Large Language Model Agents",
      year: 2025,
      // authors: "Forhu, Smith, Johnson",
      domains: ["AI Architecture", "LLMs"],
      // archiveId: "2510.05107",
      // doi: "arXiv:2510.05107",
      abstract:
        "We introduce the Structured Cognitive Loop (SCL), a hierarchical control architecture for LLM agents. SCL integrates perception, cognition, and action through recursive feedback mechanisms.",
      keyContributions: [
        "SCL hierarchical architecture design",
        "Behavioral intelligence framework",
        "Empirical validation on complex tasks",
      ],
      diagram: "layered",
      link: "https://arxiv.org/abs/2510.05107",
    },
    {
      id: "emergent-convergence",
      title: "Emergent Cognitive Convergence",
      subtitle: "Implementation and Four Theories of Mind",
      year: 2025,
      // authors: "Forhu, Lee, Patel",
      domains: ["Cognitive Science", "AI Theory"],
      // archiveId: "2507.16184",
      // doi: "arXiv:2507.16184",
      abstract:
        "This work demonstrates how different computational frameworks converge on similar cognitive principles. We map implementations to classical theories of mind from psychology and philosophy.",
      keyContributions: [
        "Multi-theory cognitive convergence mapping",
        "Empirical validation across 4 frameworks",
        "Unified cognitive principles extraction",
      ],
      diagram: "network",
      link: "https://arxiv.org/abs/2507.16184",
    },
    {
      id: "hallucination-informed",
      title: "Hallucination-Informed Intelligence",
      subtitle: "The Limits of Lossless Abstraction in Large Language Models",
      year: 2025,
      // authors: "Forhu, Chen, Martinez",
      domains: ["LLM Analysis", "Epistemology"],
      // archiveId: "x2c8p_v1",
      // doi: "osf.io/preprints/psyarxiv/x2c8p_v1",
      abstract:
        "We analyze hallucinations in LLMs not as failures but as predictable artifacts of lossy information compression. This perspective reframes the epistemological status of model outputs.",
      keyContributions: [
        "Novel theoretical framework for LLM hallucinations",
        "Information-theoretic analysis",
        "Implications for AI safety and interpretability",
      ],
      diagram: "neural",
      link: "https://osf.io/preprints/psyarxiv/x2c8p_v1",
    },
    {
      id: "hallucination-byproduct",
      title: "Hallucination as Byproduct",
      subtitle: "An Inevitable Property of Intelligence in Large Language Models",
      year: 2025,
      // authors: "Forhu, Davis, Gupta",
      domains: ["LLM Theory", "AI Design"],
      // archiveId: "q2c94_v1",
      // doi: "osf.io/preprints/psyarxiv/q2c94_v1",
      abstract:
        "We argue that hallucinations emerge necessarily from the architectural constraints of LLMs and cannot be fully eliminated without sacrificing generalization capabilities.",
      keyContributions: [
        "Proof of hallucination inevitability",
        "Trade-off analysis: accuracy vs. generalization",
        "Architectural implications for future models",
      ],
      diagram: "tradeoff",
      link: "https://osf.io/preprints/psyarxiv/q2c94_v1",
    },
    {
      id: "cognitive-architecture",
      title: "Understanding Architecture",
      subtitle: "Fundamental Principles of Cognitive and AI System Design",
      year: 2025,
      // authors: "Forhu, Wilson, Kumar",
      domains: ["Cognitive Architecture", "Systems Design"],
      // archiveId: "j259k_v1",
      // doi: "osf.io/preprints/psyarxiv/j259k_v1",
      abstract:
        "This foundational work synthesizes cognitive science and AI systems design into unified architectural principles applicable to both biological and artificial minds.",
      keyContributions: [
        "Unified cognitive architecture framework",
        "Cross-domain design principles",
        "Scalability and composability analysis",
      ],
      diagram: "crossdomain",
      link: "https://osf.io/preprints/psyarxiv/j259k_v1",
    },
  ]

  const getDiagram = (diagramType: string) => {
    switch (diagramType) {
      case "network":     return <NetworkGraphDiagram />
      case "layered":     return <LayeredModelDiagram />
      case "schema":      return <SchemaDiagram />
      case "neural":      return <NeuralDiagram />
      case "tradeoff":    return <TradeoffDiagram />
      case "crossdomain": return <CrossDomainDiagram />
      default:            return <NetworkGraphDiagram />
    }
  }

  return (
    <section id="research" className="relative py-16 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-12 sm:mb-24 text-left">
          <div className="mb-4 sm:mb-6 inline-block">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
              Featured Research
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 sm:mb-8 tracking-tighter leading-tight max-w-5xl">
            Recent Publications in <br className="hidden md:block" />
            <span className="text-muted-foreground">Cognitive Architecture</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Peer-reviewed research and preprints exploring cognitive systems, artificial intelligence architecture, and
            the intersection of philosophy and computational theory.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {publications.map((pub) => (
            <div
              key={pub.id}
              onClick={() => {
                setClickedId(pub.id)
                setTimeout(() => setClickedId(null), 600)
              }}
              className={`group relative border rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-lg ${clickedId === pub.id
                ? "border-accent shadow-accent/25 scale-[1.015] shadow-xl"
                : "border-white/8 bg-white/[0.07] shadow-black/40 hover:bg-white/[0.12] hover:border-accent/35 hover:shadow-accent/15 hover:shadow-xl hover:-translate-y-1"
                }`}
            >
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 p-6 sm:p-8 md:p-10">
                {/* Diagram Section */}
                <div className="flex-shrink-0 w-full lg:w-1/3 min-h-[240px] sm:min-h-[280px] lg:h-auto bg-white/[0.09] border border-white/8 rounded-xl p-4 sm:p-6 flex items-center justify-center group-hover:border-accent/20 transition-colors duration-500">
                  <div className="w-full h-full text-muted-foreground/80 group-hover:text-accent/80 transition-colors duration-500">
                    {getDiagram(pub.diagram)}
                  </div>
                </div>

                {/* Content section */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <span className="font-bold text-accent">{pub.year}</span>
                      <span className="text-muted-foreground/40">•</span>
                      {/* <span className="text-muted-foreground font-medium">{pub.authors}</span> */}
                    </div>

                    {/* Title and subtitle */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 leading-tight group-hover:text-accent transition-colors duration-300 tracking-tight">
                        {pub.title}
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{pub.subtitle}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
                      {pub.domains.map((domain) => (
                        <span
                          key={domain}
                          className="inline-block text-[10px] sm:text-xs font-medium px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-border/50 bg-muted/10 text-muted-foreground group-hover:border-accent/20 group-hover:text-foreground transition-colors"
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-auto pt-6 border-t border-border/30">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-semibold hover:bg-accent hover:text-white transition-all duration-300 text-sm sm:text-base"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Publication
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedPaper(expandedPaper === pub.id ? null : pub.id)
                      }}
                      className="inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-lg border border-border/50 text-foreground font-medium hover:bg-muted/20 transition-colors text-sm sm:text-base"
                    >
                      <span>{expandedPaper === pub.id ? "Hide Details" : "View Abstract"}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${expandedPaper === pub.id ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedPaper === pub.id ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                }`}
                aria-hidden={expandedPaper !== pub.id}
              >
                <div className="border-t border-border/50 bg-muted/5 px-6 sm:px-8 md:px-10 py-6 sm:py-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <p className="font-bold text-foreground mb-3 text-xs sm:text-sm uppercase tracking-wider">Abstract</p>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{pub.abstract}</p>
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-3 text-xs sm:text-sm uppercase tracking-wider">
                        Key Contributions
                      </p>
                      <ul className="space-y-3">
                        {pub.keyContributions.map((contrib, idx) => (
                          <li key={idx} className="text-sm sm:text-base text-muted-foreground leading-relaxed flex gap-3">
                            <span className="text-accent flex-shrink-0 mt-1.5">•</span>
                            <span>{contrib}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
