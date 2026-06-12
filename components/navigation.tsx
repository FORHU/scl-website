"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "./logo"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Philosophy", href: "/philosophy" },
    { label: "SCL", href: "/scl" },
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/8 bg-black/60 backdrop-blur-md shadow-lg shadow-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-70 transition-opacity">
            <Logo className="h-25 w-auto md:h-25 text-foreground" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:text-accent hover:text-shadow-accent"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              className="p-2 -mr-2 text-foreground hover:bg-secondary/50 rounded-md transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`border-t border-border/50 md:hidden ${isOpen ? "animate-fade-in-up" : "hidden"}`}>
          <div className="space-y-1 px-2 py-4 bg-background/95 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-3 text-base font-light text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
