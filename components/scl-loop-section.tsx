"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SCLStep {
  number: number
  role: string
  title: string
  copy: string
  color: string
}

const sclSteps: SCLStep[] = [
  {
    number: 1,
    role: "Compass",
    title: "Metaprompt",
    copy: "What should be pursued?",
    color: "from-blue-500/30 to-transparent",
  },
  {
    number: 2,
    role: "Decision Maker",
    title: "Judgment",
    copy: "What should be done next?",
    color: "from-purple-500/30 to-transparent",
  },
  {
    number: 3,
    role: "Executor",
    title: "Runtime",
    copy: "Turn decisions into reality",
    color: "from-accent/30 to-transparent",
  },
  {
    number: 4,
    role: "Experience Vault",
    title: "Memory",
    copy: "Remember lessons learned",
    color: "from-green-500/30 to-transparent",
  },
  {
    number: 5,
    role: "Self-Checker",
    title: "Control",
    copy: "Never repeat mistakes",
    color: "from-red-500/30 to-transparent",
  },
]

export default function SCLLoopSection() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % sclSteps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section
      id="scl-loop"
      ref={containerRef}
      className="relative py-16 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-background/80 via-background to-background"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main visualization */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 sm:gap-16 mb-12 sm:mb-16">
          {/* The Loop Visualization */}
          <div className="relative h-64 sm:h-96 flex items-center justify-center shrink-0">
            <svg className="w-full h-full max-w-[260px] sm:max-w-[300px] md:max-w-sm" viewBox="0 0 400 400" style={{ overflow: "visible" }}>
              <defs>
                <radialGradient id="nodeActive" cx="50%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#ff8c55" />
                  <stop offset="100%" stopColor="#ff6a2d" />
                </radialGradient>
                <radialGradient id="nodeIdle" cx="50%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,106,45,0.45)" />
                  <stop offset="100%" stopColor="rgba(255,106,45,0.18)" />
                </radialGradient>
              </defs>

              {/* Outer orbit ring */}
              <circle cx="200" cy="200" r="160" fill="none" stroke="#ff6a2d" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 6" />

              {/* Step nodes */}
              {sclSteps.map((step, idx) => {
                const angle = (idx * 72 - 90) * (Math.PI / 180)
                const x = 200 + 160 * Math.cos(angle)
                const y = 200 + 160 * Math.sin(angle)
                const isActive = idx === activeStep

                // Label: just outside the node circle edge, same radial direction
                const labelDist = 160 + (isActive ? 44 : 36)
                const lx = 200 + labelDist * Math.cos(angle)
                const ly = 200 + labelDist * Math.sin(angle)
                // Text anchor: left for right-side nodes, right for left-side, middle for top/bottom
                const labelAnchor = Math.abs(Math.cos(angle)) < 0.3 ? "middle"
                  : Math.cos(angle) > 0 ? "start" : "end"

                // Offset line so it starts at center ring edge, ends at node edge
                const cdx = x - 200, cdy = y - 200
                const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
                const cnx = cdx / cdist, cny = cdy / cdist
                const lx1 = 200 + cnx * 56
                const ly1 = 200 + cny * 56
                const lx2 = x - cnx * (isActive ? 30 : 22)
                const ly2 = y - cny * (isActive ? 30 : 22)

                return (
                  <g key={idx} onClick={() => setActiveStep(idx)} style={{ cursor: "pointer" }}>
                    {/* Connection line — from edge of center ring to edge of node */}
                    <line
                      x1={lx1} y1={ly1} x2={lx2} y2={ly2}
                      stroke="#ff6a2d"
                      strokeWidth={isActive ? "2" : "0.8"}
                      opacity={isActive ? 0.75 : 0.18}
                      strokeLinecap="round"
                    />

                    {/* Outer pulse ring (active only) */}
                    {isActive && (
                      <circle cx={x} cy={y} r="38" fill="none" stroke="#ff6a2d" strokeWidth="1" opacity="0.25" />
                    )}

                    {/* Node background circle — CSS drop-shadow instead of SVG filter */}
                    <circle
                      cx={x} cy={y}
                      r={isActive ? 26 : 18}
                      fill={isActive ? "url(#nodeActive)" : "url(#nodeIdle)"}
                      style={{
                        transition: "r 0.4s ease, opacity 0.4s ease",
                        filter: isActive ? "drop-shadow(0 0 8px rgba(255,106,45,0.7))" : "none",
                      }}
                    />

                    {/* Node border ring */}
                    <circle
                      cx={x} cy={y}
                      r={isActive ? 26 : 18}
                      fill="none"
                      stroke="#ff6a2d"
                      strokeWidth={isActive ? "1.5" : "0.8"}
                      opacity={isActive ? 0.9 : 0.45}
                    />

                    {/* Step number */}
                    <text
                      x={x} y={y}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize={isActive ? "14" : "11"}
                      fontWeight="700"
                      fill={isActive ? "#fff" : "rgba(255,255,255,0.7)"}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {step.number}
                    </text>

                    {/* Step title label — positioned just outside node, anchored by quadrant */}
                    <text
                      x={lx} y={ly}
                      textAnchor={labelAnchor}
                      dominantBaseline="middle"
                      fontSize={isActive ? "11" : "9"}
                      fontWeight={isActive ? "700" : "400"}
                      fill={isActive ? "#ff6a2d" : "rgba(255,255,255,0.4)"}
                      style={{ pointerEvents: "none", userSelect: "none", transition: "fill 0.3s ease, font-size 0.3s ease" }}
                    >
                      {step.title}
                    </text>
                  </g>
                )
              })}

              {/* Center SCL node */}
              <circle cx="200" cy="200" r="50" fill="rgba(255,106,45,0.06)" />
              <circle cx="200" cy="200" r="50" fill="none" stroke="#ff6a2d" strokeWidth="1" opacity="0.35" />
              <circle cx="200" cy="200" r="38" fill="rgba(255,106,45,0.10)" />
              <circle cx="200" cy="200" r="38" fill="none" stroke="#ff6a2d" strokeWidth="1.5" opacity="0.55" />
              <text
                x="200" y="197" textAnchor="middle" dominantBaseline="middle"
                fontSize="16" fontWeight="800" fill="#ff6a2d"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                SCL
              </text>
              <text
                x="200" y="212" textAnchor="middle" dominantBaseline="middle"
                fontSize="6.5" fontWeight="400" fill="rgba(255,106,45,0.6)"
                style={{ pointerEvents: "none", userSelect: "none", letterSpacing: "0.12em" }}
              >
                CORE
              </text>
            </svg>
          </div>

          {/* Active step info panel — glass card */}
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="p-5 sm:p-8 md:p-10 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30"
              >
                <div className="h-1 w-12 bg-accent/50 mb-6 rounded-full" />
                <p className="text-accent text-[10px] font-bold uppercase tracking-[0.35em] mb-1">
                  Step {sclSteps[activeStep].number} of 5
                </p>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-5">
                  {sclSteps[activeStep].role}
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4 leading-none">
                  {sclSteps[activeStep].title}
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed">
                  {sclSteps[activeStep].copy}
                </p>
                {/* Progress dots */}
                <div className="flex gap-2 mt-8">
                  {sclSteps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-px rounded-full transition-all duration-400 ${
                        i === activeStep
                          ? "w-10 bg-accent"
                          : "w-4 bg-white/20 hover:bg-white/40"
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
