import { describe, test, expect } from "vitest";
import { createProfile } from "./createProfile.ts";

describe("createProfile use case test suite", () => {
  test("must create a profile with these properties", async () => {
    const nickname = "nickname";
    const bio = "";
    const picture = "";
    const links = "";
    const reqUserId = "64182729-4405-4ef2-9cad-61ebc0b91f40";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
      reqUserId,
    });

    expect(result.hasOwnProperty("nickname")).toBeTruthy();
    expect(result.hasOwnProperty("bio")).toBeTruthy();
    expect(result.hasOwnProperty("picture")).toBeTruthy();
    expect(result.hasOwnProperty("links")).toBeTruthy();
    expect(result.hasOwnProperty("reqUserId")).toBeTruthy();
  });

  test("should return error if nickname is not provided", async () => {
    const nickname = "";
    const bio = "";
    const picture = "";
    const links = "";
    const reqUserId = "";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
      reqUserId,
    });

    expect(result).toEqual({ error: "nickname is required" });
  });

  test("should return error if reqUserId is not provided", async () => {
    const nickname = "nickname";
    const bio = "";
    const picture = "";
    const links = "";
    const reqUserId = "";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
      reqUserId,
    });

    expect(result).toEqual({ error: "reqUserId is required" });
  });

  test("if the bio is not provided it must return by default", async () => {
    const nickname = "nickname";
    const bio = "";
    const picture = "";
    const links = "";
    const reqUserId = "64182729-4405-4ef2-9cad-61ebc0b91f40";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
      reqUserId,
    });

    expect(result.bio).toEqual("Write your biography. 💻");
  });

  test("if the picture is not provided it must return by default", async () => {
    const nickname = "nickname";
    const bio = "";
    const picture = "";
    const links = "";
    const reqUserId = "64182729-4405-4ef2-9cad-61ebc0b91f40";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
      reqUserId,
    });

    expect(result.picture).toEqual("/default/avatar.png");
  });

  test("if the links is not provided it must return by default", async () => {
    const nickname = "nickname";
    const bio = "";
    const picture = "";
    const links = "";
    const reqUserId = "64182729-4405-4ef2-9cad-61ebc0b91f40";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
      reqUserId,
    });

    expect(result.links).toEqual(JSON.stringify(["link.com", "mylink.com"]));
  });
});
