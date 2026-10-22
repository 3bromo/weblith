import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PageHeader } from "@/components/layout/PageHeader";
import { LogoMark } from "@/components/layout/Logo";
import { ArrowRight } from "@/components/icons";
import { signOut } from "@/lib/actions/auth";
import { isSupabaseConfigured, requiredEnv } from "@/lib/env";
import { getAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Weblith workspace — projects, prompts, and sites in one place.",
};

const starterSteps = [
  {
    title: "Browse template concepts",
    body: "See the art directions the gallery is being designed around.",
    href: "/templates",
    cta: "Open gallery",
    status: "Concepts viewable",
    statusKind: "accent" as const,
  },
  {
    title: "Write your first AI brief",
    body: "Compose and validate a website description against the future spec contract.",
    href: "/ai-builder",
    cta: "Open builder",
    status: "Validation live",
    statusKind: "ok" as const,
  },
  {
    title: "Review the planned tiers",
    body: "Understand what launches free and what arrives with paid plans.",
    href: "/pricing",
    cta: "See pricing",
    status: "Info page",
    statusKind: "neutral" as const,
  },
];

export default async function DashboardPage() {
  const configured = isSupabaseConfigured();
  const user = configured ? await getAuthUser() : null;

  if (configured && !user) redirect("/login");

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title={user ? "Your workspace." : "A workspace, waiting to be filled."}
        lede={
          user
            ? "Signed in and ready. Projects and the visual editor arrive with Phase 2 — until then, everything below is genuinely available."
            : "This is the first-time dashboard: no projects exist yet, because project storage ships in a later phase."
        }
      >
        {user ? (
          <div className="dash-account">
            <span className="dash-account__id">
              Signed in as <strong>{user.email}</strong>
            </span>
            <form action={signOut}>
              <button type="submit" className="btn btn--secondary btn--sm">
                Log out
              </button>
            </form>
          </div>
        ) : null}
      </PageHeader>

      <section className="section--tight">
        <div className="container">
          {!configured ? (
            <div className="callout dash-notice" role="status">
              <p>
                <strong>Authentication is not connected in this build.</strong>{" "}
                You are seeing the dashboard without signing in because{" "}
                {requiredEnv.auth.join(" and ")} are not set. Configure
                Supabase in <code>.env.local</code> and this route will require
                a real session before showing a workspace.
              </p>
            </div>
          ) : null}

          <div className="dash-empty">
            <div className="dash-empty__mark" aria-hidden="true">
              <LogoMark className="dash-empty__mark-icon" />
            </div>
            <h2 className="h3 dash-empty__title">No projects yet</h2>
            <p className="dash-empty__body">
              Projects, autosave, and the visual editor are Phase 2. When they
              land, every site you create appears here — stored against your
              account and ready to reopen.
            </p>
          </div>

          <div className="dash-section">
            <h2 className="dash-section__title">Start with what works today</h2>
            <ul className="dash-steps">
              {starterSteps.map((step) => (
                <li key={step.href} className="dash-step">
                  <div className="dash-step__head">
                    <span
                      className={`dash-step__status dash-step__status--${step.statusKind}`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <h3 className="dash-step__title">{step.title}</h3>
                  <p className="dash-step__body">{step.body}</p>
                  <Link href={step.href} className="link-arrow dash-step__link">
                    {step.cta}
                    <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
