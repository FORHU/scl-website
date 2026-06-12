import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Poppins } from "next/font/google"
import Script from "next/script"
import ShaderBackgroundWrapper from "@/components/shader-background-wrapper"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import GlowSpheres from "@/components/glow-spheres"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://forhu.ai"),
  title: {
    default: "Forhu — Structured Cognitive Loop",
    template: "%s | Forhu",
  },
  description:
    "Advancing AI research and education through the Structured Cognitive Loop (SCL) — a recursive, human-centric cognitive architecture.",
  keywords: [
    "AI research",
    "Structured Cognitive Loop",
    "SCL",
    "cognitive architecture",
    "AI education",
    "Forhu",
  ],
  authors: [{ name: "Forhu", url: "https://forhu.ai" }],
  openGraph: {
    type: "website",
    url: "https://forhu.ai",
    title: "Forhu — Structured Cognitive Loop",
    description:
      "Advancing AI research and education through the Structured Cognitive Loop (SCL).",
    siteName: "Forhu",
    images: [
      {
        url: "/forhu.ico.png",
        width: 1200,
        height: 630,
        alt: "Forhu — Structured Cognitive Loop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forhu — Structured Cognitive Loop",
    description:
      "Advancing AI research and education through the Structured Cognitive Loop (SCL).",
    images: ["/forhu.ico.png"],
  },
  alternates: {
    canonical: "https://forhu.ai",
  },
  icons: {
    icon: [
      {
        url: "/forhu.ico.png",
        type: "image/png",
        sizes: "any",
      },
    ],
    shortcut: "/forhu.ico.png",
    apple: "/forhu.ico.png",
  },
}

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Forhu",
  url: "https://forhu.ai",
  logo: "https://forhu.ai/forhu.ico.png",
  description:
    "Advancing AI research and education through the Structured Cognitive Loop (SCL) — a recursive, human-centric cognitive architecture.",
  sameAs: [],
}

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Forhu — Structured Cognitive Loop",
  url: "https://forhu.ai",
  description:
    "Advancing AI research and education through the Structured Cognitive Loop (SCL) — a recursive, human-centric cognitive architecture.",
  hasPart: [
    {
      "@type": "WebPageElement",
      name: "Philosophy",
      url: "https://forhu.ai/#philosophy",
      description:
        "Forhu's foundational philosophy behind human-centric AI development and the principles driving the Structured Cognitive Loop.",
    },
    {
      "@type": "WebPageElement",
      name: "Structured Cognitive Loop (SCL)",
      url: "https://forhu.ai/#scl",
      description:
        "The Structured Cognitive Loop (SCL) — a recursive, hierarchical cognitive architecture for AI agents that integrates perception, cognition, and action through feedback mechanisms.",
    },
    {
      "@type": "WebPageElement",
      name: "Research & Publications",
      url: "https://forhu.ai/#research",
      description:
        "Peer-reviewed research and preprints on cognitive architecture, AI hallucination, and the Structured Cognitive Loop published by Forhu.",
    },
    {
      "@type": "WebPageElement",
      name: "Projects",
      url: "https://forhu.ai/#projects",
      description:
        "Real-world applications of the Structured Cognitive Loop including Chumme and I Love Lawyer.",
    },
    {
      "@type": "WebPageElement",
      name: "About Forhu",
      url: "https://forhu.ai/#about",
      description:
        "About Forhu — the team advancing AI research and education through the Structured Cognitive Loop.",
    },
    {
      "@type": "WebPageElement",
      name: "Contact",
      url: "https://forhu.ai/#contact",
      description: "Get in touch with the Forhu team.",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ background: "#0d0d0d" }} suppressHydrationWarning>
      <body
        className={`font-sans antialiased text-foreground ${poppins.variable}`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
        />
        {/* Fixed shader background — shows through all pages as you scroll */}
        {/* <div className="fixed inset-0 -z-10">
          <ShaderBackgroundWrapper />
        </div> */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EPWZ4WMGPS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EPWZ4WMGPS');
          `}
        </Script>

        <GlowSpheres />

        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
