import { useEffect, useRef } from 'react';
import type { GoalDTO } from '../../db/types';
import { addDaysToDate, getToday } from '../../db/utils';
import { WeekGoal } from '../WeekGoal/WeekGoal';
import styles from './GoalsTable.module.css';

interface Props {
  goalDTOs: GoalDTO[];
  currentMonday: Date;
}

export const GoalsTable = ({ goalDTOs, currentMonday }: Props) => {
  const today = getToday();

  const todayDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      todayDiv.current?.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
      });
      console.log('scrolling!', todayDiv.current);
    }, 500);
  }, []);

  const isToday = (dayOfWeek: number) =>
    today.getTime() === addDaysToDate(currentMonday, dayOfWeek).getTime(); // monday = 0

  return (
    <div className={styles.goalTable}>
      <div className={styles.stickyColumn} />

      <div
        className={`
          ${styles.tableHeader}
          ${isToday(0) ? styles.todayHeader : ''}`}
      >
        Mon
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${isToday(1) ? styles.todayHeader : ''}
        `}
        ref={isToday(2 + 1) ? todayDiv : undefined}
      >
        Tue
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${isToday(2) ? styles.todayHeader : ''}
        `}
        ref={isToday(2 + 2) ? todayDiv : undefined}
      >
        Wed
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${isToday(3) ? styles.todayHeader : ''}
        `}
        ref={isToday(3 + 2) ? todayDiv : undefined}
      >
        Thurs
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${isToday(4) ? styles.todayHeader : ''}
        `}
        ref={isToday(4 + 2) ? todayDiv : undefined}
      >
        Fri
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${isToday(5) ? styles.todayHeader : ''}
        `}
      >
        Sat
      </div>

      <div
        className={`
          ${styles.tableHeader}
          ${isToday(6) ? styles.todayHeader : ''}
        `}
      >
        Sun
      </div>

      <div className={styles.stickyLastColumn}>Totals</div>

      {goalDTOs.map((goalDTO: GoalDTO, i: number) => (
        <WeekGoal
          goalDTO={goalDTO}
          key={goalDTO.id}
          lastRow={i === goalDTOs.length - 1}
        />
      ))}
    </div>
  );
};
