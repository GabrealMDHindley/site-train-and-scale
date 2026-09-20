import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";
import { TIMEZONE_LABEL } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Book a Call",
  description: "Pick a day and time to talk with Train & Scale — booked right on the site.",
};

export default function BookPage() {
  return (
    <section className="border-b border-white/5 px-6 pb-24 pt-40 sm:px-8 md:pb-32">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Book Your Call"
          title="Pick a day and time"
          description={`All times ${TIMEZONE_LABEL}. You'll get a confirmation the moment it's booked — no funnel, no redirect.`}
        />
        <Reveal className="mt-12 rounded-2xl border border-white/10 bg-surface p-7 sm:p-9" delay={0.1}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
