"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { galleryCategories } from "@/config/site";
import type { GalleryImage } from "@/lib/types";
import { SafeImage } from "./SafeImage";

const filters = ["All", ...galleryCategories] as const;

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const visible = filter === "All" ? images : images.filter((i) => i.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter photos by category" className="flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
              filter === f ? "border-sage bg-sage text-ivory" : "border-charcoal/20 text-charcoal hover:border-sage hover:text-sage"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} photos
      </p>

      {visible.length ? (
        <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {visible.map((g, i) => (
            <li key={g.id} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden bg-linen"
                aria-label={`Open photo: ${g.caption || g.image.alt || "event photo"}`}
              >
                <SafeImage
                  src={g.image.url}
                  alt={g.image.alt || g.caption || "Event photo"}
                  width={g.image.width || 1200}
                  height={g.image.height || 1500}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  placeholder={g.image.lqip ? "blur" : "empty"}
                  blurDataURL={g.image.lqip}
                />
                {g.caption && (
                  <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-charcoal/70 to-transparent p-4 text-left text-sm text-ivory transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                    {g.caption}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-center text-muted">No photos in this category yet.</p>
      )}

      {index !== null && visible[index] && (
        <Lightbox images={visible} index={index} onChange={setIndex} onClose={() => setIndex(null)} />
      )}
    </>
  );
}

function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: {
  images: GalleryImage[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const current = images[index];

  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialogRef.current) {
        // Keep focus inside the dialog.
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        touchStart.current = null;
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full text-3xl text-ivory hover:bg-ivory/10"
        aria-label="Close photo viewer"
      >
        ×
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-ivory hover:bg-ivory/10 sm:flex"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-ivory hover:bg-ivory/10 sm:flex"
            aria-label="Next photo"
          >
            ›
          </button>
        </>
      )}
      <figure className="flex max-h-full w-full max-w-5xl flex-col items-center">
        <div className="relative h-[75vh] w-full">
          <SafeImage
            key={current.id}
            src={current.image.url}
            alt={current.image.alt || current.caption || "Event photo"}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-4 text-center text-sm text-ivory/85">
          {current.caption && <span className="font-serif text-lg italic text-ivory">{current.caption} · </span>}
          {index + 1} / {images.length}
        </figcaption>
      </figure>
    </div>
  );
}
