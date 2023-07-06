import { IFindProfileByNickname } from "../profile.ts";

export const findProfilesByNickname = ({
  reqUserId,
  nickname
}: IFindProfileByNickname): object => {
  if (!reqUserId) return { error: "reqUserId is required" };
  if (!nickname) return { error: "nickname is required" };

  return {
    reqUserId,
    nickname
  };
};
