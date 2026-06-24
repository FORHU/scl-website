import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Fresh Instance | SCL Mechanisms",
  description:
    "Intentional statelessness in SCL to block cognitive contamination and confirmation bias.",
}

export default function FreshInstancePage() {
  return (
    <main className="text-foreground min-h-screen pt-14 pb-12">
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 4 - Core Mechanisms</p>
          <span className="text-xs text-accent font-mono mb-2 block">Mechanism 03 · Intentional Statelessness</span>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Fresh Instance Protocol</h1>
          
          <div className="prose dark:prose-invert text-base text-muted-foreground leading-7 space-y-6 font-light">
            <p>
              Every cognitive cycle launches a completely new LLM instance receiving exactly three inputs: the Turn Goal, the Regulations, and verified Memory Facts. No accumulated conversation history enters.
            </p>
            <p>
              This is not a missing feature - it is a deliberate architectural choice grounded in Baddeley's working-memory model: residue from a previous task acts as interference on a new one. Fresh Instance keeps per-cycle input size linear, makes cost predictable, and structurally blocks confirmation bias.
            </p>
          </div>

          <div className="mt-10 p-6 border border-border rounded-xl bg-muted/15">
            <h3 className="text-base font-semibold mb-3">Architectural Advantages</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground font-light">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span><strong>Linear Context Costs</strong> - Prevents ballooning tokens due to long chat threads.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span><strong>Eliminates Goal Drift</strong> - Keeps the model focused only on the current turn goals and verified memory state.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span><strong>Zero Context Leaks</strong> - Ensures previous tasks cannot bleed context or contaminate current reasoning.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 mt-12 border-t border-border/30">
        <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">Examine Governance Alignment</h2>
            <p className="text-base text-muted-foreground mt-1.5 leading-relaxed font-light">
              Explore how the SCL architecture aligns with the EU AI Act requirements.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/governance/regulatory-alignment" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
              EU AI Act Alignment
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
