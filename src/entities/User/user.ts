import { createUser } from "./useCases/createUser.ts";
import { deleteUser } from "./useCases/deleteUser.ts";
import { authUser } from "./useCases/authUser.ts";

interface IUser {
  createUser: Function;
  deleteUser: Function;
  authUser: Function;
}

export interface ICreateUser {
  id?: string;
  email: string;
  password: string;
  confirmPassword: string;
  existingUser: string;
}

export interface IAuthUser {
  email: string;
  password: string;
  hashPassword: string;
  existingUser: [{
    id: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
  }]
}

export const User: IUser = {
  createUser,
  deleteUser,
  authUser,
};
