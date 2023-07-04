import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app.ts";

describe("testing E2E the info router", () => {
  test("test router info", async () => {
    const res = await request(app).get("/v1/info");

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toEqual({ status: "OK" });
  });
});
