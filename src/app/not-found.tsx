import Link from "next/link";

import { ArrowRight } from "@/components/icons";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={`h1 ${styles.title}`}>
          This page hasn’t been built yet.
        </h1>
        <p className={`lede ${styles.lede}`}>
          The link points somewhere Weblith doesn’t serve — either it belongs
          to a future phase, or the address is off. Everything that exists
          today is one click away.
        </p>
        <div className="btn-row">
          <Link href="/" className="btn btn--primary btn--lg">
            Back home
          </Link>
          <Link href="/templates" className="btn btn--secondary btn--lg">
            Browse templates
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
