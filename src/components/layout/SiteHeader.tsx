import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks } from "@/lib/site";
import { getAuthUser } from "@/lib/supabase/server";

import styles from "./SiteHeader.module.css";

export async function SiteHeader() {
  // Returns null until Supabase is configured — no session, no claim.
  const user = await getAuthUser();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {user ? (
            <Link href="/dashboard" className="btn btn--secondary btn--sm">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className={`btn btn--ghost btn--sm ${styles.loginLink}`}>
                Log in
              </Link>
              <Link href="/signup" className="btn btn--primary btn--sm">
                Get started
              </Link>
            </>
          )}
          <MobileNav user={user} />
        </div>
      </div>
    </header>
  );
}
