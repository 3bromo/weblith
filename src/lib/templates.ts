/**
 * Template concept definitions. These describe art-directed previews of
 * categories Weblith is designing for — none are installable yet.
 * The shape mirrors the future database model (slug, category, status).
 */

export type TemplateVariant =
  | "perfume"
  | "fashion"
  | "commerce"
  | "portfolio"
  | "estate"
  | "restaurant"
  | "business";

export interface TemplateConcept {
  slug: string;
  name: string;
  category: string;
  variant: TemplateVariant;
  /** Where this concept appears (landing showcase shows a subset). */
  featured: boolean;
  blurb: string;
}

export const templateConcepts: TemplateConcept[] = [
  {
    slug: "lumiere-parfums",
    name: "Lumière",
    category: "Perfume & beauty",
    variant: "perfume",
    featured: true,
    blurb: "Ivory editorial layout with cinematic product stills.",
  },
  {
    slug: "atelier-nord",
    name: "Atelier Nord",
    category: "Fashion",
    variant: "fashion",
    featured: true,
    blurb: "Full-bleed imagery, sharp type, minimal navigation.",
  },
  {
    slug: "mercantile",
    name: "Mercantile",
    category: "E-commerce",
    variant: "commerce",
    featured: true,
    blurb: "Product-first grid with quiet, confident merchandising.",
  },
  {
    slug: "studio-index",
    name: "Studio Index",
    category: "Creative portfolios",
    variant: "portfolio",
    featured: true,
    blurb: "Dark portfolio built around large typographic moments.",
  },
  {
    slug: "acre-oak",
    name: "Acre & Oak",
    category: "Real estate",
    variant: "estate",
    featured: true,
    blurb: "Split layouts for listings, stories, and neighborhoods.",
  },
  {
    slug: "osteria-vecchia",
    name: "Osteria Vecchia",
    category: "Restaurants",
    variant: "restaurant",
    featured: true,
    blurb: "Warm, menu-driven design made for evening light.",
  },
  {
    slug: "meridian",
    name: "Meridian",
    category: "Business",
    variant: "business",
    featured: false,
    blurb: "Composed, credible layouts for companies and studios.",
  },
];
