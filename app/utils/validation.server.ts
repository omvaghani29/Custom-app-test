/**
 * Input validation utilities
 * Validates inputs without changing existing functionality
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates shop domain format (e.g., mystore.myshopify.com)
 */
export function validateShopDomain(shop: string | null | undefined): ValidationResult {
  const errors: string[] = [];

  if (!shop) {
    errors.push("Shop domain is required");
    return { isValid: false, errors };
  }

  // Basic shop domain validation
  const shopPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.myshopify\.com$/;
  
  if (!shopPattern.test(shop)) {
    errors.push("Invalid shop domain format. Expected format: yourstore.myshopify.com");
  }

  if (shop.length > 255) {
    errors.push("Shop domain is too long (max 255 characters)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates email format
 */
export function validateEmail(email: string | null | undefined): ValidationResult {
  const errors: string[] = [];

  if (!email) {
    errors.push("Email is required");
    return { isValid: false, errors };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(email)) {
    errors.push("Invalid email format");
  }

  if (email.length > 255) {
    errors.push("Email is too long (max 255 characters)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates URL format
 */
export function validateUrl(url: string | null | undefined): ValidationResult {
  const errors: string[] = [];

  if (!url) {
    errors.push("URL is required");
    return { isValid: false, errors };
  }

  try {
    new URL(url);
  } catch {
    errors.push("Invalid URL format");
  }

  if (url.length > 2048) {
    errors.push("URL is too long (max 2048 characters)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates string is not empty
 */
export function validateRequired(
  value: string | null | undefined,
  fieldName = "Field"
): ValidationResult {
  const errors: string[] = [];

  if (!value || value.trim().length === 0) {
    errors.push(`${fieldName} is required`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates string length
 */
export function validateLength(
  value: string | null | undefined,
  min: number,
  max: number,
  fieldName = "Field"
): ValidationResult {
  const errors: string[] = [];

  if (!value) {
    errors.push(`${fieldName} is required`);
    return { isValid: false, errors };
  }

  if (value.length < min) {
    errors.push(`${fieldName} must be at least ${min} characters`);
  }

  if (value.length > max) {
    errors.push(`${fieldName} must be no more than ${max} characters`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates that a value is a positive integer
 */
export function validatePositiveInteger(
  value: string | number | null | undefined,
  fieldName = "Field"
): ValidationResult {
  const errors: string[] = [];

  if (value === null || value === undefined || value === "") {
    errors.push(`${fieldName} is required`);
    return { isValid: false, errors };
  }

  const num = typeof value === "string" ? parseInt(value, 10) : value;

  if (isNaN(num)) {
    errors.push(`${fieldName} must be a valid number`);
  } else if (num <= 0) {
    errors.push(`${fieldName} must be a positive number`);
  } else if (!Number.isInteger(num)) {
    errors.push(`${fieldName} must be an integer`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Combines multiple validation results
 */
export function combineValidations(...results: ValidationResult[]): ValidationResult {
  const allErrors: string[] = [];

  for (const result of results) {
    if (!result.isValid) {
      allErrors.push(...result.errors);
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}

