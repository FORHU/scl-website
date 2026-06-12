"use client"

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <img 
      src="/forhu-logofin.png"
      alt="Forhu Logo"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}
