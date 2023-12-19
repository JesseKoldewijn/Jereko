import { parse } from "node-html-parser";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

const postedOnDate = (date: string) => {
  const dateArray = new Date(date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(",", "")
    .split(" ");

  return `${dateArray[0]} ${
    dateArray[1] == "1" ? "1st" : `${dateArray[1]}th`
  } ${dateArray[2]}`;
};

const ProjectListerItem = ({ blog }: { blog: any }) => {
  if (!blog) return null;
  const postedOn = postedOnDate(blog.date);
  const blogContent = parse(blog.content.rendered).text;

  return (
    <Card className="w-full max-w-md bg-neutral-100 px-4 py-5 dark:bg-transparent">
      <CardTitle>{blog.title.rendered}</CardTitle>
      <CardDescription></CardDescription>
      <CardContent className="px-2 pt-4">{blogContent}</CardContent>
      <CardFooter className="flex flex-wrap gap-2 gap-y-4 px-0 py-0 text-sm">
        <span className="mx-auto md:mr-0">posted on: {postedOn}</span>
      </CardFooter>
    </Card>
  );
};

export default ProjectListerItem;
