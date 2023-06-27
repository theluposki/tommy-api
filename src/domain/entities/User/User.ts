import { createUser } from './useCases/CreateUser.ts';

interface UserInterface {
  createUser: Function;
}

const User: UserInterface = {
  createUser,
};

export { User };
