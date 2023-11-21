import { ArrowRightCircleIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import Avatar from "@/images/profile.webp";
import { getAgeByDateString } from "@/lib/age";
import { mostRecentExp } from "@/server/handlers/exp/getLatest";

const QuadSection = async () => {
  const latestExp = await mostRecentExp();
  const isLatestExpCurrent = latestExp?.end_month == "current";

  return (
    <>
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col-reverse justify-start gap-4 sm:justify-end lg:flex-col lg:items-center lg:justify-start lg:gap-8">
          <div className="flex w-full flex-col justify-center">
            <span className="text-lg font-bold [background-size:30%]">
              JKinsight
            </span>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              My personal website. Wan&apos;t to know more about my projects,
              work experience, hobbies and more? Feel free to take a look
              around!
            </p>
          </div>
          <div className="relative mx-auto mb-4 block h-24 w-24 rounded-full object-cover sm:hidden lg:mx-0 lg:mb-0">
            <div className="absolute inset-0 -z-50 rotate-90 rounded-full bg-[rgba(0,0,0,0.5)] opacity-0 transition-all hover:rotate-0 hover:opacity-100 md:z-10">
              <div className="inset-0 flex h-full w-full select-none items-center justify-center">
                Peekaboo!
              </div>
            </div>
            <Image
              alt="Profile picture of Jesse Koldewijn"
              src={Avatar}
              loading="lazy"
              className="absolute aspect-square rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-start sm:justify-end lg:justify-start">
          <span className="text-lg font-bold">Pages</span>
          <ul className="mt-2 flex list-inside list-disc flex-col gap-1 text-base text-neutral-600 dark:text-neutral-300 md:text-sm">
            <Link href="/about-me" className="list-item">
              About Me
            </Link>
            <Link href="/experience" className="list-item">
              Experience
            </Link>
            <Link href="/projects" className="list-item">
              Projects
            </Link>
            <Link
              href="https://github.com/JesseKoldewijn/JKinsight"
              className="list-item"
            >
              OpenSource
            </Link>
          </ul>
        </div>
        <div>
          <span className="mb-4 text-lg font-bold">What&apos;s My Name?!</span>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Hey there! My name is Jesse Koldewijn, I&apos;m a{" "}
            {getAgeByDateString("1999-02-15")} year old{" "}
            {latestExp ? latestExp.title : "Tech Enthusiast"} from The
            Netherlands.
          </p>
        </div>
        {latestExp && (
          <div>
            <span className="mb-4 text-lg font-bold">
              {isLatestExpCurrent ? "Current Job" : "Most Recent Job"}
            </span>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              {`${isLatestExpCurrent ? "Currently working at" : "Worked at"} ${
                latestExp.company_name
              } in ${latestExp.location} as ${latestExp.title}`}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default QuadSection;
