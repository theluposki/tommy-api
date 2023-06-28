import { UserModel } from "../../models/User/UserModel.ts";

async function createUserController(email: string, password: string, confirmPassword: string): Promise<{ sucess: string } | { error: string }> {
  const user = await UserModel.createUserModel(email, password, confirmPassword)

  return user;
}

export { createUserController }
