import { randomUUID } from "node:crypto";

import { ICreateProfile } from "../profile.ts";

export const createProfile = ({
  nickname,
  bio,
  picture,
  links
}: ICreateProfile): object => {
  if (!nickname) return { error: "nickname is required" };

  const id: string = randomUUID();

  if(!bio) bio = "Write your biography. 💻"
  if(!picture) picture = "/default/avatar.png"
  if(!links) links = ["link.com", "mylink.com"]

  return {
    id,
    nickname,
    bio,
    picture,
    links
  };
};
