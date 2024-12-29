import type { WeekEntries } from './types';

export const createWeekEntries = (
  monday: Date,
  goalId: number
): WeekEntries => {
  const normalizedMonday = new Date(monday);
  normalizedMonday.setHours(0, 0, 0, 0); // belt and suspenders

  return new Array(7).fill(undefined).map((_: undefined, i: number) => ({
    goalId,
    date: addDaysToDate(normalizedMonday, i),
    completed: false,
  })) as WeekEntries;
};

export const getMondayOfCurrentWeek = () => {
  const today = getToday();

  let dayOfWeek = today.getDay();

  // handle sundays
  if (dayOfWeek === 0) {
    dayOfWeek = 7;
  }

  const daysToSubtract = dayOfWeek - 1;

  today.setDate(today.getDate() - daysToSubtract);

  return new Date(today);
};

export const addDaysToDate = (date: Date, days: number) => {
  const new_date = new Date(date);

  new_date.setDate(new_date.getDate() + days);

  return new_date;
};

export const getToday = () => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
};
