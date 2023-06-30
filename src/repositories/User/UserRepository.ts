import { createUserRepository } from './createUserRepository.ts'

interface IUserRepository {
  createUserRepository: Function;
}

export const UserRepository: IUserRepository = {
  createUserRepository,
};

