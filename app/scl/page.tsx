import type { Metadata } from "next"
import Link from "next/link"
import SclBrainVisualization from "@/components/scl-brain-visualization"
import SclComparisonSection from "@/components/scl-comparison-section"
import SclLoopSection from "@/components/scl-loop-section"

export const metadata: Metadata = {
  title: "Structured Cognitive Loop (SCL)",
  description:
    "The Structured Cognitive Loop (SCL) is an epistemic operating system that transforms probabilistic LLMs into deterministic, glass-box engines through the R-CC[H]AM Cognitive Loop.",
  alternates: { canonical: "https://forhu.ai/scl" },
  openGraph: {
    title: "Structured Cognitive Loop (SCL) | Forhu",
    description:
      "An epistemic operating system that fixes the conditions of justification structurally — where the LLM proposes, and the structure decides admission.",
    url: "https://forhu.ai/scl",
  },
}

const sclJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Structured Cognitive Loop (SCL)",
  description:
    "The Structured Cognitive Loop (SCL) is an epistemic operating system developed by Forhu. It fixes the conditions of AI justification structurally through the R-CC[H]AM Cognitive Loop — Retrieval, Cognition, Control, HITL, Action, Memory.",
  url: "https://forhu.ai/scl",
  author: { "@type": "Organization", name: "Forhu", url: "https://forhu.ai" },
  about: [
    { "@type": "Thing", name: "Structured Cognitive Loop" },
    { "@type": "Thing", name: "R-CCHAM Cognitive Loop" },
    { "@type": "Thing", name: "Epistemic Operating System" },
    { "@type": "Thing", name: "Large Language Model Agents" },
  ],
  keywords:
    "SCL, Structured Cognitive Loop, R-CCAM, epistemic operating system, cognitive architecture, AI agents, LLM, glass-box AI, HITL, hallucination governance",
}

const sclSoftwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Structured Cognitive Loop (SCL)",
  description:
    "SCL (Structured Cognitive Loop) is an open-source AI architecture framework designed to eliminate hallucinations in agentic workflows by transforming probabilistic LLMs into deterministic, glass-box engines.",
  operatingSystem: "All",
  applicationCategory: "Artificial Intelligence",
  url: "https://forhu.ai/scl",
  author: {
    "@type": "Organization",
    name: "Forhu",
    url: "https://forhu.ai",
  },
  about: [
    { "@type": "Thing", name: "Structured Cognitive Loop" },
    { "@type": "Thing", name: "R-CCHAM Cognitive Loop" },
    { "@type": "Thing", name: "Epistemic Operating System" },
    { "@type": "Thing", name: "Large Language Model Agents" },
  ],
  softwareRequirements: "LLM API or Local model",
  keywords:
    "SCL, Structured Cognitive Loop, R-CC[H]AM, epistemic operating system, cognitive architecture, AI agents, LLM, glass-box AI, HITL, hallucination governance",
}

