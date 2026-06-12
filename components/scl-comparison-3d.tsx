"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, QuadraticBezierLine } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

// ── types ─────────────────────────────────────────────────────────────────
interface MinskyLayer  { id: string; label: string }
interface SCLComponent { id: string; label: string; minkskyLayerId: string }

export interface SclComparison3DProps {
  selectedMinskyId: string | null
  selectedSclId:    string | null
  selectionSource:  "minsky" | "scl" | null
  onSelectPair: (minskyId: string, sclId: string, source: "minsky" | "scl") => void
  minskyLayers:   MinskyLayer[]
  sclComponents:  SCLComponent[]
}

// ── camera slow drift ──────────────────────────────────────────────────────
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime * 0.06
    camera.position.x = Math.sin(t) * 0.7
    camera.position.y = Math.cos(t * 0.55) * 0.35
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── single node sphere + Html label ───────────────────────────────────────
function NodeSphere({
  position, baseColor, glowColor, labelColor,
  isActive, isRelated, isFaded, label, onClick,
}: {
  position:   [number, number, number]
  baseColor:  string
  glowColor:  string
  labelColor: string
  isActive:   boolean
  isRelated:  boolean
  isFaded:    boolean
  label:      string
  onClick:    () => void
}) {
  const meshRef  = useRef<THREE.Mesh>(null!)
  const matRef   = useRef<THREE.MeshStandardMaterial>(null!)
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.3, 16, 16), [])
  useEffect(() => () => { sphereGeo.dispose() }, [sphereGeo])

  const targetScale     = isActive ? 1.35 : isRelated ? 1.1 : 1.0
  const targetEmissive  = isActive ? 2.2 : isRelated ? 0.9 : isFaded ? 0.04 : 0.22

  useFrame(() => {
    if (!meshRef.current || !matRef.current) return
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.09)
    )
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity, targetEmissive, 0.09
    )
    matRef.current.opacity = THREE.MathUtils.lerp(
      matRef.current.opacity ?? 1, isFaded ? 0.3 : 1.0, 0.09
    )
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick() }}
      >
        <primitive object={sphereGeo} attach="geometry" />
        <meshStandardMaterial
          ref={matRef}
          color={baseColor}
          emissive={glowColor}
          emissiveIntensity={0.22}
          roughness={0.3}
          metalness={0.05}
          transparent
          opacity={1}
        />
      </mesh>

      {/* HTML label — real DOM, no coordinate math, no overlap */}
      <Html distanceFactor={9} center position={[0, -0.48, 0]}>
        <span
          style={{
            fontSize:       "11px",
            fontWeight:     isActive ? 700 : 500,
            color:          isActive ? labelColor : "rgba(255,255,255,0.42)",
            whiteSpace:     "nowrap",
            pointerEvents:  "none",
            userSelect:     "none",
            letterSpacing:  "0.02em",
            textShadow:     isActive ? `0 0 10px ${labelColor}88` : "none",
            transition:     "color 0.3s ease, text-shadow 0.3s ease",
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  )
}

// ── animated connection line (bezier arc) ─────────────────────────────────
function PairLine({
  start, end, isActive,
}: {
  start:    [number, number, number]
  end:      [number, number, number]
  isActive: boolean
}) {
  const mid: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    1.4,
  ]
  return (
    <QuadraticBezierLine
      start={start}
      end={end}
      mid={mid}
      color={isActive ? "#ff6a2d" : "#2a1205"}
      lineWidth={isActive ? 1.8 : 0.5}
    />
  )
}

// ── main scene ─────────────────────────────────────────────────────────────
function Scene({
  selectedMinskyId, selectedSclId, onSelectPair,
  minskyLayers, sclComponents,
}: SclComparison3DProps) {
  const positions = useMemo(() => minskyLayers.map((_, i) => {
    const angle = (i / minskyLayers.length) * Math.PI * 2 - Math.PI / 2
    return {
      minsky: [1.3 * Math.cos(angle), 1.3 * Math.sin(angle), 0]    as [number, number, number],
      scl:    [2.3 * Math.cos(angle), 2.3 * Math.sin(angle), 0.4]   as [number, number, number],
    }
  }), [minskyLayers])

  const getSCL = (minskyId: string) => sclComponents.find(c => c.minkskyLayerId === minskyId)

  const hasSelection = !!(selectedMinskyId || selectedSclId)

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 4, 3]}   intensity={1.8}  color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={0.7}  color="#ff6a2d" />

      {/* Bezier pair lines */}
      {minskyLayers.map((mn, i) => {
        const scl = getSCL(mn.id)
        if (!scl) return null
        const isActive = selectedMinskyId === mn.id || selectedSclId === scl.id
        return (
          <PairLine
            key={`line-${mn.id}`}
            start={positions[i].minsky}
            end={positions[i].scl}
            isActive={isActive}
          />
        )
      })}

      {/* Minsky nodes (inner ring) */}
      {minskyLayers.map((mn, i) => {
        const scl      = getSCL(mn.id)
        const isActive  = selectedMinskyId === mn.id
        const isRelated = !isActive && selectedSclId === scl?.id
        const isFaded   = hasSelection && !isActive && !isRelated
        return (
          <NodeSphere
            key={mn.id}
            position={positions[i].minsky}
            baseColor="#6a2808"
            glowColor="#ff6a2d"
            labelColor="#ff6a2d"
            isActive={isActive}
            isRelated={isRelated}
            isFaded={isFaded}
            label={mn.label}
            onClick={() => scl && onSelectPair(mn.id, scl.id, "minsky")}
          />
        )
      })}

      {/* SCL nodes (outer ring) */}
      {sclComponents.map((scl) => {
        const minskyIdx = minskyLayers.findIndex(m => m.id === scl.minkskyLayerId)
        if (minskyIdx < 0) return null
        const mn        = minskyLayers[minskyIdx]
        const isActive  = selectedSclId === scl.id
        const isRelated = !isActive && selectedMinskyId === scl.minkskyLayerId
        const isFaded   = hasSelection && !isActive && !isRelated
        return (
          <NodeSphere
            key={scl.id}
            position={positions[minskyIdx].scl}
            baseColor="#4a2c0c"
            glowColor="#c89860"
            labelColor="#e0b870"
            isActive={isActive}
            isRelated={isRelated}
            isFaded={isFaded}
            label={scl.label}
            onClick={() => onSelectPair(mn.id, scl.id, "scl")}
          />
        )
      })}

      <CameraRig />

      <EffectComposer multisampling={0}>
        <Bloom intensity={1.6} luminanceThreshold={0.12} luminanceSmoothing={0.80} mipmapBlur radius={0.72} />
      </EffectComposer>
    </>
  )
}

// ── exported canvas wrapper ────────────────────────────────────────────────
export default function SclComparison3D(props: SclComparison3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    >
      <Scene {...props} />
    </Canvas>
  )
}
