import { Check, Lock } from "@/components/icons";

import styles from "./Features.module.css";

const availableNow = [
  {
    title: "Design system & component library",
    body: "Tokens for type, color, space, and motion, plus reusable buttons, cards, forms, and navigation primitives.",
  },
  {
    title: "Complete route foundation",
    body: "Landing, templates, AI builder, pricing, login, signup, and dashboard — all wired with error and empty states.",
  },
  {
    title: "Server-validated AI endpoint",
    body: "POST /api/generate validates website briefs today and returns a structured contract for the future model call.",
  },
  {
    title: "Auth-ready backend",
    body: "Supabase wiring is included: add your project keys and real sign-in, sessions, and storage switch on.",
  },
  {
    title: "Performance & accessibility baseline",
    body: "Self-hosted fonts, keyboard navigation, reduced-motion support, responsive layouts, and a clean production build.",
  },
];

const planned = [
  {
    title: "AI website generation",
    body: "Your description becomes a validated website specification, rendered from approved reusable components.",
  },
  {
    title: "Visual customization",
    body: "Click-to-edit typography, color, sections, and imagery in a live canvas.",
  },
  {
    title: "Interactive 3D experiences",
    body: "React Three Fiber scenes for products and heroes — architecture reserved, no heavy dependencies shipped yet.",
  },
  {
    title: "Projects, preview & publishing",
    body: "Save projects per account, preview desktop/tablet/mobile, publish to Weblith subdomains, connect custom domains.",
  },
];

export function Features() {
  return (
    <section id="features" className="section section--subtle">
      <div className="container container--wide">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 className="h2">A foundation built to grow into the real thing.</h2>
          </div>
          <div className="section-head__aside">
            <p className="lede">
              Phase 1 is honest about where the product stands: the platform
              shell is real and running — the generation engine and editor
              arrive next.
            </p>
            <div className={styles.legend}>
              <span className="badge badge--accent">
                <span className="badge__dot" /> Available in this release
              </span>
              <span className="badge">Planned for later phases</span>
            </div>
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>In this release</h3>
            <ul className="status-list">
              {availableNow.map((item) => (
                <li key={item.title} className="status-item">
                  <span className="status-item__icon" aria-hidden="true">
                    <Check />
                  </span>
                  <span className="status-item__title">{item.title}</span>
                  <p className="status-item__body">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>On the roadmap</h3>
            <ul className="status-list">
              {planned.map((item) => (
                <li
                  key={item.title}
                  className="status-item status-item--planned"
                >
                  <span className="status-item__icon" aria-hidden="true">
                    <Lock />
                  </span>
                  <span className="status-item__title">{item.title}</span>
                  <p className="status-item__body">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
