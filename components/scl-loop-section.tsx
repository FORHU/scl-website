"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const rcchamSteps = [
  {
    number: 1,
    id: "retrieval",
    label: "R",
    title: "Retrieval",
    role: "Fix the Horizon",
    copy: "Fixes the candidate document pool once before any reasoning begins. A retrieved document is only a candidate — it must pass the Warrant gate to become Ground Truth. This makes the grounds of judgment fully traceable — something ordinary RAG cannot provide.",
    optional: false,
    color: "from-blue-500/30 to-transparent",
  },
  {
    number: 2,
    id: "cognition",
    label: "C",
    title: "Cognition",
    role: "The Proposer",
    copy: "The LLM proposes a next-step action plan based solely on the current Turn Goal and verified Ground Truth. This is a proposal — not a decision. The authority to judge has moved from the LLM to the structure. No output from Cognition is executed until it passes Control.",
    optional: false,
    color: "from-purple-500/30 to-transparent",
  },
  {
    number: 3,
    id: "control",
    label: "C",
    title: "Control",
    role: "The Gate Check",
    copy: "The system-level gatekeeper that verifies every proposal from Cognition against the Regulation Layer's immutable rules — enforcing data completeness, numeric comparison thresholds, and formal logic compliance. Even if the LLM hallucinates a reasoning path, Control blocks execution.",
    optional: false,
    color: "from-accent/30 to-transparent",
  },
  {
    number: 4,
    id: "hitl",
    label: "[H]",
    title: "HITL",
    role: "Human Intervention",
    copy: "When a proposal involves high-risk actions, a human is placed structurally inside the conditions of judgment — not as a review after the fact, but as a gating condition before execution. Accountability arises from the fact that a human confirmed the conditions.",
    optional: true,
    color: "from-yellow-500/30 to-transparent",
  },
  {
    number: 5,
    id: "action",
    label: "A",
    title: "Action",
    role: "Permitted Execution",
    copy: "Only what has passed Control — and HITL where required — is executed. The Glassbox Trace Manager records every input, function call, and approval decision in real time. This produces a true record of the judgment path, not a post-hoc rationalization.",
    optional: false,
    color: "from-green-500/30 to-transparent",
  },
  {
    number: 6,
    id: "memory",
    label: "M",
    title: "Memory",
    role: "Commitment and Record",
    copy: "Execution results are confirmed as Memory Facts — verified, structured entries that serve as the factual basis for the next cycle. SCL accumulates facts within a task but does not carry state between tasks (Intentional Statelessness). One percent of unclarity is more dangerous than ninety-nine percent of retained context.",
    optional: false,
    color: "from-red-500/30 to-transparent",
  },
]

