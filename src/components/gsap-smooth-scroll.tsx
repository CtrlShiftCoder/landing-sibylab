"use client";

import { useEffect } from "react";
import { gsap, ScrollToPlugin } from "@/lib/gsap-animations";

export function GSAPSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const links = document.querySelectorAll('a[href^="#"]');

      const handleClick = (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const targetId = target.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetEl,
            offsetY: 80,
          },
          ease: "power3.inOut",
        });
      };

      links.forEach((link) => {
        link.addEventListener("click", handleClick);
      });

      return () => {
        links.forEach((link) => {
          link.removeEventListener("click", handleClick);
        });
      };
    });
  }, []);

  return null;
}
