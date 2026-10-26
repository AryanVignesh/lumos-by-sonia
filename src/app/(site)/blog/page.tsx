import type { Metadata } from "next";
import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CtaBanner, PageHeader, formatDate } from "@/components/ui";
import { getPosts } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Journal",
  description: "Recent work, projects in progress and event ideas from Lumos by Sonia.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHeader eyebrow="The journal" title="Notes from the studio" intro="Recent celebrations, projects in progress and ideas for your own event." />
      <section className="container-x py-20 sm:py-28">
        {posts.length ? (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <article key={post.slug} data-reveal className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-linen">
                    <SafeImage
                      src={post.coverImage?.url}
                      alt={post.coverImage?.alt || post.title}
                      fill
                      priority={i < 3}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <time dateTime={post.publishedAt} className="eyebrow mt-6 block">
                    {formatDate(post.publishedAt)}
                  </time>
                  <h2 className="mt-3 text-3xl leading-tight transition-colors group-hover:text-sage">{post.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <span className="mt-4 inline-block border-b border-sage pb-0.5 text-xs uppercase tracking-[0.2em] text-sage">
                    Read more
                  </span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Our first post is coming soon.</p>
        )}
      </section>
      <CtaBanner />
    </>
  );
}
