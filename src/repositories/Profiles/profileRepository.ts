import { createProfileRepository } from "./createProfileRepository.ts";
import { myProfileRepository } from "./myProfileRepository.ts";
import { findProfilesByNicknameRepository } from "./findProfilesByNicknameRepository.ts";

interface IProfileRepository {
  createProfileRepository: Function;
  myProfileRepository: Function;
  findProfilesByNicknameRepository: Function;
}

export const ProfileRepository: IProfileRepository = {
  createProfileRepository,
  myProfileRepository,
  findProfilesByNicknameRepository,
};
