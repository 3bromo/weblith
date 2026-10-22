import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "@/lib/env";

/**
 * Server-side Supabase client bound to request cookies.
 *
 * Returns `null` until Supabase credentials are configured — no client,
 * no network calls, no invented sessions. All privileged operations run
 * here on the server; the browser only ever sees the public anon key.
 */
export async function createSupabaseServerClient(): Promise<SupabaseClient | null> {
  const config = getSupabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component — middleware refreshes
          // sessions instead; safe to ignore here.
        }
      },
    },
  });
}

export interface AuthUser {
  id: string;
  email: string;
}

/**
 * Current authenticated user for this request, or `null`.
 * Distinguishes "not configured" via `isSupabaseConfigured()`.
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;
  return { id: user.id, email: user.email };
}
