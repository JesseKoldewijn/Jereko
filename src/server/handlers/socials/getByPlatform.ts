import { sql } from "drizzle-orm";

import { db } from "@/server/db/conn";
import { type Social, socials } from "@/server/db/schemas/socials";

export const getByPlatform = async (...platform: string[]) => {
  const _socials =
    platform.length == 1
      ? await db.query.socials.findFirst({
          where: sql`${socials.platform} = ${platform[0]}`,
        })
      : await db.query.socials.findMany();

  const socialsArray =
    socials == undefined ? [] : Array.isArray(_socials) ? _socials : [_socials];

  const filteredSocials = socialsArray
    .filter((social) => {
      if (!social) return false;
      if (platform.length == 1) {
        return social.platform == platform[0];
      }
      return social.platform && platform.includes(social.platform);
    })
    .filter((x) => x !== undefined);

  if (filteredSocials.length > 0) {
    return filteredSocials as Social[];
  }
  return null;
};
