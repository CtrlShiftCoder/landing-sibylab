"use client";

import { useRef, useEffect } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap-animations";

export function GSAPHeroAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) return;

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          const badge = containerRef.current?.querySelector(".hero-badge");
          const h1 = containerRef.current?.querySelector(".hero-h1");
          const subtitle = containerRef.current?.querySelector(".hero-subtitle");
          const ctas = containerRef.current?.querySelector(".hero-ctas");
          const trust = containerRef.current?.querySelector(".hero-trust");
          const slogan = containerRef.current?.querySelector(".hero-slogan");
          const visual = containerRef.current?.querySelector(".hero-visual");
          const cards = containerRef.current?.querySelectorAll(".hero-card");

          if (!h1) return;

          document.fonts.ready.then(() => {
            const splitH1 = SplitText.create(h1, {
              type: "words,chars",
              linesClass: "split-line",
              mask: "lines",
            });

            const animateTargets = [subtitle, ctas, trust, slogan].filter(Boolean);
            if (cards && cards.length > 0) {
              animateTargets.push(...Array.from(cards));
            }

            gsap.set(animateTargets, {
              autoAlpha: 0,
              y: 30,
            });
            if (visual) {
              gsap.set(visual, { autoAlpha: 0, scale: 0.8 });
            }

            if (badge) {
              tl.from(badge, { autoAlpha: 0, scale: 0.9, duration: 0.6 }, 0);
            }

            tl.from(
              splitH1.chars,
              {
                autoAlpha: 0,
                y: 100,
                rotationX: -90,
                stagger: { each: 0.02, from: "start" },
                duration: 0.8,
                ease: "back.out(1.7)",
              },
              0.2
            );

            const textTargets = [subtitle, ctas, trust, slogan].filter(Boolean);
            if (textTargets.length > 0) {
              tl.to(textTargets, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0.6);
            }

            if (visual) {
              tl.to(visual, { autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.2)" }, 0.8);
            }

            if (cards && cards.length > 0) {
              tl.to(
                Array.from(cards),
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.8,
                  stagger: 0.2,
                  ease: "power2.out",
                },
                1
              );
            }
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="gsap-hero-container">
      {children}
    </div>
  );
}
