import { GoalDTO } from '../../db/db';
import { WeekGoal } from '../WeekGoal/WeekGoal';

interface Props {
  goalDTOs: GoalDTO[];
}

export const GoalsTable = ({ goalDTOs }: Props) => {
  return (
    <table>
      <th>Goal</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thurs</th>
      <th>Fri</th>
      <th>Sat</th>
      <th>Sun</th>
      <tbody>
        {goalDTOs.map(goalDTO => (
          <WeekGoal goalDTO={goalDTO} key={goalDTO.id} />
        ))}
      </tbody>
    </table>
  );
};
