import { type Experience } from "@/data/experiences";
import { allExperiences, getExperienceStartDate } from "@/data/queries";

import ExperienceListerItem from "./ExperienceListerItem";

const ExperienceLister = ({
  experienceOverride,
}: {
  experienceOverride?: Experience[];
}) => {
  const experience = experienceOverride ?? allExperiences();

  const sorted = [...experience].sort((a, b) => {
    const aDate = new Date(getExperienceStartDate(a)).getTime();
    const bDate = new Date(getExperienceStartDate(b)).getTime();
    return bDate - aDate;
  });

  return (
    <div className="flex flex-col gap-4">
      {sorted.length > 0 ? (
        <>
          {sorted.map((exp, i) => (
            <div key={`${exp.exp_key}-${i}`}>
              <ExperienceListerItem experience={exp} />
            </div>
          ))}
        </>
      ) : (
        <>No experiences found</>
      )}
    </div>
  );
};

export default ExperienceLister;
