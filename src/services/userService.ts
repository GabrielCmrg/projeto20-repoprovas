import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User, UserData, UserCreationData } from '../types/userTypes';
import { userRepository } from '../repositories';
import { conflictException, unauthorizedException } from '../exceptions';

dotenv.config();

export async function registerNewUser(user: UserCreationData): Promise<UserData> {
  const existingUser: User | null = await userRepository.getUserByEmail(user.email);
  if (existingUser) {
    throw conflictException('There is a user with this email.');
  }
  const hashPassword: string = bcrypt.hashSync(user.password, 10);
  const userToSave: UserCreationData = { email: user.email, password: hashPassword };
  const createdUser: User = await userRepository.createUser(userToSave);
  const returningUser: UserData = { id: createdUser.id, email: createdUser.email };
  return returningUser;
}

export async function loginUser(user: UserCreationData): Promise<string> {
  const existingUser: User | null = await userRepository.getUserByEmail(user.email);
  if (!existingUser || !bcrypt.compareSync(user.password, existingUser.password)) {
    throw unauthorizedException('Email or password are incorrect.');
  }
  const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';
  const token: string = jwt.sign({ userId: existingUser.id }, secretKey);
  return token;
}

export async function checkToken(token: string): Promise<number> {
  const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';
  const payload: jwt.JwtPayload | string = jwt.verify(token, secretKey);
  const userId: number = typeof payload !== 'string' ? Number(payload.userId) : Number(payload);
  const existingUser: User | null = await userRepository.getUserById(userId);
  if (!existingUser) {
    throw unauthorizedException('Invalid token.');
  }
  return userId;
}
