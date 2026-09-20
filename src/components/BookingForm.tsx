"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/data/site";
import { getAvailableDays, TIME_SLOTS, TIMEZONE_LABEL } from "@/lib/booking";

type Status = "idle" | "sending" | "error";

export default function BookingForm() {
  const router = useRouter();
  const days = useMemo(() => getAvailableDays(), []);
  const [dayIso, setDayIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!dayIso || !time) {
      setStatus("error");
      setErrorMsg("Pick a day and a time before booking.");
      return;
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, date: dayIso, time }),
      });
      if (res.ok) {
        router.push("/confirmation");
        return;
      }
      setStatus("error");
      setErrorMsg("Something went wrong booking that slot.");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong booking that slot.");
    }
  }

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    "Booking request from trainandscale.com"
  )}`;

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-ink-dim">Pick a day</p>
        <div className="flex flex-wrap gap-2">
          {days.map((d) => (
            <button
              key={d.iso}
              type="button"
              onClick={() => {
                setDayIso(d.iso);
                setTime(null);
              }}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                dayIso === d.iso
                  ? "border-accent bg-accent text-ground"
                  : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
              }`}
              aria-pressed={dayIso === d.iso}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-ink-dim">
          Pick a time ({TIMEZONE_LABEL})
        </p>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              type="button"
              disabled={!dayIso}
              onClick={() => setTime(t)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                time === t
                  ? "border-accent bg-accent text-ground"
                  : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
              }`}
              aria-pressed={time === t}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-wide text-ink-dim">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent-deep"
          />
        </div>
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
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-xs uppercase tracking-wide text-ink-dim">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent-deep"
        />
      </div>
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
        {status === "sending" ? "Booking…" : "Confirm Booking"}
        <span aria-hidden="true">&rarr;</span>
      </button>

      {status === "error" && (
        <p className="pt-2 text-sm text-ink-dim">
          {errorMsg}{" "}
          <a href={mailtoHref} className="text-accent underline">
            Email us directly
          </a>{" "}
          and we&rsquo;ll get it scheduled.
        </p>
      )}
    </form>
  );
}
