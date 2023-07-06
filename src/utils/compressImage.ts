import sharp from "sharp";
import { formatFileSize } from "./formatFileSize.ts";
import { promisify } from "util";
import { unlink } from "fs";

const unlinkAsync = promisify(unlink);

export const compressImage = async (
  filename: string,
  path: string
): Promise<{ sucess: object[] } | { error: string }> => {
  try {
    const sizes: number[] = [150, 600];
    const names: object[] = [];

    for (const item of sizes) {
      const compressedImagePath = `_${filename}`;

      const data = await sharp(path)
        .resize({ width: item })
        .png({ quality: 80 })
        .toFile(`src/uploads/${item}x-${compressedImagePath}`);

      names.push({
        filename: `${item}x-${compressedImagePath}`,
        size: formatFileSize(data.size),
      });
    }

    await unlinkAsync(path);

    return { sucess: names };
  } catch (error) {
    console.error("Error compressing or deleting file:", error);
    return { error: "Error compressing or deleting file" };
  }
};
