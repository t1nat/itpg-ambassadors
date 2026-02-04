"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error page for handling unrecoverable errors
 * This is a Next.js special file that handles root-level errors
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-8">
          <div className="max-w-md text-center">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-gray-900">Something went wrong!</h1>

            <p className="mb-6 text-gray-600">We apologize for the inconvenience. An unexpected error has occurred.</p>

            {error.digest && <p className="mb-4 text-xs text-gray-400">Error ID: {error.digest}</p>}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={reset} variant="default">
                Try again
              </Button>
              <Button onClick={() => (window.location.href = "/")} variant="outline">
                Go to homepage
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