// R-CC[H]AM: the canonical six-step loop per Institutionalizing Cognition paper
const rcchamSteps = [
  {
    label: "R",
    name: "Retrieval",
    role: "Fix the Horizon",
    description:
      "At the start of each turn, SCL fixes the candidate document pool once — before any reasoning begins. This is Pool-Gated Retrieval: a retrieved document is only a candidate. Only what passes the Warrant gate and meets threshold conditions is confirmed as Ground Truth. This makes 'on what grounds did it judge?' fully traceable — something ordinary RAG cannot provide.",
  },
  {
    label: "C",
    name: "Cognition",
    role: "The Proposer",
    description:
      "The LLM proposes a next-step action plan based solely on the current Turn Goal and verified Ground Truth. Critically, this is a proposal — not a decision. The authority to judge has moved from the LLM to the structure. No output from Cognition is executed until it passes Control.",
  },
  {
    label: "C",
    name: "Control",
    role: "The Gate Check",
    description:
      "Control is the system-level gatekeeper that verifies every proposal from Cognition against the Regulation Layer's immutable rules — enforcing data completeness, numeric comparison thresholds, and formal logic compliance in code. Even if the LLM hallucinates a reasoning path, Control blocks execution. This is SCL's structural brake.",
  },
  {
    label: "[H]",
    name: "HITL",
    role: "Human Intervention (Contextual)",
    description:
      "When a proposal involves high-risk actions, HITL places a human structurally inside the conditions of judgment — not as a review layer after the fact, but as a gating condition before execution. SCL's HITL supports approval-based execution, context freezing and restoration, and graceful rejection handling. Accountability arises from the fact that a human confirmed the conditions.",
    optional: true,
  },
  {
    label: "A",
    name: "Action",
    role: "Permitted Execution",
    description:
      "Only what has passed Control — and HITL where required — is executed. Every action is recorded in real time by the Glassbox Trace Manager: every input, function call, and approval decision. This produces a true record of the judgment path, not a post-hoc rationalization attached after the result.",
  },
  {
    label: "M",
    name: "Memory",
    role: "Commitment and Record",
    description:
      "Execution results are confirmed as Memory Facts — verified, structured entries that serve as the factual basis for the next cycle. SCL accumulates facts within a task (stateful) but does not carry state automatically between tasks (Intentional Statelessness). One percent of unclarity is more dangerous than ninety-nine percent of retained context.",
  },
]

// Three core mechanisms
const mechanisms = [
  {
    id: "01",
    name: "Regulation Layer",
    subtitle: "The Cognitive Constitution",
    body: "The Regulation Layer fixes the conditions under which any output can be recognized as a justified judgment — before execution. It does not limit creative capability; it grants AI outputs legal and logical force, the same way a court oath does not limit a witness's capacity to testify, but grants the statement institutional force. Enforced in code: data completeness checks, numeric comparison thresholds, tool-use preconditions. No judgment is admitted without passing these conditions.",
  },
  {
    id: "02",
    name: "Glassbox Trace",
    subtitle: "Real-Time Auditability",
    body: "Unlike black-box AI that generates plausible reasons after the result, SCL's Trace Manager records every reasoning step in real time — inputs, function calls, control decisions, approvals. This shifts the evidentiary standard from 'the AI decided this' to 'AI proposed based on these specific verified facts, the structure reviewed and approved, and here is the full record.' Post-hoc rationalization is structurally impossible.",
  },
  {
    id: "03",
    name: "Fresh Instance Protocol",
    subtitle: "Intentional Statelessness",
    body: "Every cognitive cycle launches a completely new LLM instance receiving exactly three inputs: the Turn Goal, the Regulations, and verified Memory Facts. No accumulated conversation history enters. This is not a missing feature — it is a deliberate architectural choice grounded in Baddeley's working-memory model: residue from a previous task acts as interference on a new one. Fresh Instance keeps per-cycle input size linear, makes cost predictable, and structurally blocks confirmation bias.",
  },
]

