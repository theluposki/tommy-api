import { describe, test, expect } from "vitest";
import { User } from "./User.ts";

describe("testing the user entity", () => {
  test("User should be an object", () => {
    expect(typeof User).toBe("object");
  });

  test("User is expected to have the createUser property", () => {
    expect(User.hasOwnProperty("createUser")).toBeTruthy();
  });

  test("the createUser property is expected to be a function", () => {
    expect(typeof User.createUser).toBe("function");
  });
});
