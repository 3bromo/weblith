import Link from "next/link";
import Image from "next/image";

import { ArrowRight, SparkWand } from "@/components/icons";
import { site } from "@/lib/site";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container container--wide ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`eyebrow reveal ${styles.eyebrow}`}>AI-powered website studio</p>

          <h1 className={`display reveal reveal-d1 ${styles.title}`}>
            Build <em className={styles.titleAccent}>Beyond</em> Templates.
          </h1>

          <p className={`lede reveal reveal-d2 ${styles.lede}`}>{site.description}</p>

          <div className="btn-row reveal reveal-d3">
            <Link href="/signup" className="btn btn--primary btn--lg">
              Create Your Website
              <ArrowRight />
            </Link>
            <Link href="/templates" className="btn btn--secondary btn--lg">
              Explore Templates
            </Link>
          </div>

          <p className={`reveal reveal-d4 ${styles.caption}`}>
            <span className={styles.captionDot} aria-hidden="true" />
            {site.phaseNote}
          </p>
        </div>

        <figure className={`reveal reveal-d3 ${styles.preview}`}>
          <div className={styles.window} aria-hidden="true">
            <div className={styles.chrome}>
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.urlPill}>
                weblith.app&nbsp;/&nbsp;projects&nbsp;/&nbsp;lumiere
              </span>
              <span className={styles.chromeTag}>Concept</span>
            </div>

            <div className={styles.mockBody}>
              <div className={styles.siteNav}>
                <span className={styles.siteLogo}>LUMIÈRE</span>
                <span className={styles.siteLinks}>
                  Collection <em>Story</em> Journal
                </span>
                <span className={styles.siteCart}>Bag (0)</span>
              </div>

              <div className={styles.siteHero}>
                <div className={styles.siteHeroText}>
                  <span className={styles.kicker}>Eau de parfum · 50 ml</span>
                  <span className={styles.selection}>
                    <span className={styles.siteTitle}>Amber Veil</span>
                    <i className={`${styles.handle} ${styles.handleTl}`} />
                    <i className={`${styles.handle} ${styles.handleTr}`} />
                    <i className={`${styles.handle} ${styles.handleBl}`} />
                    <i className={`${styles.handle} ${styles.handleBr}`} />
                  </span>
                  <p className={styles.siteLine}>
                    Saffron, warm resin, and a trace of smoked cedar — composed
                    for late light.
                  </p>
                  <div className={styles.siteBuyRow}>
                    <span className={styles.price}>€148</span>
                    <span className={styles.siteBtn}>Add to bag</span>
                  </div>
                </div>
                <div className={styles.siteHeroImg}>
                  <Image
                    src="/images/hero-perfume.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 960px) 45vw, 24vw"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className={styles.inspector}>
              <p className={styles.inspectorHead}>Section · Hero</p>
              <div className={styles.inspectorRow}>
                <span>Heading</span>
                <span className={styles.mono}>Fraunces 56</span>
              </div>
              <div className={styles.inspectorRow}>
                <span>Palette</span>
                <span className={styles.swatches}>
                  <i style={{ background: "#f4ecdd" }} />
                  <i style={{ background: "#1d1a16" }} />
                  <i style={{ background: "#c9431a" }} />
                  <i style={{ background: "#b9a27d" }} />
                </span>
              </div>
              <div className={styles.inspectorRow}>
                <span>3D scene</span>
                <span className={styles.soon}>soon</span>
              </div>
            </div>

            <div className={styles.promptChip}>
              <span className={styles.chipIcon}>
                <SparkWand />
              </span>
              Make the shot warmer and more cinematic
            </div>

            <div className={styles.cursorTag}>You</div>
          </div>

          <figcaption className={styles.figcaption}>
            <span className="badge badge--accent">Concept preview</span>
            <span>
              An interface concept of the Weblith editor designing a perfume
              store — the editor itself ships in a later phase.
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
