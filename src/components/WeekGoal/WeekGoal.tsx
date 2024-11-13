import { GoalDTO } from '../../db/db';
import { EntryCell } from '../EntryCell/EntryCell';

interface Props {
  goalDTO: GoalDTO;
}

export const WeekGoal = ({ goalDTO }: Props) => {
  return (
    <tr>
      <td>{goalDTO.name}</td>

      {goalDTO.entries.map(entry => (
        <EntryCell key={entry.id} entry={entry} />
      ))}
    </tr>
  );
};
