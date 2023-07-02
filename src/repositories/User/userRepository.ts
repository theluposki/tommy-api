import { createUserRepository } from './createUserRepository.js'
import { deleteUserRepository } from './deleteUserRepository.ts';
import { authUserRepository } from './authUserRepository.ts';

interface IUserRepository {
  createUserRepository: Function;
  deleteUserRepository: Function;
  authUserRepository: Function;
}

export const UserRepository: IUserRepository = {
  createUserRepository,
  deleteUserRepository,
  authUserRepository
};

