import Link from "next/link";
import React from "react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <main className="auth-shell">
      <section className="auth-visual" aria-label="ZBuy">
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">
            Z
          </div>
          <span>ZBuy</span>
        </div>
        <div className="store-map" aria-hidden="true">
          <span className="aisle aisle-a" />
          <span className="aisle aisle-b" />
          <span className="aisle aisle-c" />
          <span className="pin pin-a" />
          <span className="pin pin-b" />
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <Link className="brand-mobile" href="/">
            ZBuy
          </Link>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {children}
        </div>
      </section>
    </main>
  );
}
