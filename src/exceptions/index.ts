export interface CustomError {
  type: "conflict" | "unauthorized" | "not_found";
  message: string;
}

export function conflictException(message: string): CustomError {
  return { type: "conflict", message };
}

export function unauthorizedException(message: string): CustomError {
  return { type: "unauthorized", message };
}

export function notFoundException(message: string): CustomError {
  return { type: "not_found", message };
}
