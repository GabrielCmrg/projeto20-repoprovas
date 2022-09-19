import { client } from '../config/database';
import { User, UserCreationData } from '../types/userTypes';

export async function createUser(user: UserCreationData): Promise<User> {
  const createdUser: User = await client.user.create({ data: user });
  return createdUser;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user: User | null = await client.user.findUnique({ where: { email } });
  return user;
}

export async function getUserById(userId: number): Promise<User | null> {
  const user: User | null = await client.user.findUnique({ where: { id: userId } });
  return user;
}
