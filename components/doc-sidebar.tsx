"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const nav = [
  {
    group: "Overview",
    items: [
      { href: "/", label: "Introduction" },
      { href: "/the-loop", label: "The Loop" },
      { href: "/core-premise", label: "Core Premise" },
    ],
  },
  {
    group: "Failure Analysis",
    items: [
      { href: "/failure-analysis", label: "Two Roots of Failure" },
    ],
  },
  {
    standaloneButton: true,
    href: "/rccham",
    label: "R-CC[H]AM",
  },
  {
    group: "Mechanisms",
    items: [
      { href: "/mechanisms/regulation-layer", label: "Regulation Layer" },
      { href: "/mechanisms/glassbox-trace", label: "Glassbox Trace" },
      { href: "/mechanisms/fresh-instance", label: "Fresh Instance" },
    ],
  },
  {
    group: "Governance",
    items: [
      { href: "/governance/regulatory-alignment", label: "EU AI Act Alignment" },
    ],
  },
  {
    group: "Reference",
    items: [
      { href: "/faq", label: "FAQ" },
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
  const pathname = usePathname()

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
        {nav.map((section, idx) => {
          if ("standaloneButton" in section) {
            const isActive = pathname === section.href
            return (
              <div key={idx}>
                <Link
                  href={section.href}
                  onClick={onClose}
                  className={`block text-sm px-2 py-1.5 rounded-md transition-colors duration-150 ${
                    isActive
                      ? "text-accent bg-accent/10 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {section.label}
                </Link>
              </div>
            )
          }

          return (
            <div key={idx}>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/70 mb-1.5 px-2">
                {section.group}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`block text-sm px-2 py-1.5 rounded-md transition-colors duration-150 ${
                          isActive
                            ? "text-accent bg-accent/10 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}

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
