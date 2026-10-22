// Shrinks a photo in the browser before it's uploaded: at most MAX_SIDE px on
// its longest side, re-encoded as WebP (JPEG where the browser can't encode
// WebP, e.g. Safari), stepping the quality down until it's under
// TARGET_BYTES or the lowest quality is reached.
const MAX_SIDE = 1600;
const TARGET_BYTES = 300 * 1024;
const QUALITIES = [0.8, 0.7, 0.6, 0.5];

const toBlob = (canvas, type, quality) =>
  new Promise((resolve) => canvas.toBlob(resolve, type, quality));

// Rejects when the browser can't decode the file (e.g. HEIC outside Safari).
export const compressImage = async (file) => {
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image", // apply the camera's EXIF rotation
  });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  context.imageSmoothingQuality = "high";
  // A white backdrop, so a transparent PNG doesn't turn black as a JPEG.
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // Browsers that can't encode WebP silently return a PNG instead.
  let type = "image/webp";
  let blob = await toBlob(canvas, type, QUALITIES[0]);
  if (blob?.type !== type) {
    type = "image/jpeg";
    blob = await toBlob(canvas, type, QUALITIES[0]);
  }
  for (const quality of QUALITIES.slice(1)) {
    if (!blob || blob.size <= TARGET_BYTES) break;
    blob = await toBlob(canvas, type, quality);
  }
  if (!blob) throw new Error(`Couldn't encode ${file.name}`);

  const baseName = file.name.replace(/\.[^.]*$/, "") || "photo";
  const extension = type === "image/webp" ? ".webp" : ".jpg";
  return new File([blob], baseName + extension, {
    type,
    lastModified: Date.now(),
  });
};
