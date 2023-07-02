import { UserRepository } from "../../repositories/User/userRepository.ts";

import { ICreateUser } from "../../entities/User/user.ts";

export const deleteUserController = async ({
  id
}: ICreateUser): Promise<{ sucess: string } | { error: string }> => {

  const user = await UserRepository.deleteUserRepository({ id })

  return user;
};
