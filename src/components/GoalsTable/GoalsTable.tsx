import type { GoalDTO } from '../../db/types';
import { addDaysToDate, getToday } from '../../db/utils';
import { WeekGoal } from '../WeekGoal/WeekGoal';
import styles from './GoalsTable.module.css';

interface Props {
  goalDTOs: GoalDTO[];
  currentMonday: Date;
}

export const GoalsTable = ({ goalDTOs, currentMonday }: Props) => {
  const today = getToday();

  return (
    <div className={styles.goalTable}>
      <div className={styles.stickyColumn} />

      <div
        className={`
          ${styles.tableHeader}
          ${today.getTime() === currentMonday.getTime() ? styles.todayHeader : ''}`}
      >
        Mon
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${
            today.getTime() === addDaysToDate(currentMonday, 1).getTime()
              ? styles.todayHeader
              : ''
          }
        `}
      >
        Tue
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${
            today.getTime() === addDaysToDate(currentMonday, 2).getTime()
              ? styles.todayHeader
              : ''
          }
        `}
      >
        Wed
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${
            today.getTime() === addDaysToDate(currentMonday, 3).getTime()
              ? styles.todayHeader
              : ''
          }
        `}
      >
        Thurs
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${
            today.getTime() === addDaysToDate(currentMonday, 4).getTime()
              ? styles.todayHeader
              : ''
          }
        `}
      >
        Fri
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${
            today.getTime() === addDaysToDate(currentMonday, 5).getTime()
              ? styles.todayHeader
              : ''
          }
        `}
      >
        Sat
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${
            today.getTime() === addDaysToDate(currentMonday, 6).getTime()
              ? styles.todayHeader
              : ''
          }
        `}
      >
        Sun
      </div>

      <div className={styles.stickyLastColumn}>Totals</div>

      {goalDTOs.map((goalDTO: GoalDTO, i: number) => (
        <WeekGoal
          goalDTO={goalDTO}
          key={goalDTO.id}
          lastRow={i === goalDTOs.length - 1}
        />
      ))}
    </div>
  );
};
