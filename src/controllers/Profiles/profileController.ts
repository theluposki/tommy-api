import { createProfileController } from "./createProfileController.ts";
import { myProfileController } from "./myProfileController.ts";
import { findProfilesByNicknameController } from "./findProfilesByNicknameController.ts";

interface IProfileController {
  createProfileController: Function;
  myProfileController: Function;
  findProfilesByNicknameController: Function;
}

export const ProfileController: IProfileController = {
  createProfileController,
  myProfileController,
  findProfilesByNicknameController,
};
