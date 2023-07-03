import { ProfileRepository } from "../../repositories/Profiles/profileRepository.js";

import { ICreateProfile } from "../../entities/Profiles/profile.js";

export const createProfileController = async ({
  nickname,
  bio,
  picture,
  links,
  reqUserId
}: ICreateProfile): Promise<{ sucess: string } | { error: string }> => {

  const profile = await ProfileRepository.createProfileRepository({ nickname, bio, picture, links, reqUserId });

  return profile;
};
