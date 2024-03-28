import { type Experience } from "@/server/db/schemas/experience";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

const ExperienceListerItem = ({ experience }: { experience: Experience }) => {
  const startDate =
    experience.start_month !== "upcoming" &&
    experience.start_year !== "upcoming"
      ? new Date(
          experience.start_year + "/" + experience.start_month + " " + "01",
        ).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Upcoming";
  const endDate =
    experience.end_month !== "current" && experience.end_year !== "current"
      ? new Date(
          experience.end_year + "/" + experience.end_month + "/01",
        ).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Current";

  return (
    <Card className="w-full max-w-md bg-neutral-100 p-5 dark:bg-neutral-900">
      <CardTitle>{experience.title}</CardTitle>
      <CardDescription>
        {experience.company_name} | {experience.location}
      </CardDescription>
      <CardContent className="px-2 pt-4">
        {experience.description}
        <div className="mt-4 flex flex-col">{` ${startDate} - ${endDate}`}</div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-start gap-2 gap-y-4 px-0 py-0">
        {experience.skills?.split(",").flatMap((skill, idx) => {
          return (
            <div
              key={`${idx}_${skill}_${experience.id}}`}
              className="rounded-full border bg-gray-300 px-2 py-1 text-neutral-950 dark:border-neutral-300 dark:bg-neutral-700 dark:text-neutral-300"
            >
              {skill}
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
};

export default ExperienceListerItem;
