"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchVideos } from "@/lib/api";
import { VideoGrid } from "@/components/VideoGrid";
import { VideoCardSkeleton } from "@/components/skeletons/VideoCardSkeleton";
import type { Video } from "@/types/video";

function SearchInner() {
  const params = useSearchParams();
  const query = useMemo(() => params.get("q") || "", [params]);
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setVideos([]);
      return;
    }
    setLoading(true);
    searchVideos(q)
      .then((res) => setVideos(res))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h1 className="text-xl font-semibold">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>
      </div>
      <section aria-busy={loading} aria-live="polite">
        {loading && (
          <div className="video-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        )}
        {!loading && videos && <VideoGrid videos={videos} />}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="card p-6">Loading search...</div>}>
      <SearchInner />
    </Suspense>
  );
}
