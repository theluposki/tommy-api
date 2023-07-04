import { ProfileRepository } from "../../repositories/Profiles/profileRepository.js";

import { ICreateProfile } from "../../entities/Profiles/profile.js";

export const myProfileController = async ({
  reqUserId,
}: ICreateProfile): Promise<{ sucess: string } | { error: string }> => {
  const profile = await ProfileRepository.myProfileRepository({ reqUserId });

  return profile;
};
