import db from "../../db/mariadb.js";
import { User, ICreateUser } from "../../entities/User/user.ts";

export const deleteUserRepository = async ({
  id
}: ICreateUser): Promise<object> => {
  let conn;

  try {
    conn = await db.getConnection();

    const existingUser = await conn.query(
      "SELECT email FROM users WHERE id=?",
      [id]
    );

    const user = await User.deleteUser({
      id,
      existingUser: existingUser.length > 0,
    });

    if (user.error) return user;

    const query = "DELETE FROM users WHERE id=?";

    const row = await conn.query(query, [user.id]);

    if (row.affectedRows === 1)
      return { sucess: "User deleted successfully!" };

    return { error: "Unable to delete user!" };
  } catch (error) {
    return { error: "An error occurred while deleting the user" };
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
