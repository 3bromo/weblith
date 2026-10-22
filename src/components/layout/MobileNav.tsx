"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/layout/Logo";
import { Close, Menu } from "@/components/icons";
import { navLinks, site } from "@/lib/site";

import styles from "./MobileNav.module.css";

interface MobileNavProps {
  user: { id: string; email: string } | null;
}

/**
 * Full-screen mobile menu. Keyboard support: Escape closes, focus moves
 * into the panel on open and returns to the toggle on close, the toggle
 * exposes aria-expanded / aria-controls, and the menu closes on navigation.
 */
export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // Close after navigating: adjust state during render when the path
  // changes (React-recommended alternative to an effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  // Escape closes; focus the first link on open; restore focus on close
  // only if the menu had actually been opened (never on first load).
  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        toggleRef.current?.focus();
      }
      return;
    }
    wasOpenRef.current = true;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    firstLinkRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <Close /> : <Menu />}
      </button>

      {open ? (
        <div className={styles.overlay} id={panelId}>
          <nav className={styles.panel} aria-label="Mobile">
            <div className={styles.panelHead}>
              <Logo />
              <button
                type="button"
                className={styles.close}
                onClick={close}
                aria-label="Close menu"
              >
                <Close />
              </button>
            </div>

            <ul className={styles.links}>
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    className={styles.link}
                    aria-current={
                      pathname === link.href
                        ? "page"
                        : link.href.startsWith("/#") && pathname === "/"
                          ? "page"
                          : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              {user ? (
                <Link href="/dashboard" className="btn btn--ink btn--lg">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/signup" className="btn btn--primary btn--lg">
                    Get started
                  </Link>
                  <Link href="/login" className="btn btn--secondary btn--lg">
                    Log in
                  </Link>
                </>
              )}
            </div>

            <p className={styles.note}>{site.phaseNote}</p>
          </nav>
        </div>
      ) : null}
    </>
  );
}
