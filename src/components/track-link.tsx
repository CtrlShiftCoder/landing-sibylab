"use client";

import { track } from "@/lib/analytics";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  eventProps?: Record<string, string | number | boolean | undefined>;
};

/** Link que dispara un evento de analytics al hacer click. */
export function TrackLink({ event, eventProps, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
