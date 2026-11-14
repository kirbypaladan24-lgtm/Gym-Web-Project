/* ============================================================================
   Content layer — AV Fitness Gym (Phase 1)
   ----------------------------------------------------------------------------
   Brand voice: the approved website copywriting (2026 captions document).
   Business facts (addresses, hours, prices, contacts, inventories) remain
   clearly marked placeholders until the gym owner confirms them — the honest
   content policy (plan §1.2, §4) is unchanged. Voice copy (headings,
   descriptions, section intros) below IS the approved copy and renders as-is.

   Types mirror the plan's data model (§10) at the fidelity Phase 1 needs.
   When the backend connects in a later phase, these types become the row
   shapes and `unconfirmed` flags disappear as real content arrives.
   ============================================================================ */

export type ConfirmationState = "unconfirmed" | "confirmed";

/** Marks every record whose business facts still need owner sign-off. */
export interface PlaceholderMeta {
  readonly unconfirmed: boolean;
  readonly note: string; // what the owner must supply
}

/* ------------------------------------------------------------------ */
/* Site-wide facts                                                     */
/* ------------------------------------------------------------------ */

export const siteFacts = {
  name: "AV Fitness Gym",
  established: "2025",
  tagline: "Your space. Your strength. Your progress.",
  branchCount: 2,
  /** The one supplied brand asset (black-and-white emblem, 960×960). */
  logoPath: "/brand/av-fitness-gym-logo.jpg",
} as const;

/* ------------------------------------------------------------------ */
/* Branches                                                            */
/* ------------------------------------------------------------------ */

export interface BranchHours {
  /** e.g. "Monday – Friday". Unconfirmed until the owner verifies. */
  readonly days: string;
  readonly time: string;
  readonly unconfirmed: boolean;
}

export interface Branch {
  readonly slug: "branch-one" | "branch-two";
  readonly name: string;
  readonly meta: PlaceholderMeta;
  /** Human-readable address ONLY once verified. */
  readonly address: string | null;
  /** Google Maps link ONLY with verified coordinates/address. */
  readonly mapUrl: string | null;
  readonly hours: BranchHours[];
  readonly phone: string | null;
  readonly summary: string;
  /** Equipment groups present at this branch — unverified. */
  readonly equipmentGroups: string[];
  readonly tourSceneIds: string[];
}

export const branches: Branch[] = [
  {
    slug: "branch-one",
    name: "Branch 1",
    meta: {
      unconfirmed: true,
      note: "Official branch name, verified address, map link, hours, and contact details.",
    },
    address: null,
    mapUrl: null,
    hours: [
      { days: "Monday – Friday", time: "To be confirmed", unconfirmed: true },
      { days: "Saturday – Sunday", time: "To be confirmed", unconfirmed: true },
    ],
    phone: null,
    summary:
      "Explore our first location and discover the facilities and equipment available for your training sessions.",
    equipmentGroups: ["Cardio", "Strength", "Free weights", "Training machines"],
    tourSceneIds: ["b1-entrance", "b1-floor", "b1-cardio"],
  },
  {
    slug: "branch-two",
    name: "Branch 2",
    meta: {
      unconfirmed: true,
      note: "Official branch name, verified address, map link, hours, and contact details.",
    },
    address: null,
    mapUrl: null,
    hours: [
      { days: "Monday – Friday", time: "To be confirmed", unconfirmed: true },
      { days: "Saturday – Sunday", time: "To be confirmed", unconfirmed: true },
    ],
    phone: null,
    summary:
      "Discover our second location and explore its facilities, equipment, and available membership options.",
    equipmentGroups: ["Cardio", "Strength", "Free weights", "Training machines"],
    tourSceneIds: ["b2-entrance", "b2-floor", "b2-cardio"],
  },
];

