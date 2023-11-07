import { allEvents } from "./getAll";

export const mostRecentEvent = async () => {
  const events = await allEvents();

  const mostRecentEvent = events.reduce((prev, current) => {
    const prevDate = new Date(`01 ${prev.year} ${prev.month}`);
    const curDate = new Date(`01 ${current.year} ${current.month}`);

    return prevDate > curDate ? prev : current;
  });

  return mostRecentEvent;
};
