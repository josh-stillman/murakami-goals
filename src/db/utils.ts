import { WeekEntries } from './db';

export const createWeekEntries = (
  monday: Date,
  goalId: number
): WeekEntries => {
  return new Array(7).fill(undefined).map((_: undefined, i: number) => ({
    goalId,
    date: addDaysToDate(monday, i),
    completed: false,
  })) as WeekEntries;
};

export const getMondayOfCurrentWeek = () => {
  const today = new Date();

  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  let dayOfWeek = today.getDay();

  // handle sundays
  if (dayOfWeek === 0) {
    dayOfWeek = 7;
  }

  const daysToSubtract = dayOfWeek - 1;

  today.setDate(today.getDate() - daysToSubtract);

  return new Date(today);
};

const addDaysToDate = (date: Date, days: number) => {
  const new_date = new Date(date);

  new_date.setDate(new_date.getDate() + days);

  return new_date;
};
