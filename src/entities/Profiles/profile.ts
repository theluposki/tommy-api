import { createProfile } from "./useCases/createProfile.ts"; 
import { myProfile } from "./useCases/myProfile.ts";
import { findProfilesByNickname } from "./useCases/findProfilesByNickname.ts";

interface IProfile {
  createProfile: Function;
  myProfile: Function;
  findProfilesByNickname: Function;
}

export interface ICreateProfile {
  id: string;
  nickname: string;
  bio: string;
  picture: string
  links: string[]
}

export interface IMyProfile {
  reqId: string
}

export interface IFindProfileByNickname {
  reqId: string;
  nickname: string;
}

export const Profile: IProfile = {
  createProfile,
  myProfile,
  findProfilesByNickname
};
