import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Button } from 'react95';

import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import PWABadge from './PWABadge.tsx';
import './App.css';
import { GoalsTable } from './components/GoalsTable/GoalsTable.tsx';
import { getMondayOfCurrentWeek } from './db/utils.ts';
import { GoalForm } from './components/GoalForm/GoalForm.tsx';
import { GoalService } from './db/GoalService.ts';

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

function App() {
  const [currentMonday, setCurrentMonday] = useState(getMondayOfCurrentWeek());

  const goalsDTO = useLiveQuery(
    () => GoalService.getGoalDTO(currentMonday),
    [currentMonday]
  );

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <h1>murakami-goals</h1>
        <h3>Week of {goalsDTO?.weekStart.toDateString()}</h3>

        <div className="weekNavWrapper">
          <Button
            onClick={() => {
              if (goalsDTO?.priorWeek) {
                setCurrentMonday(goalsDTO.priorWeek);
              }
            }}
            disabled={!goalsDTO?.priorWeek}
          >
            back
          </Button>

          <Button
            onClick={() => {
              if (goalsDTO?.nextWeek) {
                setCurrentMonday(goalsDTO.nextWeek);
              }
            }}
            disabled={!goalsDTO?.nextWeek}
          >
            forward
          </Button>
        </div>

        {goalsDTO && (
          <>
            <div className="tableWrapper">
              <GoalsTable
                goalDTOs={goalsDTO.goals}
                currentMonday={goalsDTO.weekStart}
              />
            </div>
            <div className="addButtonWrapper">
              <GoalForm />
            </div>
          </>
        )}

        <ToastContainer />

        <PWABadge />
      </ThemeProvider>
    </>
  );
}

export default App;
