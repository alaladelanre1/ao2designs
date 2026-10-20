export interface Stat { value: string; label: string }
export interface Screen { title: string; text: string; image: string }
export interface Persona { name: string; meta: string[]; goals: string; challenges: string }
export interface Step { title: string; text: string }
export interface Swatch { hex: string; name: string }
export interface CaseStudy {
  slug: string;
  title: string;
  year: string;
  meta: string[];
  summary: string;
  accent: string;            // per-project accent colour
  hero: string;
  heroAlt: string;
  problem?: string;
  outcome?: { text: string; stats: Stat[] };
  worked?: string[];
  screens?: Screen[];
  personas?: Persona[];
  process?: Step[];
  review?: { text: string; stats: Stat[] };
  styleGuide?: { colors: Swatch[]; type: { label: string; sample: string }[] };
  conclusion?: string[];
  links?: { label: string; href?: string }[];
  credits?: { label: string; value: string }[];
  footnote?: string;
}

/** A case study whose body is rebuilt from a Figma dump. */
export interface Meta {
  slug: string;
  title: string;
  year: string;
  accent: string;
  dump: string;      // file name in ./dumps (without extension)
  company: string;   // sidebar group it belongs to
  blurb?: string;
}
