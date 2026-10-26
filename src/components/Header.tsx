"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/config/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled || open ? "bg-ivory/95 shadow-[0_1px_0_rgba(44,46,48,0.08)] backdrop-blur" : "bg-ivory"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <div className="container-x flex h-20 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative py-2 text-[0.8rem] uppercase tracking-[0.18em] transition-colors hover:text-sage after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-sage after:transition-transform after:duration-300 ${
                      isActive(item.href)
                        ? "text-sage after:scale-x-100"
                        : "text-charcoal after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/enquire" className="btn-primary hidden sm:inline-flex">
              Get in Touch
            </Link>
            <button
              type="button"
              className="relative h-11 w-11 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`absolute left-2.5 right-2.5 top-[15px] h-px bg-charcoal transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-2.5 right-2.5 top-[22px] h-px bg-charcoal transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-2.5 right-2.5 top-[29px] h-px bg-charcoal transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-ivory transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between py-10">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-2 font-serif text-4xl ${isActive(item.href) ? "text-sage italic" : "text-charcoal"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/enquire" className="btn-primary w-full">
            Get in Touch
          </Link>
        </nav>
      </div>
    </>
  );
}
