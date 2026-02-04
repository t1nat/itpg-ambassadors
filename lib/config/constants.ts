/**
 * Application-wide constants and configuration
 * Single source of truth for values used across the application
 */

// Supported locales for internationalization
export const SUPPORTED_LOCALES = ["bg", "en", "de", "fr", "es", "it", "pl", "ro", "cs", "sk", "sl", "hr", "sr", "mk", "al", "me"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "bg";

// Locale configuration for i18n
export const LOCALE_CONFIG = {
  supported: SUPPORTED_LOCALES,
  default: DEFAULT_LOCALE,
  fallback: DEFAULT_LOCALE,
} as const;

// API configuration
export const API_CONFIG = {
  basePath: "/api",
  timeout: 10000,
  retries: 3,
} as const;

// Pagination defaults
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
} as const;

// Rate limiting configuration
export const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  voteMaxRequests: 10, // stricter for voting
} as const;

// Database table names
export const DB_TABLES = {
  ambassadors: "ambassadors",
  teachers: "teachers",
  projects: "projects",
  votes: "votes",
} as const;

// Supabase error codes
export const SUPABASE_ERROR_CODES = {
  NOT_FOUND: "PGRST116",
  UNIQUE_VIOLATION: "23505",
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Cookie names
export const COOKIES = {
  locale: "NEXT_LOCALE",
} as const;

// Animation variants for framer-motion (memoized)
export const ANIMATION_VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  slideFromLeft: {
    hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  slideFromRight: {
    hidden: { opacity: 0, x: 50, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  },
} as const;
