"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, requiredEnv } from "@/lib/env";
import type { AuthFormState } from "@/lib/auth/form-state";

/**
 * Server actions for authentication. The form UI calls these; the actual
 * Supabase round-trip happens only on the server and only when real
 * credentials are configured. Unconfigured builds return an explicit
 * notice — never a simulated session.
 */

function unconfiguredState(): AuthFormState {
  return {
    status: "unconfigured",
    message: `Sign-in is not connected in this build: no Supabase credentials are configured. Set ${requiredEnv.auth.join(" and ")} in .env.local (see README) to enable real authentication.`,
  };
}

function validateCredentials(email: string, password: string) {
  const errors: { email?: string; password?: string } = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  return errors;
}

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return unconfiguredState();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const errors = validateCredentials(email, password);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, message: "Please fix the fields below." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return unconfiguredState();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return unconfiguredState();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const errors = validateCredentials(email, password);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, message: "Please fix the fields below." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return unconfiguredState();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: "/dashboard" },
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return {
    status: "success",
    message:
      "Account created. Check your inbox to confirm your email, then log in.",
  };
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/");
}