export function getBranch(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Photo library — the gym's own supplied photographs (.assets,       */
/* optimized into public/photos as web derivatives; originals are     */
/* preserved untouched). <PlaceholderMedia/> shows them gray-filtered */
/* and lifts to full color with a gentle zoom on hover (owner         */
/* direction, 2026-11-07). Descriptions reflect the actual photo      */
/* content — nothing is invented.                                     */
/* ------------------------------------------------------------------ */

/** Branch photo sets — card, gallery, and tour preview per branch. */
export const branchPhotoSets: Record<
  Branch["slug"],
  { card: string; entrance: string; floor: string; equipment: string; tour: string }
> = {
  "branch-one": {
    card: "/photos/av-14.jpg", // barbell training area
    entrance: "/photos/av-03.jpg", // brand wall with the AV emblem
    floor: "/photos/av-06.jpg", // pull-up station on the training floor
    equipment: "/photos/av-09.jpg", // chest/shoulder press machine
    tour: "/photos/av-07.jpg", // cardio zone with members training
  },
  "branch-two": {
    card: "/photos/av-02.jpg", // loaded barbell close-up
    entrance: "/photos/av-05.jpg", // branded panel with operating hours
    floor: "/photos/av-01.jpg", // squat rack by the windows
    equipment: "/photos/av-13.jpg", // treadmill row, cardio zone
    tour: "/photos/av-12.jpg", // dumbbell area with mirrored wall
  },
};

/** Equipment category photographs — content-matched, two per category. */
export const categoryPhotos: Record<string, [string, string]> = {
  cardio: ["/photos/av-13.jpg", "/photos/av-07.jpg"], // treadmills
  strength: ["/photos/av-08.jpg", "/photos/av-06.jpg"], // curls, pull-ups
  "free-weights": ["/photos/av-02.jpg", "/photos/av-12.jpg"], // barbell, dumbbells
  machines: ["/photos/av-09.jpg", "/photos/av-04.jpg"], // press machine, lifting
};

/** Homepage hero backdrop photograph — the member at the barbell
    racks, backlit by the windows: "YOUR STRENGTH" as a picture. */
export const heroPhoto = "/photos/av-14.jpg"; // lifter at the rack, backlit

/** Homepage virtual-tour preview photograph. */
export const homeTourPreviewPhoto = "/photos/av-11.jpg"; // dumbbell racks

/** Homepage closing-statement photograph (full-bleed band). */
export const homeClosingPhoto = "/photos/av-01.jpg"; // squat rack by the windows

/** About-page story photograph (sidebar, portrait crop) — a member training
    under the glowing AV emblem: the gym's story in a single frame. */
export const aboutStoryPhoto = "/photos/av-10.jpg"; // incline press under the AV sign

/** Backdrop photographs for inner-page mastheads — rendered dimmed and
    desaturated, so the heading stays king while the page gains a cinematic
    first viewport (cool pass, 2026-11-08). */
export const mastheadPhotos = {
  branches: "/photos/av-02.jpg", // loaded barbell close-up
  about: "/photos/av-03.jpg", // brand wall with the AV emblem
  equipment: "/photos/av-09.jpg", // chest/shoulder press machine
  memberships: "/photos/av-13.jpg", // treadmill row, cardio zone
  contact: "/photos/av-05.jpg", // branded panel with operating hours
  announcements: "/photos/av-14.jpg", // barbell training area
  tour: "/photos/av-07.jpg", // cardio zone with members training
} as const;

/* ------------------------------------------------------------------ */
/* Equipment                                                           */
/* ------------------------------------------------------------------ */

export interface EquipmentCategory {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly meta: PlaceholderMeta;
  /** Example entry points — no specific machines are claimed yet. */
  readonly examples: readonly string[];
}

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: "cardio",
    name: "Cardio Equipment",
    description:
      "Explore equipment designed to support cardiovascular training and endurance.",
    meta: {
      unconfirmed: true,
      note: "Verified cardio inventory per branch, with approved photographs.",
    },
    examples: ["Treadmills", "Stationary bikes", "Ellipticals"],
  },
  {
    id: "strength",
    name: "Strength Training",
    description:
      "Discover equipment for developing strength and building muscle through resistance training.",
    meta: {
      unconfirmed: true,
      note: "Verified strength-machine inventory per branch.",
    },
    examples: ["Chest press", "Lat pulldown", "Leg press"],
  },
  {
    id: "free-weights",
    name: "Free Weights",
    description:
      "Explore available dumbbells, barbells, plates, and other free-weight equipment.",
    meta: {
      unconfirmed: true,
      note: "Dumbbell/barbell ranges, racks, and bench counts per branch.",
    },
    examples: ["Dumbbells", "Barbells", "Weight plates"],
  },
  {
    id: "machines",
    name: "Training Machines",
    description:
      "Discover specialized machines designed for different muscle groups and training movements.",
    meta: {
      unconfirmed: true,
      note: "Verified training-machine inventory per branch.",
    },
    examples: ["Cable machines", "Smith machine", "Functional trainers"],
  },
];

