import { IFindProfileByNickname } from "../profile.ts";

export const findProfilesByNickname = ({
  reqId,
  nickname
}: IFindProfileByNickname): object => {
  if (!reqId) return { error: "reqId is required" };
  if (!nickname) return { error: "nickname is required" };

  return {
    reqId,
    nickname
  };
};
