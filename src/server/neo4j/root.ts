import { Neogma } from "neogma";

import { env } from "@/env.mjs";

const neoLogger = (...args: any) => {
  // color coded logging
  console.log("\x1b[36m%s\x1b[0m", ...args);
};

export const neo = new Neogma(
  {
    url: env.NEO4J_URI,
    username: env.NEO4J_USER,
    password: env.NEO4J_PASSWORD,
  },
  {
    /* --> (optional) logs every query that Neogma runs, using the given function */
    logger: neoLogger,
    /* --> any driver configuration can be used */
    encrypted: true,
  },
);
