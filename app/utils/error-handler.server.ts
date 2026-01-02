/**
 * Error handling utilities
 * Wraps functions with error handling without changing existing functionality
 */

import { logger } from "./logger.server";

export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export type Result<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Safely executes an async function and returns a Result type
 * Does not throw - always returns a Result
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  errorMessage = "An error occurred"
): Promise<Result<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    logger.error(errorMessage, errorObj);
    
    return {
      success: false,
      error: errorObj.message,
      message: errorMessage,
    };
  }
}

/**
 * Wraps a function with error handling and logging
 * Returns the original result or throws a safe error
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  errorMessage = "Operation failed"
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    logger.error(errorMessage, errorObj);
    throw errorObj; // Re-throw to maintain existing error flow
  }
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  message: string,
  statusCode = 500
): Response {
  return new Response(
    JSON.stringify({
      success: false,
      error: message,
    }),
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

