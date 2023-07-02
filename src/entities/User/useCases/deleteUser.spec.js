import { describe, test, expect } from "vitest";
import { deleteUser } from "./deleteUser";

describe("deleteUser", () => {
  const existingUser = true;

  test("should return an object wtesth id and existingUser when provided a valid id and existingUser as true", () => {
    const id = "3e730f0d-4934-4e63-b70b-d2390947e19b";

    const result = deleteUser({ id, existingUser });

    expect(result).toEqual({ id, existingUser });
  });

  test("should return an object with the error message 'id is required!' when id is not provided", () => {
    const id = undefined;

    const result = deleteUser({ id, existingUser });

    expect(result).toEqual({ error: "id is required!" });
  });

  test("should return an object with the error message 'User not found!' when existingUser is false", () => {
    const id = "3e730f0d-4934-4e63-b70b-d2390947e19b";
    const existingUser = false; 

    const result = deleteUser({ id, existingUser });

    expect(result).toEqual({ error: "User not found!" });
  });
});
