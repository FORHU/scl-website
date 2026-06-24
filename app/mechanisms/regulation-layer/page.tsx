import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Regulation Layer | SCL Mechanisms",
  description:
    "The Regulation Layer is the cognitive constitution enforcing immutable safety rules in code.",
}

export default function RegulationLayerPage() {
  return (
    <main className="text-foreground min-h-screen pt-14 pb-12">
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 4 - Core Mechanisms</p>
          <span className="text-xs text-accent font-mono mb-2 block">Mechanism 01 · The Cognitive Constitution</span>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Regulation Layer</h1>
          
          <div className="prose dark:prose-invert text-base text-muted-foreground leading-7 space-y-6 font-light">
            <p>
              The Regulation Layer fixes the conditions under which any output can be recognized as a justified judgment - before execution. It does not limit creative capability; it grants AI outputs legal and logical force, the same way a court oath does not limit a witness's capacity to testify, but grants the statement institutional force.
            </p>
            <p>
              These regulations are hard-coded constraints that are evaluated deterministically at the system level. 
              Examples include data completeness checks, numeric comparison thresholds, and tool-use preconditions. 
              No AI judgment is admitted or permitted to execute without satisfying these conditions.
            </p>
          </div>

          <div className="mt-10 p-6 border border-border rounded-xl bg-muted/15">
            <h3 className="text-base font-semibold mb-3">Key Responsibilities</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground font-light">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Enforce strict format validation (e.g. schema matching, typings).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Evaluate logic filters in runtime code rather than probabilistic model logic.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Enforce authorization bounds before tools are triggered.</span>
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
              Explore how the Glassbox Trace achieves real-time auditability.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/mechanisms/glassbox-trace" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
              Glassbox Trace
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
