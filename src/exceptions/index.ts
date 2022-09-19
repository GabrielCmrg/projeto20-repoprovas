export interface CustomError {
  type: 'conflict' | 'unauthorized';
  message: string;
};

export function conflictException(message: string): CustomError {
  return { type: 'conflict', message };
}

export function unauthorizedException(message: string): CustomError {
  return { type: 'unauthorized', message };
}
