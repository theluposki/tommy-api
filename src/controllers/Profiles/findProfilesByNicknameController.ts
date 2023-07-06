import { ProfileRepository } from "../../repositories/Profiles/profileRepository.ts";

import { IFindProfileByNickname } from "../../entities/Profiles/profile.js";

export const findProfilesByNicknameController = async ({
  reqUserId,
  nickname
}: IFindProfileByNickname): Promise<{ sucess: string } | { error: string } | [] > => {
  const profile = await ProfileRepository.findProfilesByNicknameRepository({ reqUserId, nickname })

  return profile;
};
