# SeaView Frontend (YouTube-like)

Modern, accessible Next.js app with Ocean Professional theme.

## Dev

- npm run dev
- Environment variables (optional):
  - NEXT_PUBLIC_API_BASE
  - NEXT_PUBLIC_BACKEND_URL

If not set, the app gracefully falls back to dummy data on the client for feeds, search, video, and comments.

## Build and Export

This project is configured for static export:
- next.config.ts -> output: "export"
- Client-side fetching is used to ensure compatibility with static export.

Build:
- npm run build

Serve the out directory using any static host.

## Accessibility

- Landmarks, labels, skip link.
- Color contrast and focus styles in theme.
