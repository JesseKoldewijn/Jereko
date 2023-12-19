import { typegenWP } from "./src/server/wp-type-gen.mjs";

try {
  await typegenWP("./src/types");
} catch (error) {
  console.error(error);
}
