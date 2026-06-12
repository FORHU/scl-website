"use client"

import { Mail } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-foreground mb-8">Get in Touch</h2>
        <div className="flex flex-col items-center justify-center space-y-6 p-8 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 hover:border-accent/30 transition-all duration-300">
          <div className="p-4 rounded-full bg-accent/10 text-accent">
            <Mail className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">
              Have questions or want to collaborate? Reach out to us directly at:
            </p>
            <a
              href="mailto:support@forhu.ai"
              className="inline-flex items-center text-xl sm:text-2xl font-semibold text-foreground hover:text-accent transition-colors py-3 px-4 rounded-xl hover:bg-accent/10 mt-2"
            >
              support@forhu.ai
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