const faqs = [
  {
    q: "What is the Structured Cognitive Loop (SCL)?",
    a: "SCL is an epistemic operating system developed by Forhu. It wraps any LLM in a structured R-CC[H]AM Cognitive Loop — Retrieval, Cognition, Control, HITL, Action, Memory — transforming probabilistic black-box models into deterministic, glass-box engines where every judgment is structurally justified.",
  },
  {
    q: "What does 'epistemic operating system' mean?",
    a: "It means SCL governs not just what the AI does, but the conditions under which a judgment is permitted to exist. Through the Regulation Layer — the Cognitive Constitution — SCL institutionalizes the standards of evidence, logic, and accountability that any AI output must satisfy before it is recognized as a justified decision.",
  },
  {
    q: "Why can't you just prompt better, or chain more agents?",
    a: "Prompting and agent chaining are 'Configuration' approaches — they optimize how to use the AI better, but they leave the LLM as the agent of judgment. Configuration can never reach the domain of justification, because it doesn't fix the conditions under which judgment is permitted. That requires Architecture — which is what SCL provides.",
  },
  {
    q: "How does SCL handle AI hallucinations?",
    a: "SCL treats hallucinations as an inevitable structural phenomenon, not a bug. Shannon information theory, Kolmogorov complexity, and the bias-variance tradeoff all point to the same conclusion: a finite model cannot transmit infinite information without loss. SCL's stance is management, not elimination. Even when hallucination occurs, Control and the Regulation Layer block the execution of any unverified judgment.",
  },
  {
    q: "What is HITL and when does it activate?",
    a: "Human-in-the-Loop (HITL) is a structural gating condition — not a review UI. When a proposal involves high-risk actions, HITL places a human inside the conditions of judgment before execution occurs. SCL supports approval-based execution, context freezing and restoration, and graceful rejection handling. Accountability comes from the fact that a human confirmed the conditions, not from reviewing the output afterward.",
  },
  {
    q: "Can SCL be applied to any LLM?",
    a: "Yes. SCL is model-agnostic. It operates as a control layer around any LLM — GPT, Claude, Gemini, or open-source models. A stronger model does not automatically make SCL safer; the paper notes that high-performance models tend to circumvent given constraints more cleverly. Safety is an independent structural property, like a car's brakes — it doesn't improve just because you enlarge the engine.",
  },
  {
    q: "Where is SCL used in practice?",
    a: "SCL currently powers two live applications: Chumme (a human-centered social platform for artists) and I Love Lawyer (an AI legal research platform for Philippine jurisprudence). The underlying architecture is documented in peer-reviewed papers on arXiv, PsyArXiv, and PhilSci.",
  },
]

const sclFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
}

