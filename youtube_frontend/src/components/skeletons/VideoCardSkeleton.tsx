"use client";

export function VideoCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton w-full aspect-video" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-3 w-2/3" />
        <div className="skeleton h-3 w-1/2" />
      </div>
    </div>
  );
}
