import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AppError, NotFoundError, ValidationError, DuplicateError, RateLimitError, isAppError, isOperationalError } from "@/lib/types";
import { HTTP_STATUS } from "@/lib/config";

/**
 * Standard API response interface
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Array<{ path: string; message: string }>;
  code?: string;
}

/**
 * Create a successful response
 */
export function successResponse<T>(data: T, status: number = HTTP_STATUS.OK): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Create an error response
 */
export function errorResponse(error: string, status: number = HTTP_STATUS.BAD_REQUEST, code?: string): NextResponse<ApiResponse> {
  const response: ApiResponse = { success: false, error };
  if (code) {
    response.code = code;
  }
  return NextResponse.json(response, { status });
}

/**
 * Create a validation error response from Zod error
 */
export function validationErrorResponse(error: ZodError): NextResponse<ApiResponse> {
  const errors = error.errors.map((e) => ({
    path: e.path.join("."),
    message: e.message,
  }));

  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      errors,
      code: "VALIDATION_ERROR",
    },
    { status: HTTP_STATUS.BAD_REQUEST },
  );
}

/**
 * Create a not found response
 */
export function notFoundResponse(resource: string): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: `${resource} not found`,
      code: "NOT_FOUND",
    },
    { status: HTTP_STATUS.NOT_FOUND },
  );
}

/**
 * Create a conflict response (e.g., duplicate vote)
 */
export function conflictResponse(message: string): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: "CONFLICT",
    },
    { status: HTTP_STATUS.CONFLICT },
  );
}

/**
 * Create a server error response
 * Logs the error but returns a generic message to the client
 */
export function serverErrorResponse(error: unknown): NextResponse<ApiResponse> {
  // Log the actual error for debugging
  if (isOperationalError(error)) {
    console.warn("Operational error:", error);
  } else {
    console.error("Unexpected server error:", error);
  }

  return NextResponse.json(
    {
      success: false,
      error: "Internal server error",
      code: "INTERNAL_ERROR",
    },
    { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
  );
}

/**
 * Handle any error and return appropriate response
 * Centralizes error handling for API routes
 */
export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  // Handle custom app errors
  if (isAppError(error)) {
    if (error instanceof NotFoundError) {
      return notFoundResponse(error.resourceType);
    }

    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          errors: error.errors,
          code: error.code,
        },
        { status: error.statusCode },
      );
    }

    if (error instanceof DuplicateError) {
      return conflictResponse(error.message);
    }

    if (error instanceof RateLimitError) {
      const response = NextResponse.json(
        {
          success: false,
          error: error.message,
          code: error.code,
        },
        { status: 429 },
      );
      if (error.retryAfter) {
        response.headers.set("Retry-After", String(error.retryAfter));
      }
      return response;
    }

    // Generic app error
    return errorResponse(error.message, error.statusCode, error.code);
  }

  // Unknown error - log and return generic message
  return serverErrorResponse(error);
}

/**
 * Extract client IP address from request
 * Uses X-Forwarded-For header with fallback to X-Real-IP
 *
 * Note: This can be spoofed by clients. For production use,
 * ensure your reverse proxy/CDN is configured to set these headers
 * and trust them only from your infrastructure.
 */
export function getClientIp(request: Request): string {
  // X-Forwarded-For can contain multiple IPs: client, proxy1, proxy2, ...
  // The first one is the original client IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0].trim();
    // Basic validation - should be a valid IP format
    if (isValidIp(ip)) {
      return ip;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp && isValidIp(realIp)) {
    return realIp;
  }

  // Fallback - in production, consider returning an error instead
  return "unknown";
}

/**
 * Basic IP address validation
 */
function isValidIp(ip: string): boolean {
  // IPv4 pattern
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6 pattern (simplified)
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;

  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
}
