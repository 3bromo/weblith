import { FashionSitePreview } from "@/components/previews/FashionSitePreview";
import { Grip, Lock, Monitor, Plus, Smartphone, SparkWand, Tablet, Type } from "@/components/icons";
import { examplePrompt } from "@/lib/site";

import styles from "./ProductPreview.module.css";

const sections = [
  { label: "Header", active: false },
  { label: "Hero", active: true },
  { label: "Featured collection", active: false },
  { label: "Story split", active: false },
  { label: "Journal", active: false },
  { label: "Footer", active: false },
];

export function ProductPreview() {
  return (
    <section id="preview" className="section section--subtle">
      <div className="container container--wide">
        <div className="section-head section-head--split">
          <div className="section-head__inner">
            <p className="eyebrow">Product preview</p>
            <h2 className="h2">Brief, canvas, and controls — in one workspace.</h2>
          </div>
          <div className="section-head__aside">
            <p className="lede">
              Your description stays pinned above a live canvas, the page
              structure sits to the left, and every design decision is exposed
              on the right.
            </p>
            <p className="small muted">
              This is a design preview of the upcoming workspace. AI generation
              and visual editing are not yet functional in this release.
            </p>
          </div>
        </div>

        <p className="sr-only">
          Example prompt shown in the preview: “{examplePrompt}”
        </p>

        <div className={styles.editor} aria-hidden="true">
          {/* Window bar */}
          <div className={styles.bar}>
            <span className={styles.project}>
              <i className={styles.projectDot} />
              lumiere-parfums
            </span>
            <span className={styles.devices}>
              <span className={`${styles.device} ${styles.deviceActive}`}>
                <Monitor />
              </span>
              <span className={styles.device}>
                <Tablet />
              </span>
              <span className={styles.device}>
                <Smartphone />
              </span>
            </span>
            <span className={styles.barTag}>Workspace concept</span>
          </div>

          {/* Pinned prompt */}
          <div className={styles.promptRow}>
            <span className={styles.promptIcon}>
              <SparkWand />
            </span>
            <p className={styles.promptText}>{examplePrompt}</p>
            <span className={styles.generateBtn}>Generate</span>
          </div>
          <p className={styles.promptNote}>
            Generate stays off until an AI model is connected server-side — no
            request is sent from this preview.
          </p>

          {/* Workspace */}
          <div className={styles.workspace}>
            <aside className={styles.sidebar}>
              <p className={styles.panelTitle}>Sections</p>
              <ul className={styles.sectionList}>
                {sections.map((section) => (
                  <li
                    key={section.label}
                    className={
                      section.active
                        ? `${styles.sectionRow} ${styles.sectionRowActive}`
                        : styles.sectionRow
                    }
                  >
                    <Grip className={styles.grip} />
                    {section.label}
                  </li>
                ))}
              </ul>
              <span className={styles.addRow}>
                <Plus /> Add section
              </span>
            </aside>

            <div className={styles.canvasWrap}>
              <div className={styles.canvas}>
                <FashionSitePreview />
              </div>
              <span className={styles.canvasTag}>Desktop · demo content</span>
            </div>

            <aside className={`${styles.sidebar} ${styles.inspectorPanel}`}>
              <p className={styles.panelTitle}>Design</p>

              <div className={styles.group}>
                <p className={styles.groupLabel}>
                  <Type /> Typography
                </p>
                <div className={styles.kv}>
                  <span>Heading</span>
                  <span className={styles.mono}>Fraunces · 56</span>
                </div>
                <div className={styles.kv}>
                  <span>Body</span>
                  <span className={styles.mono}>Inter · 17</span>
                </div>
              </div>

              <div className={styles.group}>
                <p className={styles.groupLabel}>Palette</p>
                <div className={styles.kv}>
                  <span className={styles.swatchRow}>
                    <i style={{ background: "#f4ecdd" }} />
                    <i style={{ background: "#efeae1" }} />
                    <i style={{ background: "#211e1a" }} />
                    <i style={{ background: "#b4502b" }} />
                  </span>
                  <span className={styles.mono}>#B4502B</span>
                </div>
              </div>

              <div className={styles.group}>
                <p className={styles.groupLabel}>Spacing</p>
                <div className={styles.slider}>
                  <i style={{ left: "38%" }} />
                </div>
                <div className={styles.slider}>
                  <i style={{ left: "62%" }} />
                </div>
              </div>

              <div className={`${styles.group} ${styles.groupSoon}`}>
                <p className={styles.groupLabel}>
                  3D scene <Lock className={styles.lock} />
                </p>
                <p className={styles.soonText}>Interactive scenes ship later</p>
              </div>
            </aside>
          </div>

          <div className={styles.statusBar}>
            <i className={styles.statusDot} />
            Demo canvas — projects and autosave arrive with the dashboard phase.
          </div>
        </div>
      </div>
    </section>
  );
}
