"use client";

import Link from "next/link";
import React from "react";

export function AppShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <main className="app-shell">
      <aside className="app-sidebar">
        <Link href="/account" className="brand-row app-brand">
          <span className="brand-mark" aria-hidden="true">
            Z
          </span>
          <span>ZBuy</span>
        </Link>
        <nav className="app-nav" aria-label="Navegação principal">
          <Link href="/account">Conta</Link>
          <Link href="/products">Produtos</Link>
          <Link href="/lists">Listas</Link>
          <Link href="/purchases">Compras</Link>
          <Link href="/history">Histórico</Link>
        </nav>
      </aside>
      <section className="app-main">
        <header className="app-header">
          <h1>{title}</h1>
        </header>
        {children}
      </section>
    </main>
  );
}
