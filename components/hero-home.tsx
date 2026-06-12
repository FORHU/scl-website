"use client"

export default function HeroHome() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        crossOrigin="anonymous"
        suppressHydrationWarning
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/synapse-6GkWZHBLR3B9YFKFnxnpOfFv0E4Hbm.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/60" />
      {/* Content wrapper */}
      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="mx-auto max-w-4xl w-full">
          {/* Header badge */}
          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full border-2 border-accent bg-black/30 backdrop-blur-sm">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">An Age of Distrust</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground text-center leading-tight mb-6 tracking-tight">
            Where AI and humanity <span className="font-semibold text-accent">connect</span>
            <br />
            <span
              className="font-semibold text-accent block mt-2 md:mt-0 md:inline"
              style={{
                textShadow: '0 0 20px rgba(217, 119, 6, 0.4), 0 0 40px rgba(217, 119, 6, 0.2)',
                filter: 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.3))'
              }}
            >
              TRUST BEGINS
            </span>
          </h1>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mt-10 md:mt-16 items-center w-full sm:w-auto">
            <a
              href="#scl"
              className="w-full sm:w-auto px-6 py-3 rounded-md border border-border bg-primary text-primary-foreground font-light hover:opacity-90 transition-opacity text-center"
            >
              Learn about SCL
            </a>
            <a
              href="#research"
              className="w-full sm:w-auto px-6 py-3 rounded-md border border-border bg-transparent text-foreground font-light hover:bg-black/20 transition-colors text-center"
            >
              Read our research
            </a>
          </div>

          <p className="text-xs sm:text-sm text-accent font-medium text-center max-w-xl mx-auto mt-8 px-4">
            Neurons connect through synapses to create thought
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            SCL connects your process to create clarity.
          </p>

          <div className="flex flex-col items-center mt-10 gap-4">
            <p className="text-xs text-foreground/80 font-medium tracking-[0.3em] uppercase">We&apos;re participating at</p>
            <a href="https://vivatech.com/exhibitors/forhu-ai" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
              <img src="/vivatech.png" alt="VivaTech 2026 — June 17–20, Paris" className="h-44 sm:h-56 object-contain rounded-2xl" />
            </a>
            <div className="flex flex-col items-center gap-3 mt-1">
              <div className="flex items-center gap-2.5 text-xs text-foreground/80 font-light tracking-widest">
                <span>June 17–20, 2026</span>
                <span className="w-1 h-1 rounded-full bg-foreground/50 inline-block" />
                <span>Paris, France</span>
              </div>
              <a
                href="https://vivatech.com/exhibitors/forhu-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2 rounded-full border border-accent/60 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all duration-300"
              >
                <span className="text-xs text-accent font-medium tracking-wider uppercase">View our exhibitor page</span>
                <svg className="w-3 h-3 text-accent group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
