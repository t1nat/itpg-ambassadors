"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error page for handling errors within the locale layout
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="mb-4 text-2xl font-bold text-gray-900">Oops! Something went wrong</h2>

        <p className="mb-6 text-gray-600">We encountered an error while loading this page. Please try again.</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
