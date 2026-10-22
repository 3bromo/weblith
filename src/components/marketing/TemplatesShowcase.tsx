import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { templateConcepts } from "@/lib/templates";
import { templateCategories } from "@/lib/site";

import styles from "./TemplatesShowcase.module.css";

export function TemplatesShowcase() {
  const featured = templateConcepts.filter((concept) => concept.featured);

  return (
    <section id="templates" className="section">
      <div className="container container--wide">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">Template gallery</p>
            <h2 className="h2">Designed for the sites people actually build.</h2>
          </div>
          <div className="section-head__aside">
            <p className="lede">
              A curated library of art-directed starting points — each one
              composed across typography, color, and layout, never assembled
              from stock parts.
            </p>
            <Link href="/templates" className="link-arrow">
              Browse the gallery
              <ArrowRight />
            </Link>
          </div>
        </div>

        <ul className={styles.grid}>
          {featured.map((concept) => (
            <li key={concept.slug}>
              <TemplateCard concept={concept} />
            </li>
          ))}
        </ul>

        <div className={styles.footnote}>
          <p className="rule-label">Every category in development</p>
          <p className={styles.categories}>
            {templateCategories.join("  ·  ")}
          </p>
        </div>
      </div>
    </section>
  );
}
