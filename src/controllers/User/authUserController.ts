import { UserRepository } from "../../repositories/User/userRepository.ts";

import { IAuthUser } from "../../entities/User/user.ts";

export const authUserController = async ({
  email,
  password
}: IAuthUser): Promise<{ sucess: string } | { error: string }> => {

  const user = await UserRepository.authUserRepository({ email, password });

  return user;
};
