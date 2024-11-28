import { mostRecentExp } from "@/server/handlers/exp/getLatest";
import { getAgeByDateString } from "@/utils/age";

import {
  AnimatedIntroSection1,
  AnimatedIntroSection2,
  AnimatedIntroSection3,
} from "./_imports";

const IntroSection = async () => {
  const myAge = getAgeByDateString("1999-02-15");
  const latestExperience = await mostRecentExp();

  return (
    <p className="w-full text-balance text-neutral-600 dark:text-neutral-200">
      {"My name is "}
      <AnimatedIntroSection1 />
      {`, I'm a ${myAge} year old gamer, software engineer and tech enthusiast `}
      {!!latestExperience && (
        <>
          currently working at
          <AnimatedIntroSection2 latestExperience={latestExperience} />
          as a<br />
          <AnimatedIntroSection3 latestExperience={latestExperience} />
        </>
      )}
    </p>
  );
};

export default IntroSection;
