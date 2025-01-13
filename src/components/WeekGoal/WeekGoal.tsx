import { GoalDTO } from '../../db/types';
import { getToday } from '../../db/utils';
import { getHighlightingClass } from '../../utils/murakamiRules';
import { EntryCell } from '../EntryCell/EntryCell';
import { GoalForm } from '../GoalForm/GoalForm';
import styles from './WeekGoal.module.css';
import tableStyles from '../GoalsTable/GoalsTable.module.css';

interface Props {
  goalDTO: GoalDTO;
  lastRow?: boolean;
}

export const WeekGoal = ({ goalDTO, lastRow }: Props) => {
  const today = getToday();

  return (
    <div className={styles.weekGoal}>
      <GoalForm
        goal={goalDTO}
        className={`goalName ${tableStyles.stickyColumn}`}
      />

      {goalDTO.entries.map((entry, i) => {
        const highlightingClass = getHighlightingClass({
          currentEntry: entry,
          priorEntry: i === 0 ? goalDTO.priorSunday : goalDTO.entries[i - 1],
          nextEntry: i === 6 ? goalDTO.nextMonday : goalDTO.entries[i + 1],
          today,
        });

        return (
          <EntryCell
            className={`${highlightingClass} ${entry.date.getTime() === today.getTime() ? styles.todayEntry : ''} ${entry.date.getTime() === today.getTime() && lastRow ? styles['todayEntry--last'] : ''}  `}
            key={entry.id}
            entry={entry}
            atRisk={highlightingClass === styles.atRisk}
            disabled={entry.date > today}
          />
        );
      })}

      <div
        className={
          tableStyles.stickyColumn + ' ' + tableStyles['stickyColumn--last']
        }
      >
        {goalDTO.entries.filter(e => e.completed).length}
      </div>
    </div>
  );
};
