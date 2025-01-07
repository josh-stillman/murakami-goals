import { useState } from 'react';
import { toast } from 'react-toastify';
import { GoalService } from '../../db/GoalService';
import { Goal } from '../../db/types';
import styles from './GoalForm.module.css';

interface Props {
  goal?: Goal;
  className?: string;
}

export const GoalForm = ({ goal, className }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [goalName, setGoalName] = useState(goal?.name || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (goal) {
        await GoalService.updateGoal(goal.id, goalName);
      } else {
        await GoalService.addGoal(goalName);
      }
    } catch {
      toast.error('Unable to add goal with duplicate name');
    }

    setIsEditing(false);
    setGoalName(goalName || '');
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setGoalName(goal?.name || '');
  };

  const handleDelete = async () => {
    if (!goal) {
      return;
    }

    await GoalService.deleteGoal(goal);
  };

  return (
    <div className={`${styles.goalForm} ${className}`}>
      {isEditing ? (
        <form onSubmit={e => handleSubmit(e)}>
          <input value={goalName} onChange={e => setGoalName(e.target.value)} />

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
    </div>
  );
};
