import { ICreateUser } from "../user.ts";

export const deleteUser = ({
  id,
  existingUser
}: ICreateUser): object => {
  if (!id) return { error: "id is required!" };
  if (!existingUser) return { error: "User not found!" };

  return {
    id,
    existingUser
  };
};
