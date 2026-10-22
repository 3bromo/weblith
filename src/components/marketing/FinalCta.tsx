import Link from "next/link";

import { ArrowRight } from "@/components/icons";

import styles from "./FinalCta.module.css";

export function FinalCta() {
  return (
    <section className={`on-ink section--ink ${styles.cta}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Start here</p>
          <h2 className={`display ${styles.title}`}>
            Build the site you keep picturing.
          </h2>
          <p className={`lede ${styles.lede}`}>
            Claim your workspace now — the AI builder, editor, and publishing
            tools unlock as each phase of Weblith ships.
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/signup" className="btn btn--on-ink btn--lg">
            Create Your Website
            <ArrowRight />
          </Link>
          <Link href="/pricing" className="btn btn--secondary btn--lg">
            See pricing
          </Link>
          <p className={styles.note}>
            No credit card required in Phase 1 — accounts wire up once you
            connect Supabase.
          </p>
        </div>
      </div>
    </section>
  );
}
