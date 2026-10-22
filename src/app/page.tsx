import { Hero } from "@/components/marketing/Hero";
import { ProductPreview } from "@/components/marketing/ProductPreview";
import { TemplatesShowcase } from "@/components/marketing/TemplatesShowcase";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FinalCta } from "@/components/marketing/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductPreview />
      <TemplatesShowcase />
      <Features />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
