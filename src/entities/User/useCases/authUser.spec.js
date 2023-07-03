import { describe, test, expect } from "vitest";
import { authUser } from "./authUser.ts";

describe("authUSer use case test suite", () => {
  test("should return error if email is not provided", async () => {
    const email = "";
    const password = "123456";

    const result = authUser({
      email,
      password,
    });

    expect(result).toEqual({ error: "email is required" });
  });

  test("should return error if password is not provided", async () => {
    const email = "user@mail.com";
    const password = "";

    const result = authUser({
      email,
      password,
    });

    expect(result).toEqual({ error: "password is required" });
  });

});
