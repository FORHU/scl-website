"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

// ── types ──────────────────────────────────────────────────────────────────
interface Seg { x1:number; y1:number; z1:number; x2:number; y2:number; z2:number }
interface Pt  { x:number; y:number; z:number }

// Pre-baked spline vertex pair (computed once at init, never again)
interface SplinePair {
  ax:number; ay:number; az:number; ad:number; aph:number
  bx:number; by:number; bz:number; bd:number; bph:number
}

interface Neuron {
  x:number; y:number; z:number
  vx:number; vy:number; vz:number
  pulsePhase:number; pulseSpeed:number
  arms:  Seg[]
  paths: Pt[][]
  pathCumLengths: Float32Array[]  // pre-baked cumulative arc lengths per path
  splinePairs: SplinePair[]       // pre-baked: all arm curve segments in local space
}

interface Signal        { from:number; to:number; t:number; speed:number }
interface DendriteSignal { neuronIdx:number; pathIdx:number; t:number; speed:number }

// ── 3D fractal arm generator (returns segs + paths) ────────────────────────
function buildArms3D(count:number, baseLen:number): { segs:Seg[], paths:Pt[][] } {
  const segs:  Seg[]   = []
  const paths: Pt[][]  = []

  function grow(
    x:number, y:number, z:number,
    dx:number, dy:number, dz:number,
    l:number, d:number, currentPath:Pt[]
  ) {
    if (d > 4 || l < 0.01) {
      if (currentPath.length >= 2) paths.push([...currentPath])
      return
    }
    const x2 = x + dx*l, y2 = y + dy*l, z2 = z + dz*l
    segs.push({ x1:x, y1:y, z1:z, x2, y2, z2 })
    const nextPath = [...currentPath, { x:x2, y:y2, z:z2 }]

    const splits = d === 0 ? 1 : Math.random() < 0.65 ? 2 : 1
    const spread = 0.20 + Math.random() * 0.30

    if (splits === 1) {
      // Straight continuation — don't branch path yet
      const ca = Math.cos(spread), sa = Math.sin(spread)
      let ndx = dx*ca - dy*sa, ndy = dx*sa + dy*ca
      let ndz = dz + (Math.random()-0.5)*0.45
      const len = Math.sqrt(ndx*ndx+ndy*ndy+ndz*ndz)||1
      grow(x2,y2,z2, ndx/len,ndy/len,ndz/len, l*(0.55+Math.random()*0.2), d+1, nextPath)
    } else {
      // Branch splits — each branch gets its own path
      for (let i = 0; i < splits; i++) {
        const a = i === 0 ? spread : -spread
        const ca = Math.cos(a), sa = Math.sin(a)
        let ndx = dx*ca - dy*sa, ndy = dx*sa + dy*ca
        let ndz = dz + (Math.random()-0.5)*0.45
        const len = Math.sqrt(ndx*ndx+ndy*ndy+ndz*ndz)||1
        grow(x2,y2,z2, ndx/len,ndy/len,ndz/len, l*(0.55+Math.random()*0.2), d+1, [...nextPath])
      }
    }
  }

  for (let i = 0; i < count; i++) {
    const phi   = (i/count)*Math.PI*2 + (Math.random()-0.5)*0.8
    const theta = (Math.random()-0.5)*Math.PI*0.7
    const dx = Math.cos(phi)*Math.cos(theta)
    const dy = Math.sin(phi)*Math.cos(theta)
    const dz = Math.sin(theta)
    grow(0,0,0, dx,dy,dz, baseLen, 0, [{ x:0, y:0, z:0 }])
  }
  return { segs, paths }
}

