import { randomUUID } from "node:crypto";

import { ICreateProfile } from "../profile.ts";

export const createProfile = ({
  nickname,
  bio,
  picture,
  links,
  reqUserId
}: ICreateProfile): object => {
  if (!nickname) return { error: "nickname is required" };
  if (!reqUserId) return { error: "reqUserId is required" };

  const id: string = randomUUID();

  if(!bio) bio = "Write your biography. 💻"
  if(!picture) picture = "/default/avatar.png"
  if(!links) links = JSON.stringify(["link.com", "mylink.com"])
  if(links) links = JSON.stringify(links)

  return {
    id,
    nickname,
    bio,
    picture,
    links,
    reqUserId
  };
};
