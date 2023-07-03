import { IMyProfile } from "../profile.ts";

export const myProfile = ({
  reqId
}: IMyProfile): object => {
  if (!reqId) return { error: "reqId is required" };

  return {
    reqId,
  };
};
