"use client";

import { useState, useEffect } from "react";

/**
 * Hook to safely check if component is mounted on client
 * Helps prevent hydration mismatches between server and client
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
