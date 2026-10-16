"use client";
import { useEffect } from "react";

const GLYPHS = "01<>/{}[]#$%&*+=ΣΔΨ∞";

/** Efectos globales livianos (un solo componente, sin dependencias):
 *  reveal escalonado con blur, spotlight en tarjetas, contador, texto "decodificado" y ojo que sigue el cursor. */
export function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("js");
    const cleanups: (() => void)[] = [];

    // Reveal escalonado
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    reveals.forEach((el) => {
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal")) : [];
      el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 6) * 90}ms`;
    });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    reveals.forEach((el) => (reduce ? el.classList.add("in") : io.observe(el)));
    cleanups.push(() => io.disconnect());

    // Contadores
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement; cio.unobserve(el);
      const to = Number(el.dataset.count); const pre = el.dataset.prefix ?? "";
      if (reduce) { el.textContent = pre + to; return; }
      const t0 = performance.now();
      const step = (t: number) => { const p = Math.min(1, (t - t0) / 1600); el.textContent = pre + Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: 0.6 });
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));
    cleanups.push(() => cio.disconnect());

    // Texto decodificado (scramble)
    const scramble = (el: HTMLElement) => {
      const final = el.dataset.scramble ?? el.textContent ?? "";
      if (reduce) { el.textContent = final; return; }
      let frame = 0; const total = final.length * 2 + 12;
      const tick = () => {
        el.textContent = final.split("").map((ch, i) => (ch === " " || frame / 2 > i + 6 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
        if (++frame <= total) requestAnimationFrame(tick); else el.textContent = final;
      };
      tick();
    };
    const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { sio.unobserve(e.target); scramble(e.target as HTMLElement); } }));
    document.querySelectorAll("[data-scramble]").forEach((el) => sio.observe(el));
    cleanups.push(() => sio.disconnect());

    if (!reduce && matchMedia("(pointer: fine)").matches) {
      // Spotlight + ojo
      const eyes = document.querySelectorAll<HTMLElement>("[data-eye]");
      let raf = 0, lx = 0, ly = 0;
      const onMove = (e: PointerEvent) => {
        const card = (e.target as Element).closest?.<HTMLElement>(".spot");
        if (card) { const r = card.getBoundingClientRect(); card.style.setProperty("--mx", `${e.clientX - r.left}px`); card.style.setProperty("--my", `${e.clientY - r.top}px`); }
        lx = e.clientX; ly = e.clientY;
        if (!raf) raf = requestAnimationFrame(() => {
          raf = 0;
          eyes.forEach((eye) => {
            const r = eye.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            const a = Math.atan2(ly - cy, lx - cx); const d = Math.min(1, Math.hypot(lx - cx, ly - cy) / 400) * 9;
            eye.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`;
          });
        });
      };
      addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => removeEventListener("pointermove", onMove));
    }
    return () => cleanups.forEach((f) => f());
  }, []);
  return null;
}
