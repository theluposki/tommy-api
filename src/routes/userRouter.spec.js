import { describe, test, expect } from "vitest";
import request from "supertest"
import app  from '../app.ts'

describe("testing E2E the user router", () => {

  // Se a propriedade email não existir ou for falsy
  test("should return an error if email is not provided", async () => {
    const res = await request(app)
    .post('/v1/users')
    .set({
      email: "",
      password: "123456",
      confirmPassword: "123456"
     })

     expect(res.body).toHaveProperty("error")
     expect(res.body).toEqual({ error: 'email is required' });
  })

  // Se usuário ja existir
  test("should return an error if the user with that email already exists", async () => {
    const res = await request(app)
    .post('/v1/users')
    .send({
      email: "lu@mail.com",
      password: "",
      confirmPassword: "123456"
     })

     expect(res.body).toHaveProperty("error")
     expect(res.body).toEqual({ error: 'user already exist' });
  })

  // Se a propriedade password não existir ou for falsy
  test("should return an error if no password is given", async () => {
    const res = await request(app)
    .post('/v1/users')
    .send({
      email: "lu2@mail.com",
      password: "",
      confirmPassword: "123456"
     })

     expect(res.body).toHaveProperty("error")
     expect(res.body).toEqual({ error: 'password is required' });
  })

  // Se a propriedade confirmPassword não existir ou for falsy
  test("should return an error if no confirmPassword is given", async () => {
    const res = await request(app)
    .post('/v1/users')
    .send({
      email: "lu2@mail.com",
      password: "123456",
      confirmPassword: ""
     })

     expect(res.body).toHaveProperty("error")
     expect(res.body).toEqual({ error: 'confirmPassword is required' });
  })

})
