import Dexie, { type EntityTable } from 'dexie';
import { Entry, Goal } from './types';

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
});

// SEED

// TODO: remove?
const seed = async () => {
  const goals = await db.goals.count();

  if (!goals) {
    await db.goals.add({
      name: 'running',
    });

    return;
  }
  console.log('DB Already Seeded');
};

await seed();

export { db };
