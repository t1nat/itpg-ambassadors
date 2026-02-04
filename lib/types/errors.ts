/**
 * Custom error classes for the application
 * Provides better error handling and type safety
 */

/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'APP_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Resource not found error
 */
export class NotFoundError extends AppError {
  public readonly resourceType: string;
  public readonly resourceId?: string;

  constructor(resourceType: string, resourceId?: string) {
    const message = resourceId
      ? `${resourceType} with id '${resourceId}' not found`
      : `${resourceType} not found`;
    
    super(message, 'NOT_FOUND', 404);
    this.resourceType = resourceType;
    this.resourceId = resourceId;
  }
}

/**
 * Validation error for invalid input
 */
export class ValidationError extends AppError {
  public readonly errors: Array<{ path: string; message: string }>;

  constructor(errors: Array<{ path: string; message: string }>) {
    super('Validation failed', 'VALIDATION_ERROR', 400);
    this.errors = errors;
  }
}

/**
 * Duplicate resource error (e.g., duplicate vote)
 */
export class DuplicateError extends AppError {
  public readonly resourceType: string;

  constructor(resourceType: string, message?: string) {
    super(
      message || `Duplicate ${resourceType} not allowed`,
      'DUPLICATE_ERROR',
      409
    );
    this.resourceType = resourceType;
  }
}

/**
 * Database operation error
 */
export class DatabaseError extends AppError {
  public readonly operation: string;
  public readonly originalError?: Error;

  constructor(operation: string, originalError?: Error) {
    super(
      `Database operation '${operation}' failed: ${originalError?.message || 'Unknown error'}`,
      'DATABASE_ERROR',
      500,
      false // Not operational - indicates a system failure
    );
    this.operation = operation;
    this.originalError = originalError;
  }
}

/**
 * Rate limit exceeded error
 */
export class RateLimitError extends AppError {
  public readonly retryAfter?: number;

  constructor(retryAfter?: number) {
    super('Rate limit exceeded', 'RATE_LIMIT_ERROR', 429);
    this.retryAfter = retryAfter;
  }
}

/**
 * Type guard to check if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Type guard to check if an error is operational (expected)
 */
export function isOperationalError(error: unknown): boolean {
  if (isAppError(error)) {
    return error.isOperational;
  }
  return false;
}
