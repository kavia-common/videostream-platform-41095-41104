"use client";

import type { Video } from "@/types/video";

export function VideoPlayer({ video, loading }: { video: Video | null; loading: boolean }) {
  if (loading) {
    return <div className="skeleton w-full aspect-video" aria-busy="true" aria-label="Loading video player" />;
  }
  if (!video) {
    return (
      <div className="p-6">
        <p className="text-gray-700">Video unavailable.</p>
      </div>
    );
  }

  // Mock player using <video> tag when video.src present, otherwise thumbnail
  return (
    <div className="w-full">
      {video.src ? (
        <video
          src={video.src}
          poster={video.thumbnail}
          controls
          className="w-full h-auto"
          aria-label={`Player for ${video.title}`}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={video.thumbnail}
          alt={`Thumbnail for ${video.title}`}
          className="w-full h-auto"
        />
      )}
    </div>
  );
}
