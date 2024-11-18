import { type Metadata } from "next";

import { unstable_cacheLife } from "next/cache";

export const metadata: Metadata = {
  title: "Volunteering",
  description: "A page about my hobbies.",
  openGraph: {
    title: "Volunteering | Jereko",
    description: "A page about my hobbies.",
    url: "https://jereko.dev",
  },
};

const Hobbies = () => {
  "use cache";
  unstable_cacheLife("weeks");

  return (
    <>
      <section
        id="about-me-overview"
        className="flex w-auto max-w-md flex-col gap-4 text-center xs:mb-auto"
      >
        <h2 className="text-center text-2xl font-bold">What are my hobbies?</h2>
        <div className="flex flex-col gap-4">
          <p>
            In general. I love to play video games, work on personal
            side-projects, experiment with new tech (hardware, software,
            frameworks & programming languages). I also love to learn new
            things, especially when it comes to programming. I&apos;m always
            looking for new things to try out and experiment with. Things like
            low-level programming, game development, and such are things
            I&apos;ve been experimenting with for a while now.
          </p>
          <p>
            One of the things in tech that I&apos;ve picked up just from
            self-study and experimentation is React.js and Typescript. Which by
            now help me day-to-day to build cool stuff for the web and native
            (using Tauri.rs for instance)
          </p>
        </div>
      </section>
      <section
        id="about-me-overview"
        className="flex w-auto max-w-md flex-col gap-4 text-center xs:mb-auto"
      >
        <h2 className="text-center text-2xl font-bold">
          So, what games do I play?
        </h2>
        <div className="flex flex-col gap-4">
          <p>
            Games I&apos;ve been coming back to the most over the years are
            Rainbow Six, God of War, Assassins Creed, Watch Dogs, and Smite. As
            you can see from that little list, I play a large variaty of games.
            I don&apos;t really have a specific genre that I play the most. I
            just play whatever I feel like playing at that moment or whatever
            people invite me for to play with them.
          </p>
          <p>
            The more technical side of gaming is something I&apos;ve been really
            interested in for a while now. I&apos;ve been experimenting with
            tech like Unreal Engine (4 & 5), Unity and custom stuff using SDL2
            for instance.
          </p>
          <p>
            So, what do I like this much about gaming? Well, I love the way it
            brings people together. I love the way it can help people escape
            from reality for a little while. I love the way it can help people
            with stress, anxiety, and depression. But for me personally, I love
            the way it can help me relax and find joy with others while also
            finding interests in the technical solutions they picked, build, and
            use.
          </p>
        </div>
      </section>
    </>
  );
};

export default Hobbies;
