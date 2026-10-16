"use client";
import { useEffect, useRef } from "react";

/** Constelación neuronal en forma de 'S' (Sibylab): nodos que se conectan y reaccionan al mouse.
 *  Se pausa fuera de pantalla / pestaña oculta y respeta prefers-reduced-motion. */
export function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };
    type N = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; r: number; hue: number };
    let nodes: N[] = [];
    
    const getSPath = (width: number, height: number): {x: number; y: number}[] => {
      const points: {x: number; y: number}[] = [];
      const steps = 120;
      const padX = width * 0.15;
      const padY = height * 0.12;
      const availW = width - 2 * padX;
      const availH = height - 2 * padY;
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const angle = t * Math.PI * 2;
        let sx: number, sy: number;
        
        if (t < 0.5) {
          sx = padX + availW * (0.7 - 0.4 * Math.cos(angle));
          sy = padY + availH * (0.25 + 0.2 * Math.sin(angle));
        } else {
          sx = padX + availW * (0.3 + 0.4 * Math.cos(angle));
          sy = padY + availH * (0.75 - 0.2 * Math.sin(angle));
        }
        points.push({ x: sx, y: sy });
      }
      return points;
    };
    
    const resize = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      const isMobile = w < 640;
      const count = isMobile ? 35 : 65;
      const sPath = getSPath(w, h);
      const step = Math.floor(sPath.length / count);
      
      nodes = Array.from({ length: count }, (_, i) => {
        const pathIdx = (i * step) % sPath.length;
        const target = sPath[pathIdx];
        const drift = isMobile ? 8 : 12;
        return {
          x: target.x + (Math.random() - 0.5) * drift,
          y: target.y + (Math.random() - 0.5) * drift,
          tx: target.x,
          ty: target.y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.4 + 0.9,
          hue: Math.random(),
        };
      });
    };
    const LINK = w < 640 ? 100 : 140;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) {
          const dtx = n.tx - n.x, dty = n.ty - n.y;
          const distToTarget = Math.hypot(dtx, dty);
          
          if (distToTarget > 1) {
            n.x += dtx * 0.015;
            n.y += dty * 0.015;
          }
          
          n.x += n.vx * 0.6;
          n.y += n.vy * 0.6;
          
          if (Math.abs(n.x - n.tx) > 25) n.vx *= 0.95;
          if (Math.abs(n.y - n.ty) > 25) n.vy *= 0.95;
          
          const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
          if (d < 180) {
            const force = (1 - d / 180) * 0.5;
            n.x += dx * force * 0.025;
            n.y += dy * force * 0.025;
          }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const o = (1 - d / LINK) * 0.35;
            ctx.strokeStyle = a.hue > 0.5 ? `rgba(63,191,178,${o})` : `rgba(155,66,171,${o + 0.05})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 170) {
          ctx.strokeStyle = `rgba(197,138,214,${(1 - md / 170) * 0.6})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        const pulse = reduce ? 1 : 0.6 + 0.4 * Math.sin(t / 600 + i);
        ctx.fillStyle = a.hue > 0.5 ? `rgba(63,191,178,${pulse})` : `rgba(197,138,214,${pulse})`;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
    };
    const loop = (t: number) => { draw(t); if (visible && !reduce) raf = requestAnimationFrame(loop); };
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
    resize(); start();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; if (visible) start(); });
    io.observe(c);
    const onVis = () => { visible = !document.hidden; if (visible) start(); };
    const onMove = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(() => { resize(); if (reduce) draw(0); }, 150); };
    const host = c.parentElement!;
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
      removeEventListener("resize", onResize); document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 size-full" />;
}
