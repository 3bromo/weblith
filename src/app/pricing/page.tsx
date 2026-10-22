import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowRight, Check } from "@/components/icons";

import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "The planned Weblith pricing structure — free while the foundation matures, paid plans when AI generation and publishing ship. Billing is not active in this release.",
};

interface PlanFeature {
  label: string;
  available: boolean;
}

interface Plan {
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  features: PlanFeature[];
  cta: { label: string; href?: string; primary: boolean };
  emphasis?: boolean;
}

const plans: Plan[] = [
  {
    name: "Explorer",
    price: "Free",
    blurb: "For exploring the platform while the foundation matures.",
    features: [
      { label: "Template concept gallery", available: true },
      { label: "AI brief validation", available: true },
      { label: "Workspace preview", available: true },
      { label: "AI generations each month", available: false },
      { label: "Publish to a Weblith subdomain", available: false },
    ],
    cta: { label: "Create your account", href: "/signup", primary: true },
  },
  {
    name: "Creator",
    price: "$19",
    cadence: "/ month",
    blurb: "For makers who want to design, generate, and ship real sites.",
    features: [
      { label: "Everything in Explorer", available: true },
      { label: "AI website generation", available: false },
      { label: "Visual editor & saved projects", available: false },
      { label: "Desktop / tablet / mobile previews", available: false },
      { label: "Publish to a Weblith subdomain", available: false },
    ],
    cta: { label: "Available at launch", primary: false },
    emphasis: true,
  },
  {
    name: "Studio",
    price: "$49",
    cadence: "/ month",
    blurb: "For studios and teams managing several client sites.",
    features: [
      { label: "Everything in Creator", available: true },
      { label: "Custom domains", available: false },
      { label: "Interactive 3D scenes", available: false },
      { label: "Priority generation queue", available: false },
      { label: "Team seats", available: false },
    ],
    cta: { label: "Available at launch", primary: false },
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Planned pricing, stated plainly."
        lede="Weblith has no billing yet. The tiers below outline the intended structure — free while the foundation matures, paid plans when generation and publishing ship. Nothing can be purchased in this release."
      >
        <div className={styles.legend}>
          <span className="badge badge--ok">
            <Check /> Included from day one
          </span>
          <span className="badge">Arrives with a later phase</span>
        </div>
      </PageHeader>

      <section className="section--tight">
        <div className="container container--wide">
          <ul className={styles.grid}>
            {plans.map((plan) => (
              <li
                key={plan.name}
                className={
                  plan.emphasis
                    ? `${styles.card} ${styles.cardEmphasis}`
                    : styles.card
                }
              >
                <div className={styles.cardHead}>
                  <div className={styles.planRow}>
                    <h2 className={styles.planName}>{plan.name}</h2>
                    {plan.emphasis ? (
                      <span className={`badge badge--accent ${styles.planBadge}`}>
                        Intended default
                      </span>
                    ) : null}
                  </div>
                  <p className={styles.price}>
                    {plan.price}
                    {plan.cadence ? (
                      <span className={styles.cadence}>{plan.cadence}</span>
                    ) : null}
                  </p>
                  <p className={styles.blurb}>{plan.blurb}</p>
                </div>

                <ul className={styles.features}>
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={
                        feature.available
                          ? styles.feature
                          : `${styles.feature} ${styles.featurePlanned}`
                      }
                    >
                      <span
                        className={styles.tick}
                        aria-hidden="true"
                        data-state={feature.available ? "on" : "off"}
                      >
                        {feature.available ? <Check /> : "○"}
                      </span>
                      {feature.label}
                      {!feature.available ? (
                        <span className="sr-only"> (planned)</span>
                      ) : null}
                    </li>
                  ))}
                </ul>

                {plan.cta.href ? (
                  <Link href={plan.cta.href} className={`btn ${plan.cta.primary ? "btn--primary" : "btn--secondary"}`}>
                    {plan.cta.label}
                    <ArrowRight />
                  </Link>
                ) : (
                  <span className={`btn btn--secondary ${styles.disabledCta}`}>
                    {plan.cta.label}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className={`callout ${styles.notice}`} role="status">
            <p>
              <strong>Billing is not implemented.</strong> No payments are
              taken, no plan can be purchased, and final prices will be
              announced at launch. The free Explorer tier is the only plan
              relevant to this release.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
