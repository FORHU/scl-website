"use client"

export default function GlowSpheres() {
  return (
    <>
      <style>{`
        /* Desktop travel paths */
        @keyframes sphere-1 {
          0%   { transform: translate(0px,    0px)   scale(1.0); }
          18%  { transform: translate(900px,  80px)  scale(1.5); }
          38%  { transform: translate(780px,  520px) scale(0.7); }
          58%  { transform: translate(100px,  640px) scale(1.3); }
          78%  { transform: translate(-80px,  310px) scale(0.8); }
          100% { transform: translate(0px,    0px)   scale(1.0); }
        }
        @keyframes sphere-2 {
          0%   { transform: translate(0px,    0px)    scale(1.0); }
          20%  { transform: translate(-860px, -50px)  scale(0.6); }
          40%  { transform: translate(-740px, -540px) scale(1.4); }
          60%  { transform: translate(-90px,  -660px) scale(0.8); }
          80%  { transform: translate(100px,  -330px) scale(1.6); }
          100% { transform: translate(0px,    0px)    scale(1.0); }
        }
        @keyframes sphere-glow {
          0%, 100% { opacity: 0.45; transform: scale(0.85); }
          50%      { opacity: 1.00; transform: scale(1.25); }
        }

        /* Mobile — smaller travel range */
        @media (max-width: 768px) {
          @keyframes sphere-1 {
            0%   { transform: translate(0px,   0px)   scale(1.0); }
            18%  { transform: translate(240px, 50px)  scale(1.4); }
            38%  { transform: translate(200px, 350px) scale(0.7); }
            58%  { transform: translate(30px,  420px) scale(1.2); }
            78%  { transform: translate(-40px, 220px) scale(0.8); }
            100% { transform: translate(0px,   0px)   scale(1.0); }
          }
          @keyframes sphere-2 {
            0%   { transform: translate(0px,    0px)    scale(1.0); }
            20%  { transform: translate(-220px, -30px)  scale(0.6); }
            40%  { transform: translate(-190px, -350px) scale(1.3); }
            60%  { transform: translate(-30px,  -420px) scale(0.8); }
            80%  { transform: translate(40px,   -220px) scale(1.5); }
            100% { transform: translate(0px,    0px)    scale(1.0); }
          }
          .gs-visual {
            width: 260px  !important;
            height: 260px !important;
            filter: blur(50px) !important;
          }
        }

        /* Respect reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .gs-move, .gs-glow { animation: none !important; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -10,
          pointerEvents: "none",
          overflow: "hidden",
          contain: "paint",
        }}
        aria-hidden="true"
      >
        {/* Sphere 1 — deep orange corona */}
        <div
          className="gs-move"
          style={{
            position: "absolute",
            top: "8vh",
            left: "8vw",
            animation: "sphere-1 40s linear infinite",
            willChange: "transform",
          }}
        >
          <div
            className="gs-glow"
            style={{
              animation: "sphere-glow 7s ease-in-out infinite",
              willChange: "transform, opacity",
            }}
          >
            <div
              className="gs-visual"
              style={{
                width: 480,
                height: 480,
                borderRadius: "50%",
                backgroundColor: "rgba(255,85,0,0.35)",
                filter: "blur(80px)",
              }}
            />
          </div>
        </div>

        {/* Sphere 2 — warm golden yellow */}
        <div
          className="gs-move"
          style={{
            position: "absolute",
            bottom: "8vh",
            right: "8vw",
            animation: "sphere-2 55s linear infinite",
            willChange: "transform",
          }}
        >
          <div
            className="gs-glow"
            style={{
              animation: "sphere-glow 9s ease-in-out infinite 2s",
              willChange: "transform, opacity",
            }}
          >
            <div
              className="gs-visual"
              style={{
                width: 480,
                height: 480,
                borderRadius: "50%",
                backgroundColor: "rgba(255,224,144,0.30)",
                filter: "blur(80px)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
