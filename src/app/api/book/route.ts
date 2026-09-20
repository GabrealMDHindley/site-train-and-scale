import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  getAvailability,
  upsertContact,
  createAppointment,
  ghlConfigured,
  GhlApiError,
  GhlConfigError,
} from "@/lib/ghl";
import { BUSINESS_STATUS_OPTIONS, isBusinessStatus } from "@/lib/leadForm";

type BookingPayload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  businessStatus?: unknown;
  message?: unknown;
  startTime?: unknown;
};

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.slice(0, max).trim() : "";
}

export async function POST(request: Request) {
  if (!ghlConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

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
  const startTime = clean(body.startTime, 40);

  if (!firstName || !lastName || !email || !phone || !isBusinessStatus(businessStatus) || !startTime) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }

  try {
    // Re-check live availability right before booking — closes the race
    // window between the page loading and the visitor submitting, and is
    // what actually prevents two people booking the same slot (GHL itself
    // is the single source of truth here, not anything cached client-side).
    const availability = await getAvailability();
    const stillFree = availability.days.some((d) => d.slots.includes(startTime));
    if (!stillFree) {
      return NextResponse.json({ ok: false, reason: "slot_taken" }, { status: 409 });
    }

    const businessStatusLabel =
      BUSINESS_STATUS_OPTIONS.find((opt) => opt.value === businessStatus)?.label ?? businessStatus;

    const contactId = await upsertContact({
      firstName,
      lastName,
      email,
      phone,
      businessStatusLabel,
      message,
    });

    await createAppointment({
      contactId,
      startTime,
      slotMinutes: availability.slotMinutes,
      title: `Discovery Call — ${firstName} ${lastName}`,
    });
  } catch (err) {
    console.error("POST /api/book failed:", err);
    if (err instanceof GhlConfigError) {
      return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
    }
    if (err instanceof GhlApiError) {
      return NextResponse.json({ ok: false, reason: "ghl_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: false, reason: "unknown_error" }, { status: 500 });
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
