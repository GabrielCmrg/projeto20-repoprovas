import Joi from 'joi';

import { UserRequestData, UserCreationData } from '../types/userTypes';
import { HeaderType } from '../types/requestTypes';

export const loginSchema: Joi.ObjectSchema<UserCreationData> = Joi
  .object<UserCreationData, true>({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(10).required(),
  });

export const signupSchema: Joi.ObjectSchema<UserRequestData> = Joi
  .object<UserRequestData, true>({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(10).required(),
    confirmPassword: Joi.string().trim().equal(Joi.ref('password')).required(),
  });

export const headerSchema: Joi.ObjectSchema<HeaderType> = Joi
  .object<HeaderType, true>({
    authorization: Joi.string().trim().pattern(/^Bearer .+/).required(),
  }).unknown(true);
