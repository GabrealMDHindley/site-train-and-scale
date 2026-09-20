// Native booking calendar — pure date logic shared by the booking form
// (client) and the /api/book route (server), so both agree on what counts
// as a valid day/time to submit. All times are the business's own Pacific
// timezone (Las Vegas, NV); this isn't a real conflict-checked scheduler —
// it's a lightweight request form until GoHighLevel's calendar takes over.

export const TIMEZONE_LABEL = "PT";
export const DAYS_SHOWN = 8;
const MAX_DAYS_AHEAD = 45;
const SLOT_HOURS = [9, 10, 11, 13, 14, 15, 16]; // 9am–5pm, minus the noon slot

export type DaySlot = { iso: string; label: string };

function formatSlotLabel(hour: number): string {
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const suffix = hour < 12 ? "AM" : "PM";
  return `${h12}:00 ${suffix}`;
}

export const TIME_SLOTS: string[] = SLOT_HOURS.map(formatSlotLabel);

function isWeekday(date: Date): boolean {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
}

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Next `count` weekdays starting tomorrow, as { iso, label } pairs. */
export function getAvailableDays(count: number = DAYS_SHOWN, from: Date = new Date()): DaySlot[] {
  const days: DaySlot[] = [];
  const cursor = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  cursor.setUTCDate(cursor.getUTCDate() + 1); // start tomorrow

  let guard = 0;
  while (days.length < count && guard < MAX_DAYS_AHEAD) {
    if (isWeekday(cursor)) {
      days.push({
        iso: toISODate(cursor),
        label: cursor.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        }),
      });
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    guard += 1;
  }
  return days;
}

/** Server-side check that a submitted date/time is one the calendar actually offered. */
export function isValidBookingSlot(dateIso: string, time: string): boolean {
  if (!TIME_SLOTS.includes(time)) return false;
  return getAvailableDays(DAYS_SHOWN).some((d) => d.iso === dateIso);
}
