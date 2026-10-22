/**
 * Central site configuration. Content and navigation live here so
 * routes, header and footer stay in sync.
 */

export const site = {
  name: "Weblith",
  tagline: "Build Beyond Templates.",
  description:
    "Create stunning websites with AI, customize every detail visually, and bring your ideas to life with immersive 3D experiences — no coding required.",
  phaseNote:
    "Phase 1 foundation: AI generation, visual editing, 3D scenes, and publishing ship in later phases.",
} as const;

export const navLinks = [
  { href: "/templates", label: "Templates" },
  { href: "/ai-builder", label: "AI Website Builder" },
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
] as const;

export const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "/templates", label: "Templates" },
      { href: "/ai-builder", label: "AI Website Builder" },
      { href: "/#features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Sign up" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
] as const;

/** The example prompt used across the product-preview surfaces. */
export const examplePrompt =
  "Create a luxury perfume store with elegant typography, warm ivory colors, cinematic product photography, and an interactive 3D perfume bottle.";

/** Template categories Weblith is designing for (all future-facing). */
export const templateCategories = [
  "E-commerce",
  "Fashion",
  "Perfume & beauty",
  "Creative portfolios",
  "Real estate",
  "Restaurants",
  "Business",
] as const;
