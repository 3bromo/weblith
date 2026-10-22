import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { footerColumns, site } from "@/lib/site";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={`on-ink ${styles.footer}`}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandHead}>
              <span className={styles.markWrap}>
                <Logo withWordmark={false} />
              </span>
              <span className={styles.brandName}>{site.name}</span>
            </div>
            <p className={styles.blurb}>
              A self-service studio for building visually striking websites —
              with AI, visual editing, and immersive 3D on the roadmap.
            </p>
            <p className={styles.phase}>{site.phaseNote}</p>
          </div>

          <div className={styles.columns}>
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={`Footer — ${column.title}`}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <ul className={styles.columnList}>
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className={styles.columnLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p className={styles.bottomNote}>
            Built for speed, accessibility, and what comes next.
          </p>
        </div>
      </div>
    </footer>
  );
}
