import { allEvents } from "./getAll";

export const mostRecentEvent = async () => {
  const events = await allEvents();

  if (!events.length) return null;

  const mostRecentEvent = events.reduce((prev, current) => {
    const prevDate = Date.parse(
      `${prev?.month}-${prev?.day}-${prev?.year}`,
    ).toFixed(0);
    const curDate = Date.parse(
      `${current.month}-${current.day}-${current.year}`,
    ).toFixed(0);

    return prevDate > curDate ? prev : current;
  }, events[0]);

  return mostRecentEvent;
};
