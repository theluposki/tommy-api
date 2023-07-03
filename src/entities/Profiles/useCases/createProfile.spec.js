import { describe, test, expect } from "vitest";
import { createProfile } from "./createProfile.ts";

describe("createProfile use case test suite", () => {
  test("must create a profile with these properties", async () => {
    const nickname = "nickname";
    const bio = "";
    const picture = "";
    const links = "";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
    });

    expect(result.hasOwnProperty("nickname")).toBeTruthy();
    expect(result.hasOwnProperty("bio")).toBeTruthy();
    expect(result.hasOwnProperty("picture")).toBeTruthy();
    expect(result.hasOwnProperty("links")).toBeTruthy();
  });

  test("should return error if nickname is not provided", async () => {
    const nickname = "";
    const bio = "";
    const picture = "";
    const links = "";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
    });

    expect(result).toEqual({ error: "nickname is required" });
  });

  test("if the bio is not provided it must return by default", async () => {
    const nickname = "nickname";
    const bio = "";
    const picture = "";
    const links = "";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
    });

    expect(result.bio).toEqual("Write your biography. 💻");
  });

  test("if the picture is not provided it must return by default", async () => {
    const nickname = "nickname";
    const bio = "";
    const picture = "";
    const links = "";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
    });

    expect(result.picture).toEqual("/default/avatar.png");
  });

  test("if the links is not provided it must return by default", async () => {
    const nickname = "nickname";
    const bio = "";
    const picture = "";
    const links = "";

    const result = createProfile({
      nickname,
      bio,
      picture,
      links,
    });

    expect(result.links).toEqual(["link.com", "mylink.com"]);
  });
});
