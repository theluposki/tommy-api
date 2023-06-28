import { createUserController } from "./CreateUserController.ts";

interface UserInterface {
  createUserController: Function;
}

const UserController: UserInterface = {
  createUserController,
};

export { UserController };
