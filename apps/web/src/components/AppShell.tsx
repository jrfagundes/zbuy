"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function IconAccount() {
  return (
    <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="7.5" r="3" />
      <path d="M2.5 18c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" />
    </svg>
  );
}

function IconProducts() {
  return (
    <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 7.5H4L5.5 3h9L16 7.5z" />
      <rect x="3" y="7.5" width="14" height="9.5" rx="1.5" />
      <path d="M8.5 11.5h3" />
    </svg>
  );
}

function IconLists() {
  return (
    <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="2.5" width="13" height="15" rx="2" />
      <path d="M7 7h6M7 10.5h6M7 14h4" />
    </svg>
  );
}

function IconSupermarkets() {
  return (
    <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8l8-5 8 5" />
      <path d="M4 8v9h12V8" />
      <rect x="7.5" y="12" width="5" height="5" />
    </svg>
  );
}

function IconPurchases() {
  return (
    <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h2.5l2.5 9.5h7.5l1.5-5.5H6" />
      <circle cx="9" cy="16.5" r="1.5" />
      <circle cx="14" cy="16.5" r="1.5" />
    </svg>
  );
}

function IconHistory() {
  return (
    <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6.5V10.5l3 1.5" />
    </svg>
  );
}

const navItems = [
  { href: "/purchases", label: "Compras", icon: <IconPurchases /> },
  { href: "/lists", label: "Listas", icon: <IconLists /> },
  { href: "/products", label: "Produtos", icon: <IconProducts /> },
  { href: "/supermarkets", label: "Supermercados", icon: <IconSupermarkets /> },
  { href: "/history", label: "Histórico", icon: <IconHistory /> },
  { href: "/account", label: "Conta", icon: <IconAccount /> },
];

export function AppShell({ children, title }: { children: React.ReactNode; title: string }) {
  const pathname = usePathname();

  return (
    <main className="app-shell">
      <aside className="app-sidebar">
        <Link href="/purchases" className="app-brand" aria-label="ZBuy — página inicial">
          <span className="brand-mark" aria-hidden="true">Z</span>
          <span className="brand-name">ZBuy</span>
        </Link>

        <nav className="app-nav" aria-label="Navegação principal">
          {navItems.map(({ href, label, icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href} className={isActive ? "nav-active" : ""}>
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="nav-footer" aria-hidden="true">
          <span className="nav-version">v0.6</span>
        </div>
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
