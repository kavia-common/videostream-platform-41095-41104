"use client";

import { Suspense, useEffect, useState } from "react";
import { fetchHomeFeed } from "@/lib/api";
import { VideoGrid } from "@/components/VideoGrid";
import { VideoCardSkeleton } from "@/components/skeletons/VideoCardSkeleton";
import type { Video } from "@/types/video";

function HomeInner() {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchHomeFeed()
      .then((data) => {
        if (mounted) setVideos(data);
      })
      .catch(() => {
        if (mounted) setVideos([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <section className="card p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Trending</h1>
          <span className="badge" aria-label="Ocean Professional theme badge">
            Ocean
          </span>
        </div>
      </section>

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

export default function Home() {
  return (
    <Suspense fallback={<div className="card p-6">Loading...</div>}>
      <HomeInner />
    </Suspense>
  );
}
