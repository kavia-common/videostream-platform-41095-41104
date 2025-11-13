"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") || "";
  const [q, setQ] = useState(initial);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQ(initial);
  }, [initial]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} role="search" aria-label="Site search" className="flex gap-2">
      <label htmlFor="search" className="visually-hidden">
        Search videos
      </label>
      <input
        ref={ref}
        id="search"
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search videos"
        className="input"
        aria-describedby="search-help"
      />
      <button className="btn btn-primary" type="submit" aria-label="Search">
        Search
      </button>
      <span id="search-help" className="visually-hidden">
        Type a search term and press enter
      </span>
    </form>
  );
}
