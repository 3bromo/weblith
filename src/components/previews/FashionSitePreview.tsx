import Image from "next/image";

import styles from "./FashionSitePreview.module.css";

/**
 * A miniature fashion storefront rendered as real markup — used inside
 * the editor-canvas concept preview. Purely illustrative.
 */
export function FashionSitePreview() {
  return (
    <div className={styles.site}>
      <div className={styles.nav}>
        <span className={styles.logo}>ATELIER NORD</span>
        <span className={styles.links}>
          Shop <i>Collections</i> Archive
        </span>
        <span className={styles.bag}>Bag (0)</span>
      </div>

      <div className={styles.hero}>
        <Image
          src="/images/tpl-fashion.jpg"
          alt=""
          fill
          sizes="(max-width: 900px) 90vw, 44vw"
        />
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>Autumn edit · Vol. 04</span>
          <span className={styles.headline}>Structured wool, cut in Tokyo.</span>
          <span className={styles.cta}>View the collection</span>
        </div>
      </div>

      <div className={styles.strip}>
        {[
          { label: "Look 01", color: "#d8cfc0" },
          { label: "Look 02", color: "#2b2823" },
          { label: "Look 03", color: "#b4502b" },
        ].map((look) => (
          <div key={look.label} className={styles.look}>
            <span className={styles.lookSwatch} style={{ background: look.color }} />
            <span className={styles.lookLabel}>{look.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
