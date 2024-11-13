import { GoalDTO } from '../../db/db';
import { getHighlightingClass } from '../../utils/murakamiRules';
import { EntryCell } from '../EntryCell/EntryCell';
import './WeekGoal.css';

interface Props {
  goalDTO: GoalDTO;
  lastRow?: boolean;
}

export const WeekGoal = ({ goalDTO, lastRow }: Props) => {
  const today = new Date();
  const rawDate = today.getDay();

  // monday indexed
  const todayDate = rawDate === 6 ? 0 : rawDate - 1;

  return (
    <tr>
      <td>{goalDTO.name}</td>

      {goalDTO.entries.map((entry, i) => (
        <EntryCell
          className={`${getHighlightingClass({
            currentEntry: entry,
            priorEntry: goalDTO.entries[i - 1],
            nextEntry: goalDTO.entries[i + 1],
            today: new Date(),
          })} ${todayDate === i ? 'todayEntry' : ''} ${todayDate === i && lastRow ? 'todayEntry--last' : ''}  `}
          key={entry.id}
          entry={entry}
          disabled={i > todayDate}
        />
      ))}
    </tr>
  );
};
