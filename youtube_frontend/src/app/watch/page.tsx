"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchVideoById, fetchRelated } from "@/lib/api";
import { VideoPlayer } from "@/components/VideoPlayer";
import { CommentList } from "@/components/CommentList";
import { VideoGrid } from "@/components/VideoGrid";
import { VideoCardSkeleton } from "@/components/skeletons/VideoCardSkeleton";
import type { Video } from "@/types/video";

function WatchInner() {
  const params = useSearchParams();
  const videoId = useMemo(() => params.get("v") || "", [params]);

  const [video, setVideo] = useState<Video | null>(null);
  const [related, setRelated] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;
    setLoading(true);
    Promise.all([fetchVideoById(videoId), fetchRelated(videoId)])
      .then(([v, r]) => {
        setVideo(v);
        setRelated(r);
      })
      .catch(() => {
        setVideo(null);
        setRelated([]);
      })
      .finally(() => setLoading(false));
  }, [videoId]);

  if (!videoId) {
    return (
      <div className="card p-6" role="alert">
        <h1 className="text-xl font-semibold">Missing video parameter</h1>
        <p className="text-sm text-gray-600">Add ?v=video-id to the URL.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <div className="card overflow-hidden">
          <VideoPlayer video={video} loading={loading} />
        </div>

        <div className="card p-4 space-y-2">
          <h2 className="text-xl font-semibold">
            {video?.title ?? (loading ? "Loading..." : "Unknown video")}
          </h2>
          <p className="text-sm text-gray-600">
            {video?.views ? `${video.views.toLocaleString()} views` : ""}
          </p>
        </div>

        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-3">Comments</h3>
          <CommentList videoId={videoId} />
        </div>
      </div>

      <aside className="space-y-3">
        <h3 className="text-lg font-semibold">Related</h3>
        {loading && (
          <div className="video-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        )}
        {!loading && related && <VideoGrid videos={related} small />}
      </aside>
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="card p-6">Loading video...</div>}>
      <WatchInner />
    </Suspense>
  );
}
