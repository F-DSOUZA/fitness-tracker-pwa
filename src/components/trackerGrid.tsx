import React, { useEffect, useState } from 'react';
import { CalendarMonth } from './calendarMonth';
import Card from './card';
import { useTrackerContext } from './context';
import './trackerGrid.css';
import { MonthWithDay } from '../components/calendarMonth';

type Workout = {
  workout_type: string;
  workout_date: string;
};

function trackerGrid() {
  const [currentMonth, setCurrentMonth] = useState<
    (MonthWithDay | { cal_date: number })[]
  >([]);
  const tracker = useTrackerContext();
  const createPage = (page: number) => {
    console.log('Tracker', tracker);
    return new CalendarMonth(page, tracker);
  };
  useEffect(() => {
    console.log('TRACKER GRID ');
    if (tracker) {
      const month = createPage(0);
      const current: Array<MonthWithDay | { cal_date: number }> =
        month.currentMonth;
      console.log('Current Month', current);
      setCurrentMonth(current);
    }
  }, [tracker]);

  if (!tracker) return <div>loading ...</div>;
  return (
    <div className="container">
      {currentMonth.map((item: MonthWithDay | { cal_date: number }, index) => {
        return item && <Card key={index} data={item} />;
      })}
    </div>
  );
}

export default trackerGrid;
