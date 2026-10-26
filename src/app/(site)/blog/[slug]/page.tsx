import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PortableTextBody } from "@/components/PortableTextBody";
import { SafeImage } from "@/components/SafeImage";
import { CtaBanner, formatDate } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { getPost, getPosts } from "@/lib/content";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: post.coverImage?.url ? [{ url: post.coverImage.url, alt: post.coverImage.alt }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          image: post.coverImage?.url,
          author: { "@type": "Person", name: siteConfig.ownerName },
          publisher: { "@type": "Organization", name: siteConfig.name },
        }}
      />
      <article>
        <header className="container-x max-w-3xl pt-16 text-center sm:pt-24">
          <Link href="/blog" className="eyebrow hover:text-sage-dark">
            ← The journal
          </Link>
          <h1 className="mt-6 text-4xl leading-tight sm:text-6xl">{post.title}</h1>
          <time dateTime={post.publishedAt} className="mt-6 block text-sm text-muted">
            {formatDate(post.publishedAt)}
          </time>
        </header>
        <div className="container-x mt-12 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden bg-linen">
            <SafeImage
              src={post.coverImage?.url}
              alt={post.coverImage?.alt || post.title}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="container-x max-w-2xl py-16 text-lg sm:py-20">
          <p className="font-serif text-2xl leading-relaxed text-sage-dark">{post.excerpt}</p>
          {post.body && <PortableTextBody value={post.body} />}
        </div>
      </article>
      <CtaBanner />
    </>
  );
}
