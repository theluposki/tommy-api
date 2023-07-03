import { createProfileRepository } from './createProfileRepository.ts'


interface IProfileRepository {
  createProfileRepository: Function;
}

export const ProfileRepository: IProfileRepository = {
  createProfileRepository,
};

