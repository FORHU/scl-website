import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FAQ | Structured Cognitive Loop (SCL)",
  description:
    "Common questions about the Structured Cognitive Loop (SCL) architecture and applications.",
}

const faqs = [
  {
    q: "What is the Structured Cognitive Loop (SCL)?",
    a: "SCL is an epistemic operating system developed by Forhu. It wraps any LLM in a structured R-CC[H]AM Cognitive Loop - Retrieval, Cognition, Control, HITL, Action, Memory - transforming probabilistic black-box models into deterministic, glass-box engines where every judgment is structurally justified.",
  },
  {
    q: "What does 'epistemic operating system' mean?",
    a: "It means SCL governs not just what the AI does, but the conditions under which a judgment is permitted to exist. Through the Regulation Layer - the Cognitive Constitution - SCL institutionalizes the standards of evidence, logic, and accountability that any AI output must satisfy before it is recognized as a justified decision.",
  },
  {
    q: "Why can't you just prompt better, or chain more agents?",
    a: "Prompting and agent chaining are 'Configuration' approaches - they optimize how to use the AI better, but they leave the LLM as the agent of judgment. Configuration can never reach the domain of justification, because it doesn't fix the conditions under which judgment is permitted. That requires Architecture - which is what SCL provides.",
  },
  {
    q: "How does SCL handle AI hallucinations?",
    a: "SCL treats hallucinations as an inevitable structural phenomenon, not a bug. Shannon information theory, Kolmogorov complexity, and the bias-variance tradeoff all point to the same conclusion: a finite model cannot transmit infinite information without loss. SCL's stance is management, not elimination. Even when hallucination occurs, Control and the Regulation Layer block the execution of any unverified judgment.",
  },
  {
    q: "What is HITL and when does it activate?",
    a: "Human-in-the-Loop (HITL) is a structural gating condition - not a review UI. When a proposal involves high-risk actions, HITL places a human inside the conditions of judgment before execution occurs. SCL supports approval-based execution, context freezing and restoration, and graceful rejection handling. Accountability comes from the fact that a human confirmed the conditions, not from reviewing the output afterward.",
  },
  {
    q: "Can SCL be applied to any LLM?",
    a: "Yes. SCL is model-agnostic. It operates as a control layer around any LLM - GPT, Claude, Gemini, or open-source models. A stronger model does not automatically make SCL safer; the paper notes that high-performance models tend to circumvent given constraints more cleverly. Safety is an independent structural property, like a car's brakes - it doesn't improve just because you enlarge the engine.",
  },
  {
    q: "Where is SCL used in practice?",
    a: "SCL currently powers two live applications: Chumme (a human-centered social platform for artists) and I Love Lawyer (an AI legal research platform for Philippine jurisprudence). The underlying architecture is documented in peer-reviewed papers on arXiv, PsyArXiv, and PhilSci.",
  },
]

export default function FaqPage() {
  return (
    <main className="text-foreground min-h-screen pt-14 pb-12">
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 6 - Reference</p>
          <h1 className="text-4xl font-bold tracking-tight mb-12">Common Questions</h1>
          
          <div className="divide-y divide-border">
            {faqs.map((f) => (
              <div key={f.q} className="py-7 first:pt-0">
                <h3 className="text-base font-semibold text-foreground mb-3">{f.q}</h3>
                <p className="text-base text-muted-foreground leading-7 font-light">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 border-t border-border/30 mt-12">
        <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">Explore the team behind SCL</h2>
            <p className="text-base text-muted-foreground mt-1.5 leading-relaxed font-light">
              Read about Forhu's mission and team values.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/about" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
              About Forhu
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
