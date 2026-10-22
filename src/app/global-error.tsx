"use client";

/**
 * Root-level error boundary: replaces the whole document when the
 * root layout itself fails. Uses inline styles because global CSS
 * may be unavailable at this level.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          background: "#f6f3ec",
          color: "#16130f",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "36rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#a9360f",
            }}
          >
            Weblith
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              lineHeight: 1.15,
              margin: "1rem 0",
            }}
          >
            The application failed to start this view.
          </h1>
          <p style={{ lineHeight: 1.7, color: "#4b443c", margin: "0 0 1.5rem" }}>
            The error was logged on the server
            {error.digest ? ` (reference ${error.digest})` : ""}. Reload to try
            again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#c9431a",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.9375rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