export default function SCLLoopSection() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 },
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % rcchamSteps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isVisible])

  const step = rcchamSteps[activeStep]

  return (
    <section
      id="scl-loop"
      ref={containerRef}
      className="relative py-16 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-background/80 via-background to-background"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 sm:gap-16">

          {/* Orbit SVG */}
          <div className="relative h-64 sm:h-96 flex items-center justify-center shrink-0">
            <svg className="w-full h-full max-w-[260px] sm:max-w-[300px] md:max-w-sm" viewBox="0 0 400 400" style={{ overflow: "visible" }}>
              <defs>
                <radialGradient id="rccNodeActive" cx="50%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#ff8c55" />
                  <stop offset="100%" stopColor="#ff6a2d" />
                </radialGradient>
                <radialGradient id="rccNodeIdle" cx="50%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,106,45,0.45)" />
                  <stop offset="100%" stopColor="rgba(255,106,45,0.18)" />
                </radialGradient>
                <radialGradient id="rccNodeOptional" cx="50%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,200,50,0.6)" />
                  <stop offset="100%" stopColor="rgba(200,150,20,0.25)" />
                </radialGradient>
              </defs>

              {/* Orbit ring */}
              <circle cx="200" cy="200" r="155" fill="none" stroke="#ff6a2d" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 6" />

              {rcchamSteps.map((s, idx) => {
                const angle = (idx * (360 / 6) - 90) * (Math.PI / 180)
                const x = 200 + 155 * Math.cos(angle)
                const y = 200 + 155 * Math.sin(angle)
                const isActive = idx === activeStep

                const labelDist = 155 + (isActive ? 46 : 38)
                const lx = 200 + labelDist * Math.cos(angle)
                const ly = 200 + labelDist * Math.sin(angle)
                const labelAnchor = Math.abs(Math.cos(angle)) < 0.25 ? "middle"
                  : Math.cos(angle) > 0 ? "start" : "end"

                const cdx = x - 200, cdy = y - 200
                const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
                const cnx = cdx / cdist, cny = cdy / cdist
                const lx1 = 200 + cnx * 56
                const ly1 = 200 + cny * 56
                const lx2 = x - cnx * (isActive ? 32 : 23)
                const ly2 = y - cny * (isActive ? 32 : 23)

                const nodeColor = s.optional
                  ? (isActive ? "url(#rccNodeOptional)" : "rgba(255,200,50,0.2)")
                  : (isActive ? "url(#rccNodeActive)" : "url(#rccNodeIdle)")

                return (
                  <g key={s.id} onClick={() => setActiveStep(idx)} style={{ cursor: "pointer" }}>
                    {/* Connection line */}
                    <line
                      x1={lx1} y1={ly1} x2={lx2} y2={ly2}
                      stroke={s.optional ? "#ffd030" : "#ff6a2d"}
                      strokeWidth={isActive ? "2" : "0.8"}
                      opacity={isActive ? 0.75 : 0.15}
                      strokeLinecap="round"
                      strokeDasharray={s.optional ? "3 3" : "none"}
                    />

                    {/* Pulse ring */}
                    {isActive && (
                      <circle cx={x} cy={y} r="40" fill="none"
                        stroke={s.optional ? "#ffd030" : "#ff6a2d"}
                        strokeWidth="1" opacity="0.2"
                      />
                    )}

                    {/* Node */}
                    <circle
                      cx={x} cy={y}
                      r={isActive ? 28 : 19}
                      fill={nodeColor}
                      style={{
                        transition: "r 0.4s ease",
                        filter: isActive
                          ? `drop-shadow(0 0 8px ${s.optional ? "rgba(255,200,50,0.7)" : "rgba(255,106,45,0.7)"})`
                          : "none",
                      }}
                    />

                    {/* Border */}
                    <circle
                      cx={x} cy={y}
                      r={isActive ? 28 : 19}
                      fill="none"
                      stroke={s.optional ? "#ffd030" : "#ff6a2d"}
                      strokeWidth={s.optional ? (isActive ? "1.5" : "0.8") : (isActive ? "1.5" : "0.8")}
                      strokeDasharray={s.optional ? "4 3" : "none"}
                      opacity={isActive ? 0.9 : 0.4}
                    />

                    {/* Label letter */}
                    <text
                      x={x} y={y}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize={isActive ? (s.label === "[H]" ? "10" : "14") : (s.label === "[H]" ? "8" : "11")}
                      fontWeight="700"
                      fill={isActive ? (isDark ? "#fff" : "#fff") : (isDark ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.9)")}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {s.label}
                    </text>

                    {/* Step title */}
                    <text
                      x={lx} y={ly}
                      textAnchor={labelAnchor}
                      dominantBaseline="middle"
                      fontSize={isActive ? "11" : "9"}
                      fontWeight={isActive ? "700" : "400"}
                      fill={isActive ? (s.optional ? "#ffd030" : "#ff6a2d") : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)")}
                      style={{ pointerEvents: "none", userSelect: "none", transition: "fill 0.3s" }}
                    >
                      {s.title}
                    </text>
                  </g>
                )
              })}

              {/* Center node */}
              <circle cx="200" cy="200" r="52" fill="rgba(255,106,45,0.05)" />
              <circle cx="200" cy="200" r="52" fill="none" stroke="#ff6a2d" strokeWidth="1" opacity="0.3" />
              <circle cx="200" cy="200" r="38" fill="rgba(255,106,45,0.08)" />
              <circle cx="200" cy="200" r="38" fill="none" stroke="#ff6a2d" strokeWidth="1.5" opacity="0.5" />
              <text x="200" y="195" textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fontWeight="800" fill="#ff6a2d"
                style={{ pointerEvents: "none", userSelect: "none" }}>
                R-CC[H]AM
              </text>
              <text x="200" y="208" textAnchor="middle" dominantBaseline="middle"
                fontSize="5.5" fontWeight="400" fill="rgba(255,106,45,0.55)"
                style={{ pointerEvents: "none", userSelect: "none", letterSpacing: "0.1em" }}>
                COGNITIVE LOOP
              </text>
            </svg>
          </div>

          {/* Info panel */}
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-sm shadow-lg shadow-black/30 ${
                  step.optional
                    ? "border-yellow-500/30 bg-yellow-500/[0.06]"
                    : "border-white/8 bg-white/[0.09]"
                }`}
              >
                <div className={`h-1 w-12 mb-5 rounded-full ${step.optional ? "bg-yellow-400/50" : "bg-accent/50"}`} />

                <div className="flex items-center gap-3 mb-1">
                  <p className={`text-[10px] font-bold uppercase tracking-[0.35em] ${step.optional ? "text-yellow-400" : "text-accent"}`}>
                    Step {step.number} of 6
                  </p>
                  {step.optional && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-yellow-400 border border-yellow-400/30 rounded px-1.5 py-0.5">
                      Contextual
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-4">
                  {step.role}
                </p>

                <h3 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tighter mb-1 leading-none">
                  <span className={`${step.optional ? "text-yellow-400/60" : "text-accent/40"} mr-2`}>
                    {step.label}
                  </span>
                  {step.title}
                </h3>

                <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed mt-4">
                  {step.copy}
                </p>

                {/* Step dots */}
                <div className="flex gap-2 mt-6">
                  {rcchamSteps.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-px rounded-full transition-all duration-300 ${
                        i === activeStep
                          ? `w-8 ${s.optional ? "bg-yellow-400" : "bg-accent"}`
                          : "w-3 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
