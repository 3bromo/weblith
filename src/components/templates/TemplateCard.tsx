import Image from "next/image";

import type { TemplateConcept, TemplateVariant } from "@/lib/templates";

import styles from "./TemplateCard.module.css";

/**
 * Miniature website previews composed from real markup + local imagery —
 * each category gets its own art direction. Decorative only: the card's
 * text metadata carries the accessible information.
 */
function Thumb({ variant }: { variant: TemplateVariant }) {
  switch (variant) {
    case "perfume":
      return (
        <div className={`${styles.thumb} ${styles.thumbPerfume}`}>
          <div className={styles.miniNav}>
            <span>LUMIÈRE</span>
            <span className={styles.miniDots}>·&nbsp;·&nbsp;·</span>
          </div>
          <div className={styles.perfumeStack}>
            <div className={styles.perfumeImg}>
              <Image
                src="/images/tpl-perfume.jpg"
                alt=""
                fill
                sizes="(max-width: 700px) 50vw, 22vw"
              />
            </div>
            <span className={styles.perfumeKicker}>Édition No. 07</span>
            <span className={styles.perfumeLink}>Discover</span>
          </div>
        </div>
      );

    case "fashion":
      return (
        <div className={`${styles.thumb} ${styles.thumbFashion}`}>
          <Image
            src="/images/tpl-fashion.jpg"
            alt=""
            fill
            sizes="(max-width: 700px) 50vw, 22vw"
          />
          <div className={styles.fashionBar}>ATELIER NORD</div>
          <span className={styles.fashionTag}>Autumn edit →</span>
        </div>
      );

    case "commerce":
      return (
        <div className={`${styles.thumb} ${styles.thumbCommerce}`}>
          <div className={styles.miniNav}>
            <span>MERCANTILE</span>
            <span>Cart (2)</span>
          </div>
          <div className={styles.commerceGrid}>
            <div className={styles.commerceImg}>
              <Image
                src="/images/tpl-commerce.jpg"
                alt=""
                fill
                sizes="(max-width: 700px) 25vw, 11vw"
              />
            </div>
            <div className={styles.commerceTile} style={{ background: "#e4dccb" }}>
              <span className={styles.priceTag}>$120</span>
            </div>
            <div className={styles.commerceTile} style={{ background: "#2c2924" }}>
              <span className={`${styles.priceTag} ${styles.priceTagLight}`}>$86</span>
            </div>
            <div className={styles.commerceTile} style={{ background: "#c9431a" }}>
              <span className={`${styles.priceTag} ${styles.priceTagLight}`}>$240</span>
            </div>
          </div>
        </div>
      );

    case "portfolio":
      return (
        <div className={`${styles.thumb} ${styles.thumbPortfolio}`}>
          <span className={styles.portfolioName}>MARA VOSS</span>
          <span className={styles.portfolioRole}>Art direction &amp; image-making</span>
          <div className={styles.portfolioRow}>
            <div className={styles.portfolioImg}>
              <Image
                src="/images/tpl-portfolio.jpg"
                alt=""
                fill
                sizes="(max-width: 700px) 25vw, 11vw"
              />
            </div>
            <div className={styles.portfolioBlock}>
              Selected
              <br />
              work ’26
            </div>
          </div>
        </div>
      );

    case "estate":
      return (
        <div className={`${styles.thumb} ${styles.thumbEstate}`}>
          <div className={styles.estateImg}>
            <Image
              src="/images/tpl-estate.jpg"
              alt=""
              fill
              sizes="(max-width: 700px) 30vw, 13vw"
            />
          </div>
          <div className={styles.estateCopy}>
            <span className={styles.estateKicker}>Acre &amp; Oak</span>
            <span className={styles.estateHead}>Homes with quiet confidence.</span>
            <span className={styles.estateRow}>Now viewing · 6 residences</span>
            <span className={styles.estateCta}>View listings</span>
          </div>
        </div>
      );

    case "restaurant":
      return (
        <div className={`${styles.thumb} ${styles.thumbRestaurant}`}>
          <span className={styles.restName}>OSTERIA VECCHIA</span>
          <span className={styles.restDivider} />
          <span className={styles.restLine}>Wood-fired, open flame, natural wine</span>
          <div className={styles.restImg}>
            <Image
              src="/images/tpl-restaurant.jpg"
              alt=""
              fill
              sizes="(max-width: 700px) 40vw, 17vw"
            />
          </div>
          <span className={styles.restCta}>Book a table</span>
        </div>
      );

    case "business":
      return (
        <div className={`${styles.thumb} ${styles.thumbBusiness}`}>
          <div className={styles.miniNav}>
            <span>MERIDIAN</span>
            <span>Contact</span>
          </div>
          <span className={styles.bizHead}>Capital for considered growth.</span>
          <div className={styles.bizCols}>
            <span>Strategy</span>
            <span>Operations</span>
            <span>Ventures</span>
          </div>
          <span className={styles.bizCta}>Start a conversation</span>
        </div>
      );
  }
}

export function TemplateCard({ concept }: { concept: TemplateConcept }) {
  return (
    <article className={styles.card}>
      <div aria-hidden="true">
        <Thumb variant={concept.variant} />
      </div>
      <div className={styles.meta}>
        <div className={styles.metaText}>
          <p className={styles.category}>{concept.category}</p>
          <h3 className={styles.name}>{concept.name}</h3>
          <p className={styles.blurb}>{concept.blurb}</p>
        </div>
        <span className={`badge ${styles.statusBadge}`}>
          <span className="badge__dot" />
          Concept
        </span>
      </div>
    </article>
  );
}
