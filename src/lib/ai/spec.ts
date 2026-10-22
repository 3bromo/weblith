/**
 * AI website generation — architecture preparation.
 *
 * Phase 1 ships the contract, not the integration:
 *
 *   prompt → POST /api/generate → [future: AI provider, server-side]
 *          → WebsiteSpec (validated here) → [future: renderer + editor]
 *
 * `validatePrompt` is live today (used by the API route).
 * `validateWebsiteSpec` will gate every AI response before any
 * component renders it, so untrusted model output can never reach
 * the UI unvalidated.
 */

export interface PaletteSpec {
  background: string;
  surface: string;
  text: string;
  accent: string;
}

export interface TypographySpec {
  heading: string;
  body: string;
}

export interface TextBlock {
  title: string;
  body?: string;
}

export type WebsiteSection =
  | { type: "hero"; heading: string; subheading?: string; image?: string; cta?: string }
  | { type: "gallery"; heading: string; items: { image: string; caption?: string }[] }
  | { type: "features"; heading: string; items: TextBlock[] }
  | { type: "text"; heading: string; body: string }
  | { type: "cta"; heading: string; cta?: string };

export interface WebsiteSpec {
  name: string;
  tagline?: string;
  palette: PaletteSpec;
  typography: TypographySpec;
  sections: WebsiteSection[];
}

export type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; errors: string[] };

const SECTION_TYPES = new Set(["hero", "gallery", "features", "text", "cta"]);

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

export const PROMPT_MIN_LENGTH = 10;
export const PROMPT_MAX_LENGTH = 2000;

export function validatePrompt(
  input: unknown,
): ValidationResult<string> {
  if (typeof input !== "string" || input.trim().length === 0) {
    return { valid: false, errors: ["prompt is required"] };
  }
  const prompt = input.trim();
  if (prompt.length < PROMPT_MIN_LENGTH) {
    return {
      valid: false,
      errors: [`prompt must be at least ${PROMPT_MIN_LENGTH} characters`],
    };
  }
  if (prompt.length > PROMPT_MAX_LENGTH) {
    return {
      valid: false,
      errors: [`prompt must be at most ${PROMPT_MAX_LENGTH} characters`],
    };
  }
  return { valid: true, value: prompt };
}

function isPalette(input: unknown): input is PaletteSpec {
  if (typeof input !== "object" || input === null) return false;
  const palette = input as Record<string, unknown>;
  return (
    typeof palette.background === "string" &&
    HEX_COLOR.test(palette.background) &&
    typeof palette.surface === "string" &&
    HEX_COLOR.test(palette.surface) &&
    typeof palette.text === "string" &&
    HEX_COLOR.test(palette.text) &&
    typeof palette.accent === "string" &&
    HEX_COLOR.test(palette.accent)
  );
}

function validateSection(section: unknown, index: number, errors: string[]): void {
  if (typeof section !== "object" || section === null) {
    errors.push(`sections[${index}] must be an object`);
    return;
  }
  const s = section as Record<string, unknown>;
  if (typeof s.type !== "string" || !SECTION_TYPES.has(s.type)) {
    errors.push(`sections[${index}].type is not an approved section type`);
    return;
  }
  if (typeof s.heading !== "string" || s.heading.trim().length === 0) {
    errors.push(`sections[${index}].heading is required`);
  }
}

/**
 * Structural gate for model output. Rejects anything that does not match
 * the approved contract before a renderer is allowed to touch it.
 */
export function validateWebsiteSpec(input: unknown): ValidationResult<WebsiteSpec> {
  const errors: string[] = [];

  if (typeof input !== "object" || input === null) {
    return { valid: false, errors: ["spec must be an object"] };
  }

  const spec = input as Record<string, unknown>;

  if (typeof spec.name !== "string" || spec.name.trim().length === 0) {
    errors.push("name is required");
  }
  if (spec.tagline !== undefined && typeof spec.tagline !== "string") {
    errors.push("tagline must be a string");
  }
  if (!isPalette(spec.palette)) {
    errors.push(
      "palette must define background, surface, text and accent as 6-digit hex colors",
    );
  }
  if (typeof spec.typography !== "object" || spec.typography === null) {
    errors.push("typography is required");
  } else {
    const typography = spec.typography as Record<string, unknown>;
    if (typeof typography.heading !== "string" || !typography.heading) {
      errors.push("typography.heading is required");
    }
    if (typeof typography.body !== "string" || !typography.body) {
      errors.push("typography.body is required");
    }
  }
  if (!Array.isArray(spec.sections) || spec.sections.length === 0) {
    errors.push("sections must be a non-empty array");
  } else {
    spec.sections.forEach((section, index) =>
      validateSection(section, index, errors),
    );
  }

  if (errors.length > 0) return { valid: false, errors };
  return { valid: true, value: input as unknown as WebsiteSpec };
}
