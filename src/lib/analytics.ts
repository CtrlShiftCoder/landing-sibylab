"use client";

import posthog from "posthog-js";

type Props = Record<string, string | number | boolean | undefined>;

/** Captura evento de marketing/lead. No-op si PostHog no está inicializado. */
export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  try {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    posthog.capture(event, props);
  } catch {
    /* ignore */
  }
}

export { LeadEvents } from "@/lib/lead-events";
