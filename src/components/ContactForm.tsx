"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { BUSINESS_STATUS_OPTIONS } from "@/lib/leadForm";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (body?.reason === "not_configured") {
        setStatus("fallback");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    "New inquiry from trainandscale.com"
  )}`;

  if (status === "sent") {
    return (
      <p className="rounded-xl border border-accent-deep/30 bg-accent-deep/10 p-6 text-sm text-ink">
        Thanks — we&rsquo;ve got your message and will be in touch shortly. If it&rsquo;s
        urgent, book a call directly instead.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-xs uppercase tracking-wide text-ink-dim">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent-deep"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-xs uppercase tracking-wide text-ink-dim">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent-deep"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-wide text-ink-dim">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent-deep"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs uppercase tracking-wide text-ink-dim">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent-deep"
          />
        </div>
      </div>
      <fieldset>
        <legend className="mb-2 text-xs uppercase tracking-wide text-ink-dim">
          Do you currently run a marketing, consulting, or coaching business?
        </legend>
        <div className="space-y-2">
          {BUSINESS_STATUS_OPTIONS.map((opt, i) => (
            <label key={opt.value} className="flex items-center gap-2.5 text-sm text-ink">
              <input
                type="radio"
                name="businessStatus"
                value={opt.value}
                required={i === 0}
                className="form-radio"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-wide text-ink-dim">
          What are you looking to scale?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent-deep"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ground transition hover:bg-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {status === "fallback" && (
        <p className="pt-2 text-sm text-ink-dim">
          Our inbox isn&rsquo;t wired up here yet — please{" "}
          <a href={mailtoHref} className="text-accent underline">
            email us directly
          </a>{" "}
          instead and we&rsquo;ll reply personally.
        </p>
      )}
      {status === "error" && (
        <p className="pt-2 text-sm text-ink-dim">
          Something went wrong sending that.{" "}
          <a href={mailtoHref} className="text-accent underline">
            Email us directly
          </a>{" "}
          and we&rsquo;ll get right back to you.
        </p>
      )}
    </form>
  );
}
