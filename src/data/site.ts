// Central content data — every string here is sourced from the client's real
// service agreements, Client Result Timelines, or their own live funnel copy.
// No dollar/compensation figures appear anywhere in this file (client instruction).

export const site = {
  name: "Train & Scale",
  legalName: "Train And Scale LLC",
  tagline: "Done-for-you client acquisition for high-ticket agencies, coaches, and consultants.",
  mission: "Helping high-ticket agencies, coaches, and consultants scale effortlessly.",
  email: "welcome@trainandscale.com",
  url: "https://site.trainandscale.com",
} as const;

export type Stat = {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { target: 72, suffix: "hr", label: "To Your CRM + Funnel Live" },
  { target: 180, label: "Pieces Of Content Every 30 Days" },
  { target: 90, label: "Day Guarantee Window" },
  { target: 30, prefix: "$", suffix: "K", label: "Guaranteed In New Sales" },
];

export const guarantee = {
  headline: "We guarantee $30,000 in new sales — organically — within 90 days.",
  sub: "Or you get a full refund, including processing fees. That's how confident we are in the system.",
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

// Every package below mirrors one of Train & Scale's real service agreements
// verbatim in scope (service-by-service) — nothing invented, nothing priced.
// "Foundation Build" through "Coaching & Support" groups repeat across tiers
// because the underlying agreements repeat those same clauses; each tier's
// staffing/ads/email groups are what actually differ, per the agreement it's
// drawn from.

export type ServiceGroup = {
  group: string;
  items: string[];
};

export type PackageGuarantee = {
  headline: string;
  note: string;
};

export type Package = {
  id: string;
  label: string;
  subtitle: string;
  guarantee: PackageGuarantee;
  groups: ServiceGroup[];
};

const FOUNDATION_BUILD: ServiceGroup = {
  group: "Foundation Build",
  items: [
    "Niche selected for your business",
    "High-ticket offer crafted",
    "Video sales letter scripted, then fully edited from your footage",
    "Dedicated CRM built to manage every lead",
    "Custom lead-generation funnel built and live",
  ],
};

const CONTENT_ENGINE: ServiceGroup = {
  group: "Content Engine",
  items: [
    "180 pieces of content written & posted every 30 days",
    "Posted across Facebook, Instagram & LinkedIn",
  ],
};

const COACHING_SUPPORT: ServiceGroup = {
  group: "Coaching & Support",
  items: [
    "Up to 3 one-on-one calls per week",
    "24/7 access to ask questions via Slack",
    "Lifetime access to Train & Scale University",
    "Lifetime access to Train & Scale Setter Edition",
    "Lifetime access to Train & Scale Closer Edition",
  ],
};

const GUARANTEE_DISCLAIMER =
  "Conditioned on completing the outreach, sales-call, and tracking requirements outlined in your service agreement.";

export const packages: Package[] = [
  {
    id: "foundation",
    label: "Foundation Build-Out",
    subtitle: "One-time · 30 days",
    guarantee: {
      headline: "14-Day Setup Guarantee",
      note: "If we don't deliver your foundational build-out within 14 days, you're eligible for a full refund, including processing fees.",
    },
    groups: [
      {
        group: "Foundation Setup",
        items: [
          "Target industry & niche selected",
          "Initial high-ticket offer crafted",
          "Pricing strategy set for your offer",
          "Organic messaging & outreach sequence crafted",
        ],
      },
      {
        group: "Your Online Presence",
        items: [
          "LinkedIn, Facebook & Instagram profiles set up and optimized",
          "Advertising account set up",
        ],
      },
      {
        group: "Coaching & Access — 30 Days",
        items: [
          "Up to 8 group coaching calls (2/week)",
          "Complimentary SHAI software access",
          "Online community access",
          "Online training library access",
          "Slack support",
        ],
      },
    ],
  },
  {
    id: "tools",
    label: "Tools & Coaching Access",
    subtitle: "Monthly · ongoing",
    guarantee: {
      headline: "14-Day Setup Guarantee",
      note: "If we don't deliver your foundational build-out within 14 days, you're eligible for a full refund of that period's payment, including processing fees.",
    },
    groups: [
      {
        group: "Foundation Setup",
        items: [
          "Target industry & niche selected",
          "Initial high-ticket offer crafted",
          "Pricing strategy set for your offer",
          "Organic messaging & outreach sequence crafted",
        ],
      },
      {
        group: "Your Online Presence",
        items: [
          "LinkedIn, Facebook & Instagram profiles set up and optimized",
          "Advertising account set up",
        ],
      },
      {
        group: "Ongoing Coaching & Access",
        items: [
          "Up to 2 live group coaching calls every week",
          "SHAI software access (30 days, extends to 60 in month two)",
          "Online community access — ongoing",
          "Online training library access — ongoing",
          "Slack support — ongoing",
        ],
      },
    ],
  },
  {
    id: "diy",
    label: "Organic DIY",
    subtitle: "You set & close · 90 days",
    guarantee: {
      headline: "$10,000 In New Cash Collected, 90 Days",
      note: GUARANTEE_DISCLAIMER,
    },
    groups: [
      FOUNDATION_BUILD,
      CONTENT_ENGINE,
      {
        group: "Your Outreach & Closing, Trained By Us",
        items: [
          "Custom organic messaging sequence built",
          "You're trained to run it and book qualified appointments",
          "Strategic sales script built for your offer",
          "You're trained to close high-ticket deals with it",
        ],
      },
      {
        group: "Automated Follow-Up — We Manage It",
        items: [
          "Custom SMS follow-up campaign built and managed",
          "Custom email follow-up campaign built and managed",
        ],
      },
      COACHING_SUPPORT,
    ],
  },
  {
    id: "closing",
    label: "Closing Installed",
    subtitle: "1 closer staffed · 90 days",
    guarantee: {
      headline: "$30,000 In New Cash Collected, 90 Days",
      note: GUARANTEE_DISCLAIMER,
    },
    groups: [
      FOUNDATION_BUILD,
      CONTENT_ENGINE,
      {
        group: "Your Outreach, Trained By Us",
        items: [
          "Custom organic messaging sequence built",
          "You're trained to run it and book qualified appointments",
        ],
      },
      {
        group: "Follow-Up — You Manage, We Train You",
        items: [
          "Custom SMS follow-up campaign built",
          "You're trained to manage it",
          "Custom email follow-up campaign built",
          "You're trained to manage it",
        ],
      },
      {
        group: "High-Ticket Closing Team",
        items: [
          "We hire a high-ticket closer for you",
          "We train them on your offer",
          "We manage them",
          "They run every sales call scheduled for you",
          "They send your service agreement to every new client",
          "They send invoices to every new client",
        ],
      },
      COACHING_SUPPORT,
    ],
  },
  {
    id: "setting",
    label: "Setting Installed",
    subtitle: "1 setter staffed · 90 days",
    guarantee: {
      headline: "$30,000 In New Cash Collected, 90 Days",
      note: GUARANTEE_DISCLAIMER,
    },
    groups: [
      FOUNDATION_BUILD,
      CONTENT_ENGINE,
      {
        group: "Appointment Setting Team",
        items: [
          "We hire an appointment setter for you",
          "We train them on your offer",
          "We manage them",
          "Custom SMS follow-up campaign built & managed by your setter",
          "Custom email follow-up campaign built & managed by your setter",
          "Custom organic messaging sequence built",
          "Outbound & inbound messages handled — Facebook",
          "Outbound & inbound messages handled — Instagram",
          "Outbound & inbound messages handled — LinkedIn",
        ],
      },
      {
        group: "Your Closing, Trained By Us",
        items: [
          "Strategic sales script built for your offer",
          "You're trained to close high-ticket deals with it",
        ],
      },
      COACHING_SUPPORT,
    ],
  },
  {
    id: "fullOrganic",
    label: "Full Organic Team",
    subtitle: "3 setters + 3 closers · 90 days",
    guarantee: {
      headline: "$30,000 In New Cash Collected, 90 Days",
      note: GUARANTEE_DISCLAIMER,
    },
    groups: [
      FOUNDATION_BUILD,
      CONTENT_ENGINE,
      {
        group: "Appointment Setting Team",
        items: [
          "We hire 3 appointment setters for you",
          "We train them on your offer",
          "We manage them",
          "Custom SMS follow-up campaign built & managed",
          "Custom email follow-up campaign built & managed",
          "Custom organic messaging sequence built",
          "Outbound & inbound messages handled — Facebook",
          "Outbound & inbound messages handled — Instagram",
          "Outbound & inbound messages handled — LinkedIn",
        ],
      },
      {
        group: "High-Ticket Closing Team",
        items: [
          "We hire 3 high-ticket closers for you",
          "We train them on your offer",
          "We manage them",
          "They run every sales call scheduled for you",
          "They send your service agreement to every new client",
          "They send invoices to every new client",
        ],
      },
      COACHING_SUPPORT,
    ],
  },
  {
    id: "fullPaid",
    label: "Full Team + Paid Ads",
    subtitle: "3 setters + 3 closers + ads · 120 days",
    guarantee: {
      headline: "$100,000 In New Cash Collected, 120 Days",
      note: GUARANTEE_DISCLAIMER,
    },
    groups: [
      FOUNDATION_BUILD,
      CONTENT_ENGINE,
      {
        group: "Appointment Setting Team",
        items: [
          "We hire 3 appointment setters for you",
          "We train them on your offer",
          "We manage them",
          "Custom organic messaging sequence built",
          "Outbound & inbound messages handled — Facebook",
          "Outbound & inbound messages handled — Instagram",
          "Outbound & inbound messages handled — LinkedIn",
        ],
      },
      {
        group: "Email Marketing & Follow-Up",
        items: [
          "Organic email marketing campaign built",
          "Your team manages outbound marketing emails",
          "Your team manages inbound marketing emails",
          "Custom SMS follow-up campaign built & managed",
          "Custom email follow-up campaign built & managed",
        ],
      },
      {
        group: "Paid Advertising",
        items: [
          "All ad copy written for you",
          "All ad video creatives scripted",
          "All static image creatives produced",
          "Facebook ad campaigns created & managed",
          "Instagram ad campaigns created & managed",
          "Daily ad-performance tracking sheet",
        ],
      },
      {
        group: "High-Ticket Closing Team",
        items: [
          "We hire 3 high-ticket closers for you",
          "We train them on your offer",
          "We manage them",
          "They run every sales call scheduled for you",
          "They send your service agreement to every new client",
          "They send invoices to every new client",
        ],
      },
      COACHING_SUPPORT,
    ],
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
    vimeoId: "1031079685",
  },
  {
    quote: "Went from $10,000–$20,000/month to $50,000/month.",
    name: "Dapo & Jamal",
    stat: "$10–20K/mo → $50K/mo",
    vimeoId: "1031081061",
  },
  {
    quote: "Went from $0 to $100,000 in revenue in just under 6 months.",
    name: "Peter",
    stat: "$0 → $100K in 6mo",
    vimeoId: "1031077338",
  },
];

// A collage reel of clips from several clients — its own slot, separate
// from the individual testimonial cards above.
export const testimonialsReel: { vimeoId: string | null; title: string } = {
  vimeoId: "1031086554",
  title: "What Our Clients Have To Say",
};

// The video sales letter — set to a real Vimeo ID once supplied, and the
// section renders automatically on the next deploy. No ID → no section
// (never a "coming soon" placeholder).
export const vsl: { vimeoId: string | null; title: string } = {
  vimeoId: "1049908945",
  title: "Watch how the system works",
};

// Shown only on the gated /confirmation page, reached exclusively by
// booking a call through the site's own calendar (see src/lib/booking.ts).
export const confirmationVideo: { vimeoId: string | null; title: string } = {
  vimeoId: "876727229",
  title: "You're confirmed — watch this before we talk",
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

// What gets installed, as short tags — the marquee strip and the intro screen.
export const serviceTags = [
  "Appointment Setting",
  "High-Ticket Closing",
  "Organic Content Engine",
  "Paid Ads Management",
  "CRM + Funnel Build",
  "SMS & Email Automation",
  "VSL Scripting & Editing",
];

export const nav = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "What We Install", href: "/#installs" },
  { label: "Results", href: "/#results" },
  { label: "About", href: "/about" },
];

// Grouped by business model rather than one tile per industry, so a visitor
// whose exact niche isn't named still reads themselves into a category
// ("& more") instead of feeling disqualified. Every named example here is
// one the client explicitly asked to list — no niches invented.
export type IndustryGroup = { category: string; examples: string[] };

export const industries: IndustryGroup[] = [
  { category: "Marketing & AI Agencies", examples: ["Marketing Agencies", "AI Agencies"] },
  { category: "Consulting & Coaching", examples: ["Consulting Businesses", "Coaching Businesses"] },
  {
    category: "E-Commerce & Retail",
    examples: ["E-Commerce Businesses", "Clothing Brands", "Brick & Mortar Businesses"],
  },
  { category: "Tech & Software", examples: ["SAAS", "App Development", "Website Development"] },
  {
    category: "Content & Media",
    examples: ["Content Creators", "Videographers", "Photographers"],
  },
  { category: "Real Estate & Franchises", examples: ["Real Estate Wholesale", "Franchises"] },
];
