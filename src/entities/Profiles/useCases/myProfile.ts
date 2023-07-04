import { IMyProfile } from "../profile.ts";

export const myProfile = ({ reqUserId }: IMyProfile): object => {
  if (!reqUserId) return { error: "reqUserId is required" };

  return {
    reqUserId,
  };
};
