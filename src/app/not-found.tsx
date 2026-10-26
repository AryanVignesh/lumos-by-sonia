import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative flex min-h-[70svh] items-center overflow-hidden bg-linen">
        <div aria-hidden="true" className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-mist/60 blur-2xl" />
        <div aria-hidden="true" className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-sand/60 blur-2xl" />
        <div className="container-x relative py-24 text-center">
          <p className="eyebrow">Page not found</p>
          <h1 className="mt-4 font-serif text-[7rem] leading-none text-sage sm:text-[10rem]">404</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted">
            This page seems to have wandered off before the party started. Let&rsquo;s get you back.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <Link href="/portfolio" className="btn-outline">
              View Portfolio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
