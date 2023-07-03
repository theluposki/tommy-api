import { describe, test, expect } from "vitest";
import { User } from "./user.ts";

describe("testing the user entity", () => {
  test("User should be an object", () => {
    expect(typeof User).toBe("object");
  });

  test("User is expected to have the createUser property", () => {
    expect(User.hasOwnProperty("createUser")).toBeTruthy();
    expect(User.hasOwnProperty("authUser")).toBeTruthy();
    expect(User.hasOwnProperty("deleteUser")).toBeTruthy();
  });

  test("the createUser property is expected to be a function", () => {
    expect(typeof User.createUser).toBe("function");
  });

  test("the authUser property is expected to be a function", () => {
    expect(typeof User.authUser).toBe("function");
  });

  test("the deleteUser property is expected to be a function", () => {
    expect(typeof User.deleteUser).toBe("function");
  });
});
