import { permanentRedirect } from "next/navigation";

// Booking a call is the only way to reach Train & Scale — the old message
// form is gone, and any inbound /contact link lands on the calendar.
export default function ContactPage() {
  permanentRedirect("/book");
}
