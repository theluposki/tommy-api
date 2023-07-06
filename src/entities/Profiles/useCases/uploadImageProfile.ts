export const uploadImageProfile = ({
  images,
  reqUserId,
}: {
  images: [];
  reqUserId: string;
}): object => {
  if(images.length <= 0) return { error: "images is required" }
  if (!reqUserId) return { error: "reqUserId is required" };

  return {
    images: JSON.stringify(images),
    reqUserId
  };
};
