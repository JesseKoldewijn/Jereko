import * as applications from "./applications";
import * as events from "./events";
import * as experience from "./experience";
import * as projects from "./projects";
import * as socials from "./socials";

export const schema = {
  ...events,
  ...experience,
  ...projects,
  ...socials,
  ...applications,
};
