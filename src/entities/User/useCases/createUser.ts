import { randomUUID } from "node:crypto";
import { hash } from "../../../utils/hashPassword.ts";

import { ICreateUser } from "../user.ts";

export const createUser = ({
  email,
  password,
  confirmPassword,
  existingUser,
}: ICreateUser): object => {
  if (existingUser) return { error: "user already exist" };
  if (!email) return { error: "email is required" };
  if (!password) return { error: "password is required" };
  if (!confirmPassword) return { error: "confirmPassword is required" };

  const id: string = randomUUID();

  if (password !== confirmPassword) return { error: "passwords do not match" };

  return {
    id,
    email,
    password: hash(password),
  };
};
