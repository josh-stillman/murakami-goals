import { db, Entry } from '../../db/db';

interface Props {
  entry: Entry;
}

export const EntryCell = ({ entry }: Props) => {
  const toggleCompleted = async () => {
    try {
      const id = await db.entries.update(entry.id, {
        completed: !entry.completed,
      });

      console.log(`status updated for entry ${entry.id}}`);
    } catch (error) {
      console.error(`Failed to update entr y${entry.id}: ${error}`);
    }
  };
  return (
    <td>
      <input
        type="checkbox"
        checked={entry.completed}
        onChange={toggleCompleted}
      />
    </td>
  );
};
