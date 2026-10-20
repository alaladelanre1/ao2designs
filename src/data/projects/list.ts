import { caseStudies, flowStudies, comingSoon } from "./index";

export interface ListItem { slug: string; title: string; group: string; blurb: string; accent?: string; soon?: boolean }

/** Every project that has a page, in sidebar order, for the home and /projects lists. */
export const allProjects: ListItem[] = [
  { slug: "parkway-wallet", title: "Parkway Wallet", group: "Parkway", blurb: caseStudies[0].summary, accent: caseStudies[0].accent },
  ...["readycash", "gm-core-banking-v1", "gm-core-banking", "gm-field-app", "coronation", "greenwich-mobile", "greenwich-admin", "simpliride-driver", "simpliride-rider", "daneizo"].map((slug) => {
    const f = flowStudies.find((s) => s.slug === slug)!;
    return { slug, title: f.title, group: f.company, blurb: f.blurb ?? "", accent: f.accent };
  }),
  ...comingSoon.map((c) => ({ slug: c.slug, title: c.title, group: "Side projects", blurb: "Case study coming soon", soon: true })),
];
