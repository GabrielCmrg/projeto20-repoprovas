import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

import { CustomError } from "../exceptions";

const hash = {
  conflict: 409,
  unauthorized: 401,
  not_found: 404,
};

export function errorHandler(
  error: Error | CustomError | JsonWebTokenError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  if ("type" in error) {
    const statusCode: number = hash[error.type] || 400;
    return res.status(statusCode).send(error.message);
  }
  if (error instanceof JsonWebTokenError) {
    return res.status(401).send("Invalid token.");
  }
  return res.status(500).send("Something broke internally.");
}
