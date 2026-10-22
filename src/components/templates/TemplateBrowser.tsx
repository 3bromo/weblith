"use client";

import { useMemo, useState } from "react";

import { TemplateCard } from "@/components/templates/TemplateCard";
import { templateConcepts } from "@/lib/templates";
import { templateCategories } from "@/lib/site";

import styles from "./TemplateBrowser.module.css";

const filters = ["All", ...templateCategories] as const;

/**
 * Category filter over the concept set. The gallery's real "empty" state
 * is the banner below: nothing here is installable until the templates
 * phase ships.
 */
export function TemplateBrowser() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? templateConcepts
        : templateConcepts.filter((concept) => concept.category === active),
    [active],
  );

  return (
    <section className="section--tight">
      <div className="container container--wide">
        <div className={`callout ${styles.banner}`} role="status">
          <p>
            <strong>The gallery opens when the first templates ship.</strong>{" "}
            What you see below are art-directed design concepts for each
            category — browsing details and one-click installs arrive with the
            templates phase. Nothing here can be installed yet.
          </p>
        </div>

        <div className={styles.toolbar}>
          <div
            className={styles.filters}
            role="group"
            aria-label="Filter templates by category"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={
                  filter === active
                    ? `${styles.chip} ${styles.chipActive}`
                    : styles.chip
                }
                aria-pressed={filter === active}
                onClick={() => setActive(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className={styles.count} aria-live="polite">
            {visible.length} concept{visible.length === 1 ? "" : "s"}
            {active !== "All" ? ` in ${active}` : ""}
          </p>
        </div>

        {visible.length > 0 ? (
          <ul className={styles.grid}>
            {visible.map((concept) => (
              <li key={concept.slug}>
                <TemplateCard concept={concept} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>
              No concepts in {active} yet.
            </p>
            <p className="small muted">
              This category is in early design — check back as phases ship, or
              browse everything.
            </p>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setActive("All")}
            >
              Show all categories
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
