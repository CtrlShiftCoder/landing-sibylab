"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-animations";

export function GSAPHoverEffects({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = containerRef.current?.querySelectorAll(".card-light, .glass");
      const buttons = containerRef.current?.querySelectorAll('a[class*="btn"], button');

      cards?.forEach((card) => {
        const xTo = gsap.quickTo(card, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(card, "y", { duration: 0.4, ease: "power3" });
        const rotateTo = gsap.quickTo(card, "rotation", { duration: 0.6, ease: "power3" });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, x: 0, y: 0, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });

        card.addEventListener("mousemove", (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = (card as HTMLElement).getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (mouseEvent.clientX - centerX) / rect.width;
          const deltaY = (mouseEvent.clientY - centerY) / rect.height;

          xTo(deltaX * 10);
          yTo(deltaY * 10);
          rotateTo(deltaX * 2);
        });
      });

      buttons?.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, { scale: 1.05, duration: 0.3, ease: "back.out(2)" });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="gsap-hover-container">
      {children}
    </div>
  );
}
