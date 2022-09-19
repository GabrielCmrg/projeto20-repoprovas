import { User } from '@prisma/client';

export { User };
export type UserCreationData = Omit<User, 'id'>;
export type UserData = Omit<User, 'password'>;
export type UserRequestData = UserCreationData & { confirmPassword: string };
