import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { PromptComposer } from "@/components/ai-builder/PromptComposer";
import { Pipeline } from "@/components/ai-builder/Pipeline";

export const metadata: Metadata = {
  title: "AI Website Builder",
  description:
    "Describe the website you want and see how Weblith's AI builder will turn it into a structured, component-rendered site — the generation engine ships in a later phase.",
};

export default function AiBuilderPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI website builder"
        title="Describe it. Weblith drafts the spec."
        lede="Write what you want in plain language. The builder will translate your brief into a validated website specification and render it from reusable components — the model integration itself ships in a later phase."
      />

      <section className="section--tight">
        <div className="container">
          <div className="composer-frame">
            <div className="composer-frame__head">
              <p className="composer-frame__title">New website brief</p>
              <p className="composer-frame__tag">Validation is live · generation comes later</p>
            </div>
            <PromptComposer />
          </div>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container container--wide">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">Architecture</p>
              <h2 className="h2">How generation will flow.</h2>
            </div>
            <div className="section-head__aside">
              <p className="lede">
                Seven deliberate stages between your sentence and a finished
                page. Two are live, two contracts are written, and the rest
                activate as Phase 2 lands.
              </p>
            </div>
          </div>

          <Pipeline />

          <div className="builder-notes">
            <div className="callout">
              <p>
                <strong>No fabricated output.</strong> This page never fakes a
                generated website: <code>POST /api/generate</code> validates
                your brief and answers <code>501 Not Implemented</code> until a
                server-side AI provider is configured.
              </p>
            </div>
            <div className="callout">
              <p>
                <strong>Keys stay server-side.</strong> When the provider
                integration lands, credentials are read only inside the API
                route — never in client bundles. See{" "}
                <code>.env.example</code> for the variables that will be
                required.
              </p>
            </div>
          </div>

          <p className="builder-foot">
            Want the visual side?{" "}
            <Link href="/templates" className="link">
              Browse template concepts
            </Link>{" "}
            or{" "}
            <Link href="/#preview" className="link">
              preview the workspace
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
