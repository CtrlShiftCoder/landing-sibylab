"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

interface Eye3DProps {
  className?: string;
  size?: number;
  enableTracking?: boolean;
}

/** Ojo 3D en capas (cáscara frontal / iris / pupila / cáscara trasera) con tracking. */
export function Eye3D({ className = "", size = 160, enableTracking = false }: Eye3DProps) {
  const uid = useId().replace(/:/g, "");
  const g = (name: string) => `${name}-${uid}`;

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const blinkTimerRef = useRef<number>(0);

  useEffect(() => {
    if (!enableTracking) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = matchMedia("(hover: none)").matches;

    if (reduce || isTouch) {
      const idleAnimate = () => {
        const idleX = Math.sin(Date.now() / 4000) * 3;
        const idleY = Math.cos(Date.now() / 5000) * 2;
        setRotation({ x: idleY, y: idleX });
        rafRef.current = requestAnimationFrame(idleAnimate);
      };
      idleAnimate();
      return () => cancelAnimationFrame(rafRef.current);
    }

    const scheduleBlink = () => {
      const nextBlink = 4000 + Math.random() * 5000;
      blinkTimerRef.current = window.setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 180);
        scheduleBlink();
      }, nextBlink);
    };
    scheduleBlink();

    const updateRotation = (clientX: number, clientY: number) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const maxRotation = 45;
      const rotationY = ((clientX - centerX) / centerX) * maxRotation;
      const rotationX = -((clientY - centerY) / centerY) * maxRotation * 0.7;
      targetRef.current.x = Math.max(-45, Math.min(45, rotationX));
      targetRef.current.y = Math.max(-45, Math.min(45, rotationY));
    };

    const animate = () => {
      const ease = 0.12;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;
      setRotation({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMove = (e: PointerEvent) => updateRotation(e.clientX, e.clientY);
    animate();
    addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(blinkTimerRef.current);
      removeEventListener("pointermove", handleMove);
    };
  }, [enableTracking]);

  const glow = isActive ? 1.15 : isHovered ? 1.35 : 1;
  const blinkY = isBlinking ? 0.08 : isActive ? 0.72 : 1;
  const eyePath = "M8 50 C 40 8, 120 8, 152 50 C 120 92, 40 92, 8 50 Z";

  const layerStyle = (z: number): CSSProperties => ({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    transform: `translateZ(${z}px) scaleY(${blinkY})`,
    transformOrigin: "center",
    transition: "transform 0.18s ease-out",
  });

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: size,
        height: size * 0.72,
        perspective: "1000px",
        cursor: enableTracking ? "pointer" : "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onClick={() => {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 200);
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.05s ease-out",
        }}
      >
        {/* Hover bloom */}
        <div
          style={{
            position: "absolute",
            inset: "-28%",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(155,90,230,${0.45 * glow}), transparent 68%)`,
            filter: "blur(22px)",
            transform: "translateZ(-40px)",
            opacity: isHovered || isActive ? glow : 0.55,
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }}
        />

        {/* CAPA 4 — Outer back shell */}
        <svg viewBox="0 0 160 100" style={layerStyle(-18)}>
          <defs>
            <radialGradient id={g("back")} cx="55%" cy="55%" r="70%">
              <stop offset="0%" stopColor="#5a2088" />
              <stop offset="55%" stopColor="#3a1058" />
              <stop offset="100%" stopColor="#1a0628" />
            </radialGradient>
          </defs>
          <path d={eyePath} fill={`url(#${g("back")})`} opacity="0.95" />
        </svg>

        {/* CAPA 3 — Core / pupil disk */}
        <svg viewBox="0 0 160 100" style={layerStyle(-4)}>
          <defs>
            <radialGradient id={g("core")} cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#2a1040" />
              <stop offset="60%" stopColor="#0a0412" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>
          <circle cx="80" cy="50" r="14" fill={`url(#${g("core")})`} />
        </svg>

        {/* CAPA 2 — Iris ring (torus) */}
        <svg viewBox="0 0 160 100" style={layerStyle(2)}>
          <defs>
            <radialGradient id={g("irisFill")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#c9a0e8" />
              <stop offset="30%" stopColor="#8b4fc4" />
              <stop offset="60%" stopColor="#5c1f6d" />
              <stop offset="100%" stopColor="#2a0a42" />
            </radialGradient>
            <linearGradient id={g("irisStroke")} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8d4ff" />
              <stop offset="50%" stopColor="#9b5ad4" />
              <stop offset="100%" stopColor="#4a1568" />
            </linearGradient>
            <mask id={g("irisMask")}>
              <rect width="160" height="100" fill="white" />
              <circle cx="80" cy="50" r="12" fill="black" />
            </mask>
          </defs>
          <circle
            cx="80"
            cy="50"
            r="30"
            fill={`url(#${g("irisFill")})`}
            mask={`url(#${g("irisMask")})`}
          />
          <circle
            cx="80"
            cy="50"
            r="30"
            fill="none"
            stroke={`url(#${g("irisStroke")})`}
            strokeWidth="2.2"
            opacity={0.85 * glow}
          />
          <circle
            cx="80"
            cy="50"
            r="12"
            fill="none"
            stroke="rgba(180,130,230,0.5)"
            strokeWidth="1.5"
          />
          {/* Iris sheen */}
          <ellipse
            cx="70"
            cy="40"
            rx="14"
            ry="7"
            fill="rgba(255,255,255,0.18)"
            transform="rotate(-30 70 40)"
            mask={`url(#${g("irisMask")})`}
          />
        </svg>

        {/* CAPA 1 — Outer front glassy shell */}
        <svg viewBox="0 0 160 100" style={layerStyle(14)}>
          <defs>
            <radialGradient id={g("lens")} cx="32%" cy="28%" r="75%">
              <stop offset="0%" stopColor="rgba(230,200,255,0.55)" />
              <stop offset="35%" stopColor="rgba(155,90,220,0.22)" />
              <stop offset="70%" stopColor="rgba(90,40,140,0.12)" />
              <stop offset="100%" stopColor="rgba(40,10,60,0.08)" />
            </radialGradient>
            <linearGradient id={g("edge")} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(220,190,255,0.85)" />
              <stop offset="45%" stopColor="rgba(140,80,210,0.35)" />
              <stop offset="100%" stopColor="rgba(180,140,240,0.65)" />
            </linearGradient>
            <linearGradient id={g("body")} x1="0%" y1="15%" x2="100%" y2="90%">
              <stop offset="0%" stopColor="rgba(200,160,240,0.35)" />
              <stop offset="40%" stopColor="rgba(120,60,180,0.2)" />
              <stop offset="100%" stopColor="rgba(60,20,100,0.28)" />
            </linearGradient>
          </defs>
          <path d={eyePath} fill={`url(#${g("body")})`} />
          <path d={eyePath} fill={`url(#${g("lens")})`} />
          <path
            d={eyePath}
            fill="none"
            stroke={`url(#${g("edge")})`}
            strokeWidth="1.8"
            opacity={0.9 * glow}
          />
          {/* Specular highlight */}
          <ellipse
            cx="58"
            cy="32"
            rx="22"
            ry="10"
            fill="rgba(255,255,255,0.35)"
            opacity={0.7 * glow}
          />
          <ellipse cx="52" cy="28" rx="8" ry="4" fill="rgba(255,255,255,0.75)" />
        </svg>
      </div>
    </div>
  );
}
