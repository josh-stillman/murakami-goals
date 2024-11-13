import Dexie, { type EntityTable } from 'dexie';

interface Goal {
  id: number;
  name: string;
}

interface Entry {
  id: number;
  goalId: number;
  date: Date;
  completed: boolean;
}

export type GoalDTO = Goal & {
  entries: Entry[];
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

  const dto = await Promise.all(
    goals.map(async goal => {
      // get entries
      const entries = await db.entries
        .where('goalId')
        .equals(goal.id)
        .toArray();

      return {
        ...goal,
        entries,
      };
    })
  );

  return dto;
};

// SEED

const seed = async () => {
  const goals = await db.goals.count();

  if (!goals) {
    const goalId = await db.goals.add({
      name: 'running',
    });

    await db.entries.bulkAdd([
      {
        goalId,
        completed: false,
        date: new Date(),
      },
      {
        goalId,
        completed: false,
        date: new Date(),
      },
      {
        goalId,
        completed: false,
        date: new Date(),
      },
      {
        goalId,
        completed: false,
        date: new Date(),
      },
      {
        goalId,
        completed: false,
        date: new Date(),
      },
      {
        goalId,
        completed: false,
        date: new Date(),
      },
      {
        goalId,
        completed: false,
        date: new Date(),
      },
    ]);
    return;
  }
  console.log('DB Already Seeded');
};

seed();

export type { Goal, Entry };
export { db };