export default function SclPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sclJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sclSoftwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sclFaqJsonLd) }}
      />

      <main className="bg-background text-foreground min-h-screen pt-24">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Epistemic Operating System</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              Structured<br />Cognitive Loop
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
              <strong>SCL (Structured Cognitive Loop)</strong> is an epistemic operating system and AI architecture framework developed by Forhu, designed to eliminate hallucinations in agentic workflows by transforming probabilistic LLMs into deterministic, glass-box engines through the R-CC[H]AM Cognitive Loop.
            </p>
          </div>
        </section>

        {/* Existing section components */}
        <SclLoopSection />
        <SclBrainVisualization />
        <SclComparisonSection />

        {/* Performance vs Justification framing */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-border/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">The Core Premise</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4 mb-6">
                Performance is a race.<br />Justification is a condition.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                A fast car is not automatically a safe car. Engine output and braking distance belong to two separate design axes — and strengthening one does not pull the other along. The same holds for AI.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The industry has competed on accuracy, benchmark scores, and inference speed. But as AI moves into loan screening, medical diagnosis, and legal review, the question changes from <em>"how accurately does it answer?"</em> to <em>"why was this judgment permitted?"</em>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Justification, accountability, and reproducibility do not emerge on their own as models improve. Like a car's brakes, they are structural properties that must be designed separately — and that is what SCL is.
              </p>
            </div>
            <div className="space-y-4">
              {/* Three-column comparison: Config-Combination / Config-Harness / SCL */}
              <div className="grid grid-cols-3 gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground px-2 pb-2">
                <span>Configuration<br />(Combination)</span>
                <span>Configuration<br />(Harness)</span>
                <span className="text-accent">SCL Architecture</span>
              </div>
              {[
                ["LLM decides", "LLM decides", "Structure decides admission"],
                ["Maximize performance", "Stabilize execution", "Justifiable judgment"],
                ["How to do it better?", "How to do it stably?", "Why is it permitted?"],
                ["Probabilistic grounds", "Dynamic grounds", "External grounds, fixed + immutable"],
                ["Context accumulates", "Context accumulates", "Separated domains, clean reasoning"],
                ["Accountability blurred", "Accountability diffused", "Clear attribution"],
                ["Reproducibility low", "Reproducibility difficult", "Fully traceable"],
              ].map(([left, mid, right], i) => (
                <div key={i} className="grid grid-cols-3 gap-3 p-3 rounded-xl border border-white/8 bg-white/[0.06] backdrop-blur-sm text-xs">
                  <span className="text-muted-foreground">{left}</span>
                  <span className="text-muted-foreground">{mid}</span>
                  <span className="text-foreground font-medium">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two roots of failure */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background/50 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Failure Analysis</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4 mb-4">Two Roots of Every AI Failure</h2>
              <p className="text-lg text-muted-foreground">
                AI failures look varied on the surface. Trace them back and they spring from exactly two structural roots — both of which SCL is designed to address.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="group p-8 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30">
                <span className="text-accent text-xs font-bold uppercase tracking-widest">Root 01</span>
                <h3 className="text-2xl font-bold text-foreground mt-3 mb-4">Role Error</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  An LLM is, at heart, a next-token predictor. Treating it as an autonomous decision-maker is a category mistake. This mismatch appears in two forms:
                </p>
                <ul className="space-y-3">
                  <li className="text-sm text-muted-foreground border-l-2 border-border/50 pl-4">
                    <strong className="text-foreground">Capability-deficit type</strong> — the model cannot perform the task. Obvious, and easy to catch.
                  </li>
                  <li className="text-sm text-muted-foreground border-l-2 border-accent/40 pl-4">
                    <strong className="text-foreground">Role-overreach type</strong> — the model is so capable it reaches for work it was never asked to do. The stronger the model, the more strongly this appears. The intuition that "a stronger model is a safer model" does not hold.
                  </li>
                </ul>
              </div>
              <div className="group p-8 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30">
                <span className="text-accent text-xs font-bold uppercase tracking-widest">Root 02</span>
                <h3 className="text-2xl font-bold text-foreground mt-3 mb-4">Cognitive Overload</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  As context accumulates, noise enters. The AI judges on top of the noise — and error operates as reinforcement, not correction: each prior output pushes the next judgment in the same direction until it hardens into a self-narrative.
                </p>
                <ul className="space-y-3">
                  <li className="text-sm text-muted-foreground border-l-2 border-border/50 pl-4">
                    <strong className="text-foreground">Intrinsic overload</strong> — the model tries to verify its own reasoning, amplifying its own burden.
                  </li>
                  <li className="text-sm text-muted-foreground border-l-2 border-accent/40 pl-4">
                    <strong className="text-foreground">Extrinsic overload</strong> — past context contaminates current judgment. The more context accumulates, the worse it gets.
                  </li>
                </ul>
              </div>
            </div>
            {/* Seven symptoms */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Seven Symptoms That Grow From These Two Roots</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  ["Hallucination", "Contaminated context amplifies a simple error in a biased direction"],
                  ["Goal Drift", "Reacting only to recent context, the original goal is lost"],
                  ["Confirmation Bias", "The model takes its own earlier output as grounds and hardens further in the same direction"],
                  ["Rationalization", "The conclusion comes first; reasons are generated afterward"],
                  ["Post-hoc Explanation", "Plausible reasons attached to the result, not a record of the actual cognitive process"],
                  ["Reproducibility Failure", "Grounds differ each time, so the same input yields different results"],
                  ["No Accountability", "The decision path is buried inside the LLM and cannot be traced afterward"],
                ].map(([name, desc]) => (
                  <div key={name} className="p-4 rounded-xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-md shadow-black/20">
                    <p className="text-sm font-semibold text-foreground mb-1">{name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* R-CC[H]AM deep-dive */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">The Loop</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4 mb-4">R-CC[H]AM Cognitive Loop</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Every judgment in SCL passes through a fixed, predictable cycle. The loop repeats until the goal is reached, and terminates upon achievement. One turn equals one cognitive loop.
              </p>
            </div>
            <div className="space-y-6">
              {rcchamSteps.map((step, i) => (
                <div
                  key={step.name}
                  className={`grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 p-8 rounded-2xl border backdrop-blur-sm shadow-lg shadow-black/30 ${
                    step.optional ? "border-accent/30 bg-accent/[0.08]" : "border-white/8 bg-white/[0.09]"
                  }`}
                >
                  <div>
                    <span className="text-accent text-xs font-bold uppercase tracking-widest">Step {i + 1}</span>
                    <div className="flex items-baseline gap-3 mt-2">
                      <span className={`text-4xl font-black ${step.optional ? "text-accent/60" : "text-accent/30"}`}>
                        {step.label}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground">{step.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{step.role}</p>
                    {step.optional && (
                      <span className="inline-block mt-2 text-xs font-bold text-accent border border-accent/30 rounded px-2 py-0.5">
                        Contextual
                      </span>
                    )}
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three core mechanisms */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background/50 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Core Mechanisms</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4 mb-4">The Infrastructure of Accountability</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                What does accountable AI need that corresponds to a car's brakes, airbags, and black box? These three mechanisms are SCL's answer.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {mechanisms.map((m) => (
                <div key={m.id} className="group p-8 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 flex flex-col gap-4">
                  <span className="text-accent text-xs font-bold uppercase tracking-widest">Mechanism {m.id}</span>
                  <h3 className="text-2xl font-bold text-foreground">{m.name}</h3>
                  <p className="text-sm text-accent font-medium">{m.subtitle}</p>
                  <p className="text-base text-muted-foreground leading-relaxed">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EU AI Act alignment */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30 bg-card/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Regulatory Alignment</span>
              <h2 className="text-4xl font-bold tracking-tighter mt-4 mb-6">Built for the EU AI Act Era</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The EU AI Act targets uncontrolled black-box systems — untraceable decision-making, lack of meaningful human oversight, hallucination-driven actions, and accountability ambiguity. The issue is not whether AI makes mistakes, but whether organizations can understand and control the reasoning behind those mistakes.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                SCL is designed precisely for this environment. Its positioning is not "the smartest AI" but <strong className="text-foreground">Controlled AI. Governed AI. Auditable AI.</strong>
              </p>
              <p className="text-sm text-muted-foreground border-l-2 border-accent/40 pl-4 italic">
                Overclaiming carries regulatory and credibility risk. SCL does not promise "hallucination-free AI" or "100% reliable AI." It provides the structural conditions under which AI judgment can be governed, traced, and trusted.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Transparency", desc: "Glassbox Trace records every reasoning step in real time — not post-hoc" },
                { label: "Traceability", desc: "Pool-Gated Retrieval makes 'on what grounds did it judge?' answerable" },
                { label: "Human Oversight", desc: "Contextual HITL places humans inside conditions of judgment, not after the fact" },
                { label: "Accountability", desc: "Regulation Layer grants outputs institutional force — the conditions of justification are fixed" },
                { label: "Reproducibility", desc: "Fresh Instance Protocol ensures same epistemic state + same instruction = same cognitive process" },
                { label: "Controllability", desc: "The LLM proposes; the structure decides admission — authority is architectural, not model-dependent" },
              ].map((item) => (
                <div key={item.label} className="p-6 rounded-xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-md shadow-black/20">
                  <p className="text-sm font-bold text-accent uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-3xl mx-auto">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">FAQ</span>
            <h2 className="text-4xl font-bold tracking-tighter mt-4 mb-12">Common Questions</h2>
            <div className="space-y-8">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-border/30 pb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{f.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/30 bg-card/10">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Explore the research behind SCL</h2>
              <p className="text-muted-foreground mt-2">
                Peer-reviewed papers on arXiv, PsyArXiv, and PhilSci — covering the R-CC[H]AM loop, hallucination theory, and epistemic architecture.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link href="/research" className="px-6 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-colors">
                Read Research
              </Link>
              <Link href="/" className="px-6 py-3 rounded-md border border-border text-foreground hover:bg-card/50 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}