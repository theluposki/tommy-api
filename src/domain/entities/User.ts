import { randomUUID } from 'node:crypto'

interface UserInterface {
  createUser: Function
}


const User: UserInterface = {
  async createUser (email: string, password: string, confirmPassword: string) {

    if(!email) return { error: "email is required" }
    if(!password) return { error: "password is required" }
    if(!confirmPassword) return { error: "confirmPassword is required" }

    const id: string = randomUUID()

    if(password !== confirmPassword) return { error: "passwords do not match" }

    return {
      id,
      email,
      password,
    }
  }
}

export {
  User
}
