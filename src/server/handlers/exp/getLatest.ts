import { allExperiences } from "./getAll";

export const mostRecentExp = async () => {
  const events = await allExperiences();

  if (!events.length) return null;

  const mostRecentEvent = events.reduce((prev, current) => {
    const prevDate = Date.parse(
      `${prev.start_month}-01-${prev.start_year}`,
    ).toFixed(0);
    const curDate = Date.parse(
      `${current.start_month}-01-${current.start_year}`,
    ).toFixed(0);

    return prevDate > curDate ? prev : current;
  });

  return mostRecentEvent;
};
