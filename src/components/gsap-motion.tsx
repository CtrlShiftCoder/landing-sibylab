"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/components/i18n-provider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Page-level GSAP: hero timeline, scroll reveals, parallax, counters. */
export function GsapMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { locale } = useI18n();

  useGSAP(
    () => {
      document.documentElement.classList.add("gsap-ready");

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMotion: "(prefers-reduced-motion: no-preference)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const reduce = Boolean(context.conditions?.reduceMotion);

          const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
          const heads = gsap.utils.toArray<HTMLElement>(".gsap-head");
          const steps = gsap.utils.toArray<HTMLElement>(".gsap-step");
          const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
          const midCta = document.querySelector<HTMLElement>(".gsap-mid-cta");
          const heroVisual = document.querySelector<HTMLElement>(".gsap-hero-visual");
          const heroFloats = gsap.utils.toArray<HTMLElement>(".gsap-hero-float");
          const gridBgs = gsap.utils.toArray<HTMLElement>(".grid-bg");

          if (reduce) {
            gsap.set(
              [
                ".gsap-hero-badge",
                ".gsap-hero-line",
                ".gsap-hero-sub",
                ".gsap-hero-cta",
                ".gsap-hero-trust",
                ".gsap-hero-slogan",
                ".gsap-hero-visual",
                ".gsap-hero-float",
                ".reveal",
                ".gsap-head",
                ".gsap-step",
                ".gsap-mid-cta",
              ],
              { clearProps: "all" },
            );
            counters.forEach((node) => {
              const to = Number(node.dataset.count);
              const pre = node.dataset.prefix ?? "";
              if (!Number.isNaN(to)) node.textContent = pre + to;
            });
            return;
          }

          gsap.set(reveals, { autoAlpha: 0, y: 36, filter: "blur(10px)" });
          gsap.set(heads, { autoAlpha: 0, y: 28 });
          gsap.set(steps, { autoAlpha: 0, y: 24, scale: 0.92 });
          if (midCta) gsap.set(midCta, { autoAlpha: 0, y: 20 });

          const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
          hero
            .from(".gsap-hero-badge", { autoAlpha: 0, y: 20, duration: 0.65 })
            .from(".gsap-hero-line", { autoAlpha: 0, y: 42, duration: 0.9, stagger: 0.1 }, "-=0.35")
            .from(".gsap-hero-sub", { autoAlpha: 0, y: 24, duration: 0.7 }, "-=0.45")
            .from(".gsap-hero-cta", { autoAlpha: 0, y: 18, duration: 0.55, stagger: 0.08 }, "-=0.35")
            .from(".gsap-hero-trust", { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.06 }, "-=0.25")
            .from(".gsap-hero-slogan", { autoAlpha: 0, y: 10, duration: 0.45 }, "-=0.2")
            .from(
              ".gsap-hero-visual",
              { autoAlpha: 0, scale: 0.88, duration: 1.05, ease: "power2.out" },
              "-=0.95",
            )
            .from(
              ".gsap-hero-float",
              { autoAlpha: 0, y: 28, scale: 0.94, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" },
              "-=0.55",
            )
            .add(() => {
              heroFloats.forEach((float, i) => {
                gsap.to(float, {
                  y: i % 2 === 0 ? -12 : 10,
                  duration: 3.6 + i * 0.4,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                  delay: 0.2 * i,
                });
              });
            });

          if (heroVisual) {
            gsap.to(heroVisual, {
              yPercent: 14,
              ease: "none",
              scrollTrigger: {
                trigger: "#inicio",
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }

          gridBgs.forEach((bg) => {
            const trigger = bg.parentElement ?? bg;
            gsap.fromTo(
              bg,
              { backgroundPosition: "0px 0px" },
              {
                backgroundPosition: "56px 56px",
                ease: "none",
                scrollTrigger: {
                  trigger,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });

          ScrollTrigger.batch(reveals, {
            start: "top 88%",
            once: true,
            interval: 0.12,
            batchMax: 6,
            onEnter: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.85,
                stagger: 0.1,
                ease: "power3.out",
                overwrite: "auto",
              });
            },
          });

          // Safety: never leave content hidden if ST missed (fonts/layout)
          const safety = window.setTimeout(() => {
            reveals.forEach((node) => {
              if (Number(gsap.getProperty(node, "autoAlpha")) < 1) {
                gsap.set(node, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
              }
            });
            heads.forEach((node) => {
              if (Number(gsap.getProperty(node, "autoAlpha")) < 1) {
                gsap.set(node, { autoAlpha: 1, y: 0 });
              }
            });
          }, 2800);

          heads.forEach((head) => {
            gsap.to(head, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: head,
                start: "top 86%",
                once: true,
              },
            });
          });

          if (steps.length) {
            gsap.to(steps, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.09,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: "#proceso",
                start: "top 70%",
                once: true,
              },
            });
          }

          if (midCta) {
            gsap.to(midCta, {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: midCta,
                start: "top 80%",
                once: true,
              },
            });
          }

          counters.forEach((node) => {
            const to = Number(node.dataset.count);
            const pre = node.dataset.prefix ?? "";
            if (Number.isNaN(to)) return;
            const state = { value: 0 };
            ScrollTrigger.create({
              trigger: node,
              start: "top 85%",
              once: true,
              onEnter: () => {
                gsap.to(state, {
                  value: to,
                  duration: 1.6,
                  ease: "power3.out",
                  onUpdate: () => {
                    node.textContent = pre + Math.round(state.value);
                  },
                });
              },
            });
          });

          const chips = gsap.utils.toArray<HTMLElement>("#experiencia .reveal");
          if (chips.length) {
            ScrollTrigger.create({
              trigger: "#experiencia",
              start: "top 75%",
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  chips,
                  { x: 18 },
                  { x: 0, duration: 0.7, stagger: 0.04, ease: "power2.out", delay: 0.15 },
                );
              },
            });
          }

          return () => {
            window.clearTimeout(safety);
          };
        },
      );

      return () => {
        mm.revert();
        document.documentElement.classList.remove("gsap-ready");
      };
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return <div ref={root}>{children}</div>;
}
