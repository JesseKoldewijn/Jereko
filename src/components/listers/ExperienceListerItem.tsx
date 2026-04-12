import {
  type Experience,
  type ExperienceRole,
  isMultiRoleExperience,
} from "@/data/experiences";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

function formatDateRange(role: ExperienceRole): string {
  const startDate =
    String(role.start_month) !== "upcoming" &&
    String(role.start_year) !== "upcoming"
      ? new Date(
          role.start_year + "/" + role.start_month + " " + "01",
        ).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Upcoming";
  const endDate =
    String(role.end_month) !== "current" && String(role.end_year) !== "current"
      ? new Date(role.end_year + "/" + role.end_month + "/01").toLocaleString(
          "default",
          {
            month: "long",
            year: "numeric",
          },
        )
      : "Current";
  return `${startDate} - ${endDate}`;
}

function RoleBlock({ role, expKey }: { role: ExperienceRole; expKey: string }) {
  return (
    <div className="border-l-2 border-neutral-300 pl-4 dark:border-neutral-600">
      <p className="font-medium">{role.title}</p>
      <p className="text-muted-foreground text-sm">{formatDateRange(role)}</p>
      <p className="mt-2">{role.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {role.skills?.split(",").map((skill, idx) => (
          <span
            key={`${idx}_${skill}_${expKey}`}
            className="rounded-full border bg-gray-300 px-2 py-1 text-neutral-950 dark:border-neutral-300 dark:bg-neutral-700 dark:text-neutral-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

const ExperienceListerItem = ({ experience }: { experience: Experience }) => {
  if (isMultiRoleExperience(experience)) {
    return (
      <Card className="w-full max-w-md bg-neutral-100 p-5 dark:bg-neutral-900">
        <CardTitle>{experience.company_name}</CardTitle>
        <CardDescription>{experience.location}</CardDescription>
        <CardContent className="space-y-6 px-2 pt-4">
          {experience.roles.map((role, i) => (
            <RoleBlock
              key={`${role.title}-${i}`}
              role={role}
              expKey={experience.exp_key}
            />
          ))}
        </CardContent>
      </Card>
    );
  }

  const startDate =
    String(experience.start_month) !== "upcoming" &&
    String(experience.start_year) !== "upcoming"
      ? new Date(
          experience.start_year + "/" + experience.start_month + " " + "01",
        ).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Upcoming";
  const endDate =
    String(experience.end_month) !== "current" &&
    String(experience.end_year) !== "current"
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
        {experience.skills?.split(",").map((skill: string, idx: number) => (
          <div
            key={`${idx}_${skill}_${experience.exp_key}`}
            className="rounded-full border bg-gray-300 px-2 py-1 text-neutral-950 dark:border-neutral-300 dark:bg-neutral-700 dark:text-neutral-300"
          >
            {skill}
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ExperienceListerItem;
