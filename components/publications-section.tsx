export default function PublicationsSection() {
  const ArrowIcon = () => (
    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
    </svg>
  )

  const publications = [
    {
      title: "Executable Epistemology: The Structured Cognitive Loop as an Architecture of Intentional Understanding",
      author: "",
      description:
        "This paper introduces the Structured Cognitive Loop (SCL) as a philosophical and computational framework that explores how understanding can emerge in intelligent systems. Rather than asking what intelligence is, SCL asks under what structural conditions cognition becomes possible.",
      link: "https://philsci-archive.pitt.edu/26865/",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Executable%20Epistemology_%20The%20Structured%20Cognitive%20Loop%20as%20an%20Architecture%20of%20Intentional%20Understanding-QeamFEKmrFeZP2nnQnbaTurEgoLzIl.jpg",
    },
    {
      title: "Executable Epistemology: The Structured Cognitive Loop as an Architecture of Intentional Understanding",
      author: "",
      description:
        "Large language models exhibit intelligence without genuine epistemic understanding, revealing a fundamental philosophical gap: the absence of epistemic architecture. This paper redefines intelligence as a continuous loop of judgment, memory, control, action, and regulation rather than a possessed property.",
      link: "https://philsci-archive.pitt.edu/26865/",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Executable%20Epistemology_%20The%20Structured%20Cognitive%20Loop%20as%20an%20Architecture%20of%20Intentional%20Understanding1-3uaMwm8aFTD7GLXAfSicwrEzxCEghQ.jpg",
    },
    {
      title: "Hallucination-Informed Intelligence: The Limits of Lossless Abstraction in Large Language Models",
      author: "",
      description:
        "This paper deepens the argument that hallucination is an inevitable property of intelligent systems, grounded in Kolmogorov complexity and Shannon entropy. It proposes a shift toward hallucination-aware architectures, recognizing hallucination as a structural condition of intelligence.",
      link: "https://osf.io/preprints/psyarxiv/x2c8p_v1",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hallucination-Informed%20Intelligence-6RmFhXPFZ0RFmV1wljcpSH6kJ1lRyq.jpg",
    },
    {
      title: "Structured Cognitive Loop for Behavioral Intelligence in Large Language Model Agents",
      author: "",
      description:
        "This research proposes SCL as an alternative architecture that separates cognition, memory, and control functions. SCL achieves an average task success rate of 86.3%, compared with 70.5 to 76.8 percent for baselines, demonstrating enhanced reliability without larger models.",
      link: "https://arxiv.org/abs/2510.05107",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Structured%20Cognitive%20Loop%20for%20Behavioral%20Intelligence%20in%20Large%20Language%20Model%20Agents-p3pL6oUViA4dOlB9uPusomEkc57seK.jpg",
    },
    {
      title: "Hallucination as an Inevitable Byproduct of Intelligence in Large Language Models",
      author: "",
      description:
        "Reframes hallucination as a natural outcome of how intelligence emerges, not a defect. The paper argues that the same mechanisms enabling creativity and generalization also produce hallucination, suggesting future AI should focus on managing rather than eliminating it.",
      link: "https://osf.io/preprints/psyarxiv/q2c94_v1",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hallucination%20as%20an%20Inevitable%20Byproduct%20of%20Intelligence%20in%20Large%20Language%20Models-mfrNuDPI37jJm40LC3YN5GjR84l8K8.jpg",
    },
    {
      title: "Emergent Cognitive Convergence via Implementation: A Structured Loop Reflecting Four Theories of Mind",
      author: "",
      description:
        "Identifies a natural structural convergence between Kahneman's dual-system theory, Friston's predictive processing, Minsky's society of mind, and Clark's extended mind emerging unintentionally in the Agentic Flow framework, achieving 95.8% task success.",
      link: "https://arxiv.org/abs/2507.16184",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emergent%20Cognitive%20Convergence%20via%20Implementation_%20A%20Structured%20Loop%20Reflecting%20Four%20Theories%20of%20Mind-BcEq70Nz7wYHVTfYqqHsonT3JLLcpx.jpg",
    },
  ]

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Research</h2>
          <p className="text-muted-foreground max-w-2xl">
            Groundbreaking research on structured cognition, hallucination, and artificial intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((pub, idx) => (
            <a
              key={idx}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Publication Image */}
              <div className="relative overflow-hidden bg-muted h-48 sm:h-56">
                <img
                  src={pub.image || "/placeholder.svg"}
                  alt={pub.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                  <ArrowIcon />
                </div>
              </div>

              {/* Publication Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {pub.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{pub.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
