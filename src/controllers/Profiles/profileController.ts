import { createProfileController } from "./createProfileController.ts";


interface IProfileController {
  createProfileController: Function;
}

export const ProfileController: IProfileController = {
  createProfileController,
};
