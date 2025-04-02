export const getVideoID = (youtubeVideoUrl: string) => {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
  const videoID = new RegExp(regExp).exec(youtubeVideoUrl);
  return videoID ? videoID[1]! : null;
};
