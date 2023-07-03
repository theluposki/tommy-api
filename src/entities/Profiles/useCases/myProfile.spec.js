import { describe, test, expect } from "vitest";
import { myProfile } from "./myProfile.ts";

describe("myProfile use case test suite", () => {
  test("must have 'reqId' property", async () => {
    const reqId = "65c95b6c-873d-4b56-a4a9-0f1c93338e6d";

    const result = myProfile({
      reqId
    });

    expect(result.hasOwnProperty("reqId")).toBeTruthy();
  });

  test("should return an error if 'reqId' value is missing", async () => {
    const reqId = "";

    const result = myProfile({
      reqId
    });

    expect(result).toEqual({ error: "reqId is required" });
  });

});
