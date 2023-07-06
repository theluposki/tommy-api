import { describe, test, expect } from "vitest";
import { findProfilesByNickname } from "./findProfilesByNickname.ts";

describe("myProfile use case test suite", () => {
  test("must have 'reqId' property", async () => {
    const reqUserId = "65c95b6c-873d-4b56-a4a9-0f1c93338e6d";
    const nickname = "nickname";

    const result = findProfilesByNickname({
      reqUserId,
      nickname,
    });

    expect(result.hasOwnProperty("reqUserId")).toBeTruthy();
    expect(result.hasOwnProperty("nickname")).toBeTruthy();
  });

  test("should return an error if 'reqUserId' value is missing", async () => {
    const reqUserId = "";
    const nickname = "nickname";

    const result = findProfilesByNickname({
      reqUserId,
      nickname,
    });

    expect(result).toEqual({ error: "reqUserId is required" });
  });

  test("should return an error if 'nickname' value is missing", async () => {
    const reqUserId = "65c95b6c-873d-4b56-a4a9-0f1c93338e6d";
    const nickname = "";

    const result = findProfilesByNickname({
      reqUserId,
      nickname,
    });

    expect(result).toEqual({ error: "nickname is required" });
  });
});
