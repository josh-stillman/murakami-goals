import type { GoalDTO } from '../../db/dto.d.ts';
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
    <table>
      <thead>
        <tr>
          <th></th>
          <th
            className={
              today.getTime() === currentMonday.getTime()
                ? styles.todayHeader
                : ''
            }
          >
            Mon
          </th>
          <th
            className={
              today.getTime() === addDaysToDate(currentMonday, 1).getTime()
                ? styles.todayHeader
                : ''
            }
          >
            Tue
          </th>
          <th
            className={
              today.getTime() === addDaysToDate(currentMonday, 2).getTime()
                ? styles.todayHeader
                : ''
            }
          >
            Wed
          </th>
          <th
            className={
              today.getTime() === addDaysToDate(currentMonday, 3).getTime()
                ? styles.todayHeader
                : ''
            }
          >
            Thurs
          </th>
          <th
            className={
              today.getTime() === addDaysToDate(currentMonday, 4).getTime()
                ? styles.todayHeader
                : ''
            }
          >
            Fri
          </th>
          <th
            className={
              today.getTime() === addDaysToDate(currentMonday, 5).getTime()
                ? styles.todayHeader
                : ''
            }
          >
            Sat
          </th>
          <th
            className={
              today.getTime() === addDaysToDate(currentMonday, 6).getTime()
                ? styles.todayHeader
                : ''
            }
          >
            Sun
          </th>
          <th>Totals</th>
        </tr>
      </thead>
      <tbody>
        {goalDTOs.map((goalDTO: GoalDTO, i: number) => (
          <WeekGoal
            goalDTO={goalDTO}
            key={goalDTO.id}
            lastRow={i === goalDTOs.length - 1}
          />
        ))}
      </tbody>
    </table>
  );
};
