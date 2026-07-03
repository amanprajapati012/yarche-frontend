import { UPLOADS_BASE_URL } from "./constants";


export type ImageType = {
  url: string;
  public_id?: string;
};

export const getImageUrl = (
  img?: string | ImageType | null
) => {
  if (!img) return "/placeholder.png";

  // Cloudinary object
  if (typeof img === "object") {
    if (img.url) return img.url;

    return "/placeholder.png";
  }

  // Absolute URL
  if (img.startsWith("http")) {
    return img;
  }

  // Local upload
  const path = img.startsWith("/") ? img : `/${img}`;

  return `${UPLOADS_BASE_URL}${path}`;
};