/* ------------------------------------------------------------------ */
/* Membership plans — rates from the gym's own rate sheet              */
/* (owner-supplied pricing page, 2026-11-07). Structure follows that    */
/* sheet: a day pass, two 1-month billing options, and 3/6/12-month    */
/* commitments, with the 12-month plan highlighted as the best value.  */
/* ------------------------------------------------------------------ */

export interface MembershipPlan {
  readonly id: string;
  readonly name: string;
  /** Formatted display price — e.g. "₱1,499". */
  readonly price: string;
  /** Billing unit shown beside the price — "/ day" or "/ month". */
  readonly priceUnit: string;
  readonly duration: string;
  /** Full cost of multi-month plans — e.g. "₱3,399". */
  readonly total?: string;
  readonly inclusions: readonly string[];
  /** Card call-to-action label (from the rate sheet). */
  readonly cta: string;
  /** The highlighted best-value plan (12 Months). */
  readonly featured?: boolean;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "day-pass",
    name: "Day Pass",
    price: "₱499",
    priceUnit: "/ day",
    duration: "1 day",
    inclusions: [
      "Single-day access to one branch",
      "Perfect for trying out the gym",
    ],
    cta: "Get Pass",
  },
  {
    id: "month-upfront",
    name: "1 Month (Upfront)",
    price: "₱1,499",
    priceUnit: "/ month",
    duration: "1 month",
    inclusions: ["One-time payment", "No lock-in contract"],
    cta: "Get Started",
  },
  {
    id: "month-autodebit",
    name: "1 Month (Autodebit)",
    price: "₱1,199",
    priceUnit: "/ month",
    duration: "1 month",
    inclusions: ["Convenient monthly billing", "Cancel or pause anytime"],
    cta: "Get Started",
  },
  {
    id: "quarterly",
    name: "3 Months",
    price: "₱1,133",
    priceUnit: "/ month",
    duration: "3 months",
    total: "₱3,399",
    inclusions: ["Good value & flexibility"],
    cta: "Get Started",
  },
  {
    id: "semiannual",
    name: "6 Months",
    price: "₱1,099",
    priceUnit: "/ month",
    duration: "6 months",
    total: "₱6,594",
    inclusions: ["Popular mid-term option"],
    cta: "Get Started",
  },
  {
    id: "annual",
    name: "12 Months",
    price: "₱1,049",
    priceUnit: "/ month",
    duration: "12 months",
    total: "₱12,588",
    inclusions: ["Best value for Plus tier"],
    cta: "Go Plus!",
    featured: true,
  },
];

/* ------------------------------------------------------------------ */
/* Announcements                                                       */
/* ------------------------------------------------------------------ */

export interface Announcement {
  readonly id: string;
  readonly scope: "general" | "branch";
  readonly branchSlug?: Branch["slug"];
  readonly title: string;
  readonly body: string;
  readonly publishedAt: string;
  readonly expiresAt?: string;
  readonly meta: PlaceholderMeta;
}

