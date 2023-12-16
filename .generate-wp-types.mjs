import { typegenWP } from "./src/server/wp-type-gen.mjs";

try {
  typegenWP("./src/server");
} catch (error) {
  console.error(error);
}
