"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-animations";

export function GSAPScrollAnimations({ children }: { children: React.ReactNode }) {
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

          const duration = reduceMotion ? 0 : isDesktop ? 0.8 : 0.6;
          const distance = reduceMotion ? 0 : 60;

          ScrollTrigger.batch(".reveal", {
            onEnter: (elements) => {
              gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                stagger: 0.15,
                duration,
                ease: "power2.out",
                overwrite: true,
              });
            },
            start: "top 85%",
            once: true,
          });

          ScrollTrigger.batch(".card-light, .glass", {
            onEnter: (elements) => {
              gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                stagger: 0.1,
                duration,
                ease: "back.out(1.2)",
                overwrite: true,
              });
            },
            start: "top 85%",
            once: true,
          });

          const pinSection = containerRef.current?.querySelector("#diferencia");
          if (pinSection && isDesktop && !reduceMotion) {
            const pillars = pinSection.querySelectorAll("li");
            const pillarTl = gsap.timeline({
              scrollTrigger: {
                trigger: pinSection,
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 1,
              },
            });

            pillarTl.from(pillars, {
              autoAlpha: 0,
              scale: 0.8,
              y: 100,
              stagger: 0.1,
              duration: 1,
              ease: "power2.out",
            });
          }

          const processSteps = containerRef.current?.querySelectorAll("#proceso .step-node");
          if (processSteps && processSteps.length > 0 && !reduceMotion) {
            gsap.from(processSteps, {
              scale: 0,
              rotation: 180,
              stagger: 0.15,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: "#proceso",
                start: "top 70%",
                once: true,
              },
            });
          }

          const stats = containerRef.current?.querySelector('[data-count="15"]');
          if (stats && !reduceMotion) {
            ScrollTrigger.create({
              trigger: stats,
              start: "top 80%",
              once: true,
              onEnter: () => {
                gsap.from(stats, {
                  textContent: 0,
                  duration: 2,
                  ease: "power1.out",
                  snap: { textContent: 1 },
                  onUpdate: function () {
                    const val = Math.floor(this.targets()[0].textContent);
                    stats.textContent = `+${val}`;
                  },
                });
              },
            });
          }
        }
      );

      gsap.set(".reveal", { autoAlpha: 0, y: 60 });
      gsap.set(".card-light, .glass", { autoAlpha: 1 });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="gsap-scroll-container">
      {children}
    </div>
  );
}
