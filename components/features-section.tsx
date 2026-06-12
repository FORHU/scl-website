import { CheckCircle2 } from 'lucide-react'

export default function FeaturesSection() {
  const CheckIcon = () => (
    <svg className="h-5 w-5 text-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )

  const features = [
    "World-class research team of AI scientists and engineers",
    "State-of-the-art computational infrastructure",
    "Partnerships with leading academic institutions",
    "Commitment to open science and knowledge sharing",
    "Ethical AI development and responsible innovation",
    "Continuous collaboration with industry leaders",
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Why Choose Forhu</h2>
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckIcon />
                  <p className="text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-96 rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 border border-accent/50">
                  <div className="h-10 w-10 rounded-full border-2 border-accent animate-pulse" />
                </div>
                <p className="text-sm text-muted-foreground">Advanced AI Infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
