import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`} aria-label={`${siteConfig.name}, home`}>
      <Image
        src={variant === "light" ? "/brand/lumos-wordmark-light.png" : "/brand/lumos-wordmark.png"}
        alt={`${siteConfig.name} ${siteConfig.descriptor} logo`}
        width={580}
        height={312}
        priority
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  );
}
