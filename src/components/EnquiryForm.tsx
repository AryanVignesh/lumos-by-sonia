"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { eventTypes, siteConfig, whatsappLink } from "@/config/site";
import { enquirySchema, todayISO, type EnquiryInput } from "@/lib/enquiry-schema";
import { WhatsAppIcon } from "./Icons";

type Status = { state: "idle" } | { state: "success"; name: string } | { state: "error"; message: string };

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", phone: "", email: "", eventDate: "", vision: "", website: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: EnquiryInput) => {
    setStatus({ state: "idle" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fieldErrors) {
          for (const [field, messages] of Object.entries(data.fieldErrors as Record<string, string[]>)) {
            if (messages?.[0]) setError(field as keyof EnquiryInput, { message: messages[0] });
          }
        }
        setStatus({ state: "error", message: data.error || "Something went wrong. Please try again." });
        return;
      }
      setStatus({ state: "success", name: values.name.split(" ")[0] });
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the server. Please check your connection and try again." });
    }
  };

  if (status.state === "success") {
    return (
      <div role="status" className="bg-linen p-10 text-center sm:p-16">
        <p className="eyebrow">Enquiry received</p>
        <h2 className="mt-4 text-4xl sm:text-5xl">Thank you, {status.name}!</h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
          We&rsquo;ve received your details and {siteConfig.ownerName} will be in touch within one working day. For a
          quicker reply, send us a message on WhatsApp.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#1f8f4e] text-white hover:bg-[#177a41]"
          >
            <WhatsAppIcon /> Chat on WhatsApp<span className="sr-only">(opens in a new tab)</span>
          </a>
          <Link href="/portfolio" className="btn-outline">
            Browse our portfolio
          </Link>
        </div>
      </div>
    );
  }

  const errorId = (field: keyof EnquiryInput) => (errors[field] ? `${field}-error` : undefined);
  const FieldError = ({ field }: { field: keyof EnquiryInput }) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm text-[#a33a2f]">
        {errors[field]?.message}
      </p>
    ) : null;
  const labelClass = "block text-xs font-medium uppercase tracking-[0.2em] text-charcoal";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      {status.state === "error" && (
        <div role="alert" className="border-l-2 border-[#a33a2f] bg-[#a33a2f]/5 px-5 py-4 text-sm text-[#7d2c24]">
          {status.message}
        </div>
      )}

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelClass}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="field"
            aria-invalid={!!errors.name}
            aria-describedby={errorId("name")}
            {...register("name")}
          />
          <FieldError field="name" />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            className="field"
            aria-invalid={!!errors.phone}
            aria-describedby={errorId("phone")}
            {...register("phone")}
          />
          <FieldError field="phone" />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="field"
            aria-invalid={!!errors.email}
            aria-describedby={errorId("email")}
            {...register("email")}
          />
          <FieldError field="email" />
        </div>

        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event date <span aria-hidden="true">*</span>
          </label>
          <input
            id="eventDate"
            type="date"
            min={todayISO()}
            className="field"
            aria-invalid={!!errors.eventDate}
            aria-describedby={errorId("eventDate")}
            {...register("eventDate")}
          />
          <FieldError field="eventDate" />
        </div>

        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event type <span aria-hidden="true">*</span>
          </label>
          <select
            id="eventType"
            className="field cursor-pointer"
            defaultValue=""
            aria-invalid={!!errors.eventType}
            aria-describedby={errorId("eventType")}
            {...register("eventType")}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError field="eventType" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="vision" className={labelClass}>
            Your vision <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="vision"
            rows={5}
            placeholder="Guest count, venue, colours, themes, inspiration… anything you'd like us to know."
            className="field resize-y"
            aria-invalid={!!errors.vision}
            aria-describedby={errorId("vision")}
            {...register("vision")}
          />
          <FieldError field="vision" />
        </div>
      </div>

      {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          <span aria-hidden="true">*</span> All fields are required.
        </p>
        <button type="submit" className="btn-primary min-w-48" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
