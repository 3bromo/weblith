import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Shared header for interior routes (templates, builder, pricing,
 * account pages) so every page opens with the same rhythm.
 */
export function PageHeader({ eyebrow, title, lede, children }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className="container">
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className={`h1 reveal reveal-d1 ${styles.title}`}>{title}</h1>
        {lede ? <p className={`lede reveal reveal-d2 ${styles.lede}`}>{lede}</p> : null}
        {children ? <div className={styles.extra}>{children}</div> : null}
      </div>
    </header>
  );
}
