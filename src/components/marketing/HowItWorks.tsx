import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Choose a template or describe your idea",
    body: "Start from a curated layout or write a brief in plain language. The brief becomes a structured website specification.",
    status: "Brief input works today · generation ships later",
  },
  {
    number: "02",
    title: "Customize your website visually",
    body: "Adjust type, color, sections, and imagery in a live canvas — every control writes back to the same specification.",
    status: "Planned for the editor phase",
  },
  {
    number: "03",
    title: "Prepare and publish your website",
    body: "Check every breakpoint, then publish to a Weblith subdomain — custom domains connect when you are ready.",
    status: "Planned for the publishing phase",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container container--wide">
        <div className="section-head">
          <p className="eyebrow">How it works</p>
          <h2 className="h2">Three steps from idea to live website.</h2>
          <p className="lede">
            The flow Weblith is building toward — simple on purpose. Each step
            activates as its phase lands.
          </p>
        </div>

        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {step.number}
              </span>
              <div className={styles.body}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.body}</p>
                <p className={styles.status}>{step.status}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
