import type { Metadata } from "next"
import Link from "next/link"
import AboutSection from "@/components/about-section"

export const metadata: Metadata = {
  title: "About Forhu",
  description:
    "Forhu stands for FOR HUMAN — because our mission begins and ends with humanity. We are a research-driven AI company building transparent, self-correcting intelligence through the Structured Cognitive Loop.",
  alternates: { canonical: "https://forhu.ai/about" },
  openGraph: {
    title: "About Forhu | Human-Centered AI Research",
    description:
      "Forhu stands for FOR HUMAN. We build AI that is transparent, self-correcting, and designed to serve humanity — not replace it.",
    url: "https://forhu.ai/about",
  },
}

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Forhu",
  description:
    "Forhu is a research-driven AI company building human-centered intelligence through the Structured Cognitive Loop.",
  url: "https://forhu.ai/about",
  mainEntity: {
    "@type": "Organization",
    name: "Forhu",
    url: "https://forhu.ai",
    logo: "https://forhu.ai/forhu.ico.png",
    description:
      "Forhu (FOR HUMAN) is a research-driven AI company that develops the Structured Cognitive Loop — a transparent, self-correcting cognitive architecture for AI agents.",
    foundingDate: "2024",
    knowsAbout: [
      "Structured Cognitive Loop",
      "Cognitive Architecture",
      "Human-Centered AI",
      "LLM Agents",
      "AI Hallucination Governance",
    ],
  },
}

const values = [
  {
    title: "Transparency over performance",
    description:
      "We will not ship an AI system that cannot explain its reasoning. A higher benchmark score that comes at the cost of auditability is not a trade-off we accept. Transparency is non-negotiable.",
  },
  {
    title: "Mistakes are data, not failures",
    description:
      "Every error an SCL system makes is logged, analyzed, and used to prevent the same error from occurring again. We treat hallucinations and missteps as information — fuel for the Memory and Control layers — not as embarrassments to be patched over.",
  },
  {
    title: "Architecture before application",
    description:
      "We believe the AI industry moves too fast to application and too slowly to foundation. Before we build a product, we ask: what cognitive architecture should govern it? The SCL framework answers that question for every application we build.",
  },
  {
    title: "Research-first, always",
    description:
      "Forhu publishes everything. Our research on cognitive architecture, hallucination theory, and executable epistemology is openly available because trustworthy AI cannot be built on proprietary science.",
  },
  {
    title: "Human dignity as a hard constraint",
    description:
      "The Metaprompt layer in every SCL system contains non-negotiable constraints around human dignity. These are not guidelines or best practices — they are architectural limits that the system cannot override, regardless of how a task is framed.",
  },
]

const whatWeAreBuildingPoints = [
  "A cognitive architecture (SCL) that any LLM can be wrapped in to become more trustworthy",
  "A body of peer-reviewed research that establishes the theoretical foundation for human-centered AI",
  "Real applications that prove SCL works in complex, high-stakes environments",
  "A public record of how AI systems should reason — open to scrutiny, critique, and improvement",
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <main className="bg-background text-foreground min-h-screen pt-24">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">About Us</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              FOR<br />HUMAN
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
              FORHU is not a brand name. It is a commitment: every system we build must demonstrably serve human wellbeing — or it does not ship.
            </p>
          </div>
        </section>

        {/* Existing about section component */}
        <AboutSection />

        {/* What we're building */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left card */}
              <div className="group p-6 sm:p-8 md:p-10 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30">
                <div className="h-1 w-12 bg-accent/50 mb-6 sm:mb-8 rounded-full group-hover:w-20 transition-all duration-500" />
                <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Mission</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter mt-4 mb-6">What We're Building and Why</h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  The AI industry has a transparency problem. Models grow more capable while becoming less interpretable. Outputs improve while reasoning becomes more opaque. Trust is demanded, but the tools for verifying that trust do not exist.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Forhu was founded to fix this at the architectural level. The Structured Cognitive Loop is not a prompting trick or a fine-tuning approach — it is a framework for building AI systems where reasoning is structured, persistent, and auditable by design.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We are building this because we believe the next decade of AI development will be decided not by who has the largest model, but by who has the most trustworthy architecture. And trustworthiness is a structural property — you cannot add it later.
                </p>
              </div>
              {/* Right card */}
              <div className="group p-6 sm:p-8 md:p-10 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30">
                <div className="h-1 w-12 bg-accent/50 mb-6 sm:mb-8 rounded-full group-hover:w-20 transition-all duration-500" />
                <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Specifically</span>
                <h3 className="text-2xl font-bold text-foreground mt-4 mb-6">What This Means in Practice</h3>
                <ul className="space-y-5">
                  {whatWeAreBuildingPoints.map((point) => (
                    <li key={point} className="flex gap-4">
                      <span className="text-accent mt-1 shrink-0">→</span>
                      <p className="text-muted-foreground leading-relaxed">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/10 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Values</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4 mb-4">What We Stand For</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                These are not aspirational statements. They are constraints we impose on every decision we make.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {values.map((v, i) => (
                <div key={v.title} className="group p-6 sm:p-8 md:p-10 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 hover:border-accent/30 hover:bg-card/50 hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-500 transform">
                  {/* Exact same accent bar as Mission & Vision cards */}
                  <div className="h-1 w-12 bg-accent/50 mb-6 sm:mb-8 rounded-full group-hover:w-20 transition-all duration-500" />
                  <span className="text-accent text-xs font-bold uppercase tracking-widest">0{i + 1}</span>
                  <h3 className="text-xl font-bold text-foreground mt-3 mb-4 group-hover:text-accent transition-colors duration-300">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Ready to go deeper?</h2>
              <p className="text-muted-foreground mt-2">Read our research or explore how SCL works in practice.</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link href="/research" className="px-6 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-colors">
                Read Research
              </Link>
              <Link href="/scl" className="px-6 py-3 rounded-md border border-border text-foreground hover:bg-card/50 transition-colors">
                Explore SCL
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
