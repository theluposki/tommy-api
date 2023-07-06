import { createProfileRepository } from "./createProfileRepository.ts";
import { myProfileRepository } from "./myProfileRepository.ts";
import { findProfilesByNicknameRepository } from "./findProfilesByNicknameRepository.ts";
import { uploadImageProfileRepository } from "./uploadImageProfileRepository.ts";

interface IProfileRepository {
  createProfileRepository: Function;
  myProfileRepository: Function;
  findProfilesByNicknameRepository: Function;
  uploadImageProfileRepository: Function;
}

export const ProfileRepository: IProfileRepository = {
  createProfileRepository,
  myProfileRepository,
  findProfilesByNicknameRepository,
  uploadImageProfileRepository,
};
