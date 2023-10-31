import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const locales = ["en-US", "nl-NL"];
export const defaultLocale = "en-US";

export const matchedLang = (langString: string) => {
  const languages = new Negotiator({
    headers: {
      "accept-language": langString ?? langString ?? "en-US",
    },
  }).languages();

  return match(languages, locales, defaultLocale);
};
