// Central content data — every string here is sourced from the client's real
// service agreements, Client Result Timelines, or their own live funnel copy.
// No dollar/compensation figures appear anywhere in this file (client instruction).

export const site = {
  name: "Train & Scale",
  legalName: "Train & Scale LLC",
  tagline: "Done-for-you client acquisition for high-ticket agencies, coaches, and consultants.",
  mission: "Helping high-ticket agencies, coaches, and consultants scale effortlessly.",
  email: "gabreal@trainandscale.com",
  address: {
    line1: "304 S. Jones Blvd PMB 7597",
    city: "Las Vegas",
    state: "NV",
    zip: "89107",
    full: "304 S. Jones Blvd PMB 7597, Las Vegas, NV 89107",
  },
  funnel: {
    landing: "https://www.trainandscale.com/grownow",
    booking: "https://www.trainandscale.com/bookrightnow",
    confirmation: "https://www.trainandscale.com/consultationconfirmed",
  },
  url: "https://trainandscale.com",
} as const;

export type Stat = {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { target: 72, suffix: "hr", label: "To Your CRM + Funnel Live" },
  { target: 30, label: "Pieces Of Content Every 30 Days" },
  { target: 90, label: "Day Guarantee Window" },
  { target: 30, prefix: "$", suffix: "K", label: "Guaranteed In New Sales" },
];

export const guarantee = {
  headline: "We guarantee $30,000 in new sales — organically — within 90 days.",
  sub: "Or you get a full refund, including processing fees. That's how confident we are in the system.",
  disclaimer:
    "Guarantee applies to the organic 90-day track and is conditioned on completing the outreach, sales-call, and tracking requirements outlined in your service agreement.",
} as const;

export type TimelinePhase = {
  label: string;
  days: string;
  items: string[];
};

export const timelines: { organic: TimelinePhase[]; paidAds: TimelinePhase[] } = {
  organic: [
    {
      label: "Onboarding",
      days: "Day 1",
      items: [
        "Pick your niche",
        "Structure your offer",
        "Craft your guarantee",
        "Craft your value statement",
        "Collect your logo & login access",
        "Start posting content",
      ],
    },
    {
      label: "Build-Out",
      days: "Day 2",
      items: [
        "Build your CRM & lead-gen funnel",
        "Fix backlinks, forms, calendars & opportunities",
        "Craft SMS & email automations",
        "Update your LinkedIn company presence",
        "Script your VSL and confirmation video",
      ],
    },
    {
      label: "Review",
      days: "Day 3 — Call #2",
      items: [
        "Review raw VSL recording",
        "Review raw confirmation-video recording",
        "Pass videos to the editing team",
      ],
    },
    {
      label: "Launch",
      days: "Day 3 – 10",
      items: [
        "Train your appointment setter on your offer",
        "Train your closer on your offer",
        "Launch every messaging sequence",
      ],
    },
    {
      label: "Ongoing Management",
      days: "Day 10 – 90",
      items: [
        "Start generating sales",
        "1–3 weekly check-in calls",
        "Weekly group training for closers & setters",
        "Daily tracking-sheet & CRM pipeline review",
        "Daily posting on Facebook, Instagram & LinkedIn",
      ],
    },
  ],
  paidAds: [
    {
      label: "Onboarding",
      days: "Day 1",
      items: [
        "Pick your niche",
        "Structure your offer",
        "Craft your guarantee",
        "Craft your value statement",
        "Collect your logo & login access",
        "Start posting content",
      ],
    },
    {
      label: "Build-Out",
      days: "Day 2",
      items: [
        "Build your CRM & lead-gen funnel",
        "Craft SMS & email automations",
        "Script your VSL, confirmation video & ad creatives",
        "Create static ad images",
      ],
    },
    {
      label: "Review",
      days: "Day 3 — Call #2",
      items: [
        "Review raw VSL, confirmation & ad-video recordings",
        "Get access to your ads manager",
        "Review ad copy",
        "Pass videos to the editing team",
      ],
    },
    {
      label: "Launch",
      days: "Day 3 – 10",
      items: [
        "Train your appointment setter & closer on your offer",
        "Build & launch your email marketing campaign",
        "Launch every messaging sequence",
        "Launch your paid ads",
      ],
    },
    {
      label: "Ongoing Management",
      days: "Day 10 – 120",
      items: [
        "Start generating sales",
        "1–3 weekly check-in calls",
        "Weekly group training for closers & setters",
        "Daily tracking-sheet & CRM pipeline review",
        "Daily posting on Facebook, Instagram & LinkedIn",
      ],
    },
  ],
};

export type InstallTile = {
  title: string;
  description: string;
};

export const installs: InstallTile[] = [
  {
    title: "Appointment Setting",
    description:
      "We hire, train, and manage dedicated appointment setters who run every outbound and inbound conversation for you across Facebook, Instagram, and LinkedIn.",
  },
  {
    title: "High-Ticket Closing",
    description:
      "We hire, train, and manage high-ticket closers who run every sales call, send your service agreement, and invoice every client who says yes.",
  },
  {
    title: "Organic Content Engine",
    description:
      "Thirty pieces of content, written and posted to Facebook, Instagram, and LinkedIn every 30 days — plus a custom organic messaging sequence built and launched for you.",
  },
  {
    title: "Paid Ads Management",
    description:
      "Ad copy, video scripts, and static creatives written and produced for you — Facebook and Instagram campaigns built, launched, and managed with a daily performance tracking sheet.",
  },
  {
    title: "Automated Follow-Up",
    description:
      "Custom SMS and email follow-up campaigns, built and managed to convert every prospect who engages with you.",
  },
  {
    title: "CRM + Funnel Build",
    description:
      "A dedicated CRM to manage every lead you generate, plus a custom lead-generation funnel — built and live within 72 hours of onboarding.",
  },
  {
    title: "VSL Scripting & Editing",
    description:
      "Your video sales letter scripted for you, then fully edited the moment you send over your raw footage.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  stat: string;
  /** Vimeo video ID, if a video testimonial is supplied — renders inline instead of just the stat/quote. */
  vimeoId?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Went from $10,000/month to $10,000 per week.",
    name: "Colt",
    stat: "$10K/mo → $10K/wk",
  },
  {
    quote: "Went from $10,000–$20,000/month to $50,000/month.",
    name: "Dapo & Jamal",
    stat: "$10–20K/mo → $50K/mo",
  },
  {
    quote: "Went from $0 to $100,000 in revenue in just under 6 months.",
    name: "Peter",
    stat: "$0 → $100K in 6mo",
  },
];

// The video sales letter — set to a real Vimeo ID once supplied, and the
// section renders automatically on the next deploy. No ID → no section
// (never a "coming soon" placeholder).
export const vsl: { vimeoId: string | null; title: string } = {
  vimeoId: null,
  title: "Watch how the system works",
};

export const support = {
  items: [
    "Up to 3 one-on-one calls per week with your consultant",
    "24/7 access to ask questions via Slack",
    "Lifetime access to Train & Scale University",
    "Lifetime access to Train & Scale Setter Edition",
    "Lifetime access to Train & Scale Closer Edition",
  ],
};

export const nav = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "What We Install", href: "/#installs" },
  { label: "Results", href: "/#results" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
