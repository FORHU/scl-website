"use client"
import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

// ── Brand icons — neural/SCL visual language matching the website aesthetic ───

// FOR HUMAN: a neuron whose cell body is a person — human at the centre of the neural network
const IconForHuman = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-accent">
    {/* Dendrite branches from the head — neural aesthetic */}
    <line x1="16" y1="7"  x2="10" y2="1"  opacity="0.7" />
    <line x1="16" y1="7"  x2="22" y2="1"  opacity="0.7" />
    <line x1="16" y1="7"  x2="16" y2="1"  opacity="0.5" />
    <line x1="13" y1="8"  x2="7"  y2="4"  opacity="0.45" />
    <line x1="19" y1="8"  x2="25" y2="4"  opacity="0.45" />
    {/* Glowing nodes at branch tips */}
    <circle cx="10" cy="1"  r="1.4" fill="currentColor" stroke="none" />
    <circle cx="22" cy="1"  r="1.4" fill="currentColor" stroke="none" />
    <circle cx="16" cy="1"  r="1"   fill="currentColor" stroke="none" opacity="0.6" />
    <circle cx="7"  cy="4"  r="1"   fill="currentColor" stroke="none" opacity="0.5" />
    <circle cx="25" cy="4"  r="1"   fill="currentColor" stroke="none" opacity="0.5" />
    {/* Cell body — the human silhouette */}
    <circle cx="16" cy="11" r="4" />
    <path   d="M9 28c0-4 3.1-7 7-7s7 3.1 7 7" />
  </svg>
)

// HONEST ENGINEERING: glass-box architecture — open transparent structure you can see through
const IconHonestEngineering = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-accent">
    {/* 3D open-box — the glass box AI */}
    <path d="M4 10 L16 5 L28 10 L16 15 Z" />
    <path d="M4 10 L4 22 L16 27 L28 22 L28 10" opacity="0.55" />
    <line x1="16" y1="15" x2="16" y2="27" opacity="0.55" />
    {/* Internal ray of light showing transparency */}
    <line x1="16" y1="5" x2="16" y2="27" strokeDasharray="2 2.5" opacity="0.4" />
    <circle cx="16" cy="4" r="1.5" fill="currentColor" stroke="none" />
    {/* Small node inside showing visible internals */}
    <circle cx="16" cy="18" r="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeOpacity="0.6" />
  </svg>
)

// HALLUCINATION GOVERNANCE: SCL control loop with a gate that catches errors before they exit
const IconHallucinationGovernance = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-accent">
    {/* Circular signal path */}
    <path d="M24 16A8 8 0 1 1 16 8" />
    {/* Arrow on loop showing direction */}
    <path d="M16 5 L16 8 L19.5 8" />
    {/* Gate / control checkpoint — the SCL control layer */}
    <rect x="11" y="11" width="10" height="10" rx="2" strokeOpacity="0.6" />
    {/* Check inside gate — error corrected */}
    <path d="M13.5 16 l2 2 l4 -4" strokeWidth="1.5" />
  </svg>
)

interface PhilosophyCard {
  title: string
  quote: string
  content: string[]
  icon: ReactNode
}

const philosophyCards: PhilosophyCard[] = [
  {
    title: "FOR HUMAN",
    quote: "AI is not a tool, but a partner",
    icon: <IconForHuman />,
    content: [
      "AI should expand human potential",
      "and serve as a safety net against mistakes.",
      "Untrustworthy intelligence is not intelligence.",
      "FORHU sets the standard for human-centered AI.",
    ],
  },
  {
    title: "Honest Engineering",
    quote: "If even AI doesn't know why it gave that answer?",
    icon: <IconHonestEngineering />,
    content: [
      "Traditional black-box AI cannot explain itself.",
      "SCL separates and records every step of reasoning.",
      "Transparent thinking.",
      "That's where trust begins.",
    ],
  },
  {
    title: "Hallucination Governance",
    quote: "The right to err, the duty not to repeat",
    icon: <IconHallucinationGovernance />,
    content: [
      "Hallucinations can't be eliminated.",
      "But they can be prevented from happening twice.",
      "SCL records mistakes, and immediately verifies and corrects them.",
      "AI has the right to make mistakes. But never the right to repeat them.",
    ],
  },
]

export default function PhilosophySection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const next = [...prev]
              next[index] = true
              return next
            })
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.1 },
      )
      if (ref) observer.observe(ref)
      return observer
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="philosophy" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-background to-background/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-accent text-xs sm:text-sm font-mono uppercase tracking-widest">PHILOSOPHY</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 text-foreground">How AI for Humans Is Different</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {philosophyCards.map((card, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardRefs.current[index] = el }}
              className={`group relative overflow-hidden bg-white/[0.09] border border-white/8 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg shadow-black/30 transition-all duration-500 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } hover:border-accent/35 hover:shadow-accent/15 hover:shadow-xl hover:-translate-y-1`}
              style={{ transitionDelay: visibleCards[index] ? `${index * 150}ms` : "0ms" }}
            >
              {/* Accent bar */}
              <div className="h-1 w-10 bg-accent/50 mb-5 sm:mb-7 rounded-full group-hover:w-16 transition-all duration-500" />
              {/* Icon — frosted glass badge */}
              <div className="mb-4 w-fit p-3 rounded-xl bg-white/[0.11] border border-white/10 backdrop-blur-sm shadow-md shadow-black/20 group-hover:border-accent/30 group-hover:bg-white/[0.15] transition-all duration-400">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{card.title}</h3>

              {/* Quote */}
              <p className="text-accent font-semibold text-xs sm:text-sm mb-4 sm:mb-6 italic border-l-2 border-accent pl-3 sm:pl-4">
                "{card.quote}"
              </p>

              {/* Content */}
              <div className="space-y-2 sm:space-y-3 text-foreground/70 text-xs sm:text-sm">
                {card.content.map((line, idx) => (
                  <p key={idx} className="hover:text-accent transition-colors duration-300">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
