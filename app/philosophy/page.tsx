import type { Metadata } from "next"
import Link from "next/link"
import PhilosophySection from "@/components/philosophy-section"

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Forhu's philosophy: AI must be human-centered, honest, and self-correcting. We believe untrustworthy intelligence is not intelligence — and that transparency is the foundation of trust.",
  alternates: { canonical: "https://forhu.ai/philosophy" },
  openGraph: {
    title: "Our Philosophy | Forhu",
    description:
      "Human-centered AI, honest engineering, and hallucination governance — the three principles behind everything Forhu builds.",
    url: "https://forhu.ai/philosophy",
  },
}

const philosophyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Forhu's Philosophy: Human-Centered AI",
  description:
    "Forhu's philosophy: AI must be human-centered, honest, and self-correcting. Untrustworthy intelligence is not intelligence.",
  url: "https://forhu.ai/philosophy",
  author: { "@type": "Organization", name: "Forhu", url: "https://forhu.ai" },
  about: [
    { "@type": "Thing", name: "Human-Centered AI" },
    { "@type": "Thing", name: "Explainable AI" },
    { "@type": "Thing", name: "AI Ethics" },
    { "@type": "Thing", name: "Hallucination Governance" },
  ],
  keywords: "human-centered AI, explainable AI, trustworthy AI, AI ethics, hallucination governance, transparent AI",
}

const ForHumanIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="13" r="5" stroke="#d97706" strokeWidth="1.5"/>
    <path d="M6 32c0-4.418 3.582-8 8-8" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="34" cy="13" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
    <path d="M42 32c0-4.418-3.582-8-8-8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="3.5" fill="rgba(217,119,6,0.18)" stroke="#d97706" strokeWidth="1.3"/>
    <circle cx="24" cy="24" r="1.5" fill="#d97706"/>
    <line x1="19" y1="24" x2="20.5" y2="24" stroke="#d97706" strokeWidth="1.2" strokeOpacity="0.6"/>
    <line x1="27.5" y1="24" x2="29" y2="24" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
    <circle cx="24" cy="24" r="6.5" stroke="#d97706" strokeWidth="0.7" strokeOpacity="0.25" strokeDasharray="2 3"/>
  </svg>
)

const HonestEngIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="30" width="32" height="9" rx="2.5" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="rgba(255,255,255,0.02)"/>
    <rect x="8" y="19.5" width="32" height="9" rx="2.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="rgba(255,255,255,0.03)"/>
    <rect x="8" y="9" width="32" height="9" rx="2.5" stroke="#d97706" strokeWidth="1.4" fill="rgba(217,119,6,0.05)"/>
    <circle cx="16" cy="13.5" r="2" fill="#d97706" fillOpacity="0.9"/>
    <line x1="18" y1="13.5" x2="21" y2="13.5" stroke="#d97706" strokeWidth="1" strokeOpacity="0.65"/>
    <circle cx="23" cy="13.5" r="1.5" stroke="#d97706" strokeWidth="1.2"/>
    <line x1="24.5" y1="13.5" x2="28" y2="13.5" stroke="#d97706" strokeWidth="1" strokeOpacity="0.45"/>
    <circle cx="30" cy="13.5" r="1.5" fill="#d97706" fillOpacity="0.5"/>
    <line x1="16" y1="18" x2="16" y2="19.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
    <line x1="16" y1="28.5" x2="16" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
    <line x1="30" y1="18" x2="30" y2="19.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
    <line x1="30" y1="28.5" x2="30" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
  </svg>
)

const HallucinationIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="16" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2"/>
    <path d="M24 8 A16 16 0 1 1 8 24" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5.5 19 L8 24 L13 21.5" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="18" y="18" width="12" height="12" rx="2" fill="rgba(217,119,6,0.08)" stroke="#d97706" strokeWidth="1.3"/>
    <path d="M20.5 24 L23 26.5 L27.5 20.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PILLAR_ICONS = [<ForHumanIcon key="fh"/>, <HonestEngIcon key="he"/>, <HallucinationIcon key="hg"/>]

