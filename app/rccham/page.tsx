import type { Metadata } from "next"
import Link from "next/link"
import RCCHAMPipeline from "@/components/scl-brain-visualization"

export const metadata: Metadata = {
  title: "R-CC[H]AM Cognitive Loop | Structured Cognitive Loop (SCL)",
  description:
    "The dedicated landing page for the R-CC[H]AM loop step-by-step pipeline.",
}

const rcchamSteps = [
  {
    id: "step-retrieval",
    label: "R",
    name: "Retrieval",
    role: "Fix the Horizon",
    description:
      "At the start of each turn, SCL fixes the candidate document pool once before any reasoning begins. This is Pool-Gated Retrieval: a retrieved document is only a candidate. Only what passes the Warrant gate and meets threshold conditions is confirmed as Ground Truth. This makes 'on what grounds did it judge?' fully traceable - something ordinary RAG cannot provide.",
  },
  {
    id: "step-cognition",
    label: "C",
    name: "Cognition",
    role: "The Proposer",
    description:
      "The LLM proposes a next-step action plan based solely on the current Turn Goal and verified Ground Truth. Critically, this is a proposal - not a decision. The authority to judge has moved from the LLM to the structure. No output from Cognition is executed until it passes Control.",
  },
  {
    id: "step-control",
    label: "C",
    name: "Control",
    role: "The Gate Check",
    description:
      "Control is the system-level gatekeeper that verifies every proposal from Cognition against the Regulation Layer's immutable rules - enforcing data completeness, numeric comparison thresholds, and formal logic compliance in code. Even if the LLM hallucinates a reasoning path, Control blocks execution. This is SCL's structural brake.",
  },
  {
    id: "step-hitl",
    label: "[H]",
    name: "HITL",
    role: "Human Intervention (Contextual)",
    description:
      "When a proposal involves high-risk actions, HITL places a human structurally inside the conditions of judgment - not as a review layer after the fact, but as a gating condition before execution. SCL's HITL supports approval-based execution, context freezing and restoration, and graceful rejection handling. Accountability arises from the fact that a human confirmed the conditions.",
    optional: true,
  },
  {
    id: "step-action",
    label: "A",
    name: "Action",
    role: "Permitted Execution",
    description:
      "Only what has passed Control - and HITL where required - is executed. Every action is recorded in real time by the Glassbox Trace Manager: every input, function call, and approval decision. This produces a true record of the judgment path, not a post-hoc rationalization attached after the result.",
  },
  {
    id: "step-memory",
    label: "M",
    name: "Memory",
    role: "Commitment and Record",
    description:
      "Execution results are confirmed as Memory Facts - verified, structured entries that serve as the factual basis for the next cycle. SCL accumulates facts within a task (stateful) but does not carry state automatically between tasks (Intentional Statelessness). One percent of unclarity is more dangerous than ninety-nine percent of retained context.",
  },
]

export default function RcchamPage() {
  return (
    <main className="text-foreground min-h-screen pt-12">
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 3 - Overview</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            R-CC[H]AM Cognitive Loop
          </h1>
          <p className="text-base text-muted-foreground leading-7 font-light">
            The heart of the Structured Cognitive Loop is the six-stage R-CC[H]AM process.
            By separating AI execution into distinct functional stages, SCL moves the power of judgment from the LLM to the system architecture.
          </p>
        </div>
      </div>

      {/* PIPELINE VISUALIZATION */}
      <div className="mt-8">
        <RCCHAMPipeline />
      </div>

      {/* DETAIL LIST */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 border-t border-border/30">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Detailed Step Guide</h2>
          <div className="space-y-0 divide-y divide-border border border-border rounded-xl overflow-hidden">
            {rcchamSteps.map((step, i) => (
              <div
                id={step.id}
                key={step.id}
                className={`grid grid-cols-[88px_1fr] gap-5 p-6 sm:p-8 ${
                  step.optional ? "bg-accent/[0.04]" : "bg-muted/[0.04]"
                }`}
              >
                <div className="text-center pt-1">
                  <span className={`text-3xl font-black leading-none ${step.optional ? "text-yellow-500/70" : "text-accent/50"}`}>
                    {step.label}
                  </span>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/50 mt-1.5">Step {i + 1}</p>
                  {step.optional && (
                    <span className="inline-block mt-2 text-[9px] font-bold text-yellow-400 border border-yellow-400/30 rounded px-1.5 py-0.5">
                      Optional
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <h3 className="text-base font-semibold">{step.name}</h3>
                    <span className="text-xs text-muted-foreground/60 font-mono">{step.role}</span>
                  </div>
                  <p className="text-base text-muted-foreground leading-7 font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 border-t border-border/30">
        <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">Explore SCL Mechanisms</h2>
            <p className="text-base text-muted-foreground mt-1.5 leading-relaxed font-light">
              Learn about the core mechanisms supporting this cognitive loop.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/mechanisms/regulation-layer" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
              Regulation Layer
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
