import { parse } from "node-html-parser";

import Link from "next/link";

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
    <Link href={`/blog/${blog.slug}`}>
      <Card className="flex w-full max-w-md cursor-pointer flex-col bg-neutral-100 px-4 py-5 hover:invert dark:bg-neutral-900">
        <CardTitle>{blog.title.rendered}</CardTitle>
        <CardDescription></CardDescription>
        <CardContent className="px-2 pt-4">{blogContent}</CardContent>
        <CardFooter className="flex flex-wrap gap-2 gap-y-4 px-0 py-0 text-sm">
          <span className="mx-auto md:mr-0">posted on: {postedOn}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectListerItem;
