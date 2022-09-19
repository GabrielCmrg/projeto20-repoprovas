import { ObjectSchema, ValidationResult } from 'joi';
import { Request, Response, NextFunction } from 'express';

import { authSchemas } from '../schemas';
import { HeaderType, LocalsType } from '../types/requestTypes';
import { userService } from '../services';

export function validateBody<type>(schema: ObjectSchema<type>) {
  return function (
    req: Request,
    res: Response<any, LocalsType<type>>,
    next: NextFunction
  ): Response | void {
    const validation: ValidationResult<type> = schema.validate(req.body);
    if (validation.error) {
      return res.status(422).json(validation.error);
    }

    res.locals.reqBody = validation.value;
    return next();
  }
}

export async function validateHeader(
  req: Request,
  res: Response<any, LocalsType>,
  next: NextFunction
): Promise<Response | void> {
  const validation: ValidationResult<HeaderType> = authSchemas
    .headerSchema.validate(req.headers);
  if (validation.error) {
    return res.status(422).json(validation.error);
  }

  const token: string = validation.value.authorization.replace('Bearer ', '');
  const userId: number = await userService.checkToken(token);
  res.locals.userId = userId;
  return next();
}
