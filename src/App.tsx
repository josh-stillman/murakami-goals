import PWABadge from './PWABadge.tsx';
import './App.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, getGoalDTOs } from './db/db.ts';
import { GoalsTable } from './components/GoalsTable/GoalsTable.tsx';

function App() {
  const goalDTOs = useLiveQuery(() => getGoalDTOs());

  return (
    <>
      <h1>murakami-goals</h1>

      {goalDTOs && <GoalsTable goalDTOs={goalDTOs} />}

      <PWABadge />
    </>
  );
}

export default App;
