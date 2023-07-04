import { createProfileController } from "./createProfileController.ts";
import { myProfileController } from "./myProfileController.ts"


interface IProfileController {
  createProfileController: Function;
  myProfileController: Function;
}

export const ProfileController: IProfileController = {
  createProfileController,
  myProfileController
};
