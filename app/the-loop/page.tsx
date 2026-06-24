import type { Metadata } from "next"
import SclLoopSection from "@/components/scl-loop-section"
import Link from "next/link"

export const metadata: Metadata = {
  title: "The Loop | Structured Cognitive Loop (SCL)",
  description:
    "The R-CC[H]AM Cognitive Loop structured sequence for governing AI decision cycles.",
}

export default function TheLoopPage() {
  return (
    <main className="text-foreground min-h-screen pt-12">
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 3 - The Loop</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            The R-CC[H]AM Loop
          </h1>
          <p className="text-base text-muted-foreground leading-7">
            Every cognitive cycle in SCL passes through a fixed, predictable sequence of gates. 
            The loop repeats recursively until the goal is achieved and verified. Click on each step in the loop below to explore its specific function, inputs, and boundaries.
          </p>
        </div>
      </div>

      <SclLoopSection />

      {/* FOOTER CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 border-t border-border/30">
        <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">Move on to the Core Premise</h2>
            <p className="text-base text-muted-foreground mt-1.5 leading-relaxed">
              Understand why safety is an architectural property, not a performance metric.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/core-premise" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
              Core Premise
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
