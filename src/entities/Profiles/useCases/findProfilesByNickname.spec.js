import { describe, test, expect } from "vitest";
import { findProfilesByNickname } from "./findProfilesByNickname.ts";

describe("myProfile use case test suite", () => {
  test("must have 'reqId' property", async () => {
    const reqId = "65c95b6c-873d-4b56-a4a9-0f1c93338e6d";
    const nickname = "nickname";

    const result = findProfilesByNickname({
      reqId,
      nickname,
    });

    expect(result.hasOwnProperty("reqId")).toBeTruthy();
    expect(result.hasOwnProperty("nickname")).toBeTruthy();
  });

  test("should return an error if 'reqId' value is missing", async () => {
    const reqId = "";
    const nickname = "nickname";

    const result = findProfilesByNickname({
      reqId,
      nickname,
    });

    expect(result).toEqual({ error: "reqId is required" });
  });

  test("should return an error if 'nickname' value is missing", async () => {
    const reqId = "65c95b6c-873d-4b56-a4a9-0f1c93338e6d";
    const nickname = "";

    const result = findProfilesByNickname({
      reqId,
      nickname,
    });

    expect(result).toEqual({ error: "nickname is required" });
  });
});
