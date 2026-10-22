import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";
import { isSupabaseConfigured, requiredEnv } from "@/lib/env";
import { getAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your Weblith account.",
};

export default async function SignupPage() {
  const configured = isSupabaseConfigured();

  if (configured) {
    const user = await getAuthUser();
    if (user) redirect("/dashboard");
  }

  const notice = configured
    ? null
    : `Registration is not connected in this build: no Supabase credentials are configured. Set ${requiredEnv.auth.join(" and ")} in .env.local (see the README) to enable real accounts — no account is created without a real provider.`;

  return (
    <AuthShell
      title="Claim your workspace."
      lede="Create an account to keep projects, prompts, and future sites in one place. Sign-up runs through Supabase once credentials are configured."
      notice={notice}
    >
      <AuthForm mode="signup" hasConfigNotice={notice !== null} />
    </AuthShell>
  );
}
