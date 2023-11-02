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
    <Card className="w-full max-w-md p-5">
      <CardTitle>{project.title}</CardTitle>
      <CardDescription>{project.sub_title}</CardDescription>
      <CardContent className="px-2 pt-4">{project.description}</CardContent>
      <CardFooter className="flex gap-2 px-0 py-0">
        {project.tags?.split(",").flatMap((tag) => {
          return (
            <div className="rounded-full border bg-gray-300 px-2 py-1 text-neutral-950">
              {tag}
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
};

export default ProjectListerItem;
