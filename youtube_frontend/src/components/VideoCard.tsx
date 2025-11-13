"use client";

import Link from "next/link";
import type { Video } from "@/types/video";

export function VideoCard({ video, small = false }: { video: Video; small?: boolean }) {
  return (
    <article className={`card overflow-hidden ${small ? "" : ""}`}>
      <Link href={`/watch?v=${encodeURIComponent(video.id)}`} className="block">
        <div className="relative w-full aspect-video bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnail}
            alt={`Thumbnail for ${video.title}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {video.duration && (
            <span className="absolute bottom-2 right-2 text-xs px-1.5 py-0.5 rounded bg-black/80 text-white">
              {video.duration}
            </span>
          )}
        </div>
      </Link>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">
          <Link href={`/watch?v=${encodeURIComponent(video.id)}`}>{video.title}</Link>
        </h3>
        <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
        <p className="text-xs text-gray-500">
          {video.views.toLocaleString()} views{video.publishedAt ? ` • ${video.publishedAt}` : ""}
        </p>
      </div>
    </article>
  );
}
