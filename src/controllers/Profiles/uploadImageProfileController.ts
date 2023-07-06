import { ProfileRepository } from "../../repositories/Profiles/profileRepository.ts";
import { compressImage } from "../../utils/compressImage.ts";

interface IUploadProfile {
  filename: string;
  path: string;
  reqUserId: string;
}

export const uploadImageProfileController = async ({
  filename,
  path,
  reqUserId,
}: IUploadProfile): Promise<object> => {
  const compress: any = await compressImage(filename, path);

  const result = await ProfileRepository.uploadImageProfileRepository({ images: compress.sucess, reqUserId })

  return result;
};
