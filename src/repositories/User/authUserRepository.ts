import db from "../../db/mariadb.js";
import { User, IAuthUser } from "../../entities/User/user.ts";
import { compare } from "../../utils/hashPassword.ts";
import { sign } from "../../utils/jwt.ts";

export const authUserRepository = async ({
  email,
  password,
}: IAuthUser): Promise<object> => {
  let conn;

  try {
    const user = User.authUser({
      email,
      password,
    });

    if(user.error) return user

    conn = await db.getConnection();
    
    const existingUser: any = await conn.query("SELECT * FROM users WHERE email=?", [
      user.email,
    ]);

    if (existingUser.length === 0) return { error: "Invalid email or password" };

    if (!compare(user.password, existingUser[0].password))
      return { error: "Invalid email or password" };

    if (user.error) return user;

    const token = sign(existingUser[0].id)

    return {
      sucess: "Autenticado com sucesso!",
      token
    } 
  } catch (error) {
    return { error: "An error occurred while authenticating the user" };
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
