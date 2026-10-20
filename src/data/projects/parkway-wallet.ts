import type { CaseStudy } from "./types";

const filler = "Send and receive money effortlessly within seconds. Whether you're splitting bills with friends, reimbursing family members, or conducting business transactions, our app ensures swift and secure money transfers.";

export const parkwayWallet: CaseStudy = {
  slug: "parkway-wallet",
  title: "Parkway Wallet",
  year: "2023",
  meta: ["Full-time", "H2 2024", "wallet.parkway.com.ng"],
  summary: "A secure, quick, and convenient platform for money transfers, bill payments, and online transactions through a virtual Naira card.",
  accent: "#F9956B",
  hero: "/img/assets/container.jpg",
  heroAlt: "Parkway Wallet app on a phone held over a desk",
  problem: "In today's digital era, managing financial transactions is challenging due to fragmented services, security concerns, and limited online payment options. Individuals face inefficiency, inconvenience, and a lack of trust in digital financial solutions.",
  outcome: {
    text: "Designed a comprehensive fintech app — from UX research through to UI — achieving strong adoption metrics within the first two months of launch.",
    stats: [
      { value: "4.8/5", label: "Accumulative App Rating" },
      { value: "10K", label: "Downloads in First 2 Months" },
      { value: "20K", label: "Total Users in First 2 Months" },
      { value: "60.2%", label: "Increase in User Satisfaction After Redesign" },
    ],
  },
  worked: [
    "Led the overall UX research plan including competitive analysis (SWOT) against Kuda, Opay, Palmpay, and Fairmoney.",
    "Designed user flows, information architecture, wireframes, and rapid prototypes in Figma.",
    "Conducted usability testing — both moderated and unmoderated — and integrated feedback into subsequent iterations.",
    "Defined the UI design system: typography (PP Right Gothic + Manrope), color palette, and component library.",
    "Introduced new navigation structure and added Virtual Card and Bills Payment features based on post-MVP user interviews.",
  ],
  screens: [
    { title: "Onboarding", text: filler, image: "/img/assets/frame.jpg" },
    { title: "Homescreen", text: filler, image: "/img/assets/frame-1.jpg" },
    { title: "Money Transfer", text: filler, image: "/img/assets/frame-2.jpg" },
    { title: "Virtual Card", text: filler, image: "/img/assets/clip-path-group-1.jpg" },
    { title: "Bills Payment", text: filler, image: "/img/assets/frame-3.jpg" },
    { title: "Invoice Payment", text: filler, image: "/img/assets/clip-path-group.jpg" },
  ],
  personas: [
    { name: "Amina Johnson", meta: ["32 · Freelance Graphic Designer · Lagos", "Technology proficiency: High"], goals: "An all-in-one digital wallet to manage diverse financial activities — without switching between multiple apps.", challenges: "Handling various payments from different clients and services can be overwhelming." },
    { name: "Emeka Okafor", meta: ["40 · Small Business Owner · Abuja", "Technology proficiency: Moderate"], goals: "A practical way to manage business transactions — receiving payments from customers and paying suppliers.", challenges: "Deals with both online and offline payments and needs a system that can handle both seamlessly." },
  ],
  process: [
    { title: "Validation", text: "Project initiation sessions with the project manager, stakeholders, and potential users to gain insights on the main pain points and validate the problem space." },
    { title: "Competitive Analysis", text: "Compared rival products — Kuda, Opay, Palmpay, and Fairmoney — against a set of benchmarks using the SWOT methodology to drive product decisions and identify differentiation opportunities." },
    { title: "UX Design", text: "Developed user stories, created information architecture, and drew user flows covering the primary goal: sending and receiving money across Parkway users, other banks, and invoices." },
    { title: "UI & Interactions", text: "Built the visual design system and interaction patterns in Figma, then iterated based on two rounds of usability testing — moderated and unmoderated — with real participants." },
  ],
  review: {
    text: "After releasing the first MVP, we gathered feedback to understand what users enjoyed most and what they wanted next.",
    stats: [
      { value: "100%", label: "Users satisfied with the seamless send & receive money flow" },
      { value: "85%", label: "Users requested a bill payment feature to manage bills directly in-app" },
      { value: "79%", label: "Users requested a virtual card for secure online transactions" },
    ],
  },
  styleGuide: {
    colors: [
      { hex: "#F9956B", name: "Primary" }, { hex: "#FBBF9A", name: "Tint" }, { hex: "#C4683B", name: "Shade" },
      { hex: "#121212", name: "Secondary" }, { hex: "#2E2E2E", name: "Tint" },
      { hex: "#22C55E", name: "Success" }, { hex: "#EF4444", name: "Error" },
    ],
    type: [
      { label: "Display — PP Right Gothic", sample: "Regular · Medium · Semi Bold · Bold" },
      { label: "Body — Manrope", sample: "Regular · Medium · Semi Bold · Bold" },
    ],
  },
  conclusion: [
    "If you value convenience in financial management, Parkway Wallet is your ultimate solution. Enjoy the ease of sending and receiving money while confidently managing your virtual cards, bills, and invoices — all in one place.",
    "The redesign led to a 60.2% increase in user satisfaction scores, and the app achieved 10,000 downloads and 20,000 users within its first two months on both the App Store and Google Play.",
  ],
  links: [{ label: "App Store" }, { label: "Google Play" }, { label: "Website", href: "https://wallet.parkway.com.ng" }],
  credits: [
    { label: "Product Design", value: "Olanrewaju Alalade" },
    { label: "Product Management", value: "Team" },
    { label: "Engineering", value: "Software Engineers" },
    { label: "Stakeholders", value: "Company" },
  ],
  footnote: "Olanrewaju Olatubosun Alalade · 2023 · Designed in Figma",
};
