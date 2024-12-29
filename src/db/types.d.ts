// Models
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

// DTOs
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
