/** Shared state shape for the login/signup form actions. */

export interface AuthFormState {
  status: "idle" | "unconfigured" | "error" | "success";
  message?: string;
  errors?: { email?: string; password?: string };
}

export const idleAuthFormState: AuthFormState = { status: "idle" };