// ── Catmull-Rom spline — smooth curve THROUGH 4 control points at param t ──
function catmullRom(p0:Pt, p1:Pt, p2:Pt, p3:Pt, t:number): Pt {
  const t2=t*t, t3=t2*t
  return {
    x: 0.5*((2*p1.x)+(-p0.x+p2.x)*t+(2*p0.x-5*p1.x+4*p2.x-p3.x)*t2+(-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
    y: 0.5*((2*p1.y)+(-p0.y+p2.y)*t+(2*p0.y-5*p1.y+4*p2.y-p3.y)*t2+(-p0.y+3*p1.y-3*p2.y+p3.y)*t3),
    z: 0.5*((2*p1.z)+(-p0.z+p2.z)*t+(2*p0.z-5*p1.z+4*p2.z-p3.z)*t2+(-p0.z+3*p1.z-3*p2.z+p3.z)*t3),
  }
}

// ── lerp along a path at t ∈ [0,1] using pre-baked cumulative lengths ───────
function lerpAlongPath(path: Pt[], t: number, cumLengths: Float32Array): Pt {
  if (path.length < 2) return path[0] ?? { x: 0, y: 0, z: 0 }
  const total  = cumLengths[cumLengths.length - 1]
  const target = t * total
  for (let i = 1; i < cumLengths.length; i++) {
    if (cumLengths[i] >= target) {
      const denom = cumLengths[i] - cumLengths[i - 1]
      const segT  = denom > 0 ? (target - cumLengths[i - 1]) / denom : 0
      const a = path[i - 1], b = path[i]
      return {
        x: a.x + (b.x - a.x) * segT,
        y: a.y + (b.y - a.y) * segT,
        z: a.z + (b.z - a.z) * segT,
      }
    }
  }
  return path[path.length - 1]
}

// ── constants ──────────────────────────────────────────────────────────────
const NODE_COUNT   = 18
const MAX_CONN_SQ  = 1.1 * 1.1
const MAX_SIGNALS  = 18
const MAX_DEND     = 18
const SUBDIV_INIT  = 3    // spline subdivisions — computed ONCE at init
const BX = 3.5, BY = 2.0, BZ = 2.5

// ── main scene ─────────────────────────────────────────────────────────────
function NeuronScene() {
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const neurons = useMemo<Neuron[]>(() =>
    Array.from({ length: NODE_COUNT }, () => {
      const { segs, paths } = buildArms3D(
        Math.floor(Math.random()*2)+4,
        0.38 + Math.random()*0.24
      )
      const filteredPaths = paths.filter(p => p.length >= 2)

      // Pre-bake cumulative arc lengths per path — eliminates per-frame sqrt allocations
      const pathCumLengths: Float32Array[] = filteredPaths.map(path => {
        const cl = new Float32Array(path.length)
        for (let i = 1; i < path.length; i++) {
          const dx = path[i].x - path[i-1].x
          const dy = path[i].y - path[i-1].y
          const dz = path[i].z - path[i-1].z
          cl[i] = cl[i-1] + Math.sqrt(dx*dx + dy*dy + dz*dz)
        }
        return cl
      })

      // Pre-bake all spline pairs ONCE — eliminates Catmull-Rom + sqrt every frame
      const splinePairs: SplinePair[] = []
      for (const path of filteredPaths) {
        for (let i = 0; i < path.length - 1; i++) {
          const p0 = path[Math.max(0, i-1)]
          const p1 = path[i]
          const p2 = path[i+1]
          const p3 = path[Math.min(path.length-1, i+2)]
          for (let s = 0; s < SUBDIV_INIT; s++) {
            const t0 = s / SUBDIV_INIT, t1 = (s+1) / SUBDIV_INIT
            const a = catmullRom(p0, p1, p2, p3, t0)
            const b = catmullRom(p0, p1, p2, p3, t1)
            splinePairs.push({
              ax:a.x, ay:a.y, az:a.z,
              ad: Math.sqrt(a.x*a.x+a.y*a.y+a.z*a.z),
              aph:(a.x+a.y)*1.2,
              bx:b.x, by:b.y, bz:b.z,
              bd: Math.sqrt(b.x*b.x+b.y*b.y+b.z*b.z),
              bph:(b.x+b.y)*1.2,
            })
          }
        }
      }

      return {
        x:  (Math.random()-0.5)*BX*2,
        y:  (Math.random()-0.5)*BY*2,
        z:  (Math.random()-0.5)*BZ*2,
        vx: (Math.random()-0.5)*0.0014,
        vy: (Math.random()-0.5)*0.0014,
        vz: (Math.random()-0.5)*0.0008,
        pulsePhase: Math.random()*Math.PI*2,
        pulseSpeed: 0.008 + Math.random()*0.006,
        arms:  segs,
        paths: filteredPaths,
        pathCumLengths,
        splinePairs,
      }
    }), [])

  const signals          = useRef<Signal[]>([])
  const dendriteSignals  = useRef<DendriteSignal[]>([])
  const firingState      = useRef<Map<number,number>>(new Map())
  const cachedEdges      = useRef<[number,number][]>([])
  const frameCount       = useRef(0)
  const groupRef         = useRef<THREE.Group>(null!)

  // ── buffers ────────────────────────────────────────────────────────────
  const armBuf     = useMemo(() => new Float32Array(NODE_COUNT*1600*3), [])  // Catmull-Rom paths × SUBDIV
  const connBuf    = useMemo(() => new Float32Array(NODE_COUNT*NODE_COUNT*3), [])
  const sigBuf     = useMemo(() => new Float32Array(MAX_SIGNALS*3), [])
  const dendBuf    = useMemo(() => new Float32Array(MAX_DEND*3), [])
  const dendOpaBuf = useMemo(() => new Float32Array(MAX_DEND), [])     // per-signal opacity

  const armGeo  = useMemo(() => { const g=new THREE.BufferGeometry(); g.setAttribute("position",new THREE.BufferAttribute(armBuf,3)); return g }, [armBuf])
  const connGeo = useMemo(() => { const g=new THREE.BufferGeometry(); g.setAttribute("position",new THREE.BufferAttribute(connBuf,3)); return g }, [connBuf])
  const sigGeo  = useMemo(() => { const g=new THREE.BufferGeometry(); g.setAttribute("position",new THREE.BufferAttribute(sigBuf,3)); return g }, [sigBuf])
  const dendGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(dendBuf, 3))
    g.setAttribute("aOpacity", new THREE.BufferAttribute(dendOpaBuf, 1))
    return g
  }, [dendBuf, dendOpaBuf])

  const armMat  = useMemo(() => new THREE.LineBasicMaterial({ color:"#ddd8cc", transparent:true, opacity:0.70 }), [])
  const connMat = useMemo(() => new THREE.LineBasicMaterial({ color:"#ccc8bc", transparent:true, opacity:0.35 }), [])
  // Inter-neuron signals — 3D sphere shader with specular highlight
  const sigMat  = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = clamp(55.0 / -mv.z, 5.0, 16.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        // Soft sphere glow (outer)
        float glow = 1.0 - smoothstep(0.1, 0.5, d);
        // Specular highlight for 3D look
        vec3 normal = vec3(uv * 2.0, sqrt(max(0.0, 1.0 - dot(uv*2.0, uv*2.0))));
        vec3 light  = normalize(vec3(-0.4, 0.6, 0.7));
        float spec  = pow(max(0.0, dot(normal, light)), 5.0);
        // Orange core fading to bright highlight
        vec3 col = mix(vec3(1.0, 0.38, 0.12), vec3(1.0, 0.82, 0.55), spec * 0.75);
        gl_FragColor = vec4(col, glow * 0.95);
      }
    `,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  }), [])
  // Dendrite signals — custom shader for per-point glow + fade-out at tip
  const dendMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color("#fffaf0") } },
    vertexShader: `
      attribute float aOpacity;
      varying float vOpacity;
      void main() {
        vOpacity = aOpacity;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        // Size-attenuate like PointsMaterial size≈0.04 — clamp so near neurons don't get huge
        gl_PointSize = clamp(30.0 / -mv.z, 2.0, 7.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vOpacity;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float alpha = (1.0 - smoothstep(0.1, 0.5, d)) * vOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  // Two sphere layers: inner yellow-white core + outer orange corona (BasicMaterial for additive blending)
  const sphereGeo    = useMemo(() => new THREE.SphereGeometry(0.055, 16, 16), [])
  const sphereCorGeo = useMemo(() => new THREE.SphereGeometry(0.09, 8, 8), [])
  const sphereMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:"#fff8e0",
    emissive:"#ffe090",
    emissiveIntensity: 3.5,
    roughness:0.15, metalness:0.0,
  }), [])
  // MeshBasicMaterial is required for AdditiveBlending — Standard's PBR shader conflicts with it
  const sphereCorMat = useMemo(() => new THREE.MeshBasicMaterial({
    color:"#ff5500",
    transparent:true,
    opacity:0.22,
    depthWrite:false,
    blending:THREE.AdditiveBlending,
  }), [])
  const sphereMesh    = useMemo(() => new THREE.InstancedMesh(sphereGeo, sphereMat, NODE_COUNT), [sphereGeo, sphereMat])
  const sphereCorMesh = useMemo(() => new THREE.InstancedMesh(sphereCorGeo, sphereCorMat, NODE_COUNT), [sphereCorGeo, sphereCorMat])

  const armMesh  = useMemo(() => new THREE.LineSegments(armGeo, armMat),   [armGeo, armMat])
  const connMesh = useMemo(() => new THREE.LineSegments(connGeo, connMat), [connGeo, connMat])
  const sigMesh  = useMemo(() => new THREE.Points(sigGeo, sigMat),         [sigGeo, sigMat])
  const dendMesh = useMemo(() => new THREE.Points(dendGeo, dendMat),       [dendGeo, dendMat])

  useFrame(({ camera, clock }) => {
    const ns = neurons
    frameCount.current++
    const fc = frameCount.current

    // Camera drift — larger orbit for visible 3D parallax
    const t = clock.elapsedTime
    camera.position.x = Math.sin(t * 0.04) * 1.2
    camera.position.y = Math.cos(t * 0.025) * 0.7
    camera.lookAt(0, 0, 0)

    // Slow neuron cloud revolution — full rotation every ~3.5 minutes
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.00025
      groupRef.current.rotation.x = Math.sin(t * 0.018) * 0.06
    }

    // ── Neuron firing events (every ~150 frames) ──────────────────────
    if (fc % 150 === 0) {
      const idx = Math.floor(Math.random() * ns.length)
      firingState.current.set(idx, 20)  // fire for 20 frames
    }
    // Decrement firing counters
    firingState.current.forEach((frames, idx) => {
      if (frames <= 0) firingState.current.delete(idx)
      else firingState.current.set(idx, frames - 1)
    })

    // ── Move neurons ───────────────────────────────────────────────────
    for (const n of ns) {
      n.x += n.vx; n.y += n.vy; n.z += n.vz
      n.pulsePhase += n.pulseSpeed
      if (n.x >  BX) n.vx = -Math.abs(n.vx)
      if (n.x < -BX) n.vx =  Math.abs(n.vx)
      if (n.y >  BY) n.vy = -Math.abs(n.vy)
      if (n.y < -BY) n.vy =  Math.abs(n.vy)
      if (n.z >  BZ) n.vz = -Math.abs(n.vz)
      if (n.z < -BZ) n.vz =  Math.abs(n.vz)
    }

    // ── Update sphere instances (core + corona) ───────────────────────
    ns.forEach((n, i) => {
      const firing = firingState.current.get(i)
      let pulse: number
      if (firing !== undefined) {
        pulse = 1.0 + Math.sin(n.pulsePhase * 5) * 0.45
      } else {
        pulse = 1.0 + Math.sin(n.pulsePhase) * 0.22
      }
      dummy.position.set(n.x, n.y, n.z)
      dummy.scale.setScalar(pulse)
      dummy.updateMatrix()
      sphereMesh.setMatrixAt(i, dummy.matrix)
      // Corona pulses at 1.5× the scale of the core for a breathing halo
      dummy.scale.setScalar(pulse * 1.5)
      dummy.updateMatrix()
      sphereCorMesh.setMatrixAt(i, dummy.matrix)
    })
    sphereMesh.instanceMatrix.needsUpdate    = true
    sphereCorMesh.instanceMatrix.needsUpdate = true

    // ── Arms — fast: pre-baked spline pairs, sway only per frame ────
    // No Catmull-Rom or sqrt per frame — all geometry is pre-computed at init.
    // Update every 2 frames (arms move slowly, 30fps unnoticeable).
    const et = clock.elapsedTime
    if (fc % 2 === 0) {
      let av = 0
      for (const n of ns) {
        const sx1 = Math.sin(et * 0.22 + n.pulsePhase)       * 0.055
        const sy1 = Math.cos(et * 0.18 + n.pulsePhase * 1.2) * 0.042
        const sx2 = Math.sin(et * 0.55 + n.pulsePhase * 0.7) * 0.028
        const sy2 = Math.cos(et * 0.48 + n.pulsePhase * 1.8) * 0.022
        for (const sp of n.splinePairs) {
          const wax = (sx1 + sx2 * Math.sin(et * 0.55 + sp.aph)) * sp.ad
          const way = (sy1 + sy2 * Math.cos(et * 0.48 + sp.aph)) * sp.ad
          const wbx = (sx1 + sx2 * Math.sin(et * 0.55 + sp.bph)) * sp.bd
          const wby = (sy1 + sy2 * Math.cos(et * 0.48 + sp.bph)) * sp.bd
          armBuf[av++]=n.x+sp.ax+wax; armBuf[av++]=n.y+sp.ay+way; armBuf[av++]=n.z+sp.az
          armBuf[av++]=n.x+sp.bx+wbx; armBuf[av++]=n.y+sp.by+wby; armBuf[av++]=n.z+sp.bz
        }
      }
      armGeo.attributes.position.needsUpdate = true
      armGeo.setDrawRange(0, av/3)
    }

    // ── Connections — rebuilt every 4 frames ──────────────────────────
    if (fc % 4 === 0) {
      let cv = 0
      const newEdges: [number,number][] = []
      for (let i=0;i<ns.length;i++) {
        for (let j=i+1;j<ns.length;j++) {
          const dx=ns[i].x-ns[j].x, dy=ns[i].y-ns[j].y, dz=ns[i].z-ns[j].z
          if (dx*dx+dy*dy+dz*dz < MAX_CONN_SQ) {
            connBuf[cv++]=ns[i].x; connBuf[cv++]=ns[i].y; connBuf[cv++]=ns[i].z
            connBuf[cv++]=ns[j].x; connBuf[cv++]=ns[j].y; connBuf[cv++]=ns[j].z
            newEdges.push([i,j])
          }
        }
      }
      cachedEdges.current = newEdges
      connGeo.attributes.position.needsUpdate = true
      connGeo.setDrawRange(0, cv/3)
    }
    const edges = cachedEdges.current

    // ── Inter-neuron signals ───────────────────────────────────────────
    // Firing neurons spawn extra signals
    firingState.current.forEach((_, firingIdx) => {
      const firingEdges = edges.filter(([a,b]) => a===firingIdx||b===firingIdx)
      if (signals.current.length < MAX_SIGNALS && firingEdges.length > 0 && Math.random() < 0.3) {
        const [from,to] = firingEdges[Math.floor(Math.random()*firingEdges.length)]
        signals.current.push({ from, to, t:0, speed:0.006+Math.random()*0.008 })
      }
    })
    if (signals.current.length < MAX_SIGNALS && edges.length > 0 && Math.random() < 0.07) {
      const [from,to] = edges[Math.floor(Math.random()*edges.length)]
      signals.current.push({ from, to, t:0, speed:0.004+Math.random()*0.006 })
    }
    signals.current = signals.current.filter(s => { s.t += s.speed; return s.t < 1 })
    for (let i=0;i<signals.current.length;i++) {
      const { from, to, t:st } = signals.current[i]
      sigBuf[i*3]  =ns[from].x+(ns[to].x-ns[from].x)*st
      sigBuf[i*3+1]=ns[from].y+(ns[to].y-ns[from].y)*st
      sigBuf[i*3+2]=ns[from].z+(ns[to].z-ns[from].z)*st
    }
    sigGeo.attributes.position.needsUpdate = true
    sigGeo.setDrawRange(0, signals.current.length)

    // ── Dendrite signals (sparks along arm branches) ───────────────────
    // Spawn dendrite signals
    if (fc % 30 === 0 && dendriteSignals.current.length < MAX_DEND) {
      const ni = Math.floor(Math.random()*ns.length)
      const n  = ns[ni]
      if (n.paths.length > 0) {
        const pi = Math.floor(Math.random()*n.paths.length)
        dendriteSignals.current.push({
          neuronIdx: ni,
          pathIdx:   pi,
          t:         0,
          speed:     0.003 + Math.random()*0.003,   // 3-6× slower than before
        })
      }
    }
    dendriteSignals.current = dendriteSignals.current.filter(s => { s.t += s.speed; return s.t < 1 })
    for (let i=0;i<dendriteSignals.current.length;i++) {
      const { neuronIdx, pathIdx, t:dt } = dendriteSignals.current[i]
      const n = ns[neuronIdx]
      const path = n.paths[pathIdx]
      if (!path) continue
      const pos = lerpAlongPath(path, dt, n.pathCumLengths[pathIdx])
      // Match the same dual-sway so signal stays on the moving branch
      const dist = Math.sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z)
      const ph   = (pos.x + pos.y) * 1.2
      const sX   = ((Math.sin(et*0.22+n.pulsePhase)*0.055 + Math.sin(et*0.55+n.pulsePhase*0.7+ph)*0.028)) * dist
      const sY   = ((Math.cos(et*0.18+n.pulsePhase*1.2)*0.042 + Math.cos(et*0.48+n.pulsePhase*1.8+ph)*0.022)) * dist
      dendBuf[i*3]   = n.x + pos.x + sX
      dendBuf[i*3+1] = n.y + pos.y + sY
      dendBuf[i*3+2] = n.z + pos.z
      // Fade-in 0→10%, full glow 10→75%, fade-out to 0 at 100%
      dendOpaBuf[i] = dt < 0.1 ? dt / 0.1
                    : dt < 0.75 ? 1.0
                    : (1.0 - dt) / 0.25
    }
    dendGeo.attributes.position.needsUpdate = true
    ;(dendGeo.attributes.aOpacity as THREE.BufferAttribute).needsUpdate = true
    dendGeo.setDrawRange(0, dendriteSignals.current.length)
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 3, 2]}  intensity={2.5} color="#ffffff" />
      <pointLight position={[0, 0, -4]} intensity={1.2} color="#ff6a2d" />

      {/* Slowly revolving neuron cloud */}
      <group ref={groupRef}>
        <primitive object={armMesh}       />
        <primitive object={connMesh}      />
        <primitive object={sphereCorMesh} />
        <primitive object={sphereMesh}    />
        <primitive object={sigMesh}       />
        <primitive object={dendMesh}      />
      </group>

      <EffectComposer multisampling={0}>
        <Bloom intensity={1.8} luminanceThreshold={0.14} luminanceSmoothing={0.80} mipmapBlur radius={0.70} />
      </EffectComposer>
    </>
  )
}

export default function HeroShaderBg() {
  return (
    <Canvas
      camera={{ position:[0,0,5], fov:50 }}
      gl={{ antialias:false, alpha:false, powerPreference:"high-performance" }}
      dpr={[1, 1.5]}
      style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}
    >
      <color attach="background" args={["#0c0c0c"]} />
      <NeuronScene />
    </Canvas>
  )
}
