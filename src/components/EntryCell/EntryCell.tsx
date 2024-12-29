import { GoalService } from '../../db/GoalService';
import { Entry } from '../../db/types';

interface Props {
  entry: Entry;
  className: string;
  disabled?: boolean;
}

export const EntryCell = ({ entry, className, disabled }: Props) => {
  const toggleCompleted = async () => {
    try {
      GoalService.updateGoalEntryById(entry.id, !entry.completed);
    } catch (error) {
      console.error(`Failed to update entry ${entry.id}: ${error}`);
    }
  };

  return (
    <td className={className}>
      <input
        type="checkbox"
        checked={entry.completed}
        onChange={toggleCompleted}
        disabled={!!disabled}
      />
    </td>
  );
};
