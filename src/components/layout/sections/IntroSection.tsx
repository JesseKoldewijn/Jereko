import AnimatedGradientText from "@/components/animated/animated-grad-text";
import { cn } from "@/lib/utils";
import { mostRecentExp } from "@/server/handlers/exp/getLatest";
import { getAgeByDateString } from "@/utils/age";
import { animatedGradient } from "@/utils/prog-classes";

const IntroSection = async () => {
  const myAge = getAgeByDateString("1999-02-15");
  const latestExperience = await mostRecentExp();

  return (
    <p className="w-full text-balance text-neutral-600 dark:text-neutral-200">
      {"My name is "}
      <span className={cn(animatedGradient(), "font-bold")}>
        Jesse Koldewijn
      </span>
      {`, I'm a ${myAge} year old gamer, software engineer and tech enthusiast `}
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
