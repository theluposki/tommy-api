import { createProfileRepository } from "./createProfileRepository.ts";
import { myProfileRepository } from "./myProfileRepository.ts";

interface IProfileRepository {
  createProfileRepository: Function;
  myProfileRepository: Function;
}

export const ProfileRepository: IProfileRepository = {
  createProfileRepository,
  myProfileRepository,
};
