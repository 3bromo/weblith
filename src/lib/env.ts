/**
 * Environment configuration helpers.
 *
 * All privileged configuration is read server-side only. Nothing here
 * ever exposes secret values to client bundles: these functions return
 * booleans or public endpoints, never keys.
 */

function read(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

export function getSupabaseConfig(): { url: string; anonKey: string } | null {
  const url = read("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = read("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

export function getAIConfig(): {
  provider: string;
  apiKey: string;
  model: string | undefined;
} | null {
  const provider = read("AI_PROVIDER");
  const apiKey = read("AI_API_KEY");
  if (!provider || !apiKey) return null;
  return { provider, apiKey, model: read("AI_MODEL") };
}

export function isAIConfigured(): boolean {
  return getAIConfig() !== null;
}

/** Env var names the UI can show when a feature is not yet configured. */
export const requiredEnv = {
  auth: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
  ai: ["AI_PROVIDER", "AI_API_KEY"],
} as const;
