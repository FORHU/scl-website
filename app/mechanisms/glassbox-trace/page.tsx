import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Glassbox Trace | SCL Mechanisms",
  description:
    "Real-time auditability through SCL's Glassbox Trace Manager.",
}

export default function GlassboxTracePage() {
  return (
    <main className="text-foreground min-h-screen pt-14 pb-12">
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 4 - Core Mechanisms</p>
          <span className="text-xs text-accent font-mono mb-2 block">Mechanism 02 · Real-Time Auditability</span>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Glassbox Trace</h1>
          
          <div className="prose dark:prose-invert text-base text-muted-foreground leading-7 space-y-6 font-light">
            <p>
              Unlike black-box AI that generates plausible reasons after the result, SCL's Trace Manager records every reasoning step in real time - inputs, function calls, control decisions, and human approvals.
            </p>
            <p>
              This shifts the evidentiary standard from <em>"the AI decided this"</em> to <em>"AI proposed based on these specific verified facts, the structure reviewed and approved, and here is the full record."</em> Post-hoc rationalization is structurally impossible.
            </p>
          </div>

          <div className="mt-10 p-6 border border-border rounded-xl bg-muted/15">
            <h3 className="text-base font-semibold mb-3">Auditable Elements</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground font-light">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>The precise snapshot of candidate documents retrieved in the Retrieval phase.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>The raw, unaltered proposal text returned from Cognition.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>The validation logs showing which checks failed or succeeded in Control.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>The human input/approval metadata captured by the HITL interface.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 mt-12 border-t border-border/30">
        <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">Next Mechanism</h2>
            <p className="text-base text-muted-foreground mt-1.5 leading-relaxed font-light">
              Learn about the Fresh Instance Protocol and Intentional Statelessness.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/mechanisms/fresh-instance" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
              Fresh Instance
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
