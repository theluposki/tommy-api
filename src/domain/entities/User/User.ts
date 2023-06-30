import { createUser } from './useCases/CreateUser.ts';

interface IUser {
  createUser: Function;
}

export interface ICreateUser {
  email: string;
  password: string;
  confirmPassword: string;
  existingUser: string;
}

export const User: IUser = {
  createUser,
};

