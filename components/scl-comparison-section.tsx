"use client"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import dynamic from "next/dynamic"

const SclComparison3D = dynamic(() => import("./scl-comparison-3d"), { ssr: false })

interface MinskyLayer {
  id: string
  label: string
  definition: string
  roleInCognition: string
}

interface SCLComponent {
  id: string
  label: string
  minkskyLayerId: string // Links to parent Minsky layer
  description: string
}

const minskyLayers: MinskyLayer[] = [
  {
    id: "reasoning",
    label: "Reasoning",
    definition: "Deliberative Layer / Problem-Solving Agents",
    roleInCognition:
      "A set of higher-level reasoning agents responsible for planning, analyzing situations, and generating solutions. These agents combine knowledge, strategies, and heuristics to perform deliberate, structured, step-by-step thinking.",
  },
  {
    id: "memory",
    label: "Memory",
    definition: "K-Lines / Remembering Agents",
    roleInCognition:
      "A network of memory-activation agents that re-activate past successful mental states. When triggered, these structures light up previously used patterns, enabling the system to recall context, reuse effective strategies, and learn from experience.",
  },
  {
    id: "control",
    label: "Control",
    definition: "Reflective Layer / B-Brain (Cognitive Regulator)",
    roleInCognition:
      "A supervisory layer composed of agents that monitor ongoing thought processes. This layer evaluates whether strategies are effective, detects errors, adjusts focus, and modulates cognitive flow—acting as the system's real-time regulator and critic.",
  },
  {
    id: "meta-control",
    label: "Meta-Control",
    definition: "Self-Reflective / Self-Conscious Layers",
    roleInCognition:
      "A higher tier of agents dedicated to modeling the system's own cognition. These layers track goals, assumptions, intentions, and reasoning paths. They support self-evaluation, explanation, and long-term coherence across tasks and contexts.",
  },
  {
    id: "runtime",
    label: "Runtime",
    definition: "Instinctive / Action Execution Agents",
    roleInCognition:
      "A fast-acting layer of low-level agents responsible for automatic responses and built-in action routines. Operating beneath conscious thought, these agents handle sensorimotor execution and provide the real-time operational base for higher layers.",
  },
]

const sclComponents: SCLComponent[] = [
  {
    id: "judgment-module",
    label: "Judgment Module (LLM)",
    minkskyLayerId: "reasoning",
    description:
      "Acts as the primary reasoning engine that defines problems, runs internal simulations, evaluates possibilities, and generates structured solutions.",
  },
  {
    id: "memory-module",
    label: "Memory Module",
    minkskyLayerId: "memory",
    description:
      "Retrieves past successful mental states (K-lines) and relevant knowledge. It reactivates patterns that help the system apply previous experience to current problems.",
  },
  {
    id: "control-module",
    label: "Control Module",
    minkskyLayerId: "control",
    description:
      "Monitors and regulates the thought processes of the Judgment Module. It detects errors, checks consistency, and redirects reasoning when necessary.",
  },
  {
    id: "metaprompt-regulatory-system",
    label: "Metaprompt Module",
    minkskyLayerId: "meta-control",
    description:
      "Oversees high-level goals, constraints, and the overall direction of decision-making. It ensures that actions and outputs align with identity, context, and long-term intentions.",
  },
  {
    id: "runtime-module",
    label: "Runtime Module",
    minkskyLayerId: "runtime",
    description:
      "Executes decisions, actions, or outputs in real time. It handles immediate responses to simple stimuli and manages low-level execution without requiring complex reasoning.",
  },
]

