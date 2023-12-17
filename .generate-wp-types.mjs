import { typegenWP } from "./src/server/wp-type-gen.mjs";

try {
  await typegenWP("./src/server");
} catch (error) {
  console.error(error);
}
