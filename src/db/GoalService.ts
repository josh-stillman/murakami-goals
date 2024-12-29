import { db, Goal, GoalsDB } from './db';
import type { GoalsDTO, WeekEntries } from './dto.d.ts';
import {
  addDaysToDate,
  createWeekEntries,
  getMondayOfCurrentWeek,
} from './utils';

class GoalServiceSingleton {
  goalsDB: GoalsDB;

  constructor(goalsDB: GoalsDB) {
    this.goalsDB = goalsDB;
  }

  public async getGoalDTO(mondayOfWeek: Date): Promise<GoalsDTO> {
    if (mondayOfWeek.getDay() !== 1) {
      throw new Error('non-monday date provided for week start');
    }

    const goals = await this.goalsDB.goals.toArray();

    // await this.createAllMissingEntries(getMondayOfCurrentWeek());

    const dto = await Promise.all(
      goals.map(async goal => {
        // get entries
        const entries = await this.goalsDB.entries
          .where('[goalId+date]')
          .between(
            [goal.id, mondayOfWeek],
            [goal.id, addDaysToDate(mondayOfWeek, 7)],
            true, // lower inclusive
            false // upper exclusive
          )
          .limit(7) // belt and suspenders
          .toArray();

        const priorSunday =
          (await this.goalsDB.entries
            .where('[goalId+date]')
            .equals([goal.id, addDaysToDate(mondayOfWeek, -1)])
            .first()) || null;

        const nextMonday =
          (await this.goalsDB.entries
            .where('[goalId+date]')
            .equals([goal.id, addDaysToDate(mondayOfWeek, 7)])
            .first()) || null;

        return {
          ...goal,
          entries: entries as WeekEntries,
          priorSunday,
          nextMonday,
        };
      })
    );

    const priorWeekArray = await this.goalsDB.entries
      .where('date')
      .below(mondayOfWeek)
      .and(entry => entry.date.getDay() === 1)
      .sortBy('date');

    const priorWeek = priorWeekArray[priorWeekArray.length - 1]?.date ?? null;

    const nextWeek =
      (
        await this.goalsDB.entries
          .where('date')
          .aboveOrEqual(addDaysToDate(mondayOfWeek, 7))
          .and(entry => entry.date.getDay() === 1)
          .sortBy('date')
      )[0]?.date ?? null;

    const goalsDTO = {
      weekStart: mondayOfWeek,
      priorWeek,
      nextWeek,
      goals: dto.filter(g => g.entries.length),
    };

    console.log({ goalsDTO });

    return goalsDTO;
  }

  public async addGoal(goalName: string) {
    try {
      await db.goals.add({ name: goalName });
    } catch (e) {
      throw new Error('Duplicate goal: ' + e);
    }
    await this.createAllMissingEntries(getMondayOfCurrentWeek());
  }

  public async updateGoal(goalId: number, newGoalName: string) {
    await db.goals.update(goalId, { name: newGoalName });
  }

  public async deleteGoal(goal: Goal) {
    await this.goalsDB.goals.delete(goal.id);
    await this.goalsDB.entries.where('goalId').equals(goal.id).delete();
  }

  public async updateGoalEntryById(entryId: number, completed: boolean) {
    await db.entries.update(entryId, { completed });
  }

  public async createMissingWeekEntries(goal: Goal, monday: Date) {
    const weekEntries = await this.goalsDB.entries
      .where('[goalId+date]')
      .between(
        [goal.id, monday],
        [goal.id, addDaysToDate(monday, 7)],
        true, // lower inclusive
        false // upper exclusive
      )
      .toArray();

    console.log({ weekEntries });

    if (weekEntries.length < 7) {
      const entries = createWeekEntries(monday, goal.id);

      await this.goalsDB.entries.bulkAdd(entries);
    }
  }

  public async createAllMissingEntries(monday: Date) {
    const goals = await this.goalsDB.goals.toArray();

    goals.forEach(goal => this.createMissingWeekEntries(goal, monday));
  }
}

const GoalService = new GoalServiceSingleton(db);

// Add new entries for a new week on load
await GoalService.createAllMissingEntries(getMondayOfCurrentWeek());

// For testing
// await GoalService.createAllMissingEntries(
//   addDaysToDate(getMondayOfCurrentWeek(), -7)
// );
// await GoalService.createAllMissingEntries(
//   addDaysToDate(getMondayOfCurrentWeek(), -14)
// );
// await GoalService.createAllMissingEntries(
//   addDaysToDate(getMondayOfCurrentWeek(), -21)
// );

export { GoalService };
