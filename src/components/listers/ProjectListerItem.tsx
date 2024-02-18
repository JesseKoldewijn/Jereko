import { LuMouse } from "react-icons/lu";

import Link from "next/link";

import { type Project } from "@/server/db/schemas/projects";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

const ProjectListerItem = ({ project }: { project: Project }) => {
  if (project.draft == true) return;

  const LinkWrapper = ({ children }: { children: React.ReactNode }) => {
    if (project.link !== null) {
      return (
        <Link
          href={project.link}
          target="_blank"
          className="flex rounded-lg border border-neutral-300 transition-colors duration-500 hover:border-neutral-500 dark:border-neutral-800 hover:dark:border-neutral-200"
        >
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <LinkWrapper>
      <Card className="w-full max-w-md bg-neutral-100 p-5 dark:bg-neutral-900">
        <CardTitle className="flex items-center justify-between">
          <span className="block w-full max-w-[270px] overflow-hidden text-ellipsis whitespace-nowrap md:max-w-[300px]">
            {project.title}
          </span>
          {project.link !== null && (
            <LuMouse
              size={24}
              className="animate-pulse text-muted-foreground"
            />
          )}
        </CardTitle>
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
    </LinkWrapper>
  );
};

export default ProjectListerItem;
