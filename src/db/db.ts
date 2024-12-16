import Dexie, { type EntityTable } from 'dexie';
import {
  createWeekEntries,
  getMondayOfCurrentWeek,
  addDaysToDate,
} from './utils';

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
  nextMonday: Entry | null;
  priorSunday: Entry | null;
};

export interface GoalsDTO {
  goals: GoalDTO[];
  weekStart: Date;
  nextWeek: Date | null;
  priorWeek: Date | null;
}

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

export const getGoalDTOs = async (mondayOfWeek: Date): Promise<GoalsDTO> => {
  if (mondayOfWeek.getDay() !== 1) {
    throw new Error('non-monday date provided for week start');
  }

  const goals = await db.goals.toArray();

  const dto = await Promise.all(
    goals.map(async goal => {
      // get entries
      const entries = await db.entries
        .where('goalId')
        .equals(goal.id)
        .and(
          entry =>
            entry.date.getTime() >= mondayOfWeek.getTime() &&
            entry.date.getTime() < addDaysToDate(mondayOfWeek, 7).getTime()
        )
        .limit(7)
        .toArray();

      const priorSunday =
        (
          await db.entries
            .where('goalId')
            .equals(goal.id)
            .and(
              entry =>
                entry.date.getTime() ===
                addDaysToDate(mondayOfWeek, -1).getTime()
            )
            .toArray()
        )[0] ?? null;

      const nextMonday =
        (
          await db.entries
            .where('goalId')
            .equals(goal.id)
            .and(
              entry =>
                entry.date.getTime() ===
                addDaysToDate(mondayOfWeek, 7).getTime()
            )
            .toArray()
        )[0] ?? null;

      return {
        ...goal,
        entries: entries as WeekEntries,
        priorSunday,
        nextMonday,
      };
    })
  );

  const priorWeekArray = await db.entries
    .where('date')
    .below(mondayOfWeek)
    .and(entry => entry.date.getDay() === 1)
    .sortBy('date');

  console.log({ priorWeekArray });

  const priorWeek = priorWeekArray[priorWeekArray.length - 1]?.date ?? null;

  const nextWeek =
    (
      await db.entries
        .where('date')
        .aboveOrEqual(addDaysToDate(mondayOfWeek, 7))
        .and(entry => entry.date.getDay() === 1)
        .sortBy('date')
    )[0]?.date ?? null;

  const goalsDTO = {
    weekStart: mondayOfWeek,
    priorWeek,
    nextWeek,
    goals: dto,
  };

  console.log({ goalsDTO });

  return goalsDTO;
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
    .and(
      entry =>
        entry.date.getTime() >= monday.getTime() &&
        entry.date.getTime() < addDaysToDate(monday, 7).getTime()
    )
    .toArray();

  if (weekEntries.length < 7) {
    const entries = createWeekEntries(monday, goal.id);

    await db.entries.bulkAdd(entries);
  }
};

const createAllMissingEntries = async (monday: Date) => {
  const goals = await db.goals.toArray();

  goals.forEach(goal => createMissingWeekEntries(goal, monday));
};

await seed();

await createAllMissingEntries(getMondayOfCurrentWeek());

// TODO: remove
// await createAllMissingEntries(addDaysToDate(getMondayOfCurrentWeek(), -7));
// await createAllMissingEntries(addDaysToDate(getMondayOfCurrentWeek(), -14));
// await createAllMissingEntries(addDaysToDate(getMondayOfCurrentWeek(), -21));

export { db };
