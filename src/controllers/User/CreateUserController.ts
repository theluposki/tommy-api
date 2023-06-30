import { UserRepository } from "../../repositories/User/UserRepository.ts";

import { ICreateUser } from "../../domain/entities/User/User.ts";

export const createUserController = async ({
  email,
  password,
  confirmPassword,
}: ICreateUser): Promise<{ sucess: string } | { error: string }> => {

  const user = await UserRepository.createUserRepository({ email, password, confirmPassword });

  return user;
};
