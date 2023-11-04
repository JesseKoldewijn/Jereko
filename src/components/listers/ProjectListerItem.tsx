import { type Project } from "@/server/db/schemas/projects";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

const ProjectListerItem = ({ project }: { project: Project }) => {
  return (
    <Card className="w-full max-w-md bg-neutral-100 p-5 dark:bg-transparent">
      <CardTitle>{project.title}</CardTitle>
      <CardDescription>{project.sub_title}</CardDescription>
      <CardContent className="px-2 pt-4">{project.description}</CardContent>
      <CardFooter className="flex flex-wrap items-start gap-2 gap-y-4 px-0 py-0">
        {project.tags?.split(",").flatMap((tag, idx) => {
          return (
            <div
              key={`${idx}_${tag}_${project.id}}`}
              className="rounded-full border bg-gray-300 px-2 py-1 text-neutral-950 dark:border-neutral-300 dark:bg-neutral-700 dark:text-neutral-300"
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
