import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { TemplateBrowser } from "@/components/templates/TemplateBrowser";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Browse the website template categories Weblith is designing for — e-commerce, fashion, beauty, portfolios, real estate, restaurants, and business.",
};

export default function TemplatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Template gallery"
        title="Starting points with a point of view."
        lede="Every Weblith template is a complete art direction — typography, color, spacing, and imagery decided as one system. The concepts below show where the gallery is headed."
      />
      <TemplateBrowser />
    </>
  );
}
