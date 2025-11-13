"use client";

import Link from "next/link";
import { Providers } from "@/lib/providers";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";

function SideBar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <aside className="sidebar" aria-label="Primary" aria-hidden={!open} data-open={open}>
      <nav aria-label="Primary Navigation">
        <ul role="list" className="space-y-1">
          <li>
            <Link href="/" className="group">
              <span aria-hidden className="badge">🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/search?q=music" className="group">
              <span aria-hidden className="badge">🎵</span>
              <span>Music</span>
            </Link>
          </li>
          <li>
            <Link href="/search?q=gaming" className="group">
              <span aria-hidden className="badge">🎮</span>
              <span>Gaming</span>
            </Link>
          </li>
          <li>
            <Link href="/search?q=news" className="group">
              <span aria-hidden className="badge">📰</span>
              <span>News</span>
            </Link>
          </li>
        </ul>
      </nav>
      <button
        className="mt-6 btn btn-ghost w-full"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="sidebar"
      >
        {open ? "Hide menu" : "Show menu"}
      </button>
    </aside>
  );
}

function NavBar({ onToggleMenu }: { onToggleMenu: () => void }) {
  return (
    <header className="navbar" role="banner">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 h-16 flex items-center gap-3">
        <button
          type="button"
          className="btn btn-ghost"
          aria-label="Toggle menu"
          onClick={onToggleMenu}
        >
          ☰
        </button>
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold" aria-label="SeaView home">
          <span
            className="inline-flex size-8 items-center justify-center rounded-lg"
            style={{ background: "linear-gradient(135deg,#2563EB22,#F59E0B22)" }}
            aria-hidden
          >
            🌊
          </span>
          <span>SeaView</span>
        </Link>
        <div className="flex-1 max-w-3xl mx-auto">
          <SearchBar />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn" aria-label="Notifications">🔔</button>
          <button className="btn" aria-label="Profile">🙂</button>
        </div>
      </div>
    </header>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <Providers>
      <a href="#main" className="skip-link">Skip to content</a>
      <NavBar onToggleMenu={() => setSidebarOpen((v) => !v)} />
      <div className="main-wrap">
        <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main id="main" className="content">{children}</main>
      </div>
    </Providers>
  );
}
