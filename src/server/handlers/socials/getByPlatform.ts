import { sql } from "drizzle-orm";

import { db } from "@/server/db/conn";
import { type Social, Socials } from "@/server/db/schemas/socials";

export const getByPlatform = async (...platform: string[]) => {
  const socials =
    platform.length == 1
      ? await db
          .selectDistinct()
          .from(Socials)
          .where(sql`${Socials.platform} = ${platform[0]}`)
      : await db.selectDistinct().from(Socials);

  const filteredSocials = socials.filter((social) => {
    if (platform.length == 1) {
      return social.platform == platform[0];
    }
    return social.platform && platform.includes(social.platform);
  });

  if (filteredSocials.length > 0) {
    return filteredSocials as Social[];
  }
  return null;
};
