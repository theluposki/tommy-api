
import { IAuthUser } from "../user.ts";

export const authUser = ({ email, password }: IAuthUser): object => {
  if (!email) return { error: "email is required" };
  if (!password) return { error: "password is required" };
  
  return {
    email,
    password,
  };
};
