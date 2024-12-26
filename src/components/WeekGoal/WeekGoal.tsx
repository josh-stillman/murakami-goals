import { GoalDTO } from '../../db/db';
import { getToday } from '../../db/utils';
import { getHighlightingClass } from '../../utils/murakamiRules';
import { EntryCell } from '../EntryCell/EntryCell';
import './WeekGoal.css';

interface Props {
  goalDTO: GoalDTO;
  lastRow?: boolean;
}

export const WeekGoal = ({ goalDTO, lastRow }: Props) => {
  const today = getToday();

  return (
    <tr>
      <td>{goalDTO.name}</td>

      {goalDTO.entries.map((entry, i) => (
        <EntryCell
          className={`${getHighlightingClass({
            currentEntry: entry,
            priorEntry: i === 0 ? goalDTO.priorSunday : goalDTO.entries[i - 1],
            nextEntry: i === 6 ? goalDTO.nextMonday : goalDTO.entries[i + 1],
            today,
          })} ${entry.date.getTime() === today.getTime() ? 'todayEntry' : ''} ${entry.date.getTime() === today.getTime() && lastRow ? 'todayEntry--last' : ''}  `}
          key={entry.id}
          entry={entry}
          disabled={entry.date > today}
        />
      ))}

      <td>{goalDTO.entries.filter(e => e.completed).length}</td>
    </tr>
  );
};
