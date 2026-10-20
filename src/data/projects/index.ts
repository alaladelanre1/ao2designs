import type { CaseStudy } from "./types";
import { parkwayWallet } from "./parkway-wallet";
export { flowStudies, comingSoon } from "./defs";

export const caseStudies: CaseStudy[] = [parkwayWallet];

export interface NavProject { name: string; slug?: string }
export interface NavCompany { company: string; slug?: string; logo?: string; /** which edge of the wordmark holds the icon to show */ crop?: "left" | "right"; projects: NavProject[] }
export interface NavGroup { group: string; items: NavCompany[] }

/** Sidebar structure from the Figma. A project gets a link once its `slug` has a case study page. */
export const projectIndex: NavGroup[] = [
  { group: "Work experience", items: [
    { company: "Parkway", logo: "/img/logos/parkway.png", crop: "right", projects: [
      { name: "Parkway Wallet", slug: "parkway-wallet" },
      { name: "ReadyCash", slug: "readycash" },
      { name: "Aggregate Portal", slug: "aggregate-portal" },
    ] },
    { company: "Uridium Works", logo: "/img/logos/uwl.png", projects: [
      { name: "G&M Core Banking v1", slug: "gm-core-banking-v1" },
      { name: "G&M Core Banking v2", slug: "gm-core-banking" },
      { name: "G&M Field App", slug: "gm-field-app" },
      { name: "Coronation Recon", slug: "coronation" },
      { name: "Greenwich Mobile", slug: "greenwich-mobile" },
      { name: "Greenwich Admin", slug: "greenwich-admin" },
      { name: "Covenant MFB", slug: "covenant-mfb" },
    ] },
    { company: "SimpliRide", logo: "/img/logos/simpliride.png", crop: "left", projects: [
      { name: "SimpliRide Driver", slug: "simpliride-driver" },
      { name: "SimpliRide Rider", slug: "simpliride-rider" },
      { name: "Fleet Management", slug: "fleet-management" },
    ] },
  ] },
  { group: "Side Projects", items: [
    { company: "Daneizo Trade Africa", slug: "daneizo", projects: [] },
    { company: "SweetBoards", slug: "sweetboards", projects: [] },
    { company: "Sarvitt", slug: "sarvitt", projects: [] },
  ] },
];
