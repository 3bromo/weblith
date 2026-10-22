"use client";

import { useState } from "react";

import { SparkWand } from "@/components/icons";
import { examplePrompt } from "@/lib/site";
import { PROMPT_MAX_LENGTH, PROMPT_MIN_LENGTH } from "@/lib/ai/spec";

import styles from "./PromptComposer.module.css";

type ResultState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "rejected"; errors: string[] }
  | {
      kind: "not_implemented";
      code: string;
      message: string;
      requiredEnv?: string[];
      nextStep?: string;
    }
  | { kind: "network_error"; message: string };

/**
 * The real brief-composition surface for the future AI builder.
 * Submits to POST /api/generate, which validates the prompt server-side
 * and reports honestly that generation is not implemented yet.
 */
export function PromptComposer() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<ResultState>({ kind: "idle" });

  const remaining = PROMPT_MAX_LENGTH - prompt.trim().length;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult({ kind: "loading" });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        code?: string;
        errors?: string[];
        message?: string;
        requiredEnv?: string[];
        nextStep?: string;
      };

      if (response.status === 400) {
        setResult({
          kind: "rejected",
          errors: data.errors ?? ["The prompt was rejected."],
        });
        return;
      }

      if (!response.ok) {
        setResult({
          kind: "not_implemented",
          code: data.code ?? `http_${response.status}`,
          message:
            data.message ??
            "Generation is not available yet — no website was created.",
          requiredEnv: data.requiredEnv,
          nextStep: data.nextStep,
        });
        return;
      }

      // Success path reserved for the generation phase; until a 200
      // exists, treat anything else as not implemented.
      setResult({
        kind: "not_implemented",
        code: "ai_not_implemented",
        message: "Generation is not available yet — no website was created.",
      });
    } catch (error) {
      setResult({
        kind: "network_error",
        message:
          error instanceof Error
            ? `Could not reach the API: ${error.message}`
            : "Could not reach the API.",
      });
    }
  }

  return (
    <div className={styles.composer}>
      <form onSubmit={submit} className={styles.form} noValidate>
        <div className={styles.labelRow}>
          <label htmlFor="brief" className={styles.label}>
            Describe your website
          </label>
          <span
            className={
              remaining < 200
                ? `${styles.counter} ${styles.counterLow}`
                : styles.counter
            }
            aria-hidden="true"
          >
            {prompt.trim().length}/{PROMPT_MAX_LENGTH}
          </span>
        </div>

        <textarea
          id="brief"
          className={`textarea ${styles.textarea}`}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          maxLength={PROMPT_MAX_LENGTH}
          rows={5}
          placeholder={examplePrompt}
          aria-describedby="brief-help"
        />

        <div className={styles.actions}>
          <div className={styles.actionRow}>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={result.kind === "loading"}
            >
              <SparkWand />
              {result.kind === "loading" ? "Checking brief…" : "Generate website"}
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setPrompt(examplePrompt)}
            >
              Use example prompt
            </button>
          </div>
          <p id="brief-help" className={styles.help}>
            Briefs are validated server-side ({PROMPT_MIN_LENGTH}–
            {PROMPT_MAX_LENGTH} characters). No request is sent to an AI model
            in this build — generation activates when a server-side provider
            is configured.
          </p>
        </div>
      </form>

      <ResultPanel result={result} />
    </div>
  );
}

function ResultPanel({ result }: { result: ResultState }) {
  if (result.kind === "idle") return null;

  return (
    <div
      className={styles.result}
      role="status"
      aria-live="polite"
    >
      {result.kind === "loading" ? (
        <p className={styles.resultText}>Validating your brief…</p>
      ) : null}

      {result.kind === "rejected" ? (
        <>
          <p className={styles.resultTitle}>Brief rejected</p>
          <ul className={styles.errors}>
            {result.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </>
      ) : null}

      {result.kind === "network_error" ? (
        <>
          <p className={styles.resultTitle}>Could not reach the API</p>
          <p className={styles.resultText}>{result.message}</p>
        </>
      ) : null}

      {result.kind === "not_implemented" ? (
        <>
          <p className={styles.resultTitle}>
            Brief valid — generation not connected yet
          </p>
          <p className={styles.resultText}>{result.message}</p>
          <p className={styles.resultMeta}>
            Response code: <code>{result.code}</code> · no AI request was made
            or simulated.
          </p>
          {result.requiredEnv ? (
            <p className={styles.resultMeta}>
              Requires:{" "}
              {result.requiredEnv.map((name) => (
                <code key={name}>{name}</code>
              ))}
            </p>
          ) : null}
          {result.nextStep ? (
            <p className={styles.resultNext}>{result.nextStep}</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
