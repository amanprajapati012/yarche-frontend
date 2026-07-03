import imageCompression from "browser-image-compression";

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 0.4,
    maxWidthOrHeight: 1600,
    initialQuality: 0.7,
    useWebWorker: true,
    fileType: "image/webp",
  };

  return await imageCompression(file, options);
}