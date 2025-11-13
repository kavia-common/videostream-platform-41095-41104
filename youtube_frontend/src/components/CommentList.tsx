"use client";

import { useEffect, useState } from "react";
import { fetchComments } from "@/lib/api";
import type { Comment } from "@/types/comment";

export function CommentList({ videoId }: { videoId: string }) {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    fetchComments(videoId)
      .then((c) => setComments(c))
      .catch(() => setComments([]));
  }, [videoId]);

  if (!comments) {
    return (
      <ul className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="skeleton h-16" />
        ))}
      </ul>
    );
  }

  if (comments.length === 0) {
    return <p className="text-gray-600">No comments yet.</p>;
  }

  return (
    <ul role="list" className="space-y-4">
      {comments.map((c) => (
        <li key={c.id} className="border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              {c.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{c.author}</p>
              <p className="text-xs text-gray-500">{c.publishedAt ?? "just now"}</p>
            </div>
          </div>
          <p className="mt-2 text-gray-800">{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
