import { createUser } from './useCases/createUser.js';

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

