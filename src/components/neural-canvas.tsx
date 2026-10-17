"use client";
import { useEffect, useRef } from "react";

/** Constelación neuronal: nodos que se conectan y reaccionan al mouse.
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
    type N = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let nodes: N[] = [];
    const resize = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / (w < 640 ? 14000 : 11000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8, hue: Math.random(),
      }));
    };
    const LINK = 130;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
          if (d < 160) { n.x += dx * 0.012; n.y += dy * 0.012; }
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
