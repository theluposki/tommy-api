import { createUserController } from "./createUserController.ts";
import { deleteUserController } from "./deleteUserController.ts";
import { authUserController } from "./authUserController.ts";

interface IUserController {
  createUserController: Function;
  deleteUserController: Function;
  authUserController: Function;
}

export const UserController: IUserController = {
  createUserController,
  deleteUserController,
  authUserController
};
