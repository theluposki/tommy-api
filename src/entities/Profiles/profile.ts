import { createProfile } from "./useCases/createProfile.ts"; 
import { myProfile } from "./useCases/myProfile.ts";
import { findProfilesByNickname } from "./useCases/findProfilesByNickname.ts";
import { uploadImageProfile } from "./useCases/uploadImageProfile.ts";

interface IProfile {
  createProfile: Function;
  myProfile: Function;
  findProfilesByNickname: Function;
  uploadImageProfile: Function;
}

export interface ICreateProfile {
  id: string;
  nickname: string;
  bio: string;
  picture: string;
  links: string;
  reqUserId: string
}

export interface IMyProfile {
  reqUserId: string
}

export interface IFindProfileByNickname {
  reqUserId: string;
  nickname: string;
}

export const Profile: IProfile = {
  createProfile,
  myProfile,
  findProfilesByNickname,
  uploadImageProfile
};
