import { z } from "zod";
import { eventTypes, siteConfig } from "@/config/site";

/** Today's date (YYYY-MM-DD) in the business's time zone. */
export function todayISO(timeZone: string = siteConfig.timeZone) {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(),
  );
}

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100, "That name is a little long."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number."),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose your event date.")
    .refine((d) => d >= todayISO(), "Please choose a date in the future."),
  eventType: z.enum(eventTypes, { errorMap: () => ({ message: "Please choose the type of event." }) }),
  vision: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your vision (at least 10 characters).")
    .max(3000, "Please keep this under 3000 characters."),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
