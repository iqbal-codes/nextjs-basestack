/**
 * Known error patterns from Better Auth, Drizzle ORM, and other sources.
 * Maps raw error messages to i18n translation keys.
 */

type ErrorPattern = {
  pattern?: string | RegExp;
  code?: string;
  key: string;
  fallbackMessage: string;
};

const betterAuthPatterns: ErrorPattern[] = [
  {
    code: "INVALID_EMAIL_OR_PASSWORD",
    pattern: /credential account not found|invalid email or password|invalid password/i,
    key: "invalidCredentials",
    fallbackMessage: "Invalid email or password.",
  },
  {
    pattern: /account already exists|email already in use|user already exists/i,
    key: "emailTaken",
    fallbackMessage: "An account with this email already exists.",
  },
  {
    pattern: /weak password/i,
    key: "weakPassword",
    fallbackMessage: "Password is too weak. Please choose a stronger password.",
  },
  {
    pattern: /email not verified/i,
    key: "emailNotVerified",
    fallbackMessage: "Please verify your email address before signing in.",
  },
  {
    pattern: /too many requests|rate limit/i,
    key: "rateLimited",
    fallbackMessage: "Too many attempts. Please try again later.",
  },
  {
    pattern: /session expired/i,
    key: "sessionExpired",
    fallbackMessage: "Your session has expired. Please sign in again.",
  },
  {
    pattern: /unauthorized/i,
    key: "unauthorized",
    fallbackMessage: "You must be signed in to perform this action.",
  },
  {
    pattern: /forbidden/i,
    key: "forbidden",
    fallbackMessage: "You don't have permission to perform this action.",
  },
];

const dbPatterns: ErrorPattern[] = [
  {
    pattern: /unique constraint|duplicate key|sqlite_constraint/i,
    key: "constraintViolation",
    fallbackMessage: "A record with that information already exists.",
  },
  {
    pattern: /foreign key constraint/i,
    key: "foreignKeyViolation",
    fallbackMessage: "This record is referenced by other data and cannot be deleted.",
  },
  {
    pattern: /connection refused|econgrefused|timeout/i,
    key: "connectionError",
    fallbackMessage: "Unable to connect to the database. Please try again.",
  },
];

const genericPatterns: ErrorPattern[] = [
  {
    pattern: /network error|fetch failed|failed to fetch/i,
    key: "networkError",
    fallbackMessage: "A network error occurred. Check your connection and try again.",
  },
  {
    pattern: /not found/i,
    key: "notFound",
    fallbackMessage: "The requested resource was not found.",
  },
];

const allPatterns: ErrorPattern[] = [
  ...betterAuthPatterns,
  ...dbPatterns,
  ...genericPatterns,
];

export interface ExtractedError {
  key: string;
  fallbackMessage: string;
  rawMessage: string;
}

/**
 * Resolves an extracted error to a user-facing message.
 * Uses the provided t function from useTranslations("Errors") to look up
 * the translated message. Falls back to the English fallbackMessage if the
 * i18n key is not found.
 */
export function resolveErrorMessage(
  extracted: ExtractedError,
  t: (key: string) => string,
): string {
  const translated = t(extracted.key);
  // next-intl returns the key itself when not found
  if (translated === extracted.key) {
    return extracted.fallbackMessage;
  }
  return translated;
}

/**
 * Extracts a user-friendly error from a raw error value.
 * Handles Better Auth error objects, Error instances, and plain strings.
 */
export function extractError(raw: unknown): ExtractedError {
  const message = getErrorMessage(raw);
  const code = getErrorCode(raw);

  for (const pattern of allPatterns) {
    // Match by code first (most reliable)
    if (pattern.code && code === pattern.code) {
      return {
        key: pattern.key,
        fallbackMessage: pattern.fallbackMessage,
        rawMessage: message,
      };
    }

    // Match by message pattern
    if (pattern.pattern) {
      if (
        (typeof pattern.pattern === "string" &&
          message.toLowerCase().includes(pattern.pattern.toLowerCase())) ||
        (pattern.pattern instanceof RegExp && pattern.pattern.test(message))
      ) {
        return {
          key: pattern.key,
          fallbackMessage: pattern.fallbackMessage,
          rawMessage: message,
        };
      }
    }
  }

  return {
    key: "generic",
    fallbackMessage: "Something went wrong. Please try again.",
    rawMessage: message,
  };
}

function getErrorCode(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  const obj = raw as Record<string, unknown>;

  // Direct code field: { code: "..." }
  if (typeof obj.code === "string") return obj.code;

  // Nested: { error: { code: "..." } }
  if (
    "error" in obj &&
    obj.error &&
    typeof obj.error === "object" &&
    "code" in (obj.error as Record<string, unknown>)
  ) {
    return String((obj.error as Record<string, unknown>).code);
  }

  return "";
}

function getErrorMessage(raw: unknown): string {
  if (!raw) return "";

  // Better Auth client returns { error: { message: "..." } }
  if (typeof raw === "object" && raw !== null && "message" in raw) {
    const obj = raw as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;

    // Nested: { error: { code: "...", message: "..." } }
    if (
      "error" in obj &&
      typeof obj.error === "object" &&
      obj.error !== null &&
      "message" in (obj.error as Record<string, unknown>)
    ) {
      return String((obj.error as Record<string, unknown>).message);
    }
  }

  // Error instances
  if (raw instanceof Error) return raw.message;

  // Plain strings
  if (typeof raw === "string") return raw;

  // JSON.stringify anything else
  try {
    return JSON.stringify(raw);
  } catch {
    return "Unknown error";
  }
}
