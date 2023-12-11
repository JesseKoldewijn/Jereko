export const getVideoID = (youtubeVideoUrl: string) => {
  const videoID = youtubeVideoUrl.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/,
  );
  return videoID ? videoID[1]! : null;
};
