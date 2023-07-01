import { createUserRepository } from './createUserRepository.js'

interface IUserRepository {
  createUserRepository: Function;
}

export const UserRepository: IUserRepository = {
  createUserRepository,
};

