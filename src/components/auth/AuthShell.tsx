import { Logo } from "@/components/layout/Logo";

import styles from "./AuthShell.module.css";

interface AuthShellProps {
  title: string;
  lede: string;
  /** Honest configuration notice, shown before the form is used. */
  notice?: string | null;
  children: React.ReactNode;
}

/**
 * Shared chrome for /login and /signup: centered, quiet, focused.
 */
export function AuthShell({ title, lede, notice, children }: AuthShellProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
        </div>

        <div className={styles.card}>
          <div className={styles.head}>
            <p className="eyebrow">Account</p>
            <h1 className={`h1 ${styles.title}`}>{title}</h1>
            <p className={styles.lede}>{lede}</p>
          </div>

          {notice ? (
            <div className={`callout ${styles.notice}`} role="status">
              <p>{notice}</p>
            </div>
          ) : null}

          {children}
        </div>
      </div>
    </section>
  );
}
