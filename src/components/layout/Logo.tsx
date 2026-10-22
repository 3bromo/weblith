import Link from "next/link";

import { site } from "@/lib/site";
import styles from "./Logo.module.css";

/**
 * Weblith mark: a stamped square holding a chiselled “W” —
 * a nod to lithographic print, drawn as strokes so it stays
 * crisp at any size and inherits `currentColor`.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
    >
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        rx="8"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M7.5 8.5 11.6 23l4.4-9.6L20.4 23 24.5 8.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <Link href="/" className={styles.logo} aria-label={`${site.name} — home`}>
      <LogoMark className={styles.mark} />
      {withWordmark ? <span className={styles.wordmark}>{site.name}</span> : null}
    </Link>
  );
}
