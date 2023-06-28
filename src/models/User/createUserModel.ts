import db from "../../db/mariadb.ts";
import { User } from "../../domain/entities/User/User.ts";

async function createUserModel(
  email: string,
  password: string,
  confirmPassword: string
) {
  let conn;

  try {
    conn = await db.getConnection();

    const existingUser = await conn.query(
      "SELECT email FROM users WHERE email=?",
      [email]
    );

    const user = await User.createUser(
      email,
      password,
      confirmPassword,
      existingUser.length > 0
    );

    console.log(user);

    if (user.error) return user;

    const query1 = "INSERT INTO users (id, email, password) VALUES (?,?,?);";

    const row = await conn.query(query1, [user.id, user.email, user.password]);

    if (row.affectedRows === 1)
      return { success: "Usuário registrado com sucesso!" };
  } catch (error) {
    return { error: "Ocorreu um erro na criação de usuário" };
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

export { createUserModel };
