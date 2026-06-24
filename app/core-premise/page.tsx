import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Core Premise | Structured Cognitive Loop (SCL)",
  description:
    "Performance is a race. Justification is a condition. Why AI safety requires structural architecture.",
}

export default function CorePremisePage() {
  return (
    <main className="text-foreground min-h-screen pt-14 pb-12">
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 1 - Core Premise</p>
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Performance is a race. Justification is a condition.
          </h1>
          <div className="space-y-5 text-muted-foreground leading-7 text-base mb-12 font-light">
            <p>
              A fast car is not automatically a safe car. Engine output and braking distance belong to two separate
              design axes - and strengthening one does not pull the other along. The same holds for AI.
            </p>
            <p>
              The industry has competed on accuracy, benchmark scores, and inference speed. But as AI moves into
              loan screening, medical diagnosis, and legal review, the question changes from{" "}
              <em className="text-foreground/80">"how accurately does it answer?"</em> to{" "}
              <em className="text-foreground/80 font-semibold font-mono">"why was this judgment permitted?"</em>
            </p>
            <p>
              Justification, accountability, and reproducibility do not emerge on their own as models improve.
              Like a car's brakes, they are structural properties that must be designed separately - and that
              is what SCL is.
            </p>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl border border-border bg-muted/10">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-mono uppercase tracking-wider text-[10px]">Configuration (Combination)</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-mono uppercase tracking-wider text-[10px]">Configuration (Harness)</th>
                  <th className="text-left py-3 px-4 text-accent font-mono uppercase tracking-wider text-[10px]">SCL Architecture</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["LLM decides", "LLM decides", "Structure decides admission"],
                  ["Maximize performance", "Stabilize execution", "Justifiable judgment"],
                  ["How to do it better?", "How to do it stably?", "Why is it permitted?"],
                  ["Probabilistic grounds", "Dynamic grounds", "External grounds, fixed + immutable"],
                  ["Context accumulates", "Context accumulates", "Separated domains, clean reasoning"],
                  ["Accountability blurred", "Accountability diffused", "Clear attribution"],
                  ["Reproducibility low", "Reproducibility difficult", "Fully traceable"],
                ].map(([a, b, c], i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-light">{a}</td>
                    <td className="py-3 px-4 text-muted-foreground font-light">{b}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 mt-12 border-t border-border/30">
        <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">Examine Failure Modes</h2>
            <p className="text-base text-muted-foreground mt-1.5 leading-relaxed">
              Analyze the two structural roots from which every AI failure emerges.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/failure-analysis" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
              Two Roots of Failure
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
