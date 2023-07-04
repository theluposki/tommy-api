import { describe, test, expect } from "vitest";
import { myProfile } from "./myProfile.ts";

describe("myProfile use case test suite", () => {
  test("must have 'reqId' property", async () => {
    const reqUserId = "65c95b6c-873d-4b56-a4a9-0f1c93338e6d";

    const result = myProfile({
      reqUserId,
    });

    expect(result.hasOwnProperty("reqUserId")).toBeTruthy();
  });

  test("should return an error if 'reqId' value is missing", async () => {
    const reqUserId = "";

    const result = myProfile({
      reqUserId,
    });

    expect(result).toEqual({ error: "reqUserId is required" });
  });
});
