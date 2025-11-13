import React from "react";
import Link from "next/link";

// Ensure this special route is statically rendered
export const dynamic = "error";
export const revalidate = false;

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto">
      <section className="card p-6" role="alert" aria-live="assertive">
        <header>
          <h1 className="text-2xl font-semibold">404 – Page Not Found</h1>
          <p className="text-gray-600 mt-1">
            The page you’re looking for doesn’t exist.
          </p>
        </header>
        <div className="mt-4">
          <Link href="/" className="btn btn-primary">Go home</Link>
        </div>
      </section>
    </div>
  );
}
