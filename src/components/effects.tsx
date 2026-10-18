"use client";
import { useEffect } from "react";
import { useI18n } from "@/components/i18n-provider";

const GLYPHS = "01<>/{}[]#$%&*+=ΣΔΨ∞";

function isInView(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight * 0.95 && r.bottom > -40;
}

function revealAllVisible(reveals: NodeListOf<HTMLElement>, io: IntersectionObserver, reduce: boolean) {
  reveals.forEach((el) => {
    if (el.classList.contains("in")) {
      el.removeAttribute("data-reveal-pending");
      return;
    }
    if (reduce || isInView(el)) {
      el.classList.add("in");
      el.removeAttribute("data-reveal-pending");
    } else {
      el.setAttribute("data-reveal-pending", "1");
      io.observe(el);
    }
  });
}

/** Efectos globales: reveal, spotlight, contador, scramble. Se re-enlazan al cambiar idioma. */
export function Effects() {
  const { locale } = useI18n();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("js");
    const cleanups: (() => void)[] = [];
    const rafs: number[] = [];

    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    reveals.forEach((el) => {
      const sibs = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"))
        : [];
      el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 6) * 90}ms`;
    });

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          el.removeAttribute("data-reveal-pending");
          io.unobserve(el);
        }),
      { rootMargin: "80px 0px 80px 0px", threshold: 0 },
    );

    revealAllVisible(reveals, io, reduce);
    // Re-check after layout/fonts (evita cajas invisibles en secciones largas)
    const t1 = window.setTimeout(() => revealAllVisible(document.querySelectorAll<HTMLElement>(".reveal"), io, reduce), 150);
    const t2 = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.reveal[data-reveal-pending="1"]').forEach((el) => {
        if (isInView(el)) {
          el.classList.add("in");
          el.removeAttribute("data-reveal-pending");
        }
      });
    }, 600);
    // Safety: nunca dejar contenido oculto más de 2.5s
    const t3 = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        el.classList.add("in");
        el.removeAttribute("data-reveal-pending");
      });
    }, 2500);

    cleanups.push(() => {
      io.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    });

    // Contadores
    const cio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          cio.unobserve(el);
          const to = Number(el.dataset.count);
          const pre = el.dataset.prefix ?? "";
          if (reduce || Number.isNaN(to)) {
            el.textContent = pre + (Number.isNaN(to) ? "" : to);
            return;
          }
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / 1600);
            el.textContent = pre + Math.round(to * (1 - Math.pow(1 - p, 3)));
            if (p < 1) rafs.push(requestAnimationFrame(step));
          };
          rafs.push(requestAnimationFrame(step));
        }),
      { threshold: 0.4 },
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      if (isInView(el)) {
        const to = Number(el.dataset.count);
        const pre = el.dataset.prefix ?? "";
        el.textContent = pre + (Number.isNaN(to) ? "" : to);
      } else {
        cio.observe(el);
      }
    });
    cleanups.push(() => cio.disconnect());

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
