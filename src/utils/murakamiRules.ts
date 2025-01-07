import { Entry } from '../db/types';

import styles from '../components/WeekGoal/WeekGoal.module.css';

export const getHighlightingClass = ({
  priorEntry,
  currentEntry,
  nextEntry,
  today,
}: {
  priorEntry: Entry | null;
  currentEntry: Entry;
  nextEntry: Entry | null;
  today: Date;
}) => {
  if (currentEntry.date > today) {
    return '';
  }

  const priorDayCompleted = priorEntry ? priorEntry.completed : true;
  const nextDayCompleted = nextEntry ? nextEntry.completed : true;

  if (
    currentEntry.date.getTime() === today.getTime() &&
    !priorDayCompleted &&
    !currentEntry.completed
  ) {
    return styles.atRisk;
  }

  if (
    currentEntry.date.getTime() !== today.getTime() &&
    !currentEntry.completed &&
    (!priorDayCompleted ||
      (!nextDayCompleted && nextEntry?.date.getTime() !== today.getTime()))
  ) {
    return styles.violation;
  }

  return '';
};
