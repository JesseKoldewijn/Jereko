import { type Experience } from "@/server/db/schemas/experience";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

const ExperienceListerItem = ({ experience }: { experience: Experience }) => {
  return (
    <Card className="w-full max-w-md p-5">
      <CardTitle>{experience.title}</CardTitle>
      <CardDescription>{experience.company_name}</CardDescription>
      <CardContent className="px-2 pt-4">{experience.description}</CardContent>
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
