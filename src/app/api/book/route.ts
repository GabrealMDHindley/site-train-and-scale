import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { isValidBookingSlot } from "@/lib/booking";
import { isBusinessStatus } from "@/lib/leadForm";

type BookingPayload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  businessStatus?: unknown;
  message?: unknown;
  date?: unknown;
  time?: unknown;
};

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.slice(0, max).trim() : "";
}

export async function POST(request: Request) {
  let body: BookingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const firstName = clean(body.firstName, 60);
  const lastName = clean(body.lastName, 60);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const businessStatus = clean(body.businessStatus, 20);
  const message = clean(body.message, 2000);
  const date = clean(body.date, 10);
  const time = clean(body.time, 20);

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !isBusinessStatus(businessStatus) ||
    !date ||
    !time
  ) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }
  if (!isValidBookingSlot(date, time)) {
    return NextResponse.json({ ok: false, reason: "invalid_slot" }, { status: 400 });
  }

  // Best-effort forward to GoHighLevel once the client sets CRM_WEBHOOK_URL.
  // The booking itself must succeed either way — the calendar has to work
  // standalone before that webhook exists.
  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          businessStatus,
          message,
          date,
          time,
          source: "trainandscale.com/book",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Swallow — GHL forwarding is best-effort; the booking still stands.
    }
  }

  const res = NextResponse.json({ ok: true });
  // Gates /confirmation: only a request that just booked through this route
  // carries this cookie, so the page can't be reached by guessing the URL.
  res.cookies.set("ts_booked", randomUUID(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 1800,
  });
  return res;
}
