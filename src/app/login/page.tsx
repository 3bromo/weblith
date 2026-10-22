import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";
import { isSupabaseConfigured, requiredEnv } from "@/lib/env";
import { getAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Weblith workspace.",
};

export default async function LoginPage() {
  const configured = isSupabaseConfigured();

  // Already signed in? Go straight to the workspace.
  if (configured) {
    const user = await getAuthUser();
    if (user) redirect("/dashboard");
  }

  const notice = configured
    ? null
    : `Authentication is not connected in this build: no Supabase credentials are configured. Set ${requiredEnv.auth.join(" and ")} in .env.local (see the README) to enable real sign-in — this form never accepts unverified credentials.`;

  return (
    <AuthShell
      title="Welcome back."
      lede="Log in to reach your workspace. Sign-in runs through Supabase once credentials are configured."
      notice={notice}
    >
      <AuthForm mode="login" hasConfigNotice={notice !== null} />
    </AuthShell>
  );
}
