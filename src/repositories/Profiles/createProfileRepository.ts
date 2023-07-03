import db from "../../db/mariadb.js";
import { Profile, ICreateProfile } from "../../entities/Profiles/profile.js";

export const createProfileRepository = async ({
  nickname,
  bio,
  picture,
  links,
  reqUserId,
}: ICreateProfile): Promise<object> => {
  let conn;

  try {
    const profile = Profile.createProfile({
      nickname,
      bio,
      picture,
      links,
      reqUserId,
    });

    conn = await db.getConnection();

    const profileAlreadyExists = await conn.query("SELECT * FROM user_profiles WHERE user_id=?",
      [ profile.reqUserId]
    );

    if(profileAlreadyExists.length > 0) return { error: "you already have a profile" }

    const row = await conn.query(
      `
	    INSERT INTO user_profiles
      (id, user_id, nickname, bio, picture, links)
      VALUES
      (?,?,?,?,?,?);
	    `,
      [
        profile.id,
        profile.reqUserId,
        profile.nickname,
        profile.bio,
        profile.picture,
        profile.links
      ]
    );

    console.log("row: ", row)

    if (row.affectedRows === 1)
      return { sucess: "Profile successfully added!", id: profile.id };

    return { error: "Unable to register user!" };
  } catch (error) {
    return { error: "Unable to add profile!" };
  } finally {
    if (conn) conn.release();
  }
};
