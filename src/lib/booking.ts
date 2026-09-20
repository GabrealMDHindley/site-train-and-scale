// Shared booking domain types/constants. Real availability now comes live
// from the GoHighLevel calendar (see lib/ghl.ts) — this file no longer
// generates slots locally; it just holds the business timezone and the
// shapes both the client and server agree on.

export const BUSINESS_TIMEZONE = "America/Los_Angeles";
export const TIMEZONE_LABEL = "PT";

export type BookingDay = { iso: string; slots: string[] };
export type Availability = { days: BookingDay[]; slotMinutes: number };
