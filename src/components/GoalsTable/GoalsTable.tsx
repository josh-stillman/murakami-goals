import { GoalDTO } from '../../db/db';
import { WeekGoal } from '../WeekGoal/WeekGoal';
import styles from './GoalsTable.module.css';

interface Props {
  goalDTOs: GoalDTO[];
}

export const GoalsTable = ({ goalDTOs }: Props) => {
  const dayOfWeek = new Date().getDay();

  return (
    <table>
      <th></th>
      <th className={dayOfWeek === 1 ? styles.todayHeader : ''}>Mon</th>
      <th className={dayOfWeek === 2 ? styles.todayHeader : ''}>Tue</th>
      <th className={dayOfWeek === 3 ? styles.todayHeader : ''}>Wed</th>
      <th className={dayOfWeek === 4 ? styles.todayHeader : ''}>Thurs</th>
      <th className={dayOfWeek === 5 ? styles.todayHeader : ''}>Fri</th>
      <th className={dayOfWeek === 6 ? styles.todayHeader : ''}>Sat</th>
      <th className={dayOfWeek === 0 ? styles.todayHeader : ''}>Sun</th>
      <th className={dayOfWeek === 0 ? styles.todayHeader : ''}>Totals</th>
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
