import { Entry } from '../db/db';

export const getHighlightingClass = ({
  priorEntry,
  currentEntry,
  nextEntry,
  today,
}: {
  priorEntry?: Entry;
  currentEntry: Entry;
  nextEntry?: Entry;
  today: Date;
}) => {
  if (currentEntry.date > today) {
    return '';
  }

  const priorDayCompleted = priorEntry ? priorEntry.completed : true; // replace with past week
  const nextDayCompleted = nextEntry ? nextEntry.completed : true; // replace with past week

  if (
    currentEntry.date.getTime() === today.getTime() &&
    !priorDayCompleted &&
    !currentEntry.completed
  ) {
    return 'atRisk';
  }

  if (
    currentEntry.date.getTime() !== today.getTime() &&
    !currentEntry.completed &&
    (!priorDayCompleted ||
      (!nextDayCompleted && nextEntry?.date.getTime() !== today.getTime()))
  ) {
    return 'violation';
  }

  return '';
};
