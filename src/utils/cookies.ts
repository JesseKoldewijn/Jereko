export const getCookieByKey = (cookie: string, key: string) => {
  const match = cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
  if (match) {
    return match[2];
  }
  return null;
};

export const setCookie = (cookie: string, key: string, value: string) => {
  return `${cookie}; ${key}=${value}`;
};
