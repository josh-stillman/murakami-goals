import PWABadge from './PWABadge.tsx';
import './App.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, getGoalDTOs } from './db/db.ts';

function App() {
  const entries = useLiveQuery(() => db.entries.toArray());
  const goals = useLiveQuery(() => db.goals.toArray());
  const goalDTOs = useLiveQuery(() => getGoalDTOs());

  return (
    <>
      <h1>murakami-goals</h1>

      {goalDTOs?.map((goalDTO, i) => (
        <ul key={i}>
          <li key={goalDTO.id}>
            {goalDTO.id}, {goalDTO.name}
          </li>
          <ul>
            {goalDTO.entries.map(entry => (
              <li key={entry.id}>
                {entry.goalId}, {entry.date.toISOString()}{' '}
                {entry.completed + ''}
              </li>
            ))}
          </ul>
        </ul>
      ))}

      {goals?.map(goal => (
        <li key={goal.id}>
          {goal.id}, {goal.name}
        </li>
      ))}

      {entries?.map(entry => (
        <li key={entry.id}>
          {entry.goalId}, {entry.date.toISOString()} {entry.completed + ''}
        </li>
      ))}
      <PWABadge />
    </>
  );
}

export default App;
