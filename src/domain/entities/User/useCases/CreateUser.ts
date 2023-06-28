import { randomUUID } from 'node:crypto'
import { hash } from '../../../../utils/hashPassword.ts'

async function createUser (email: string, password: string, confirmPassword: string, existingUser: boolean) {

  if(existingUser) return { error: "user already exist" }
  if(!email) return { error: "email is required" }
  if(!password) return { error: "password is required" }
  if(!confirmPassword) return { error: "confirmPassword is required" }

  const id: string = randomUUID()

  if(password !== confirmPassword) return { error: "passwords do not match" }

  return {
    id,
    email,
    password: hash(password),
  }
}

export { createUser }
