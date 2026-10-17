"use client";
import { useEffect, useRef, useState } from "react";

interface Eye3DProps {
  className?: string;
  size?: number;
  enableTracking?: boolean;
}

export function Eye3D({ className = "", size = 160, enableTracking = false }: Eye3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      const maxRotation = 45;
      const rotationY = (deltaX / centerX) * maxRotation;
      const rotationX = -(deltaY / centerY) * maxRotation * 0.7;
      
      targetRef.current.x = Math.max(-45, Math.min(45, rotationX));
      targetRef.current.y = Math.max(-45, Math.min(45, rotationY));
    };

    const animate = () => {
      const ease = 0.12;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;
      
      setRotation({
        x: currentRef.current.x,
        y: currentRef.current.y,
      });
      
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

  const glowIntensity = isActive ? 1.5 : isHovered ? 1.2 : 1;
  const blinkScale = isBlinking ? 0.05 : 1;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
        perspective: "1000px",
        cursor: enableTracking ? "pointer" : "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        {/* Outer glow */}
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(139,92,246,${0.4 * glowIntensity}), transparent 70%)`,
            filter: "blur(20px)",
            transform: "translateZ(-30px)",
            opacity: glowIntensity,
            transition: "opacity 0.3s",
          }}
        />

        {/* Back shell */}
        <svg
          viewBox="0 0 160 100"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "translateZ(-15px)",
          }}
        >
          <defs>
            <radialGradient id="back-shell" cx="0.5" cy="0.5">
              <stop offset="0%" stopColor="#4a1d6e" />
              <stop offset="50%" stopColor="#3a1558" />
              <stop offset="100%" stopColor="#2a0d42" />
            </radialGradient>
          </defs>
          <ellipse
            cx="80"
            cy="50"
            rx="75"
            ry="45"
            fill="url(#back-shell)"
            opacity="0.9"
            style={{
              transform: `scaleY(${blinkScale})`,
              transformOrigin: "center",
              transition: "transform 0.18s ease-out",
            }}
          />
        </svg>

        {/* Ring iris */}
        <svg
          viewBox="0 0 160 100"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "translateZ(0px)",
          }}
        >
          <defs>
            <radialGradient id="iris-ring" cx="0.5" cy="0.5">
              <stop offset="0%" stopColor="#1a0a2e" />
              <stop offset="30%" stopColor="#3a1558" />
              <stop offset="50%" stopColor="#5b2a88" />
              <stop offset="70%" stopColor="#7c3aad" />
              <stop offset="100%" stopColor="#6b2d91" />
            </radialGradient>
            <radialGradient id="iris-inner" cx="0.5" cy="0.5">
              <stop offset="0%" stopColor="#0a0412" />
              <stop offset="50%" stopColor="#1a0a2e" />
              <stop offset="100%" stopColor="#2a1040" />
            </radialGradient>
          </defs>
          <ellipse
            cx="80"
            cy="50"
            rx="40"
            ry="28"
            fill="url(#iris-ring)"
            style={{
              transform: `scaleY(${blinkScale})`,
              transformOrigin: "center",
              transition: "transform 0.18s ease-out",
            }}
          />
          <ellipse
            cx="80"
            cy="50"
            rx="18"
            ry="13"
            fill="url(#iris-inner)"
            style={{
              transform: `scaleY(${blinkScale})`,
              transformOrigin: "center",
              transition: "transform 0.18s ease-out",
            }}
          />
        </svg>

        {/* Pupil hole (black) */}
        <svg
          viewBox="0 0 160 100"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "translateZ(5px)",
          }}
        >
          <ellipse
            cx="80"
            cy="50"
            rx="12"
            ry="9"
            fill="#000000"
            style={{
              transform: `scaleY(${blinkScale})`,
              transformOrigin: "center",
              transition: "transform 0.18s ease-out",
            }}
          />
        </svg>

        {/* Front glassy lens */}
        <svg
          viewBox="0 0 160 100"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "translateZ(10px)",
          }}
        >
          <defs>
            <radialGradient id="lens-gloss" cx="0.35" cy="0.3">
              <stop offset="0%" stopColor="rgba(200,160,255,0.6)" />
              <stop offset="40%" stopColor="rgba(139,92,246,0.3)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </radialGradient>
            <linearGradient id="lens-edge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(139,92,246,0.5)" />
              <stop offset="50%" stopColor="rgba(99,62,206,0.3)" />
              <stop offset="100%" stopColor="rgba(79,42,166,0.5)" />
            </linearGradient>
          </defs>
          <ellipse
            cx="80"
            cy="50"
            rx="75"
            ry="45"
            fill="none"
            stroke="url(#lens-edge)"
            strokeWidth="2"
            opacity={glowIntensity * 0.8}
            style={{
              transform: `scaleY(${blinkScale})`,
              transformOrigin: "center",
              transition: "transform 0.18s ease-out, opacity 0.3s",
            }}
          />
          <ellipse
            cx="80"
            cy="50"
            rx="70"
            ry="42"
            fill="url(#lens-gloss)"
            opacity={glowIntensity * 0.5}
            style={{
              transform: `scaleY(${blinkScale})`,
              transformOrigin: "center",
              transition: "transform 0.18s ease-out, opacity 0.3s",
            }}
          />
        </svg>

        {/* Specular highlight */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "35%",
            width: "25%",
            height: "15%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.7), transparent)",
            transform: `translateZ(15px) scaleY(${blinkScale})`,
            opacity: glowIntensity * 0.8,
            transition: "opacity 0.3s, transform 0.18s ease-out",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
