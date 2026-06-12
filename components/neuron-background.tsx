"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

// ─── types ────────────────────────────────────────────────────────────────────
interface ArmSeg { x1: number; y1: number; x2: number; y2: number }
interface Neuron  { x: number; y: number; vx: number; vy: number; arms: ArmSeg[] }
interface Signal  { from: number; to: number; t: number; speed: number }

// ─── constants ────────────────────────────────────────────────────────────────
const NODE_COUNT  = 52
const MAX_CONN_SQ = 0.48 * 0.48   // connection distance squared
const MAX_SIGNALS = 22
const BOUNDS_X    = 3.2
const BOUNDS_Y    = 1.9

// ─── fractal arm generator (runs once at init) ────────────────────────────────
function buildArms(armCount: number, baseLen: number): ArmSeg[] {
  const segs: ArmSeg[] = []

  function grow(x: number, y: number, dx: number, dy: number, l: number, d: number) {
    if (d > 3 || l < 0.025) return
    const x2 = x + dx * l
    const y2 = y + dy * l
    segs.push({ x1: x, y1: y, x2, y2 })
    const splits = d === 0 ? 1 : Math.random() < 0.58 ? 2 : 1
    const spread  = 0.27 + Math.random() * 0.26
    for (let i = 0; i < splits; i++) {
      const a    = i === 0 ? spread : -spread
      const ca   = Math.cos(a), sa = Math.sin(a)
      grow(x2, y2, dx * ca - dy * sa, dx * sa + dy * ca, l * (0.52 + Math.random() * 0.2), d + 1)
    }
  }

  for (let i = 0; i < armCount; i++) {
    const angle = (i / armCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.7
    grow(0, 0, Math.cos(angle), Math.sin(angle), baseLen, 0)
  }
  return segs
}

// ─── main scene component ─────────────────────────────────────────────────────
function NeuronScene() {
  const neurons = useMemo<Neuron[]>(
    () =>
      Array.from({ length: NODE_COUNT }, () => ({
        x:   (Math.random() - 0.5) * BOUNDS_X * 2,
        y:   (Math.random() - 0.5) * BOUNDS_Y * 2,
        vx:  (Math.random() - 0.5) * 0.0022,
        vy:  (Math.random() - 0.5) * 0.0022,
        arms: buildArms(Math.floor(Math.random() * 2) + 3, 0.26 + Math.random() * 0.14),
      })),
    []
  )

  const signals   = useRef<Signal[]>([])
  const edgesBuf  = useRef<[number, number][]>([])

  // ── pre-allocated buffers ──────────────────────────────────────────────────
  const armBuf  = useMemo(() => new Float32Array(NODE_COUNT * 120 * 3), [])
  const connBuf = useMemo(() => new Float32Array(NODE_COUNT * NODE_COUNT * 3), [])
  const nodeBuf = useMemo(() => new Float32Array(NODE_COUNT * 3), [])
  const sigBuf  = useMemo(() => new Float32Array(MAX_SIGNALS * 3), [])

  // ── geometries ────────────────────────────────────────────────────────────
  const armGeo  = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(armBuf,  3)); return g }, [armBuf])
  const connGeo = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(connBuf, 3)); return g }, [connBuf])
  const nodeGeo = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(nodeBuf, 3)); return g }, [nodeBuf])
  const sigGeo  = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(sigBuf,  3)); return g }, [sigBuf])

  // ── materials ─────────────────────────────────────────────────────────────
  const armMat  = useMemo(() => new THREE.LineBasicMaterial({ color: "#6a6560", transparent: true, opacity: 0.38 }), [])
  const connMat = useMemo(() => new THREE.LineBasicMaterial({ color: "#9a9590", transparent: true, opacity: 0.14 }), [])
  const nodeMat = useMemo(() => new THREE.PointsMaterial({ size: 0.030, color: "#e8e4d8", transparent: true, opacity: 0.88, sizeAttenuation: true }), [])
  const sigMat  = useMemo(() => new THREE.PointsMaterial({ size: 0.062, color: "#ff6a2d", transparent: true, opacity: 1.0,  sizeAttenuation: true }), [])

  // ── meshes ────────────────────────────────────────────────────────────────
  const armMesh  = useMemo(() => new THREE.LineSegments(armGeo,  armMat),  [armGeo,  armMat])
  const connMesh = useMemo(() => new THREE.LineSegments(connGeo, connMat), [connGeo, connMat])
  const nodeMesh = useMemo(() => new THREE.Points(nodeGeo, nodeMat),       [nodeGeo, nodeMat])
  const sigMesh  = useMemo(() => new THREE.Points(sigGeo,  sigMat),        [sigGeo,  sigMat])

  // ── animation ─────────────────────────────────────────────────────────────
  useFrame(() => {
    const ns = neurons

    // 1 ─ move nodes
    for (const n of ns) {
      n.x += n.vx; n.y += n.vy
      if (n.x >  BOUNDS_X) n.vx = -Math.abs(n.vx)
      if (n.x < -BOUNDS_X) n.vx =  Math.abs(n.vx)
      if (n.y >  BOUNDS_Y) n.vy = -Math.abs(n.vy)
      if (n.y < -BOUNDS_Y) n.vy =  Math.abs(n.vy)
    }

    // 2 ─ rebuild arm geometry
    let av = 0
    for (const n of ns) {
      for (const s of n.arms) {
        armBuf[av++] = n.x + s.x1; armBuf[av++] = n.y + s.y1; armBuf[av++] = 0
        armBuf[av++] = n.x + s.x2; armBuf[av++] = n.y + s.y2; armBuf[av++] = 0
      }
    }
    armGeo.attributes.position.needsUpdate = true
    armGeo.setDrawRange(0, av / 3)

    // 3 ─ rebuild connection edges (reuse pre-allocated array — no per-frame allocation)
    let cv = 0
    const edges = edgesBuf.current
    edges.length = 0
    for (let i = 0; i < ns.length; i++) {
      for (let j = i + 1; j < ns.length; j++) {
        const dx = ns[i].x - ns[j].x, dy = ns[i].y - ns[j].y
        if (dx * dx + dy * dy < MAX_CONN_SQ) {
          connBuf[cv++] = ns[i].x; connBuf[cv++] = ns[i].y; connBuf[cv++] = 0
          connBuf[cv++] = ns[j].x; connBuf[cv++] = ns[j].y; connBuf[cv++] = 0
          edges.push([i, j])
        }
      }
    }
    connGeo.attributes.position.needsUpdate = true
    connGeo.setDrawRange(0, cv / 3)

    // 4 ─ node positions
    for (let i = 0; i < ns.length; i++) {
      nodeBuf[i * 3] = ns[i].x; nodeBuf[i * 3 + 1] = ns[i].y; nodeBuf[i * 3 + 2] = 0
    }
    nodeGeo.attributes.position.needsUpdate = true

    // 5 ─ spawn signals
    if (signals.current.length < MAX_SIGNALS && edges.length > 0 && Math.random() < 0.06) {
      const [from, to] = edges[Math.floor(Math.random() * edges.length)]
      signals.current.push({ from, to, t: 0, speed: 0.004 + Math.random() * 0.007 })
    }

    // 6 ─ advance signals
    signals.current = signals.current.filter(s => { s.t += s.speed; return s.t < 1 })
    for (let i = 0; i < signals.current.length; i++) {
      const { from, to, t } = signals.current[i]
      sigBuf[i * 3]     = ns[from].x + (ns[to].x - ns[from].x) * t
      sigBuf[i * 3 + 1] = ns[from].y + (ns[to].y - ns[from].y) * t
      sigBuf[i * 3 + 2] = 0.02
    }
    sigGeo.attributes.position.needsUpdate = true
    sigGeo.setDrawRange(0, signals.current.length)
  })

  return (
    <>
      <primitive object={armMesh}  />
      <primitive object={connMesh} />
      <primitive object={nodeMesh} />
      <primitive object={sigMesh}  />

      <EffectComposer>
        <Bloom
          intensity={2.2}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.72}
        />
      </EffectComposer>
    </>
  )
}

// ─── exported canvas wrapper ──────────────────────────────────────────────────
export default function NeuronBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 52 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#111111"]} />
      <NeuronScene />
    </Canvas>
  )
}
