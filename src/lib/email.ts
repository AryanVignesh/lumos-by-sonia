import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import type { EnquiryInput } from "./enquiry-schema";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Emails the owner about a new enquiry. Skips quietly when Resend isn't configured. */
export async function sendEnquiryEmail(enquiry: EnquiryInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_EMAIL || siteConfig.email;
  if (!apiKey) {
    console.info("[enquiry] RESEND_API_KEY not set, skipping email notification.");
    return { skipped: true as const };
  }

  const resend = new Resend(apiKey);
  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Phone", enquiry.phone],
    ["Email", enquiry.email],
    ["Event date", enquiry.eventDate],
    ["Event type", enquiry.eventType],
    ["Vision", enquiry.vision],
  ];
  const html = `
    <div style="font-family:Georgia,serif;color:#2c2e30;max-width:560px">
      <h2 style="color:#45573f;font-weight:normal">New enquiry from ${escape(enquiry.name)}</h2>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px 8px 0;color:#5f5e5a;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:8px 0;white-space:pre-wrap">${escape(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="font-family:Arial,sans-serif;font-size:13px;color:#5f5e5a;margin-top:24px">
        Reply to this email to respond directly, or
        <a href="https://wa.me/${enquiry.phone.replace(/\D/g, "")}">message them on WhatsApp</a>.
      </p>
    </div>`;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`,
    to,
    replyTo: enquiry.email,
    subject: `New ${enquiry.eventType.toLowerCase()} enquiry: ${enquiry.name}`,
    html,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
  });
  if (error) throw new Error(error.message);
  return { skipped: false as const };
}
