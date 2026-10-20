import type { Meta } from "./types";

/** Case studies rendered from a Figma dump (see src/lib/flow.ts). */
export const flowStudies: Meta[] = [
  { slug: "readycash", title: "ReadyCash", year: "2023", accent: "#F9956B", dump: "readycash", company: "Parkway", blurb: "Agent banking app for 20,000+ agents",
    links: { "Google Play": "https://play.google.com/store/apps/details?id=com.readycash.app&pcampaignid=web_share", "View Website →": "https://readycash.parkway.ng/" } },
  { slug: "simpliride-driver", title: "SimpliRide Driver", year: "2026", accent: "#7567F5", dump: "simpliride-driver", company: "SimpliRide", blurb: "Driver-first ride-hailing platform for Africa" },
  { slug: "simpliride-rider", title: "SimpliRide Rider", year: "2026", accent: "#7567F5", dump: "simpliride-rider", company: "SimpliRide", blurb: "Giving riders the same price certainty drivers get" },
  { slug: "daneizo", title: "Daneizo", year: "2024", accent: "#2B4FD4", dump: "daneizo", company: "Daneizo Trade Africa", blurb: "Credit platform for Nigerian SMEs" },
  { slug: "gm-field-app", title: "Grace & Mercy — Field App", year: "", accent: "#D9541F", dump: "gm-field-app", company: "Uridium Works", blurb: "Offline-first field app for a microfinance bank" },
  { slug: "gm-core-banking", title: "Grace & Mercy — Core Banking v2", year: "", accent: "#FF6600", dump: "gm-core-banking", company: "Uridium Works", blurb: "Eight departments on one core banking shell" },
  { slug: "gm-core-banking-v1", title: "Grace & Mercy — Core Banking v1", year: "", accent: "#FF6600", dump: "gm-core-banking-v1", company: "Uridium Works", blurb: "The MVP core banking system and its design system" },
  { slug: "coronation", title: "Coronation — Intercompany Reconciliation", year: "", accent: "#FF0226", dump: "coronation", company: "Uridium Works", blurb: "One ledger view across five group companies" },
  { slug: "greenwich-mobile", title: "Greenwich — Mobile Banking App", year: "", accent: "#006527", dump: "greenwich-mobile", company: "Uridium Works", blurb: "One app for banking, investing and trading" },
  { slug: "greenwich-admin", title: "Greenwich — Admin Portal", year: "", accent: "#006527", dump: "greenwich-admin", company: "Uridium Works", blurb: "The back office behind three businesses' customers" },
];

/** Placeholder pages from the Figma: case study not written yet. */
export const comingSoon = [
  { slug: "aggregate-portal", title: "Aggregate Portal", group: "Parkway" },
  { slug: "covenant-mfb", title: "Covenant MFB", group: "Uridium Works" },
  { slug: "fleet-management", title: "Fleet Management", group: "SimpliRide" },
  { slug: "sweetboards", title: "SweetBoards", group: "Side projects" },
  { slug: "sarvitt", title: "Sarvitt", group: "Side projects" },
];
