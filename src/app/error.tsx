"use client";

import Link from "next/link";

import styles from "./error.module.css";

/**
 * Route-level error boundary. Shown when a page fails to render.
 * Server logs capture the underlying error — nothing is invented here.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.label}>Something went wrong</p>
        <h1 className={`h1 ${styles.title}`}>
          This page hit an unexpected error.
        </h1>
        <p className={`lede ${styles.lede}`}>
          The error was logged on the server
          {error.digest ? (
            <>
              {" "}
              (reference <code className={styles.code}>{error.digest}</code>)
            </>
          ) : null}
          . Try again, or head back to a route we know works.
        </p>
        <div className="btn-row">
          <button type="button" className="btn btn--primary btn--lg" onClick={reset}>
            Try again
          </button>
          <Link href="/" className="btn btn--secondary btn--lg">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
