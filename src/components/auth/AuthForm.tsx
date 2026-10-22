"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signIn, signUp } from "@/lib/actions/auth";
import { idleAuthFormState } from "@/lib/auth/form-state";

import styles from "./AuthForm.module.css";

interface AuthFormProps {
  mode: "login" | "signup";
  /**
   * When the server page already displays the "not configured" notice,
   * the form suppresses its own copy of the same message.
   */
  hasConfigNotice: boolean;
}

const copy = {
  login: {
    submit: "Log in",
    pending: "Logging in…",
    alt: "New to Weblith?",
    altLink: "/signup",
    altLinkLabel: "Create an account",
  },
  signup: {
    submit: "Create account",
    pending: "Creating account…",
    alt: "Already have an account?",
    altLink: "/login",
    altLinkLabel: "Log in",
  },
} as const;

/**
 * Real credential form. With Supabase configured the action performs a
 * genuine sign-in/sign-up; without configuration it reports exactly what
 * is missing. It never fabricates a session.
 */
export function AuthForm({ mode, hasConfigNotice }: AuthFormProps) {
  const action = mode === "login" ? signIn : signUp;
  const [state, formAction, pending] = useActionState(action, idleAuthFormState);
  const labels = copy[mode];

  const showUnconfigured =
    state.status === "unconfigured" && !hasConfigNotice;
  const showError = state.status === "error";
  const showSuccess = state.status === "success";

  return (
    <div className={styles.wrap}>
      <form action={formAction} className={styles.form} noValidate>
        <div className="field">
          <label className="field__label" htmlFor="email">
            Email address
          </label>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            aria-invalid={state.errors?.email ? true : undefined}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
          />
          {state.errors?.email ? (
            <p id="email-error" className={styles.fieldError} role="alert">
              {state.errors.email}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder="••••••••"
            minLength={8}
            required
            aria-invalid={state.errors?.password ? true : undefined}
            aria-describedby={
              state.errors?.password
                ? "password-error password-hint"
                : "password-hint"
            }
          />
          <p id="password-hint" className="field__hint">
            {mode === "signup"
              ? "At least 8 characters."
              : "Use the password you signed up with."}
          </p>
          {state.errors?.password ? (
            <p id="password-error" className={styles.fieldError} role="alert">
              {state.errors.password}
            </p>
          ) : null}
        </div>

        {showUnconfigured ? (
          <div className={`${styles.alert} ${styles.alertWarn}`} role="status">
            {state.message}
          </div>
        ) : null}

        {showError && state.message ? (
          <div className={`${styles.alert} ${styles.alertError}`} role="alert">
            {state.message}
          </div>
        ) : null}

        {showSuccess && state.message ? (
          <div className={`${styles.alert} ${styles.alertOk}`} role="status">
            {state.message}
          </div>
        ) : null}

        <button type="submit" className="btn btn--primary btn--lg" disabled={pending}>
          {pending ? labels.pending : labels.submit}
        </button>
      </form>

      <p className={styles.alt}>
        {labels.alt}{" "}
        <Link href={labels.altLink} className="link link--accent">
          {labels.altLinkLabel}
        </Link>
      </p>
    </div>
  );
}
