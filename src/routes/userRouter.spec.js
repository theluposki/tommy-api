import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app.ts";

let userId;

describe("[ Create USER ] testing E2E the user router", () => {
  // Se a propriedade email não existir ou for falsy
  test("should return an error if email is not provided", async () => {
    const res = await request(app).post("/v1/users").send({
      email: "",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toEqual({ error: "email is required" });
  });

  // Se a propriedade password não existir ou for falsy
  test("should return an error if no password is given", async () => {
    const res = await request(app).post("/v1/users").send({
      email: "user@mail.com",
      password: "",
      confirmPassword: "123456",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toEqual({ error: "password is required" });
  });

  // Se a propriedade confirmPassword não existir ou for falsy
  test("should return an error if no confirmPassword is given", async () => {
    const res = await request(app).post("/v1/users").send({
      email: "user@mail.com",
      password: "123456",
      confirmPassword: "",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toEqual({ error: "confirmPassword is required" });
  });

  // deve criar um usuário e retornar com sucesso
  test("must create a user and return successfully", async () => {
    const res = await request(app).post("/v1/users").send({
      email: "user@mail.com",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("sucess");
    expect(res.body).toHaveProperty("id");
    expect(res.body.sucess).toEqual("User successfully registered!");

    userId = res.body.id;
  });

  // Se usuário ja existir
  test("should return an error if the user with that email already exists", async () => {
    const res = await request(app).post("/v1/users").send({
      email: "user@mail.com",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toEqual({ error: "user already exist" });
  });
});

describe("[ Auth ] testing E2E the user/auth router", () => {
  // Se a propriedade email não existir ou for falsy
  test("should return an error if email is not provided", async () => {
    const res = await request(app).post("/v1/users/auth").send({
      email: "",
      password: "123456",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toEqual({ error: "email is required" });
  });

  // Se usuário ja existir
  test("should return an error if the user with that email doesn't exist", async () => {
    const res = await request(app).post("/v1/users/auth").send({
      email: "user4@mail.com",
      password: "123456",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toEqual({ error: "Invalid email or password" });
  });

  // Se a propriedade password não existir ou for falsy
  test("should return an error if no password is given", async () => {
    const res = await request(app).post("/v1/users/auth").send({
      email: "user@mail.com",
      password: "",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toEqual({ error: "password is required" });
  });

  test("should return an error if no password is given", async () => {
    const res = await request(app).post("/v1/users/auth").send({
      email: "user@mail.com",
      password: "123456",
    });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("sucess");
    expect(res.body).toHaveProperty("token");
    expect(res.body.sucess).toEqual("Autenticado com sucesso!");
  });

  test("must delete the user 'user@mail.com'", async () => {
    const res = await request(app).delete(`/v1/users/${userId}`);

    expect(res.body).toHaveProperty("sucess");
    expect(res.body.sucess).toEqual("User deleted successfully!");
  });
});
