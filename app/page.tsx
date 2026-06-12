import type { Metadata } from "next"
import Link from "next/link"
import SclBrainVisualization from "@/components/scl-brain-visualization"
import SclLoopSection from "@/components/scl-loop-section"

export const metadata: Metadata = {
  title: "Structured Cognitive Loop (SCL)",
  description:
    "The Structured Cognitive Loop (SCL) is an epistemic operating system that transforms probabilistic LLMs into deterministic, glass-box engines through the R-CC[H]AM Cognitive Loop.",
  alternates: { canonical: "https://scl.institute" },
  openGraph: {
    title: "SCL - Structured Cognitive Loop",
    description:
      "An epistemic operating system that fixes the conditions of justification structurally - where the LLM proposes, and the structure decides admission.",
    url: "https://scl.institute",
  },
}

const sclJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Structured Cognitive Loop (SCL)",
  description:
    "The Structured Cognitive Loop (SCL) is an epistemic operating system developed by Forhu. It fixes the conditions of AI justification structurally through the R-CC[H]AM Cognitive Loop.",
  url: "https://scl.institute",
  author: { "@type": "Organization", name: "Forhu", url: "https://forhu.ai" },
}

const sclFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Structured Cognitive Loop (SCL)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SCL is an epistemic operating system developed by Forhu. It wraps any LLM in a structured R-CC[H]AM Cognitive Loop transforming probabilistic black-box models into deterministic, glass-box engines.",
      },
    },
  ],
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

const mechanisms = [
  {
    id: "mechanism-regulation",
    num: "01",
    name: "Regulation Layer",
    subtitle: "The Cognitive Constitution",
    body: "The Regulation Layer fixes the conditions under which any output can be recognized as a justified judgment - before execution. It does not limit creative capability; it grants AI outputs legal and logical force, the same way a court oath does not limit a witness's capacity to testify, but grants the statement institutional force. Enforced in code: data completeness checks, numeric comparison thresholds, tool-use preconditions. No judgment is admitted without passing these conditions.",
  },
  {
    id: "mechanism-glassbox",
    num: "02",
    name: "Glassbox Trace",
    subtitle: "Real-Time Auditability",
    body: "Unlike black-box AI that generates plausible reasons after the result, SCL's Trace Manager records every reasoning step in real time - inputs, function calls, control decisions, approvals. This shifts the evidentiary standard from 'the AI decided this' to 'AI proposed based on these specific verified facts, the structure reviewed and approved, and here is the full record.' Post-hoc rationalization is structurally impossible.",
  },
  {
    id: "mechanism-fresh-instance",
    num: "03",
    name: "Fresh Instance Protocol",
    subtitle: "Intentional Statelessness",
    body: "Every cognitive cycle launches a completely new LLM instance receiving exactly three inputs: the Turn Goal, the Regulations, and verified Memory Facts. No accumulated conversation history enters. This is not a missing feature - it is a deliberate architectural choice grounded in Baddeley's working-memory model: residue from a previous task acts as interference on a new one. Fresh Instance keeps per-cycle input size linear, makes cost predictable, and structurally blocks confirmation bias.",
  },
]

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

