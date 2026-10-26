"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image with a soft linen fallback, so a missing or broken photo never
 * leaves a broken-image icon on the page.
 */
type SafeImageProps = Omit<ImageProps, "src"> & { src?: string | null };

export function SafeImage({ src, alt, className, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-linen via-sand/50 to-mist/60 ${
          props.fill ? "absolute inset-0" : ""
        } ${className ?? ""}`}
        style={props.fill ? undefined : { width: props.width, height: props.height, maxWidth: "100%" }}
      >
        <span className="font-serif text-3xl italic text-sage/60">Lumos</span>
      </span>
    );
  }

  return <Image src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
