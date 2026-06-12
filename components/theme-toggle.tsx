"use client"

import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Read the class the no-FOUC script already applied
    const dark = document.documentElement.classList.contains("dark")
    setIsDark(dark)
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-200 group ${
        isDark
          ? "border-white/10 bg-black/60 shadow-black/30 text-white/50 hover:text-white hover:border-accent/40"
          : "border-gray-200 bg-white/90 shadow-gray-200/60 text-gray-500 hover:text-gray-900 hover:border-accent/50"
      }`}
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-accent transition-colors">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-accent transition-colors">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  )
}
