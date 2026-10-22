import { Check, Lock } from "@/components/icons";

import styles from "./Pipeline.module.css";

type Status = "live" | "ready" | "waiting" | "planned";

const steps: {
  number: string;
  title: string;
  body: string;
  status: Status;
}[] = [
  {
    number: "01",
    title: "Receive your description",
    body: "The prompt form posts to a JSON API with length and shape validation.",
    status: "live",
  },
  {
    number: "02",
    title: "Secure server-side call",
    body: "The API route is the only place AI credentials will ever live — keys stay off the client.",
    status: "ready",
  },
  {
    number: "03",
    title: "AI model returns structure",
    body: "A provider call will turn the brief into a structured website specification.",
    status: "waiting",
  },
  {
    number: "04",
    title: "Validate the specification",
    body: "validateWebsiteSpec() rejects anything outside the approved contract before rendering.",
    status: "ready",
  },
  {
    number: "05",
    title: "Render approved components",
    body: "The specification is drawn from the same reusable components this site is built with.",
    status: "planned",
  },
  {
    number: "06",
    title: "Visual editing",
    body: "Every generated element stays editable in the canvas workspace.",
    status: "planned",
  },
  {
    number: "07",
    title: "Save the project",
    body: "Specs persist per account so projects can be reopened and revised.",
    status: "planned",
  },
];

const statusLabel: Record<Status, string> = {
  live: "Live now",
  ready: "Contract ready",
  waiting: "Needs AI keys",
  planned: "Planned",
};

export function Pipeline() {
  return (
    <ol className={styles.list}>
      {steps.map((step) => (
        <li key={step.number} className={styles.step}>
          <div className={styles.head}>
            <span className={styles.number}>{step.number}</span>
            <span
              className={`${styles.badge} ${styles[`badge_${step.status}`]}`}
            >
              {step.status === "live" || step.status === "ready" ? (
                <Check className={styles.badgeIcon} />
              ) : (
                <Lock className={styles.badgeIcon} />
              )}
              {statusLabel[step.status]}
            </span>
          </div>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.body}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
