import AnimatedGradientText from "@/components/animated/animated-grad-text";
import GoToHeading from "@/components/page-elements/about-me/go-to-heading";

const AboutMe = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 xs:flex-row xs:px-0">
      <section
        id="about-me-overview"
        className="flex w-auto max-w-md flex-col gap-4 text-center"
      >
        <h2 className="text-center text-2xl font-bold">So... who am I?</h2>
        <div className="flex flex-col gap-4">
          <p>
            To start off, my background and interests has been mainly in/towards
            <AnimatedGradientText
              className="ml-1 font-semibold"
              variant="span"
              text="IT"
              noSplit
            />
            ,
            <AnimatedGradientText
              className="mx-1 font-semibold"
              variant="span"
              text="Tech (in general)"
              noSplit
            />
            and
            <AnimatedGradientText
              className="mx-1 font-semibold"
              variant="span"
              text="Gaming"
              noSplit
            />
            for as long as I can remember. Which since you&apos;re checking out
            my website, might not surprise you.
          </p>
          <p>
            One of the earliest tech-related memories I can remember is that
            when I was around the age of
            <AnimatedGradientText
              className="ml-1 font-semibold"
              variant="span"
              text="12"
              noSplit
            />
            , I completely disassembled the
            <AnimatedGradientText
              className="mx-1 font-semibold"
              variant="span"
              text="PC"
              noSplit
            />
            I got as a hand-me-down from my dad. I did it just to see how it was
            assembled and put together, out of interest in what all the parts
            looked like.
          </p>
        </div>
      </section>
      <section
        id="about-me-overview"
        className="flex w-auto max-w-md flex-col gap-4 text-center xs:mb-auto"
      >
        <h2 className="text-center text-2xl font-bold">
          Want to know more about me, who I am and what I do?
        </h2>
        <div className="flex flex-col gap-4">
          <p>
            Feel free to check out any of the sub-sections in the navigation
            <GoToHeading className="ml-1 cursor-pointer underline-offset-2 hover:underline">
              above
              <span className="sr-only">
                Click here to jump to the about-me navigation
              </span>
            </GoToHeading>
            !
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
