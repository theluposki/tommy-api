import db from "../../db/mariadb.ts";
import {
  Profile,
  IFindProfileByNickname,
} from "../../entities/Profiles/profile.ts";

export const findProfilesByNicknameRepository = async ({
  reqUserId,
  nickname,
}: IFindProfileByNickname): Promise<object> => {
  let conn;

  try {
    const profile = Profile.findProfilesByNickname({
      reqUserId,
      nickname,
    });

    if (profile.error) return profile;

    conn = await db.getConnection();

    const existingProfile = await conn.query(
      `SELECT up.id, up.nickname, up.picture 
      FROM user_profiles AS up 
      INNER JOIN users AS u 
      ON u.id = up.user_id WHERE up.nickname like ?`,
      [`${profile.nickname}%`]
    );

    if (existingProfile.length === 0) return [];

    return { sucess: existingProfile[0] };
  } catch (error) {
    return { error: "could not find profile" };
  } finally {
    if (conn) conn.release();
  }
};
