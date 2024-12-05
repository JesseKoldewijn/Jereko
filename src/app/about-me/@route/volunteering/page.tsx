import { type Metadata } from "next";

import { Suspense } from "react";

const date = new Date(2021, 6, 1);

const volunteeringSince = () => {
  const dateArray = date
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

const volunteeringForMonths = () => {
  const today = new Date();

  const months = (today.getFullYear() - date.getFullYear()) * 12;
  const difference = today.getMonth() - date.getMonth() + months;

  if (difference > 12) {
    return `${Math.floor(difference / 12)} years and ${difference % 12} months`;
  }

  return difference;
};

export const metadata: Metadata = {
  title: "Volunteering",
  description: "A page about my volunteering experience.",
  openGraph: {
    title: "Volunteering | Jereko",
    description: "A page about my volunteering.",
    url: "https://jereko.dev",
  },
};

const Volunteering = async () => {
  return (
    <>
      <section
        id="about-me-overview"
        className="flex w-auto max-w-md flex-col gap-4 text-center"
      >
        <h2 className="text-center text-2xl font-bold">
          In what way do I volunteer?
        </h2>
        <div className="flex flex-col gap-4">
          <p>
            Since <Suspense>{volunteeringSince()}</Suspense> I have been a
            volunteer for Stack Up as a GameLead. I am responsible for hosting
            and moderating the Game Nights that I host which I&apos;ve been
            hosting once a week (most of the time) for the past{" "}
            <Suspense>{volunteeringForMonths()}</Suspense>.
          </p>
          <p>
            What are Game Nights? Game Nights are a way for Stack Up to bring
            people together from all over the world to play video games and
            socialize with one another. We host Game Nights for a wide variety
            of games, from Call of Duty to Dungeons & Dragons.
          </p>
          <p>
            The main purpose of Game Nights is to bring people together to have
            fun, make new friends, and to help combat isolation and loneliness
            by providing a safe and welcoming environment everybody is welcome.
          </p>
        </div>
      </section>
      <section
        id="about-me-overview"
        className="flex w-auto max-w-md flex-col gap-4 text-center xs:mb-auto"
      >
        <h2 className="text-center text-2xl font-bold">About Stack Up</h2>
        <div className="flex flex-col gap-4">
          <p>
            Stack Up, a 501(c)(3) non-profit that supports Active, Veteran
            service members and civilians from the U.S. and allied nations by
            promoting positive mental health and combat (mainly veteran) suicide
            through gaming and geek culture.
          </p>
          <p>
            The main focus of Stack Up is directed towards Veterans and Active
            service members, but just about anybody is welcome to join the
            community as long as their over 18 years old.
          </p>
        </div>
      </section>
    </>
  );
};

export default Volunteering;
