import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-white/8 bg-white/[0.09] backdrop-blur-sm shadow-lg shadow-black/30 p-10 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're seeking brilliant minds to collaborate on groundbreaking AI research that will shape the future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              View Opportunities
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
