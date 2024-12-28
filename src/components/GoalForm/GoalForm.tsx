import { useState } from 'react';
import { addGoal, db, deleteGoal, Goal } from '../../db/db';

interface Props {
  goal?: Goal;
  className?: string;
}

export const GoalForm = ({ goal, className }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [goalName, setGoalName] = useState(goal?.name || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (goal) {
      await db.goals.update(goal.id, { name: goalName });
    } else {
      await addGoal(goalName);
    }

    setIsEditing(false);
    setGoalName(goal?.name || '');
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setGoalName(goal?.name || '');
  };

  const handleDelete = async () => {
    if (!goal) {
      return;
    }

    await deleteGoal(goal);
  };

  return (
    <td className={className}>
      {isEditing ? (
        <form onSubmit={e => handleSubmit(e)}>
          <input
            value={goalName}
            onChange={e => setGoalName(e.target.value)}
          ></input>
          <button type="submit" disabled={goal?.name === goalName || !goalName}>
            {goal ? 'Update Goal Name' : 'Submit'}
          </button>
          <button onClick={cancelEdit}>Cancel</button>
          {goal && <button onClick={handleDelete}>Delete Goal</button>}
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>
          {goal?.name || 'Add Goal'}
        </button>
      )}
    </td>
  );
};
