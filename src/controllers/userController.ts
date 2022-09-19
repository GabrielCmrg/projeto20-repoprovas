import { Request, Response } from 'express';

import { UserRequestData, UserCreationData, UserData } from '../types/userTypes';
import { userService } from '../services';
import { LocalsType } from '../types/requestTypes';

export async function signup(
  req: Request,
  res: Response<any, LocalsType<UserRequestData>>
): Promise<Response> {
  const credentialsPassed: UserRequestData = res.locals.reqBody;
  const credentials: UserCreationData = {
    email: credentialsPassed.email,
    password: credentialsPassed.password
  };
  const createdUser: UserData = await userService.registerNewUser(credentials);
  return res.status(201).json(createdUser);
}

export async function login(
  req: Request,
  res: Response<any, LocalsType<UserCreationData>>
): Promise<Response> {
  const credentials: UserCreationData = res.locals.reqBody;
  const token: string = await userService.loginUser(credentials);
  return res.status(201).json({ token });
}
