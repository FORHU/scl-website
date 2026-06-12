"use client"

import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      setIsDark(prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    const htmlElement = document.documentElement
    if (newIsDark) {
      htmlElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      htmlElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  if (!isMounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        // Sun icon for light mode (shown in dark mode)
        <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        // Moon icon for dark mode (shown in light mode)
        <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
