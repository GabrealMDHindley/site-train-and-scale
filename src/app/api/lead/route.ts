import { NextResponse } from "next/server";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.slice(0, max).trim() : "";
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 2000);

  if (!name || !email) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }

  const webhook = process.env.CRM_WEBHOOK_URL;
  if (!webhook) {
    // GoHighLevel webhook not yet configured in this Vercel project.
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
        source: "trainandscale.com/contact",
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, reason: "webhook_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "webhook_error" }, { status: 502 });
  }
}
