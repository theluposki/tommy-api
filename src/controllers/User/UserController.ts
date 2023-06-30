import { createUserController } from "./CreateUserController.ts";

interface IUserController {
  createUserController: Function;
}

export const UserController: IUserController = {
  createUserController,
};
