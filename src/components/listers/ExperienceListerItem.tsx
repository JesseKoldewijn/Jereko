import { type Experience } from "@/server/db/schemas/experience";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

const ProjectListerItem = ({ experience }: { experience: Experience }) => {
  return (
    <Card className="w-full max-w-md p-5">
      <CardTitle>{experience.title}</CardTitle>
      <CardDescription>{experience.company_name}</CardDescription>
      <CardContent className="px-2 pt-4">{experience.description}</CardContent>
      <CardFooter className="flex gap-2 px-0 py-0">
        {experience.skills?.split(",").flatMap((tag, idx) => {
          return (
            <div
              key={idx + tag}
              className="rounded-full border bg-gray-300 px-2 py-1 text-neutral-950"
            >
              {tag}
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
};

export default ProjectListerItem;
