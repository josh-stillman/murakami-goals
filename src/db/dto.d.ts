import { Entry, Goal } from './db';

export type WeekEntries = [Entry, Entry, Entry, Entry, Entry, Entry, Entry];

export type GoalDTO = Goal & {
  entries: WeekEntries;
  nextMonday: Entry | null;
  priorSunday: Entry | null;
};

export interface GoalsDTO {
  goals: GoalDTO[];
  weekStart: Date;
  nextWeek: Date | null;
  priorWeek: Date | null;
}
