"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const nav = [
  {
    group: "Overview",
    items: [
      { id: "overview", label: "Introduction" },
      { id: "scl-loop", label: "The Loop" },
      { id: "core-premise", label: "Core Premise" },
    ],
  },
  {
    group: "Failure Analysis",
    items: [
      { id: "failure-analysis", label: "Two Roots of Failure" },
    ],
  },
  {
    group: "R-CC[H]AM",
    items: [
      { id: "step-retrieval", label: "R - Retrieval" },
      { id: "step-cognition", label: "C - Cognition" },
      { id: "step-control", label: "C - Control" },
      { id: "step-hitl", label: "[H] - HITL" },
      { id: "step-action", label: "A - Action" },
      { id: "step-memory", label: "M - Memory" },
    ],
  },
  {
    group: "Mechanisms",
    items: [
      { id: "mechanism-regulation", label: "Regulation Layer" },
      { id: "mechanism-glassbox", label: "Glassbox Trace" },
      { id: "mechanism-fresh-instance", label: "Fresh Instance" },
    ],
  },
  {
    group: "Governance",
    items: [
      { id: "regulatory-alignment", label: "EU AI Act Alignment" },
    ],
  },
  {
    group: "Reference",
    items: [
      { id: "faq", label: "FAQ" },
    ],
  },
]

const pageLinks = [
  { label: "Research & Publications", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

interface DocSidebarProps {
  open: boolean
  onClose: () => void
}

export default function DocSidebar({ open, onClose }: DocSidebarProps) {
  const [activeId, setActiveId] = useState<string>("")
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    if (!isHome) return

    const allIds = nav.flatMap((g) => g.items.map((i) => i.id))
    const observers: IntersectionObserver[] = []

    allIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: "-15% 0px -75% 0px" }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [isHome, pathname])

  const handleAnchorClick = (id: string) => {
    onClose()
    if (!isHome) return
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto py-6 px-4">
      {/* Site identity */}
      <div className="mb-6 pb-4 border-b border-border">
        <Link href="/" onClick={onClose} className="block">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-0.5">scl.institute</p>
          <p className="text-xs text-muted-foreground font-light">Structured Cognitive Loop</p>
        </Link>
      </div>

      {/* Anchor nav */}
      <nav className="flex-1 space-y-5">
        {nav.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/70 mb-1.5 px-2">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeId === item.id && isHome
                return (
                  <li key={item.id}>
                    {isHome ? (
                      <button
                        onClick={() => handleAnchorClick(item.id)}
                        className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors duration-150 ${
                          isActive
                            ? "text-accent bg-accent/10 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={`/#${item.id}`}
                        onClick={onClose}
                        className="block text-sm px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

        {/* Page links */}
        <div className="pt-2 border-t border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/70 mb-1.5 px-2">
            Pages
          </p>
          <ul className="space-y-0.5">
            {pageLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block text-sm px-2 py-1.5 rounded-md transition-colors ${
                      isActive
                        ? "text-accent bg-accent/10 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* External */}
        <div className="pt-2">
          <a
            href="https://forhu.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm px-2 py-1.5 rounded-md text-muted-foreground/60 hover:text-muted-foreground hover:bg-foreground/5 transition-colors"
          >
            Forhu.ai (external)
          </a>
        </div>
      </nav>

      {/* Version badge */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground/60 px-2">R-CC[H]AM v2025</p>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-background/80 backdrop-blur-sm sticky top-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 border-r border-border bg-background transform transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">SCL Docs</span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SidebarContent />
      </aside>
    </>
  )
}
