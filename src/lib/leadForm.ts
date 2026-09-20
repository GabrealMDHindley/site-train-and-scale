// Shared shape for both lead-capture forms (the contact page's message form
// and the booking calendar) so the qualifying question stays in sync and
// the API routes validate against the same allowed values.

export const BUSINESS_STATUS_OPTIONS = [
  { value: "has_business", label: "I already run a business" },
  { value: "starting", label: "I'm looking to get started" },
] as const;

export type BusinessStatus = (typeof BUSINESS_STATUS_OPTIONS)[number]["value"];

export function isBusinessStatus(value: unknown): value is BusinessStatus {
  return BUSINESS_STATUS_OPTIONS.some((opt) => opt.value === value);
}