export const announcements: Announcement[] = [
  {
    id: "ann-welcome",
    scope: "general",
    title: "Website under preparation",
    body: "AV Fitness Gym's new website is being prepared. Branch details, equipment, and the 360° virtual tour will be published here once each piece of information is verified with the gym. Nothing on this site is final until then.",
    publishedAt: "2025-01-01",
    meta: {
      unconfirmed: true,
      note: "Real announcements, promotions, and closure notices maintained by staff.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export interface Faq {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const faqs: Faq[] = [
  {
    id: "faq-branches",
    question: "How many branches does AV Fitness Gym have?",
    answer:
      "Two. Each branch is documented separately on this website because their equipment, hours, and offerings are not assumed to be identical.",
  },
  {
    id: "faq-pricing",
    question: "Where can I see membership prices?",
    answer:
      "On the Memberships page. Day passes, 1-month plans (upfront or auto-debit), and 3-, 6-, and 12-month commitments are listed with their full rates — longer commitments bring the monthly rate down, and the 12-month plan is the best value.",
  },
  {
    id: "faq-tour",
    question: "Can I look inside the gym before visiting?",
    answer:
      "Yes — a 360° indoor virtual tour is being built for each branch. It will use real photographs of the gym's interiors once photography is approved. The tour framework on this site currently shows clearly marked sample scenes.",
  },
  {
    id: "faq-payment",
    question: "Can I register and pay online?",
    answer:
      "Online registration is planned. The payment step will be enabled once the gym's supported payment methods (e.g. GCash, Maya, bank transfer, or a payment gateway) are confirmed, so that every transaction is verified correctly.",
  },
  {
    id: "faq-contact",
    question: "How do I contact the gym?",
    answer:
      "Verified contact channels will be published on the Contact page. In the meantime, the inquiry form on that page records your message and details for the gym to respond.",
  },
];

/* ================================================================== */
/*                                                                    */
/* Approved brand copy (captions document) — page voice               */
/*                                                                    */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/* Homepage                                                            */
/* ------------------------------------------------------------------ */

export const homeContent = {
  hero: {
    lines: ["YOUR SPACE.", "YOUR STRENGTH.", "YOUR PROGRESS."],
    description:
      "A space designed to help you move, grow, and become stronger. Whether you're beginning your fitness journey or working toward your next personal milestone, AV Fitness Gym gives you a place to focus on yourself and make every session count.",
    primaryCta: { label: "Explore memberships", href: "/memberships" },
    secondaryCta: { label: "Discover our gym", href: "/branches" },
  },
  welcome: {
    label: "Welcome",
    heading: "A BETTER SPACE FOR YOUR FITNESS JOURNEY.",
    paragraphs: [
      "Fitness is more than lifting weights. It's about consistency, progress, and creating a routine that works for you.",
      "At AV Fitness Gym, we provide an environment where you can focus on your goals, enjoy your training sessions, and work toward becoming a stronger version of yourself.",
    ],
  },
  featured: {
    label: "Featured experience",
    heading: "MORE THAN JUST A WORKOUT.",
    description:
      "Discover a fitness environment designed around your training experience. Explore our facilities, check out our equipment, and find the branch that fits your routine.",
    features: [
      {
        title: "Modern equipment",
        copy: "Explore the equipment available for your training needs.",
        href: "/equipment",
      },
      {
        title: "Comfortable environment",
        copy: "Enjoy a space where you can focus on your workout.",
        href: "/about",
      },
      {
        title: "Convenient locations",
        copy: "Discover our two gym branches.",
        href: "/branches",
      },
      {
        title: "Flexible membership",
        copy: "Explore available membership options.",
        href: "/memberships",
      },
    ],
  },
  branches: {
    label: "Two locations",
    heading: "FIND YOUR AV FITNESS GYM.",
  },
  equipment: {
    label: "Equipment",
    heading: "EXPLORE YOUR TRAINING SPACE.",
    description:
      "Get familiar with the equipment available at AV Fitness Gym. Explore the machines, training equipment, and facilities available at each branch before planning your next workout.",
    cta: "Explore equipment",
  },
  memberships: {
    label: "Memberships",
    heading: "YOUR JOURNEY STARTS HERE.",
    description:
      "Find a membership option that suits your fitness goals and routine. Explore our available packages, review their inclusions, and register conveniently online.",
  },
  tour: {
    label: "360° VIRTUAL TOUR",
    heading: "STEP INSIDE AV FITNESS GYM.",
    intro: "YOUR GYM. YOUR VIEW.",
    description:
      "Explore our gym before your first visit. Take a virtual walk through our facilities using interactive 360° panoramic photography. Look around, discover different training areas, and experience the atmosphere of AV Fitness Gym from wherever you are.",
    cta: "Start virtual tour",
  },
  updates: {
    label: "Updates",
    heading: "STAY CONNECTED WITH AV FITNESS GYM.",
    cta: "View all updates",
  },
  closing: {
    heading: "YOUR NEXT CHAPTER STARTS HERE.",
    description:
      "Every goal begins with a decision to start. Find your space, build your routine, and make progress one session at a time. Your fitness journey has a place at AV Fitness Gym.",
    primaryCta: { label: "Become a member", href: "/memberships/join" },
    secondaryCta: { label: "Explore our facilities", href: "/branches" },
  },
} as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const aboutContent = {
  label: "About us",
  heading: "BUILT FOR YOUR FITNESS JOURNEY.",
  paragraphs: [
    "Established in 2025, AV Fitness Gym is built around the idea that everyone deserves a comfortable place to pursue their fitness goals.",
    "We believe that progress comes from consistency, dedication, and having an environment where you can focus on yourself.",
    "Whether you're training for strength, improving your endurance, or simply building a healthier routine, AV Fitness Gym welcomes you to be part of the journey.",
  ],
  mission: {
    label: "Our mission",
    text: "To provide a comfortable and accessible fitness environment that encourages people to stay active, develop healthy habits, and pursue their individual fitness goals.",
  },
  vision: {
    label: "Our vision",
    text: "To become a trusted fitness destination where individuals can continuously grow, improve, and build a lasting commitment to their well-being.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Branches page                                                       */
/* ------------------------------------------------------------------ */

export const branchesContent = {
  label: "Branches",
  heading: "FIND YOUR AV FITNESS GYM.",
  description:
    "Explore our locations and find the branch that works best for your daily routine. Check their addresses, operating hours, available facilities, and other important information before visiting.",
  ctaLabel: "Explore this branch",
  /** What each branch page presents once verified (captions §3). */
  detailCovers: [
    "Complete address",
    "Operating hours",
    "Contact information",
    "Available equipment",
    "Branch photographs",
    "Google Maps location",
    "Virtual tour",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Equipment page                                                      */
/* ------------------------------------------------------------------ */

export const equipmentContent = {
  label: "Equipment",
  heading: "EXPLORE YOUR TRAINING SPACE.",
  description:
    "Get familiar with the equipment available at AV Fitness Gym. Explore the machines, training equipment, and facilities available at each branch before planning your next workout.",
} as const;

/* ------------------------------------------------------------------ */
/* Tour page                                                           */
/* ------------------------------------------------------------------ */

export const tourContent = {
  label: "360° VIRTUAL TOUR",
  heading: "STEP INSIDE AV FITNESS GYM.",
  description:
    "Explore our gym before your first visit. Take a virtual walk through our facilities using interactive 360° panoramic photography. Look around, discover different training areas, and experience the atmosphere of AV Fitness Gym from wherever you are.",
  intro: {
    heading: "YOUR GYM. YOUR VIEW.",
    text: "Move around freely, explore different viewpoints, and discover what each branch has to offer.",
  },
  cta: "Start virtual tour",
  navNote:
    "Only locations with approved panoramic photography are listed in the tour.",
} as const;

/* ------------------------------------------------------------------ */
/* Memberships page                                                    */
/* ------------------------------------------------------------------ */

export const membershipContent = {
  label: "Membership",
  heading: "YOUR JOURNEY STARTS HERE.",
  description:
    "Find a membership option that suits your fitness goals and routine. Explore our available packages, review their inclusions, and register conveniently online.",
  intro:
    "Whether you're visiting for the first time or looking for a consistent place to train, AV Fitness Gym welcomes you. Explore our membership options and discover what works best for you.",
  chooseCta: "Choose membership",
  learnMoreCta: "Learn more",
  registration: {
    heading: "READY TO GET STARTED?",
    text: "Create your account, select your preferred membership, and complete your registration online.",
    cta: "Become a member",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Online payment (informational — Phase 3 integration)                */
/* ------------------------------------------------------------------ */

export const paymentContent = {
  heading: "SIMPLE REGISTRATION. CONVENIENT PAYMENTS.",
  description:
    "Complete your membership registration through our online payment process. Review your selected subscription, choose an available payment method, and submit your transaction securely.",
  statuses: {
    pending: {
      label: "Pending",
      text: "Your payment is being verified. We'll update your membership status once verification is complete.",
    },
    successful: {
      label: "Successful",
      text: "Your payment has been confirmed. Welcome to AV Fitness Gym!",
    },
    failed: {
      label: "Failed",
      text: "Your payment could not be completed. Please review your transaction details and try again.",
    },
  },
  activationNote:
    "Membership activation must only occur after the payment provider or authorized administrator confirms successful payment.",
} as const;

/* ------------------------------------------------------------------ */
/* Announcements page                                                  */
/* ------------------------------------------------------------------ */

export const announcementsContent = {
  label: "Announcements & updates",
  heading: "STAY CONNECTED WITH AV FITNESS GYM.",
  description:
    "Stay updated with the latest announcements, membership promotions, operating hour changes, branch updates, and other important information.",
  categories: [
    "Gym announcements",
    "Membership promotions",
    "Branch updates",
    "Operating hours",
    "Equipment updates",
    "Events & activities",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Contact page                                                        */
/* ------------------------------------------------------------------ */

export const contactContent = {
  label: "Contact",
  heading: "WE'D LOVE TO HEAR FROM YOU.",
  description:
    "Have questions about memberships, our branches, or the facilities? Get in touch with AV Fitness Gym and let us help you find the information you need.",
  /** Public contact channels — each publishes only once the gym approves it. */
  channels: [
    { key: "facebook", label: "Facebook page", value: null },
    { key: "branch-1", label: "Branch 1", value: null },
    { key: "branch-2", label: "Branch 2", value: null },
    { key: "email", label: "Email", value: null },
  ],
} as const;


