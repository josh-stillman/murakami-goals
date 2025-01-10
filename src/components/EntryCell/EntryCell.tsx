import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import { Check } from 'react-feather';

import { GoalService } from '../../db/GoalService';
import { Entry } from '../../db/types';

import styles from './EntryCell.module.css';

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
    <div className={className + ' ' + styles.entryCell}>
      <Checkbox
        style={{ fontSize: '1.7rem' }}
        checked={entry.completed}
        onChange={toggleCompleted}
        disabled={!!disabled}
        animation="tada"
        variant="fill"
        icon={<Check className="svg" data-type="svg" />}
      />
    </div>
  );
};
