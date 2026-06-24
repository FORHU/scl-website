import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Failure Analysis | Structured Cognitive Loop (SCL)",
  description:
    "The two structural roots of AI failures: Role Error and Cognitive Overload.",
}

export default function FailureAnalysisPage() {
  return (
    <main className="text-foreground min-h-screen pt-14 pb-12">
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 2 - Failure Analysis</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Two Roots of Every AI Failure</h1>
          <p className="text-base text-muted-foreground leading-7 mb-12 font-light">
            AI failures look varied on the surface. Trace them back and they spring from exactly two structural
            roots - both of which SCL is designed to address.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="border border-border rounded-xl p-6 bg-muted/10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-3">Root 01</p>
              <h3 className="text-lg font-semibold mb-3">Role Error</h3>
              <p className="text-base text-muted-foreground leading-7 mb-5 font-light">
                An LLM is a next-token predictor. Treating it as an autonomous decision-maker is a category mistake.
              </p>
              <ul className="space-y-3">
                <li className="border-l-2 border-border pl-3 text-muted-foreground text-sm leading-relaxed">
                  <strong className="text-foreground">Capability-deficit</strong> - the model cannot perform the task.
                </li>
                <li className="border-l-2 border-accent/40 pl-3 text-muted-foreground text-sm leading-relaxed">
                  <strong className="text-foreground">Role-overreach</strong> - the model reaches for work it was never asked to do.
                </li>
              </ul>
            </div>
            <div className="border border-border rounded-xl p-6 bg-muted/10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-3">Root 02</p>
              <h3 className="text-lg font-semibold mb-3">Cognitive Overload</h3>
              <p className="text-base text-muted-foreground leading-7 mb-5 font-light">
                As context accumulates, noise enters. Error operates as reinforcement, not correction.
              </p>
              <ul className="space-y-3">
                <li className="border-l-2 border-border pl-3 text-muted-foreground text-sm leading-relaxed">
                  <strong className="text-foreground">Intrinsic</strong> - the model tries to verify its own reasoning.
                </li>
                <li className="border-l-2 border-accent/40 pl-3 text-muted-foreground text-sm leading-relaxed">
                  <strong className="text-foreground">Extrinsic</strong> - past context contaminates current judgment.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 mb-4">Seven symptoms that grow from these two roots</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 border border-border rounded-xl p-4 bg-muted/5">
              {[
                ["Hallucination", "Contaminated context amplifies a simple error in a biased direction"],
                ["Goal Drift", "Reacting only to recent context, the original goal is lost"],
                ["Confirmation Bias", "The model hardens further in the same direction as earlier output"],
                ["Rationalization", "The conclusion comes first; reasons are generated afterward"],
                ["Post-hoc Explanation", "Plausible reasons attached to the result, not the actual process"],
                ["Reproducibility Failure", "Grounds differ each time, so the same input yields different results"],
                ["No Accountability", "The decision path is buried inside the LLM and cannot be traced"],
              ].map(([name, desc]) => (
                <div key={name} className="flex gap-3 py-3 border-b border-border/50 last:border-0">
                  <span className="text-accent text-sm mt-0.5 shrink-0">-</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5 font-light">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 mt-12 border-t border-border/30">
        <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">Explore R-CC[H]AM</h2>
            <p className="text-base text-muted-foreground mt-1.5 leading-relaxed">
              See how SCL resolves these failures through its cognitive pipelines.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/rccham" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
              Explore R-CC[H]AM
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
