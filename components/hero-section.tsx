"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showForhu, setShowForhu] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsLoaded(true)
    setTimeout(() => setShowForhu(true), 1500)
  }, [])

  return (
    <section className="relative overflow-hidden min-h-screen pt-24 pb-16 sm:pt-32 sm:pb-32 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-1/4 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-accent/40 blur-3xl opacity-60 animate-pulse" />
        <div
          className="absolute bottom-20 left-1/3 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-accent-secondary/30 blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 -right-32 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-primary/20 blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl w-full">
        {/* Badge */}
        <div
          className={`mb-6 flex justify-center transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <div className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-accent font-semibold uppercase tracking-wide">
            ✨ An Age of Distrust, A New Beginning
          </div>
        </div>

        {/* Main Headline */}
        <h1
          className={`mb-8 text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter text-foreground text-balance transition-all duration-1000 leading-tight text-center sm:text-left ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          If you can't trust AI,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent-secondary animate-pulse block sm:inline">
            then redesign it.
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Problem Statement */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed font-light">
              Billions of people ask AI questions every day. But not a single person fully trusts the answers. Why is
              that?
            </p>

            <div className="space-y-4">
              {[
                "AI answers, but it does not think.",
                "It does not verify. It does not remember.",
                "It repeats the same mistakes.",
              ].map((point, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="h-3 w-3 rounded-full bg-accent" />
                  </div>
                  <p className="text-base sm:text-lg text-foreground leading-relaxed pt-0.5">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - "We are FORHU" */}
          <div
            className={`flex items-center justify-center lg:justify-end transition-all duration-1000 ${showForhu ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            style={{
              transitionDelay: "800ms",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 via-accent-secondary/20 to-accent/10 blur-2xl" />
              <div className="relative p-8 sm:p-12 rounded-2xl border border-accent/40 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-accent mb-2">We are</p>
                <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  FORHU
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-4 uppercase tracking-widest">
                  Redesigning AI Trust
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Box */}
        <div
          className={`mb-12 p-6 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-accent font-bold text-xs sm:text-sm uppercase tracking-widest mb-3">The Solution</p>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed mb-4">
            <span className="font-bold">FORHU has given AI the structure of thought.</span> To judge, to act, to
            remember, to verify— AI that thinks like a human: <span className="text-accent font-bold">SCL</span>.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Now, AI doesn't just give answers, it explains why that answer is correct.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          style={{ transitionDelay: "500ms" }}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-105 font-semibold text-base h-12"
          >
            Explore Our Research
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto transition-all duration-300 hover:scale-105 font-semibold text-base h-12 bg-transparent"
          >
            Learn More
          </Button>
        </div>

        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4">
            Neurons connect through synapses to create thought—<span className="text-accent font-semibold">SCL connects your process to create clarity</span>
          </p>
        </div>

        {/* Decorative divider */}
        <div
          className={`relative mx-auto max-w-2xl transition-all duration-1000 ${isLoaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-full" />
        </div>
      </div>
    </section>
  )
}
