import { NextResponse, type NextRequest } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";
import { enquirySchema } from "@/lib/enquiry-schema";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const { ok, retryAfter } = rateLimit(clientIp(req));
  if (!ok) {
    return NextResponse.json(
      { error: "You've sent a few enquiries already. Please try again a little later, or message us on WhatsApp." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend it worked so bots learn nothing.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const enquiry = parsed.data;

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("enquiries").insert({
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email,
      event_date: enquiry.eventDate,
      event_type: enquiry.eventType,
      vision: enquiry.vision,
    });
    if (error) {
      console.error("[enquiry] Supabase insert failed", error);
      return NextResponse.json(
        { error: "Sorry, we couldn't save your enquiry just now. Please try again or message us on WhatsApp." },
        { status: 500 },
      );
    }
  } else {
    console.warn("[enquiry] Supabase is not configured; enquiry not stored.", { name: enquiry.name });
  }

  try {
    await sendEnquiryEmail(enquiry);
  } catch (error) {
    // The enquiry is already saved, so don't fail the request over email.
    console.error("[enquiry] Email notification failed", error);
  }

  return NextResponse.json({ ok: true });
}
