import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Array<{ path: string; message: string }>;
}

export function successResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error }, { status });
}

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
    },
    { status: 400 },
  );
}

export function notFoundResponse(resource: string): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error: `${resource} not found` }, { status: 404 });
}

export function serverErrorResponse(error: unknown): NextResponse<ApiResponse> {
  console.error("Server error:", error);
  return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}
