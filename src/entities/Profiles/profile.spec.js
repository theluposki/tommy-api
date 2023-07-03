import { describe, test, expect } from "vitest";
import { Profile } from "./profile.ts";

describe("testing the profile entity", () => {
  test("Profile should be an object", () => {
    expect(typeof Profile).toBe("object");
  });

  test("The profile is expected to have these properties 'createProfile', 'myProfile', 'findProfilesByNickname'", () => {
    expect(Profile.hasOwnProperty("createProfile")).toBeTruthy();
    expect(Profile.hasOwnProperty("myProfile")).toBeTruthy();
    expect(Profile.hasOwnProperty("findProfilesByNickname")).toBeTruthy();
  });

  test("the createProfile property is expected to be a function", () => {
    expect(typeof Profile.createProfile).toBe("function");
  });

  test("the myProfile property is expected to be a function", () => {
    expect(typeof Profile.myProfile).toBe("function");
  });

  test("the findProfilesByNickname property is expected to be a function", () => {
    expect(typeof Profile.findProfilesByNickname).toBe("function");
  });
});