const pillars = [
  {
    title: "FOR HUMAN",
    tagline: "AI is not a tool, but a partner",
    short: "Technology must expand what humans can do — not replace them or act beyond their oversight.",
    expanded: `The name FORHU is not a brand exercise. It is a commitment: every system we build, every architecture we publish, and every product we deploy must demonstrably serve human wellbeing.

We reject the framing that AI is simply a productivity multiplier. AI that increases output at the cost of human agency, dignity, or accountability is not progress — it is a design failure. The Structured Cognitive Loop was conceived specifically to ensure that AI systems remain within human-defined boundaries at every step of their reasoning.

FOR HUMAN means AI that explains itself. AI that can be corrected. AI that remembers its mistakes. AI that never acts as if human oversight is optional.`,
  },
  {
    title: "Honest Engineering",
    tagline: "If even AI doesn't know why it gave that answer, how can you?",
    short: "Black-box AI cannot be trusted. SCL separates and records every reasoning step.",
    expanded: `Traditional LLMs generate outputs in a single forward pass. There is no persistent reasoning trace, no record of which facts were weighted against which, and no mechanism to audit why a specific answer was produced. When the model is wrong, you cannot know at which step the reasoning failed.

Honest Engineering means designing systems where the reasoning process is as auditable as the output. SCL achieves this by separating cognition into discrete layers — Metaprompt, Judgment, Runtime, Memory, Control — each of which operates independently and logs its state. When an error occurs, it is traceable to a specific layer. When a correction is needed, it can be applied precisely.

Transparency is not a feature you add to an AI system. It is a structural property you build in from the start.`,
  },
  {
    title: "Hallucination Governance",
    tagline: "The right to err, the duty not to repeat",
    short: "Hallucinations cannot be eliminated — but they can be prevented from happening twice.",
    expanded: `Forhu's research has established that hallucinations are not bugs in LLMs — they are inevitable consequences of lossy information compression at scale. A model that never hallucinated would be a model that never generalized. Demanding zero hallucination is demanding zero intelligence.

What we can demand is that hallucinations do not compound. SCL's Memory layer records every error the system makes. SCL's Control layer cross-references every new output against that error record before it is delivered. If a hallucination pattern is detected, it is flagged, corrected, and logged — permanently.

This is Hallucination Governance: not the elimination of error, but the systematic prevention of repeated error. It is the difference between an AI that occasionally makes mistakes and one that makes the same mistake twice.`,
  },
]

export default function PhilosophyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(philosophyJsonLd) }}
      />

      <main className="bg-background text-foreground min-h-screen pt-24">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Principles</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              Our<br />Philosophy
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
              Untrustworthy intelligence is not intelligence. Every principle we hold follows from this single conviction.
            </p>
          </div>
        </section>

        {/* Manifesto block */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto border-b border-border/30">
          <blockquote className="border-l-4 border-accent pl-8 py-4 max-w-3xl">
            <p className="text-2xl sm:text-3xl font-light text-foreground leading-relaxed italic">
              "We are in an age of distrust. Not because AI is powerful — but because AI is opaque. The antidote is not less AI. It is AI that shows its work."
            </p>
            <cite className="block mt-4 text-sm text-muted-foreground not-italic">— Forhu Research Team</cite>
          </blockquote>
        </section>

        {/* Existing section component */}
        <PhilosophySection />

        {/* Expanded pillars */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">In Depth</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4 mb-4">The Three Pillars, Expanded</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Each principle is a constraint we impose on ourselves — and a promise we make to the people who use what we build.
              </p>
            </div>
            <div className="space-y-6">
              {pillars.map((p, i) => (
                <div key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.09] backdrop-blur-sm shadow-xl shadow-black/40 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
                    <div className="p-8 lg:p-10 border-b border-white/10 lg:border-b-0 lg:border-r border-white/10">
                      <div className="mb-5">{PILLAR_ICONS[i]}</div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{p.title}</h3>
                      <p className="text-accent font-medium italic text-sm mb-4">"{p.tagline}"</p>
                      <p className="text-muted-foreground leading-relaxed text-sm">{p.short}</p>
                    </div>
                    <div className="p-8 lg:p-10 space-y-4">
                      {p.expanded.split("\n\n").map((para, j) => (
                        <p key={j} className="text-muted-foreground leading-relaxed text-sm">{para}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Contrast</span>
              <h2 className="text-4xl font-bold tracking-tighter mt-4 mb-4 text-foreground">Forhu vs. Standard AI Development</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "On transparency", standard: "Outputs are produced without explanation. Users accept or reject without understanding why.", forhu: "Every reasoning step is logged in a named layer. Errors are traceable to their origin." },
                { label: "On hallucination", standard: "Hallucinations are treated as bugs to be patched through prompting or fine-tuning.", forhu: "Hallucinations are structurally inevitable. SCL governs them through memory and correction loops." },
                { label: "On human control", standard: "Human oversight is a post-deployment consideration, not an architectural requirement.", forhu: "Human control is embedded in the Metaprompt layer — the system cannot act outside defined boundaries." },
                { label: "On trust", standard: "Trust is built through marketing, accuracy benchmarks, and user testimonials.", forhu: "Trust is built through auditability. If you cannot inspect the reasoning, you cannot trust the output." },
              ].map((row) => (
                <div key={row.label} className="rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/8 bg-white/[0.07]">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">{row.label}</span>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-white/8">
                    <div className="p-5">
                      <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Standard AI</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{row.standard}</p>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold text-accent uppercase mb-2">Forhu</p>
                      <p className="text-sm text-foreground leading-relaxed">{row.forhu}</p>
                    </div>
                  </div>
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
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">See these principles in action</h2>
                <p className="text-muted-foreground mt-2 text-sm">The SCL architecture is how Forhu's philosophy becomes working software.</p>
              </div>
              <div className="flex gap-4 shrink-0">
                <Link href="/scl" className="px-6 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-colors">Explore SCL</Link>
                <Link href="/" className="px-6 py-3 rounded-md border border-white/15 text-foreground hover:bg-white/[0.08] transition-colors">Back to Home</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
