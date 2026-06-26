import { UPLOADS_BASE_URL } from "./constants";

/**
 * Universal image resolver
 * handles:
 * - /uploads/abc.jpg
 * - uploads/abc.jpg
 * - full http url
 */
export const getImageUrl = (img?: string | null) => {
  if (!img) return "/placeholder.png";

  // already absolute URL
  if (img.startsWith("http")) return img;

  // normalize path
  const path = img.startsWith("/") ? img : `/${img}`;

  return `${UPLOADS_BASE_URL}${path}`;
};