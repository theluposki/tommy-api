import { describe, test, expect } from "vitest";
import { createUser } from "./CreateUser.ts";
import { compare } from "../../../../utils/hashPassword.ts";

describe("createUser use case test suite", () => {
  test("should return error if user already exists", async () => {
    const email = "test@example.com";
    const password = "password";
    const confirmPassword = "password";
    const existingUser = true;

    const result = await createUser(
      email,
      password,
      confirmPassword,
      existingUser
    );

    expect(result).toEqual({ error: "user already exist" });
  });

  test("should return error if email is not provided", async () => {
    const email = "";
    const password = "password";
    const confirmPassword = "password";
    const existingUser = false;

    const result = await createUser(
      email,
      password,
      confirmPassword,
      existingUser
    );

    expect(result).toEqual({ error: "email is required" });
  });

  test("should return error if password is not provided", async () => {
    const email = "test@example.com";
    const password = "";
    const confirmPassword = "password";
    const existingUser = false;

    const result = await createUser(
      email,
      password,
      confirmPassword,
      existingUser
    );

    expect(result).toEqual({ error: "password is required" });
  });

  test("should return error if confirmPassword is not provided", async () => {
    const email = "test@example.com";
    const password = "password";
    const confirmPassword = "";
    const existingUser = false;

    const result = await createUser(
      email,
      password,
      confirmPassword,
      existingUser
    );

    expect(result).toEqual({ error: "confirmPassword is required" });
  });

  test("should return error if passwords do not match", async () => {
    const email = "test@example.com";
    const password = "password";
    const confirmPassword = "differentpassword";
    const existingUser = false;

    const result = await createUser(
      email,
      password,
      confirmPassword,
      existingUser
    );

    expect(result).toEqual({ error: "passwords do not match" });
  });

  test("should return user object with hashed password if all requirements are met", async () => {
    const email = "test@example.com";
    const password = "password";
    const confirmPassword = "password";
    const existingUser = false;

    const result = await createUser(
      email,
      password,
      confirmPassword,
      existingUser
    );

    const isPasswordMatch = compare(password, result.password);

    expect(result).toEqual({
      id: expect.any(String),
      email,
      password: expect.any(String),
    });

    expect(isPasswordMatch).toBe(true);
  });
});
