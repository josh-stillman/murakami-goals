import Dexie, { type EntityTable } from 'dexie';
import { createWeekEntries, getMondayOfCurrentWeek } from './utils';

export interface Goal {
  id: number;
  name: string;
}

export interface Entry {
  id: number;
  goalId: number;
  date: Date;
  completed: boolean;
}

export type WeekEntries = [Entry, Entry, Entry, Entry, Entry, Entry, Entry];

export type GoalDTO = Goal & {
  entries: WeekEntries;
};

const db = new Dexie('GoalsDatabase') as Dexie & {
  goals: EntityTable<
    Goal,
    'id' // primary key "id" (for the typings only)
  >;
  entries: EntityTable<
    Entry,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  goals: '++id, name', // primary key "id" (for the runtime!)
  entries: '++id, goalId, date, completed', // primary key "id" (for the runtime!)
});

export const getGoalDTOs = async (): Promise<GoalDTO[]> => {
  const goals = await db.goals.toArray();

  createAllMissingEntries();

  const dto = await Promise.all(
    goals.map(async goal => {
      // get entries
      const entries = await db.entries
        .where('goalId')
        .equals(goal.id)
        .and(
          entry => entry.date.getTime() >= getMondayOfCurrentWeek().getTime()
        )
        .limit(7)
        .toArray();

      return {
        ...goal,
        entries: entries as WeekEntries,
      };
    })
  );

  console.log({ dto });

  return dto;
};

// SEED

const seed = async () => {
  const goals = await db.goals.count();

  if (!goals) {
    const goalId = await db.goals.add({
      name: 'running',
    });

    const goalId2 = await db.goals.add({
      name: 'music',
    });

    return;
  }
  console.log('DB Already Seeded');
};

const createMissingWeekEntries = async (goal: Goal, monday: Date) => {
  const weekEntries = await db.entries
    .where('goalId')
    .equals(goal.id)
    .and(entry => entry.date.getTime() >= getMondayOfCurrentWeek().getTime())
    .toArray();

  if (weekEntries.length < 7) {
    const entries = createWeekEntries(getMondayOfCurrentWeek(), goal.id);

    await db.entries.bulkAdd(entries);
  }
};

const createAllMissingEntries = async () => {
  const goals = await db.goals.toArray();

  goals.forEach(goal =>
    createMissingWeekEntries(goal, getMondayOfCurrentWeek())
  );
};

await seed();

await createAllMissingEntries();

export { db };
