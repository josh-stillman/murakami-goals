import Dexie, { type EntityTable } from 'dexie';

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

export type GoalsDB = typeof db;

// Schema declaration:
db.version(1).stores({
  goals: '++id, &name',
  entries: '++id, date, [goalId+date], completed',
  // entries: '++id, goalId, date, [goalId+date], completed', // primary key "id" (for the runtime!)
});

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

await seed();

export { db };
