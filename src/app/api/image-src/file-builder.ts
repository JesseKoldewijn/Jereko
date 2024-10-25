import sharp from "sharp";

export const buildImage = async (
  file: ArrayBuffer,
  {
    width,
    height,
    quality,
  }: {
    width: number;
    height: number;
    quality: number;
  },
) => {
  const compressImage = await sharp(file)
    .resize(width, height)
    .webp({
      quality: quality,
    })
    .toBuffer();

  const imageFileReadableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(compressImage);
      controller.close();
    },
  });

  return {
    buffer: compressImage,
    stream: imageFileReadableStream,
    size: compressImage.byteLength,
    width,
    height,
  };
};
