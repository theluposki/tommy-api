import db from "../../db/mariadb.js";
import { Profile, ICreateProfile } from "../../entities/Profiles/profile.js";

export const myProfileRepository = async ({
  reqUserId,
}: ICreateProfile): Promise<object> => {
  let conn;

  try {
    const profile = Profile.myProfile({
      reqUserId,
    });

    if (profile.error) return profile;

    conn = await db.getConnection();

    const existingProfile = await conn.query(
      "SELECT id, nickname, bio, picture, links, 'created_at', 'updated_at' FROM user_profiles WHERE user_id=?",
      [profile.reqUserId]
    );

    if (!existingProfile[0].id) return { error: "profile does not exist" };

    return { sucess: existingProfile[0] };
  } catch (error) {
    return { error: "could not find profile" };
  } finally {
    if (conn) conn.release();
  }
};
