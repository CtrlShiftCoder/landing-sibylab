"use client";
import { useEffect } from "react";
import { useI18n } from "@/components/i18n-provider";

const GLYPHS = "01<>/{}[]#$%&*+=ΣΔΨ∞";

function isInView(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight * 0.95 && r.bottom > -40;
}

/** Efectos globales: spotlight, scramble, eye tracking. Reveals/contadores viven en GSAP. */
export function Effects() {
  const { locale } = useI18n();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("js");
    const cleanups: (() => void)[] = [];
    const rafs: number[] = [];

    // Scramble
    const scramble = (el: HTMLElement) => {
      const final = el.dataset.scramble ?? el.textContent ?? "";
      if (reduce) {
        el.textContent = final;
        return;
      }
      let frame = 0;
      const total = Math.max(12, final.length * 2 + 12);
      let cancelled = false;
      const tick = () => {
        if (cancelled) return;
        try {
          el.textContent = final
            .split("")
            .map((ch, i) =>
              ch === " " || frame / 2 > i + 6 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0],
            )
            .join("");
          if (++frame <= total) rafs.push(requestAnimationFrame(tick));
          else el.textContent = final;
        } catch {
          el.textContent = final;
        }
      };
      rafs.push(requestAnimationFrame(tick));
      return () => {
        cancelled = true;
        el.textContent = final;
      };
    };
    const scrambleCleanups: (() => void)[] = [];
    const sio = new IntersectionObserver((es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        sio.unobserve(e.target);
        const stop = scramble(e.target as HTMLElement);
        if (stop) scrambleCleanups.push(stop);
      }),
    );
    document.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el) => {
      if (isInView(el)) {
        const stop = scramble(el);
        if (stop) scrambleCleanups.push(stop);
      } else {
        sio.observe(el);
      }
    });
    cleanups.push(() => {
      sio.disconnect();
      scrambleCleanups.forEach((f) => f());
    });

    if (!reduce && matchMedia("(pointer: fine)").matches) {
      const eyes = document.querySelectorAll<HTMLElement>("[data-eye]");
      let raf = 0;
      let lx = 0;
      let ly = 0;
      const onMove = (e: PointerEvent) => {
        const card = (e.target as Element).closest?.<HTMLElement>(".spot");
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        lx = e.clientX;
        ly = e.clientY;
        if (!raf)
          raf = requestAnimationFrame(() => {
            raf = 0;
            eyes.forEach((eye) => {
              const r = eye.getBoundingClientRect();
              const cx = r.left + r.width / 2;
              const cy = r.top + r.height / 2;
              const a = Math.atan2(ly - cy, lx - cx);
              const d = Math.min(1, Math.hypot(lx - cx, ly - cy) / 400) * 9;
              eye.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`;
            });
          });
      };
      addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => {
        removeEventListener("pointermove", onMove);
        if (raf) cancelAnimationFrame(raf);
      });
    }

    return () => {
      rafs.forEach((id) => cancelAnimationFrame(id));
      cleanups.forEach((f) => f());
    };
  }, [locale]);

  return null;
}
