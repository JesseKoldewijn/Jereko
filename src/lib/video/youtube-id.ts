/** Extract YouTube video id from common URL shapes. */
export function getYoutubeVideoId(url: string): string | undefined {
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || undefined;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const m = u.pathname.match(/\/embed\/([^/?]+)/);
      if (m?.[1]) return m[1];
    }
  } catch {
    /* invalid url */
  }
  return undefined;
}
