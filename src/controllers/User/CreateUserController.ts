import { UserRepository } from "../../repositories/User/userRepository.ts";

import { ICreateUser } from "../../domain/entities/User/user.ts";

export const createUserController = async ({
  email,
  password,
  confirmPassword,
}: ICreateUser): Promise<{ sucess: string } | { error: string }> => {

  const user = await UserRepository.createUserRepository({ email, password, confirmPassword });

  return user;
};
