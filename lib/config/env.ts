import { z } from "zod";

/**
 * Environment variable validation schema
 * Ensures all required environment variables are present and valid at startup
 */
const envSchema = z.object({
  // Supabase (Server-side)
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),

  // Supabase (Client-side)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),

  // Optional
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

type Env = z.infer<typeof envSchema>;

/**
 * Validated environment variables
 * Throws an error at startup if any required variable is missing or invalid
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables. Check the console for details.");
  }

  return parsed.data;
}

// Validate on import (will throw at startup if invalid)
export const env = validateEnv();

// Type-safe environment access
export function getEnv<K extends keyof Env>(key: K): Env[K] {
  return env[key];
}
