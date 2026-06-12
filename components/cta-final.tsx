"use client"
import { useEffect, useRef, useState } from "react"

const ctaMessages = [
  "See the evolution of intelligence for yourself",
  "Stop doubting AI",
  "Meet structured intelligence: SCL",
  "Download the Whitepaper for Free",
  "Build the future of AI with FORHU",
]

export default function CTAFinal() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ctaMessages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-16 sm:py-24 px-6 bg-gradient-to-b from-background via-background to-background">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-accent/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Core message */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 leading-tight tracking-tight">
          <div className="mb-4">
            <span className="text-foreground">In an age where AI cannot be trusted,</span>
          </div>
          <div className="mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-foreground to-accent">
              FORHU has given AI the structure of thought.
            </span>
          </div>
          <div>
            <span className="text-foreground/80">Now, AI thinks, remembers, and corrects itself.</span>
          </div>
        </h2>

        {/* Rotating CTA */}
        <div className="h-16 flex items-center justify-center mb-8">
          <div className="relative w-full">
            {ctaMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                  idx === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <p className="text-2xl md:text-3xl font-semibold text-accent">{msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a
            href="#"
            className="px-10 py-5 bg-accent text-background font-bold text-lg rounded-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent/40"
          >
            Get Started
          </a>
          <a
            href="#research"
            className="px-10 py-5 border-2 border-accent text-accent font-bold text-lg rounded-lg hover:bg-accent/10 transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </a>
        </div>

        {/* Dots indicator */}
        <div className="flex gap-3 justify-center mt-12">
          {ctaMessages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "bg-accent w-8" : "bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to message ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
