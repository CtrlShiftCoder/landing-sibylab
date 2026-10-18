import Image from "next/image";

interface SibylabLogoProps {
  className?: string;
  size?: number;
}

/** Logo oficial Sibylab (`/brand/logo.png`). */
export function SibylabLogo({ className = "", size = 32 }: SibylabLogoProps) {
  return (
    <Image
      src="/brand/logo.png"
      alt="Sibylab"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
    />
  );
}
