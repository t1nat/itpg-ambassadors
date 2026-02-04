import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * 404 Not Found page
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <span className="text-8xl font-bold text-gray-200">404</span>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-900">Page Not Found</h1>

        <p className="mb-6 text-gray-600">The page you are looking for does not exist or has been moved.</p>

        <Button asChild>
          <Link href="/">Go to homepage</Link>
        </Button>
      </div>
    </div>
  );
}
