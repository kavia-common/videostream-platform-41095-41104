"use client";

import { VideoCard } from "@/components/VideoCard";
import type { Video } from "@/types/video";

export function VideoGrid({ videos, small = false }: { videos: Video[]; small?: boolean }) {
  return (
    <div className={`video-grid ${small ? "" : ""}`}>
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} small={small} />
      ))}
    </div>
  );
}