export default function SCLComparisonSection() {
  const [selectedMinskyId, setSelectedMinskyId] = useState<string | null>("reasoning")
  const [selectedSclId, setSelectedSclId] = useState<string | null>("judgment-module")
  const [selectionSource, setSelectionSource] = useState<"minsky" | "scl" | null>("minsky")
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasInView = useInView(containerRef, { margin: "100px 0px 100px 0px" })

  const handleSelectPair = (minskyId: string, sclId: string, source: "minsky" | "scl") => {
    setSelectedMinskyId(minskyId)
    setSelectedSclId(sclId)
    setSelectionSource(source)
  }

  const getMinskyPosition = (index: number) => {
    const centerX = 50
    const centerY = 50
    const radius = 20 // Inner circle for Minsky
    const angle = (index / minskyLayers.length) * Math.PI * 2 - Math.PI / 2
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  const getSCLPosition = (minskyIndex: number) => {
    const centerX = 50
    const centerY = 50
    const minskyPos = getMinskyPosition(minskyIndex)
    const outerRadius = 35 // Outer circle for SCL
    const minskyAngle = Math.atan2(minskyPos.y - centerY, minskyPos.x - centerX)

    return {
      x: centerX + outerRadius * Math.cos(minskyAngle),
      y: centerY + outerRadius * Math.sin(minskyAngle),
    }
  }

  // Minsky labels (inner ring r=20) — push sideways or downward
  // Pentagon: 0=top(50,30), 1=upper-right(69,44), 2=lower-right(62,66),
  //           3=lower-left(38,66), 4=upper-left(31,44)
  const getMinskyLabelOffset = (index: number) => {
    const offsets = [
      { x: 0,   y: 9  },  // 0: top → BELOW node (avoids SCL above)
      { x: 9,   y: 0  },  // 1: upper-right → RIGHT
      { x: 9,   y: 0  },  // 2: lower-right → RIGHT
      { x: -9,  y: 0  },  // 3: lower-left  → LEFT
      { x: -9,  y: 0  },  // 4: upper-left  → LEFT
    ]
    return offsets[index] || { x: 0, y: 9 }
  }
  const getMinskyTextAnchor = (index: number): "middle" | "start" | "end" => {
    if (index === 0) return "middle"
    if (index === 1 || index === 2) return "start"
    return "end"
  }

  // SCL labels (outer ring r=35) — push ABOVE/BELOW node (avoids left/right clipping)
  // Positions: 0=(50,15) top, 1=(83,39) right, 2=(71,78) lower-right,
  //            3=(29,78) lower-left, 4=(17,39) upper-left
  const getSCLLabelOffset = (sclId: string) => {
    const offsets: Record<string, { x: number; y: number }> = {
      "judgment-module":              { x: 0,  y: -7 },  // top → ABOVE
      "memory-module":                { x: 0,  y: -7 },  // upper-right → ABOVE
      "control-module":               { x: 0,  y:  8 },  // lower-right → BELOW
      "metaprompt-regulatory-system": { x: 0,  y:  8 },  // lower-left → BELOW
      "runtime-module":               { x: 0,  y: -7 },  // upper-left → ABOVE
    }
    return offsets[sclId] || { x: 0, y: 8 }
  }
  const getSCLTextAnchor = (_sclId: string): "middle" | "start" | "end" => "middle"

  const getNodeFocusState = (nodeId: string, type: "minsky" | "scl") => {
    // If nothing is selected or hovered, default state
    if (!selectedMinskyId && !selectedSclId && !hoveredId) return "default"

    // Check if this specific node is selected
    if (type === "minsky" && selectedMinskyId === nodeId) return "active"
    if (type === "scl" && selectedSclId === nodeId) return "active"

    // Check if hovered
    if (hoveredId === nodeId) return "active"

    // Check relationships
    const minskyNode = minskyLayers.find((n) => n.id === nodeId)
    const sclNode = sclComponents.find((n) => n.id === nodeId)

    // If a Minsky node is selected, highlight its related SCL node
    if (selectedMinskyId) {
      const relatedSCL = sclComponents.filter(s => s.minkskyLayerId === selectedMinskyId)
      if (type === "scl" && relatedSCL.some(s => s.id === nodeId)) return "related"
    }

    // If an SCL node is selected, highlight its parent Minsky node
    if (selectedSclId) {
      const selectedSCL = sclComponents.find(s => s.id === selectedSclId)
      if (selectedSCL && type === "minsky" && selectedSCL.minkskyLayerId === nodeId) return "related"
    }

    return "faded"
  }

  const getRelatedSCLComponents = (minskyId: string) => {
    return sclComponents.filter((c) => c.minkskyLayerId === minskyId)
  }

  return (
    <section ref={containerRef} className="relative py-12 sm:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-10">
        {/* Details Panel - Left (Top on mobile) */}
        <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
          {/* Minsky Details Panel */}
          {selectedMinskyId && (() => {
            const minskyNode = minskyLayers.find((n) => n.id === selectedMinskyId)
            if (!minskyNode) return null
            const isActive = selectionSource === "minsky"

            return (
              <div className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-md shadow-lg transition-all duration-300 ${
                isActive
                  ? "border-accent/50 bg-white/[0.11] shadow-accent/15 shadow-xl"
                  : "border-white/8 bg-white/[0.07] shadow-black/20"
              }`}>
                <p className="text-accent text-[10px] font-bold uppercase tracking-[0.35em] mb-1">
                  Marvin Minsky's Model
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-5">
                  {minskyNode.label}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Definition</p>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">{minskyNode.definition}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Role in Cognition</p>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">{minskyNode.roleInCognition}</p>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* SCL Details Panel */}
          {selectedSclId && (() => {
            const sclNode = sclComponents.find((n) => n.id === selectedSclId)
            if (!sclNode) return null
            const isActive = selectionSource === "scl"

            return (
              <div className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-md shadow-lg transition-all duration-300 ${
                isActive
                  ? "border-accent/50 bg-white/[0.11] shadow-accent/15 shadow-xl"
                  : "border-white/8 bg-white/[0.07] shadow-black/20"
              }`}>
                <p className="text-accent text-[10px] font-bold uppercase tracking-[0.35em] mb-1">
                  SCL Component Model
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {sclNode.label}
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">{sclNode.description}</p>
              </div>
            )
          })()}

          {!selectedMinskyId && !selectedSclId && (
            <p className="text-foreground/50 text-center lg:text-left">Click a node on the map to see details here.</p>
          )}
        </div>

        {/* Interactive 3D Map - Right */}
        <div className="relative order-1 lg:order-2 bg-black/20 rounded-2xl border border-white/8 shadow-lg shadow-black/30 overflow-hidden min-h-[380px] sm:min-h-[500px] lg:min-h-[820px]">
          <div className="w-full h-full min-h-[380px] sm:min-h-[500px] lg:min-h-[820px]">
            {canvasInView && (
              <SclComparison3D
                selectedMinskyId={selectedMinskyId}
                selectedSclId={selectedSclId}
                selectionSource={selectionSource}
                onSelectPair={handleSelectPair}
                minskyLayers={minskyLayers}
                sclComponents={sclComponents}
              />
            )}
            {/* old SVG removed */}
            <svg style={{ display: "none" }}>
              <defs>
                {/* Subtle 3D sphere gradients — soft highlight, not shiny */}
                <radialGradient id="gradOrangeActive" cx="38%" cy="32%" r="62%">
                  <stop offset="0%"   stopColor="#ff8855" stopOpacity="1" />
                  <stop offset="60%"  stopColor="#e55520" stopOpacity="1" />
                  <stop offset="100%" stopColor="#7a2800" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="gradOrangeIdle" cx="38%" cy="32%" r="62%">
                  <stop offset="0%"   stopColor="rgba(220,100,50,0.38)" />
                  <stop offset="100%" stopColor="rgba(80,30,8,0.20)" />
                </radialGradient>
                <radialGradient id="gradPrimaryActive" cx="38%" cy="32%" r="62%">
                  <stop offset="0%"   stopColor="#dfc080" stopOpacity="1" />
                  <stop offset="60%"  stopColor="#b07840" stopOpacity="1" />
                  <stop offset="100%" stopColor="#4a2808" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="gradPrimaryIdle" cx="38%" cy="32%" r="62%">
                  <stop offset="0%"   stopColor="rgba(140,85,40,0.38)" />
                  <stop offset="100%" stopColor="rgba(50,25,8,0.18)" />
                </radialGradient>
                <radialGradient id="gradRelated" cx="38%" cy="32%" r="62%">
                  <stop offset="0%"   stopColor="rgba(200,110,55,0.28)" />
                  <stop offset="100%" stopColor="rgba(80,35,8,0.12)" />
                </radialGradient>
                {/* arrowhead removed — cleaner without it */}
              </defs>

              {/* Connection lines — trimmed to stop at sphere edges */}
              {minskyLayers.map((minskyNode, minskyIdx) => {
                const minskyPos = getMinskyPosition(minskyIdx)
                const relatedSCL = getRelatedSCLComponents(minskyNode.id)

                return relatedSCL.map((sclNode) => {
                  const sclPos = getSCLPosition(minskyIdx)
                  const isActive =
                    selectedMinskyId === minskyNode.id ||
                    selectedSclId === sclNode.id ||
                    hoveredId === minskyNode.id ||
                    hoveredId === sclNode.id

                  // Trim line so it doesn't pierce either sphere
                  const ldx = sclPos.x - minskyPos.x
                  const ldy = sclPos.y - minskyPos.y
                  const ldist = Math.sqrt(ldx * ldx + ldy * ldy) || 1
                  const lnx = ldx / ldist, lny = ldy / ldist
                  const mR = isActive ? 6.5 : 5.0   // Minsky sphere radius
                  const sR = isActive ? 5.2 : 4.0   // SCL sphere radius
                  const x1t = minskyPos.x + lnx * (mR + 0.5)
                  const y1t = minskyPos.y + lny * (mR + 0.5)
                  const x2t = sclPos.x   - lnx * (sR + 0.5)
                  const y2t = sclPos.y   - lny * (sR + 0.5)

                  return (
                    <line
                      key={`conn-${minskyNode.id}-${sclNode.id}`}
                      x1={x1t} y1={y1t} x2={x2t} y2={y2t}
                      stroke={isActive ? "rgba(255,106,45,0.55)" : "rgba(255,106,45,0.10)"}
                      strokeWidth={isActive ? "1.2" : "0.6"}
                      strokeLinecap="round"
                      opacity={(selectedMinskyId || selectedSclId || hoveredId) && !isActive ? 0.15 : 1}
                      className="transition-all duration-300"
                    />
                  )
                })
              })}

              {/* Minsky nodes (Inner Circle) */}
              {minskyLayers.map((node, idx) => {
                const pos = getMinskyPosition(idx)
                const focusState = getNodeFocusState(node.id, "minsky")
                const isActive = focusState === "active"
                const isRelated = focusState === "related"
                const isFaded = focusState === "faded"

                let circleRadius = 5.0
                let fillOpacity = 0.3
                let strokeOpacity = 0.55

                if (isActive) {
                  circleRadius = 6.5
                  fillOpacity = 1
                  strokeOpacity = 1
                } else if (isRelated) {
                  circleRadius = 5.8
                  fillOpacity = 0.65
                  strokeOpacity = 0.75
                } else if (isFaded) {
                  fillOpacity = 0.1
                  strokeOpacity = 0.18
                }

                return (
                  <g key={`minsky-${node.id}`}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={circleRadius}
                      fill={isActive ? "url(#gradOrangeActive)" : isRelated ? "url(#gradRelated)" : "url(#gradOrangeIdle)"}
                      stroke="#ff6a2d"
                      strokeOpacity={strokeOpacity}
                      strokeWidth={isActive ? "1.4" : "0.8"}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedMinskyId(node.id)
                        const relatedSCL = getRelatedSCLComponents(node.id)[0]
                        if (relatedSCL) setSelectedSclId(relatedSCL.id)
                        setSelectionSource("minsky")
                      }}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{
                        transition: "r 0.3s ease, opacity 0.3s ease",
                        filter: isActive ? "drop-shadow(0 0 3px rgba(255,106,45,0.8))" : "none",
                        cursor: "pointer",
                      }}
                    />
                    {(() => {
                      const offset = getMinskyLabelOffset(idx)
                      const anchor = getMinskyTextAnchor(idx)
                      const tx = pos.x + offset.x
                      const ty = pos.y + offset.y
                      const labelStyle = {
                        fontSize: isActive ? "2.8px" : "2.2px",
                        fontWeight: isActive ? "700" : "500",
                        fill: isActive ? "#ff6a2d" : "rgba(245,237,230,0.75)",
                        opacity: isFaded ? 0.25 : 1,
                        transition: "all 0.3s ease",
                      }
                      if (node.label === "Meta-Control" || node.label === "Meta-Control Module") {
                        return (
                          <text x={tx} y={ty} textAnchor={anchor} className="pointer-events-none select-none" style={labelStyle}>
                            <tspan x={tx} dy="-1.5">Meta-</tspan>
                            <tspan x={tx} dy="3">Control</tspan>
                          </text>
                        )
                      }
                      return (
                        <text x={tx} y={ty} textAnchor={anchor} className="pointer-events-none select-none" style={labelStyle}>
                          {node.label}
                        </text>
                      )
                    })()}
                  </g>
                )
              })}

              {/* SCL nodes (Outer Circle) */}
              {minskyLayers.map((minskyNode, minskyIdx) => {
                const relatedSCL = getRelatedSCLComponents(minskyNode.id)
                return relatedSCL.map((sclNode) => {
                  const pos = getSCLPosition(minskyIdx)
                  const focusState = getNodeFocusState(sclNode.id, "scl")
                  const isActive = focusState === "active"
                  const isRelated = focusState === "related"
                  const isFaded = focusState === "faded"

                  let circleRadius = 4.0
                  let fillOpacity = 0.2
                  let strokeOpacity = 0.38

                  if (isActive) {
                    circleRadius = 5.2
                    fillOpacity = 0.9
                    strokeOpacity = 0.9
                  } else if (isRelated) {
                    circleRadius = 4.6
                    fillOpacity = 0.5
                    strokeOpacity = 0.55
                  } else if (isFaded) {
                    fillOpacity = 0.08
                    strokeOpacity = 0.12
                  }

                  return (
                    <g key={`scl-${sclNode.id}`}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={circleRadius}
                        fill={isActive ? "url(#gradPrimaryActive)" : isRelated ? "url(#gradRelated)" : "url(#gradPrimaryIdle)"}
                        stroke="rgba(200,150,80,0.7)"
                        strokeOpacity={strokeOpacity}
                        strokeWidth={isActive ? "1.2" : "0.7"}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedSclId(sclNode.id)
                          setSelectedMinskyId(minskyNode.id)
                          setSelectionSource("scl")
                        }}
                        onMouseEnter={() => setHoveredId(sclNode.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                          transition: "r 0.3s ease, opacity 0.3s ease",
                          filter: isActive ? "drop-shadow(0 0 3px rgba(200,150,80,0.7))" : "none",
                          cursor: "pointer",
                        }}
                      />
                      {(() => {
                        const offset = getSCLLabelOffset(sclNode.id)
                        const anchor = getSCLTextAnchor(sclNode.id)
                        const tx = pos.x + offset.x
                        const ty = pos.y + offset.y
                        const labelStyle = {
                          fontSize: isActive ? "2.4px" : "2px",
                          fontWeight: isActive ? "700" : "500",
                          fill: isActive ? "#c89860" : "rgba(200,160,100,0.65)",
                          opacity: isFaded ? 0.22 : 1,
                          transition: "all 0.3s ease",
                        }
                        if (sclNode.label === "Metaprompt Regulatory System") {
                          return (
                            <text x={tx} y={ty} textAnchor="middle" className="pointer-events-none select-none" style={labelStyle}>
                              <tspan x={tx} dy="0">Metaprompt</tspan>
                              <tspan x={tx} dy="2.8">Module</tspan>
                            </text>
                          )
                        }
                        return (
                          <text x={tx} y={ty} textAnchor={anchor} className="pointer-events-none select-none" style={labelStyle}>
                            {sclNode.label}
                          </text>
                        )
                      })()}
                    </g>
                  )
                })
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
