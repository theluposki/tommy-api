import { createUserModel } from './createUserModel.ts'

interface UserInterface {
  createUserModel: Function;
}

const UserModel: UserInterface = {
  createUserModel,
};

export { UserModel };
