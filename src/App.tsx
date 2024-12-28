import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PWABadge from './PWABadge.tsx';
import './App.css';
import { getGoalDTOs } from './db/db.ts';
import { GoalsTable } from './components/GoalsTable/GoalsTable.tsx';
import { getMondayOfCurrentWeek } from './db/utils.ts';
import { GoalForm } from './components/GoalForm/GoalForm.tsx';

function App() {
  const [currentMonday, setCurrentMonday] = useState(getMondayOfCurrentWeek());

  const goalsDTO = useLiveQuery(
    () => getGoalDTOs(currentMonday),
    [currentMonday]
  );

  return (
    <>
      <h1>murakami-goals</h1>
      <h3>Week of {goalsDTO?.weekStart.toDateString()}</h3>

      <button
        onClick={() => {
          if (goalsDTO?.priorWeek) {
            setCurrentMonday(goalsDTO.priorWeek);
          }
        }}
        disabled={!goalsDTO?.priorWeek}
      >
        back
      </button>

      <button
        onClick={() => {
          if (goalsDTO?.nextWeek) {
            setCurrentMonday(goalsDTO.nextWeek);
          }
        }}
        disabled={!goalsDTO?.nextWeek}
      >
        forward
      </button>

      {goalsDTO && (
        <>
          <GoalsTable
            goalDTOs={goalsDTO.goals}
            currentMonday={goalsDTO.weekStart}
          />
          <GoalForm />
        </>
      )}

      <ToastContainer />

      <PWABadge />
    </>
  );
}

export default App;
