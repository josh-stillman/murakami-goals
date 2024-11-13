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
  if (currentEntry.date.getDate() > today.getDate()) {
    return '';
  }

  const priorDayCompleted = priorEntry ? priorEntry.completed : true; // replace with past week
  const nextDayCompleted = nextEntry ? nextEntry.completed : true; // replace with past week

  if (
    currentEntry.date.getDate() === today.getDate() &&
    !priorDayCompleted &&
    !currentEntry.completed
  ) {
    return 'atRisk';
  }

  if (
    currentEntry.date.getDate() !== today.getDate() &&
    !currentEntry.completed &&
    (!priorDayCompleted ||
      (!nextDayCompleted && nextEntry?.date.getDate() !== today.getDate()))
  ) {
    return 'violation';
  }

  return '';
};
