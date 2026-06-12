"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  {
    id: "retrieval",
    label: "R",
    title: "Retrieval",
    role: "Fix the Horizon",
    optional: false,
    receives: "Turn Goal + document corpus",
    does: "Fixes the candidate document pool once before any reasoning begins (Pool-Gated Retrieval). A retrieved document is only a candidate — it must pass the Warrant gate and meet threshold conditions to become Ground Truth.",
    outputs: "Verified Ground Truth facts",
    blocks: "Documents that fail the Warrant gate or threshold conditions. They remain candidates — never Ground Truth.",
  },
  {
    id: "cognition",
    label: "C",
    title: "Cognition",
    role: "The Proposer",
    optional: false,
    receives: "Turn Goal + Verified Ground Truth only",
    does: "The LLM proposes the next-step action plan. Critically, this is a proposal — not a decision. The authority to judge has moved from the LLM to the structure. No conversation history enters.",
    outputs: "Proposed action plan → forwarded to Control",
    blocks: "Nothing. Cognition can only propose. It has no execution authority and cannot admit its own output.",
  },
  {
    id: "control",
    label: "C",
    title: "Control",
    role: "The Gate Check",
    optional: false,
    receives: "Proposed action plan from Cognition",
    does: "Verifies the proposal against the Regulation Layer's immutable rules: data completeness checks, numeric comparison thresholds, formal logic compliance in code. This is SCL's structural brake.",
    outputs: "Approved plan → forwarded to HITL or Action",
    blocks: "Any proposal that fails regulation checks. Execution is blocked regardless of how plausible the LLM's reasoning appears.",
  },
  {
    id: "hitl",
    label: "[H]",
    title: "HITL",
    role: "Human Intervention",
    optional: true,
    receives: "Control-approved plan flagged as high-risk",
    does: "Places a human structurally inside the conditions of judgment before execution. Supports approval-based execution, context freezing and restoration, and graceful rejection handling.",
    outputs: "Human-confirmed plan → forwarded to Action",
    blocks: "Execution is blocked until the human confirms. If rejected, the context is frozen and the cycle terminates cleanly.",
  },
  {
    id: "action",
    label: "A",
    title: "Action",
    role: "Permitted Execution",
    optional: false,
    receives: "Fully approved plan (Control + HITL if required)",
    does: "Executes the approved action. The Glassbox Trace Manager records every input, function call, and approval decision in real time — producing a true record of the judgment path.",
    outputs: "Execution result + complete audit trace (Glassbox record)",
    blocks: "Nothing reaches this stage without passing Control. Post-hoc rationalization is structurally impossible.",
  },
  {
    id: "memory",
    label: "M",
    title: "Memory",
    role: "Commitment and Record",
    optional: false,
    receives: "Execution result from Action",
    does: "Commits result as a Memory Fact — verified, structured, immutable for this cognitive cycle. Fresh Instance Protocol prevents cross-task contamination: each new cycle starts from exactly three inputs.",
    outputs: "Memory Facts → serve as Verified Ground Truth for the next R-CC[H]AM cycle",
    blocks: "Unverified results are not committed. Intentional Statelessness ensures each task starts clean.",
  },
]

const detailFields = [
  { key: "receives" as const, label: "Receives" },
  { key: "does" as const, label: "Does" },
  { key: "outputs" as const, label: "Outputs" },
  { key: "blocks" as const, label: "Blocks when" },
]

export default function RCCHAMPipeline() {
  const [selected, setSelected] = useState<string>("retrieval")
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  const selectedStep = steps.find((s) => s.id === selected)!

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 border-t border-white/8 bg-background/60">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-2">Interactive Pipeline</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">R-CC[H]AM Gate Flow</h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Every judgment passes through this sequence. Each gate can block the next. Click any step to inspect what it receives, does, outputs, and blocks.
          </p>
        </div>

        {/* Pipeline nodes */}
        <div className="relative mb-8">
          {/* Connector line behind nodes */}
          <div className={`absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 hidden sm:block ${isDark ? "bg-white/8" : "bg-black/10"}`} />

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-0 relative">
            {steps.map((step, idx) => {
              const isSelected = selected === step.id
              const isOptional = step.optional

              return (
                <div key={step.id} className="flex items-center flex-1 min-w-0">
                  {/* Node button */}
                  <button
                    onClick={() => setSelected(step.id)}
                    className={`relative flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border transition-all duration-200 w-full sm:w-auto sm:flex-1 group ${
                      isSelected
                        ? isOptional
                          ? "border-yellow-400/50 bg-yellow-400/10 shadow-lg shadow-yellow-400/10"
                          : "border-accent/50 bg-accent/10 shadow-lg shadow-accent/10"
                        : "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    {/* Optional badge */}
                    {isOptional && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-wider text-yellow-400 border border-yellow-400/30 bg-background rounded px-1.5 py-px whitespace-nowrap">
                        optional
                      </span>
                    )}

                    {/* Step letter */}
                    <span className={`text-lg sm:text-xl font-black leading-none transition-colors ${
                      isSelected
                        ? isOptional ? "text-yellow-400" : "text-accent"
                        : isDark ? "text-white/30 group-hover:text-white/60" : "text-black/30 group-hover:text-black/60"
                    }`}>
                      {step.label}
                    </span>

                    {/* Step name */}
                    <span className={`text-[10px] font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${
                      isSelected ? "text-foreground" : "text-muted-foreground/50"
                    }`}>
                      {step.title}
                    </span>

                    {/* Active dot */}
                    {isSelected && (
                      <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isOptional ? "bg-yellow-400" : "bg-accent"}`} />
                    )}
                  </button>

                  {/* Arrow */}
                  {idx < steps.length - 1 && (
                    <div className="hidden sm:flex items-center justify-center w-6 shrink-0">
                      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                        <path d="M0 5 H16 M12 1 L18 5 L12 9" stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Loop back indicator */}
          <div className="hidden sm:flex items-center gap-2 mt-3 justify-end">
            <svg width="180" height="18" viewBox="0 0 180 18">
              <path d="M170 2 C170 2, 175 2, 175 9 C175 16, 170 16, 10 16 C4 16, 4 16, 4 9 C4 2, 10 2, 10 2"
                fill="none" stroke="rgba(255,106,45,0.2)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M12 0 L6 4 L12 8" fill="none" stroke="rgba(255,106,45,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[9px] font-mono uppercase tracking-widest text-accent/30">loop · next turn</span>
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className={`rounded-2xl border p-6 sm:p-8 ${
              selectedStep.optional
                ? "border-yellow-400/20 bg-yellow-400/[0.04]"
                : isDark ? "border-white/8 bg-white/[0.04]" : "border-black/10 bg-black/[0.03]"
            }`}
          >
            {/* Step header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-white/8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-2xl font-black ${selectedStep.optional ? "text-yellow-400" : "text-accent"}`}>
                    {selectedStep.label}
                  </span>
                  <span className="text-xl font-bold text-foreground">{selectedStep.title}</span>
                  {selectedStep.optional && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-yellow-400 border border-yellow-400/30 rounded px-1.5 py-0.5">
                      Contextual
                    </span>
                  )}
                </div>
                <p className={`text-xs font-mono uppercase tracking-widest ${selectedStep.optional ? "text-yellow-400/60" : "text-accent/60"}`}>
                  {selectedStep.role}
                </p>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground/30 shrink-0 mt-1">
                Step {steps.findIndex(s => s.id === selected) + 1} / 6
              </span>
            </div>

            {/* Four fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {detailFields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">
                    {field.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedStep[field.key]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
