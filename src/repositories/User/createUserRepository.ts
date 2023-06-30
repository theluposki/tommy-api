import db from "../../db/mariadb.js";
import { User } from "../../domain/entities/User/User.js";

import { ICreateUser } from "../../domain/entities/User/User.ts";

export const createUserRepository = async ({
  email,
  password,
  confirmPassword,
}: ICreateUser): Promise<object> => {
  let conn;

  try {
    conn = await db.getConnection();

    const existingUser = await conn.query(
      "SELECT email FROM users WHERE email=?",
      [email]
    );

    const user = await User.createUser({
      email,
      password,
      confirmPassword,
      existingUser: existingUser.length > 0,
    });

    if (user.error) return user;

    const query1 = "INSERT INTO users (id, email, password) VALUES (?,?,?);";

    const row = await conn.query(query1, [user.id, user.email, user.password]);

    if (row.affectedRows === 1)
      return { success: "User successfully registered!" };

    return { error: "Unable to register user!" };
  } catch (error) {
    return { error: "An error occurred while creating a user" };
  } finally {
    if (conn) {
      conn.release();
    }
  }
};