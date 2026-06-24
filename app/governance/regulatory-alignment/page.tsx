import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Regulatory Alignment | SCL Governance",
  description:
    "EU AI Act alignment: Built for controlled, governed, and auditable AI systems.",
}

export default function RegulatoryAlignmentPage() {
  return (
    <main className="text-foreground min-h-screen pt-14 pb-12">
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 5 - Regulatory Alignment</p>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Built for the EU AI Act Era</h1>
          
          <div className="space-y-5 text-base text-muted-foreground leading-7 mb-8 font-light">
            <p>
              The EU AI Act targets uncontrolled black-box systems - untraceable decision-making, lack of meaningful
              human oversight, hallucination-driven actions, and accountability ambiguity. The issue is not whether
              AI makes mistakes, but whether organizations can understand and control the reasoning behind those mistakes.
            </p>
            <p>
              SCL's positioning is not "the smartest AI" but{" "}
              <strong className="text-foreground">Controlled AI. Governed AI. Auditable AI.</strong>
            </p>
          </div>

          <blockquote className="border-l-2 border-accent/30 pl-5 text-base text-muted-foreground italic mb-12 leading-7">
            Overclaiming carries regulatory and credibility risk. SCL does not promise "hallucination-free AI"
            or "100% reliable AI." It provides the structural conditions under which AI judgment can be governed,
            traced, and trusted.
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Transparency", desc: "Glassbox Trace records every reasoning step in real time - not post-hoc" },
              { label: "Traceability", desc: "Pool-Gated Retrieval makes 'on what grounds did it judge?' answerable" },
              { label: "Human Oversight", desc: "Contextual HITL places humans inside conditions of judgment, not after the fact" },
              { label: "Accountability", desc: "Regulation Layer grants outputs institutional force - conditions of justification are fixed" },
              { label: "Reproducibility", desc: "Fresh Instance Protocol ensures same epistemic state = same cognitive process" },
              { label: "Controllability", desc: "The LLM proposes; the structure decides admission - authority is architectural" },
            ].map((item) => (
              <div key={item.label} className="border border-border rounded-lg p-5 bg-muted/10">
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">{item.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 mt-12 border-t border-border/30">
        <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">Have Questions?</h2>
            <p className="text-base text-muted-foreground mt-1.5 leading-relaxed font-light">
              Read our reference section and find answers in the SCL FAQ.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/faq" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
              Common Questions
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
