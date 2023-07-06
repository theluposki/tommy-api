import db from "../../db/mariadb.js";
import { Profile } from "../../entities/Profiles/profile.js";
import { promisify } from "util";
import { unlink } from "fs";

const unlinkAsync = promisify(unlink);

export const uploadImageProfileRepository = async ({
  images,
  reqUserId,
}: {
  images: [];
  reqUserId: string;
}) => {
  let conn;

  try {
    const profile = await Profile.uploadImageProfile({ images, reqUserId });

    if (profile.error) return profile;

    conn = await db.getConnection();

    const oldImage = await conn.query(
      "SELECT picture FROM user_profiles WHERE user_id = ?;",
      [profile.reqUserId]
    );

    const filenames = JSON.parse(oldImage[0].picture).map(
      (item: any) => `src/uploads/${item.filename}`
    );

    const row = await conn.query(
      `UPDATE user_profiles
       SET picture = ?
       WHERE user_id = ?;`,
      [profile.images, profile.reqUserId]
    );

    if (row.affectedRows === 1) {
      for (const item of filenames) {
        await unlinkAsync(item);
      }

      return { sucess: "photo updated successfully!", id: profile.id };
    }

    return { error: "unable to update photo!" };
  } catch (error) {
    return { error: "unable to update photo" };
  } finally {
    if (conn) conn.release();
  }
};
