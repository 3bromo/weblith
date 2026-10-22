import { validatePrompt } from "@/lib/ai/spec";
import { isAIConfigured, requiredEnv } from "@/lib/env";

/**
 * POST /api/generate — the future AI generation entry point.
 *
 * Phase 1 behavior (deliberate, not a stub-and-pretend):
 *  1. Validates the incoming brief with the same contract the AI
 *     pipeline will use (400 on failure).
 *  2. Returns 501 Not Implemented with a structured payload: the
 *     server-side model call does not exist yet, and no AI request
 *     is made or simulated.
 *
 * Future phases keep this route server-side: model keys are read from
 * the environment here and never reach client bundles.
 */

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        ok: false,
        code: "invalid_json",
        errors: ["Request body must be a JSON object"],
      },
      { status: 400 },
    );
  }

  const prompt =
    typeof body === "object" && body !== null
      ? (body as { prompt?: unknown }).prompt
      : undefined;

  const validation = validatePrompt(prompt);
  if (!validation.valid) {
    return Response.json(
      { ok: false, code: "invalid_prompt", errors: validation.errors },
      { status: 400 },
    );
  }

  if (!isAIConfigured()) {
    return Response.json(
      {
        ok: false,
        code: "ai_not_configured",
        message:
          "Your brief is valid, but no AI request was made: this build ships without AI credentials. Configure the server-side provider environment to enable generation.",
        requiredEnv: requiredEnv.ai,
        nextStep:
          "Set the variables in .env.local, then implement the provider call in src/lib/ai — this route already validates prompts and will gate model output with validateWebsiteSpec().",
      },
      { status: 501 },
    );
  }

  return Response.json(
    {
      ok: false,
      code: "ai_not_implemented",
      message:
        "An AI provider is configured, but the model integration ships in a later phase. Nothing was generated.",
    },
    { status: 501 },
  );
}

export async function GET() {
  return Response.json(
    {
      ok: false,
      code: "method_not_allowed",
      message: "Use POST with a JSON body: { \"prompt\": \"...\" }",
    },
    { status: 405, headers: { Allow: "POST" } },
  );
}
