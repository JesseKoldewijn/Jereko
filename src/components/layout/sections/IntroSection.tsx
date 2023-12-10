import AnimatedGradientText from "@/components/animated/animated-grad-text";
import { getAgeByDateString } from "@/lib/age";
import { animatedGradient } from "@/lib/prog-classes";
import { cn } from "@/lib/utils";
import { mostRecentExp } from "@/server/handlers/exp/getLatest";

const IntroSection = async () => {
  const myAge = getAgeByDateString("1999-02-15");
  const latestExperience = await mostRecentExp();

  return (
    <p className="text-neutral-600 dark:text-neutral-300">
      My name is{" "}
      <span className={cn(animatedGradient(), "font-bold")}>
        Jesse Koldewijn
      </span>
      , I&apos;m a {myAge} year old gamer, software engineer and tech enthusiast
      and currently working at
      <AnimatedGradientText
        variant="span"
        className="px-1 font-bold"
        text={latestExperience?.company_name ?? ""}
      />
      as a<br />
      <AnimatedGradientText
        variant="span"
        className="font-bold [background-size:105%]"
        text={latestExperience?.title ?? ""}
      />
    </p>
  );
};

export default IntroSection;
