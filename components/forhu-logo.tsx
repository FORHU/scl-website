"use client"

import type React from "react"

interface ForhuLogoProps {
  className?: string
  animated?: boolean
}

export const ForhuLogo: React.FC<ForhuLogoProps> = ({ className = "h-8 w-8", animated = true }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central core circle */}
        <circle
          cx="32"
          cy="32"
          r="4"
          fill="url(#logoGradient)"
          filter="url(#glow)"
          className={animated ? "animate-pulse" : ""}
        />

        {/* Inner rotating ring */}
        <circle
          cx="32"
          cy="32"
          r="12"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          strokeDasharray="75.4 75.4"
          opacity="0.6"
          className={animated ? "animate-spin" : ""}
          style={{
            transformOrigin: "32px 32px",
            animationDuration: "8s",
          }}
        />

        {/* Middle rotating ring - reverse direction */}
        <circle
          cx="32"
          cy="32"
          r="20"
          stroke="url(#logoGradient)"
          strokeWidth="1"
          strokeDasharray="125.6 125.6"
          opacity="0.4"
          className={animated ? "animate-spin" : ""}
          style={{
            transformOrigin: "32px 32px",
            animationDuration: "12s",
            animationDirection: "reverse",
          }}
        />

        {/* Outer ring - static with gradient */}
        <circle cx="32" cy="32" r="28" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.3" />

        {/* 4 Data point nodes positioned around the circle */}
        {[0, 90, 180, 270].map((angle) => {
          const radian = (angle * Math.PI) / 180
          const x = 32 + 20 * Math.cos(radian)
          const y = 32 + 20 * Math.sin(radian)
          return (
            <g key={angle}>
              {/* Pulsing node */}
              <circle
                cx={x}
                cy={y}
                r="2.5"
                fill="url(#logoGradient)"
                className={animated ? "animate-pulse" : ""}
                style={{
                  animationDelay: `${(angle / 360) * 2}s`,
                }}
              />
              {/* Node orbit line */}
              <circle cx={x} cy={y} r="4" stroke="url(#logoGradient)" strokeWidth="0.5" opacity="0.2" />
            </g>
          )
        })}

        {/* Connecting lines between nodes forming a square */}
        <line x1={32 + 20} y1="32" x2="32" y2={32 + 20} stroke="url(#logoGradient)" strokeWidth="0.8" opacity="0.3" />
        <line x1="32" y1={32 + 20} x2={32 - 20} y2="32" stroke="url(#logoGradient)" strokeWidth="0.8" opacity="0.3" />
        <line x1={32 - 20} y1="32" x2="32" y2={32 - 20} stroke="url(#logoGradient)" strokeWidth="0.8" opacity="0.3" />
        <line x1="32" y1={32 - 20} x2={32 + 20} y2="32" stroke="url(#logoGradient)" strokeWidth="0.8" opacity="0.3" />
      </svg>

      {/* Animated glow background */}
      {animated && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-purple-500/0 animate-pulse blur-md" />
      )}
    </div>
  )
}

export default ForhuLogo