export default function SclPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sclJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sclFaqJsonLd) }} />

      <main className="text-foreground min-h-screen">

        {/* DOCUMENT HEADER */}
        <section id="overview" className="border-b border-border px-6 sm:px-10 lg:px-16 pt-14 pb-12 scroll-mt-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-8 text-[11px] font-mono text-muted-foreground/70 uppercase tracking-widest">
              <span className="border border-border rounded px-2 py-0.5">scl.institute</span>
              <span>·</span>
              <span>Forhu Research</span>
              <span>·</span>
              <span>v2025</span>
              <span>·</span>
              <a href="https://arxiv.org/abs/2510.05107" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">arXiv:2510.05107</a>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 leading-tight">
              Structured Cognitive Loop
            </h1>
            <p className="text-base text-accent font-mono mb-8">R-CC[H]AM · Epistemic Operating System</p>

            {/* Abstract box */}
            <div className="border-l-2 border-accent/40 pl-5 py-1 mb-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-accent/70 mb-3">Abstract</p>
              <p className="text-base text-muted-foreground leading-7">
                The Structured Cognitive Loop (SCL) is an epistemic operating system and AI architecture framework
                that transforms probabilistic large language models into deterministic, glass-box engines. Through
                the R-CC[H]AM Cognitive Loop - Retrieval, Cognition, Control, Human-in-the-Loop, Action, and Memory -
                SCL fixes the conditions of justification structurally: the LLM proposes, and the structure decides
                admission. Every judgment is traceable, reproducible, and governed by an immutable Regulation Layer.
              </p>
            </div>

            {/* Metadata row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                { label: "Status", value: "Active" },
                { label: "License", value: "Open Research" },
                { label: "Published", value: "2025" },
                { label: "Domain", value: "AI Architecture" },
              ].map((m) => (
                <div key={m.label} className="border border-border rounded-md px-3 py-2.5 bg-muted/20">
                  <p className="text-muted-foreground/60 text-[10px] uppercase tracking-wider mb-1">{m.label}</p>
                  <p className="text-foreground font-semibold">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOOP VISUALIZATION */}
        <section className="border-b border-border scroll-mt-16">
          <SclLoopSection />
        </section>

        {/* R-CC[H]AM PIPELINE */}
        <div className="border-b border-border">
          <SclBrainVisualization />
        </div>

        {/* CORE PREMISE */}
        <section id="core-premise" className="border-b border-border px-6 sm:px-10 lg:px-16 py-16 scroll-mt-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 1 - Core Premise</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
              Performance is a race. Justification is a condition.
            </h2>
            <div className="space-y-5 text-muted-foreground leading-7 text-base">
              <p>
                A fast car is not automatically a safe car. Engine output and braking distance belong to two separate
                design axes - and strengthening one does not pull the other along. The same holds for AI.
              </p>
              <p>
                The industry has competed on accuracy, benchmark scores, and inference speed. But as AI moves into
                loan screening, medical diagnosis, and legal review, the question changes from{" "}
                <em className="text-foreground/80">"how accurately does it answer?"</em> to{" "}
                <em className="text-foreground/80">"why was this judgment permitted?"</em>
              </p>
              <p>
                Justification, accountability, and reproducibility do not emerge on their own as models improve.
                Like a car's brakes, they are structural properties that must be designed separately - and that
                is what SCL is.
              </p>
            </div>

            {/* Comparison table */}
            <div className="mt-12 overflow-x-auto rounded-xl border border-border">
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
                      <td className="py-3 px-4 text-muted-foreground">{a}</td>
                      <td className="py-3 px-4 text-muted-foreground">{b}</td>
                      <td className="py-3 px-4 text-foreground font-medium">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAILURE ANALYSIS */}
        <section id="failure-analysis" className="border-b border-border px-6 sm:px-10 lg:px-16 py-16 scroll-mt-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 2 - Failure Analysis</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Two Roots of Every AI Failure</h2>
            <p className="text-base text-muted-foreground leading-7 mb-12">
              AI failures look varied on the surface. Trace them back and they spring from exactly two structural
              roots - both of which SCL is designed to address.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="border border-border rounded-xl p-6 bg-muted/10">
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-3">Root 01</p>
                <h3 className="text-lg font-semibold mb-3">Role Error</h3>
                <p className="text-base text-muted-foreground leading-7 mb-5">
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
                <p className="text-base text-muted-foreground leading-7 mb-5">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
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
                      <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* R-CC[H]AM LOOP */}
        <section id="rccham-loop" className="border-b border-border px-6 sm:px-10 lg:px-16 py-16 scroll-mt-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 3 - The Loop</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">R-CC[H]AM Cognitive Loop</h2>
            <p className="text-base text-muted-foreground leading-7 mb-12">
              Every judgment in SCL passes through a fixed, predictable cycle. The loop repeats until the goal is
              reached, and terminates upon achievement. One turn equals one cognitive loop.
            </p>

            <div className="space-y-0 divide-y divide-border border border-border rounded-xl overflow-hidden">
              {rcchamSteps.map((step, i) => (
                <div
                  id={step.id}
                  key={step.id}
                  className={`grid grid-cols-[88px_1fr] gap-5 p-6 sm:p-8 scroll-mt-16 ${
                    step.optional ? "bg-accent/[0.04]" : "bg-muted/[0.04]"
                  }`}
                >
                  <div className="text-center pt-1">
                    <span className={`text-3xl font-black leading-none ${step.optional ? "text-accent/50" : "text-accent/30"}`}>
                      {step.label}
                    </span>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/50 mt-1.5">Step {i + 1}</p>
                    {step.optional && (
                      <span className="inline-block mt-2 text-[9px] font-bold text-accent border border-accent/30 rounded px-1.5 py-0.5">
                        Optional
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3 className="text-base font-semibold">{step.name}</h3>
                      <span className="text-xs text-muted-foreground/60 font-mono">{step.role}</span>
                    </div>
                    <p className="text-base text-muted-foreground leading-7">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE MECHANISMS */}
        <section id="core-mechanisms" className="border-b border-border px-6 sm:px-10 lg:px-16 py-16 scroll-mt-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 4 - Core Mechanisms</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">The Infrastructure of Accountability</h2>
            <p className="text-base text-muted-foreground leading-7 mb-12">
              What does accountable AI need that corresponds to a car's brakes, airbags, and black box?
              These three mechanisms are SCL's answer.
            </p>

            <div className="space-y-5">
              {mechanisms.map((m) => (
                <div id={m.id} key={m.id} className="border border-border rounded-xl p-6 sm:p-8 bg-muted/10 scroll-mt-16">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-[10px] font-mono text-muted-foreground/50 mt-0.5 shrink-0">{m.num}</span>
                    <div>
                      <h3 className="text-base font-semibold">{m.name}</h3>
                      <p className="text-xs text-accent font-mono mt-0.5">{m.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-base text-muted-foreground leading-7">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REGULATORY ALIGNMENT */}
        <section id="regulatory-alignment" className="border-b border-border px-6 sm:px-10 lg:px-16 py-16 scroll-mt-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 5 - Regulatory Alignment</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Built for the EU AI Act Era</h2>
            <div className="space-y-5 text-base text-muted-foreground leading-7 mb-8">
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
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b border-border px-6 sm:px-10 lg:px-16 py-16 scroll-mt-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-4">§ 6 - Reference</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12">Common Questions</h2>
            <div className="divide-y divide-border">
              {faqs.map((f) => (
                <div key={f.q} className="py-7 first:pt-0">
                  <h3 className="text-base font-semibold text-foreground mb-3">{f.q}</h3>
                  <p className="text-base text-muted-foreground leading-7">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="px-6 sm:px-10 lg:px-16 py-14">
          <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold">Explore the research behind SCL</h2>
              <p className="text-base text-muted-foreground mt-1.5 leading-relaxed">
                Peer-reviewed papers on arXiv, PsyArXiv, and PhilSci.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/research" className="px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
                Read Research
              </Link>
              <a href="https://forhu.ai" className="px-5 py-2.5 rounded-md border border-border text-sm text-foreground hover:bg-muted/20 transition-colors">
                Forhu.ai
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
