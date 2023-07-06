import { createProfileController } from "./createProfileController.ts";
import { myProfileController } from "./myProfileController.ts";
import { findProfilesByNicknameController } from "./findProfilesByNicknameController.ts";
import { uploadImageProfileController } from "./uploadImageProfileController.ts";

interface IProfileController {
  createProfileController: Function;
  myProfileController: Function;
  findProfilesByNicknameController: Function;
  uploadImageProfileController: Function;
}


export const ProfileController: IProfileController = {
  createProfileController,
  myProfileController,
  findProfilesByNicknameController,
  uploadImageProfileController
};
