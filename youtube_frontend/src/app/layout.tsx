import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./layoutClient";

export const metadata: Metadata = {
  title: {
    default: "SeaView - Video Platform",
    template: "%s | SeaView",
  },
  description:
    "Browse, search, and watch videos in a modern, accessible YouTube-like interface.",
  applicationName: "SeaView",
  authors: [{ name: "SeaView" }],
  keywords: ["video", "player", "search", "stream", "YouTube-like"],
  openGraph: {
    siteName: "SeaView",
    title: "SeaView - Video Platform",
    description:
      "Browse, search, and watch videos in a modern, accessible YouTube-like interface.",
    type: "website",
    url: "/",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
