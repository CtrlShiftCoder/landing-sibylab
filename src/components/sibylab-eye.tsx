"use client";
import { useEffect, useRef, useState } from "react";

interface EyeProps {
  className?: string;
  size?: number;
  enableCursorTracking?: boolean;
}

export function SibylabEye({ className = "", size = 64, enableCursorTracking = false }: EyeProps) {
  const eyeRef = useRef<SVGGElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const blinkTimerRef = useRef<number>(0);

  useEffect(() => {
    if (!enableCursorTracking) return;
    
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = matchMedia("(hover: none)").matches;
    
    if (reduce || isTouch) {
      const idleAnimate = () => {
        const idleX = Math.sin(Date.now() / 3000) * 2;
        const idleY = Math.cos(Date.now() / 4000) * 1.5;
        setPupilPos({ x: idleX, y: idleY });
        rafRef.current = requestAnimationFrame(idleAnimate);
      };
      idleAnimate();
      return () => cancelAnimationFrame(rafRef.current);
    }

    const scheduleBlink = () => {
      const nextBlink = 3000 + Math.random() * 4000;
      blinkTimerRef.current = window.setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        scheduleBlink();
      }, nextBlink);
    };
    scheduleBlink();

    const updatePupil = (clientX: number, clientY: number) => {
      const maxOffset = 6;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const maxDistance = Math.hypot(centerX, centerY);
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      
      targetRef.current.x = (deltaX / maxDistance) * maxOffset * normalizedDistance;
      targetRef.current.y = (deltaY / maxDistance) * maxOffset * normalizedDistance;
    };

    const animate = () => {
      const ease = 0.15;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;
      
      setPupilPos({
        x: currentRef.current.x,
        y: currentRef.current.y,
      });
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    const handleMove = (e: PointerEvent) => updatePupil(e.clientX, e.clientY);
    
    animate();
    addEventListener("pointermove", handleMove, { passive: true });
    
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(blinkTimerRef.current);
      removeEventListener("pointermove", handleMove);
    };
  }, [enableCursorTracking]);

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <defs>
        <linearGradient id="eye-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9b42ab" />
          <stop offset="50%" stopColor="#71388f" />
          <stop offset="100%" stopColor="#5c1f6d" />
        </linearGradient>
        <radialGradient id="pupil-gradient" cx="0.4" cy="0.4">
          <stop offset="0%" stopColor="#e6dfee" />
          <stop offset="50%" stopColor="#c8b8d9" />
          <stop offset="100%" stopColor="#9b42ab" />
        </radialGradient>
        <filter id="eye-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <g ref={eyeRef}>
        <ellipse
          cx="32"
          cy="32"
          rx="28"
          ry="18"
          fill="url(#eye-gradient)"
          filter="url(#eye-glow)"
          opacity="0.95"
          style={{
            transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
            transformOrigin: "center",
            transition: "transform 0.15s ease-out",
          }}
        />
        
        <ellipse
          cx={32 + pupilPos.x}
          cy={32 + pupilPos.y}
          rx="10"
          ry="11"
          fill="url(#pupil-gradient)"
          style={{
            transform: isBlinking ? "scale(0.1)" : "scale(1)",
            transformOrigin: "center",
            transition: "transform 0.15s ease-out",
          }}
        />
        
        <ellipse
          cx={33 + pupilPos.x}
          cy={30 + pupilPos.y}
          rx="3"
          ry="4"
          fill="white"
          opacity="0.9"
          style={{
            transform: isBlinking ? "scale(0)" : "scale(1)",
            transformOrigin: "center",
            transition: "transform 0.15s ease-out",
          }}
        />
      </g>
    </svg>
  );
}
