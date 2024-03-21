import { sql } from "drizzle-orm";

import { db } from "@/server/db/conn";
import { type Social, Socials } from "@/server/db/schemas/socials";

export const getByPlatform = async (...platform: string[]) => {
  const socials =
    platform.length == 1
      ? await db.query.Socials.findFirst({
          where: sql`${Socials.platform} = ${platform[0]}`,
        })
      : await db.query.Socials.findMany({
          with: {
            platform: true,
          },
        });

  const socialsArray =
    socials == undefined ? [] : Array.isArray(socials) ? socials : [socials];

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
