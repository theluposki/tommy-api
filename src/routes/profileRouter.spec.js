import { describe, test, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app.ts";

let userId;
let token;

describe("[ Create PROFILE ] testing E2E the profiles router", () => {
  beforeEach(async () => {
    const res = await request(app).post("/v1/users").send({
      email: "user2@mail.com",
      password: "123456",
      confirmPassword: "123456",
    });

    userId = res.body.id;

    const resAuth = await request(app).post("/v1/users/auth").send({
      email: "user2@mail.com",
      password: "123456",
    });

    token = resAuth.body.token
  })

  afterEach(async () => {
    await request(app).delete(`/v1/users/${userId}`);
  })

  test("should return an error if nickname is not provided", async () => {

    const res = await request(app).post("/v1/profiles")
    .set('Cookie', `token=${token}`)
    .send({
      nickname: "",
      bio: "",
      picture: "",
      links: ""
    });
    
    expect(res.body).toHaveProperty("error");
    expect(res.body).toEqual({ error: "nickname is required"});
  });

  test("it must be possible to create the profile being authenticated and passing only with the nickname", async () => {

    const res = await request(app).post("/v1/profiles")
    .set('Cookie', `token=${token}`)
    .send({
      nickname: "Jon Doe",
      bio: "",
      picture: "",
      links: ""
    });
    
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("sucess");
    expect(res.body.sucess).toEqual("Profile successfully added!");
  });

  test("should return an error if the user already has a profile", async () => {

    await request(app).post("/v1/profiles")
    .set('Cookie', `token=${token}`)
    .send({
      nickname: "Jon Doe",
      bio: "",
      picture: "",
      links: ""
    });

    const res2 = await request(app).post("/v1/profiles")
    .set('Cookie', `token=${token}`)
    .send({
      nickname: "Jon Doe",
      bio: "",
      picture: "",
      links: ""
    });
    
    expect(res2.body).toHaveProperty("error");
    expect(res2.body).toEqual({ error: 'you already have a profile' });
  });
});
