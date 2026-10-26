import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { NextResponse, type NextRequest } from "next/server";

type WebhookPayload = { _type?: string; slug?: string };

const pathsByType: Record<string, (slug?: string) => string[]> = {
  post: (slug) => ["/", "/blog", ...(slug ? [`/blog/${slug}`] : [])],
  portfolioEvent: (slug) => ["/", "/portfolio", ...(slug ? [`/portfolio/${slug}`] : [])],
  galleryImage: () => ["/", "/gallery"],
  testimonial: () => ["/", "/testimonials"],
};

/**
 * Sanity webhook → on-demand revalidation. Configure the webhook with the
 * projection `{_type, "slug": slug.current}` and the SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type" }, { status: 400 });
    }

    revalidateTag(body._type);
    const paths = pathsByType[body._type]?.(body.slug) ?? ["/"];
    paths.forEach((p) => revalidatePath(p));
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ revalidated: true, type: body._type, paths, now: Date.now() });
  } catch (error) {
    console.error("[revalidate]", error);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
