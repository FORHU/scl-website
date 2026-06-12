import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MessageSquare, Clock } from "lucide-react"
import SocialGlow from "@/components/social-glow"

export const metadata: Metadata = {
  title: "Contact Forhu",
  description:
    "Get in touch with Forhu. Have questions about the Structured Cognitive Loop, want to collaborate, or explore research partnerships? Reach out to us directly.",
  alternates: { canonical: "https://forhu.ai/contact" },
  openGraph: {
    title: "Contact Forhu | Human-Centered AI Research",
    description:
      "Have questions about SCL or want to collaborate? Reach out to the Forhu team directly.",
    url: "https://forhu.ai/contact",
  },
}

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Forhu",
  description:
    "Contact page for Forhu — a research-driven AI company building human-centered intelligence through the Structured Cognitive Loop.",
  url: "https://forhu.ai/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Forhu",
    url: "https://forhu.ai",
    logo: "https://forhu.ai/forhu.ico.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@forhu.ai",
      contactType: "customer support",
      availableLanguage: "English",
    },
    sameAs: [
      "https://x.com/forhuai",
      "https://www.linkedin.com/in/forhu-ai-42484a3a3/",
      "https://www.instagram.com/forhu_ai/",
      "https://facebook.com/profile.php?id=61585471193562",
      "https://tiktok.com/@forhu_ai",
    ],
  },
}

const reasons = [
  {
    icon: MessageSquare,
    title: "Research Collaboration",
    description:
      "Interested in co-authoring papers, sharing datasets, or building on the SCL framework in your own research?",
  },
  {
    icon: Mail,
    title: "General Inquiries",
    description:
      "Questions about Forhu, our cognitive architecture approach, or our published work? We read every message.",
  },
  {
    icon: Clock,
    title: "Partnership & Projects",
    description:
      "Exploring how SCL could be applied in your product or institution? Let's talk about what's possible.",
  },
]

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <main className="bg-background text-foreground min-h-screen pt-24">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Contact Us</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              Get in<br />Touch
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
              Whether you have a question, a collaboration idea, or just want to know more about what we're building — we want to hear from you.
            </p>
          </div>
        </section>

        {/* Primary email CTA */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6 p-10 sm:p-14 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 hover:border-accent/30 transition-all duration-300 text-center max-w-2xl mx-auto">
            <div className="p-4 rounded-full bg-accent/10 text-accent">
              <Mail className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <p className="text-lg text-muted-foreground">
                Reach out to us directly at:
              </p>
              <a
                href="mailto:support@forhu.ai"
                className="inline-flex items-center text-2xl sm:text-3xl font-semibold text-foreground hover:text-accent transition-colors py-3 px-4 rounded-xl hover:bg-accent/10"
              >
                support@forhu.ai
              </a>
              <p className="text-sm text-muted-foreground pt-2">
                We typically respond within one business day.
              </p>
            </div>
          </div>
        </section>

        {/* Reasons to reach out */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Why Reach Out</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4 mb-4">How We Can Help</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                We welcome messages from researchers, developers, institutions, and anyone curious about human-centered AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {reasons.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="group p-8 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 hover:border-accent/30 hover:bg-card/50 hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="h-1 w-12 bg-accent/50 mb-8 rounded-full group-hover:w-20 transition-all duration-500" />
                    <span className="text-accent text-xs font-bold uppercase tracking-widest">0{i + 1}</span>
                    <div className="mt-4 mb-4 text-accent">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Social channels */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto text-center">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Follow Us</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4 mb-4">Find Us on Social</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
              Stay up to date with our research, projects, and ideas across every platform we're on.
            </p>
            <SocialGlow />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Want to read the research first?</h2>
              <p className="text-muted-foreground mt-2">Explore what we've published on the Structured Cognitive Loop.</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link href="/research" className="px-6 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-colors">
                Read Research
              </Link>
              <Link href="/about" className="px-6 py-3 rounded-md border border-border text-foreground hover:bg-card/50 transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
