"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const HeroShaderBg = dynamic(() => import("./hero-shader-bg"), { ssr: false })

export default function ShaderBackgroundWrapper() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [active, setActive] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setActive(!document.hidden)
      const onVisibility = () => setActive(!document.hidden)
      document.addEventListener("visibilitychange", onVisibility)
      return () => document.removeEventListener("visibilitychange", onVisibility)
    }

    const check = () => {
      setActive(!document.hidden && window.scrollY > window.innerHeight * 0.85)
    }
    check()
    window.addEventListener("scroll", check, { passive: true })
    document.addEventListener("visibilitychange", check)
    return () => {
      window.removeEventListener("scroll", check)
      document.removeEventListener("visibilitychange", check)
    }
  }, [isHome])

  return active ? <HeroShaderBg /> : null
}
