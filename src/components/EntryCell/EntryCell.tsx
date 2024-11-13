import { db, Entry } from '../../db/db';

interface Props {
  entry: Entry;
  className: string;
  disabled?: boolean;
}

export const EntryCell = ({ entry, className, disabled }: Props) => {
  const toggleCompleted = async () => {
    try {
      await db.entries.update(entry.id, {
        completed: !entry.completed,
      });

      console.log(`status updated for entry ${entry.id}}`);
    } catch (error) {
      console.error(`Failed to update entr y${entry.id}: ${error}`);
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
