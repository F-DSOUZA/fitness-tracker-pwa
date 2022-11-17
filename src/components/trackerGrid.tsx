import React, { useEffect, useState } from 'react';
import { CalendarMonth } from './calendarMonth';
import Card from './card';
import { useFilterContext } from './context';
import './trackerGrid.css';
import { MonthWithDay } from '../components/calendarMonth';

type Workout = {
  workout_type: string;
  workout_date: string;
};

type Props = {
  page: number;
};

function trackerGrid(props: Props) {
  const [currentMonth, setCurrentMonth] = useState<
    (MonthWithDay | { cal_date: number })[]
  >([]);
  const [month, setMonth] = useState<string>('');
  const filteredWorkouts: Array<Workout | null> = useFilterContext();
  const createPage = () => {
    return new CalendarMonth(props.page, filteredWorkouts);
  };

  const getMonth = () => {
    const month = createPage();
    setMonth(month.month.name);
    const current: Array<MonthWithDay | { cal_date: number }> =
      month.currentMonth;
    setCurrentMonth(current);
  };

  useEffect(() => {
    if (filteredWorkouts) {
      console.log('FILTERED WORKOUTS', filteredWorkouts);
      getMonth();
    }
  }, [filteredWorkouts, props.page]);

  if (!filteredWorkouts) {
    return <div className="month_container">loading ...</div>;
  }
  return (
    <div className="month_container">
      <h1>{month}</h1>
      <div className="grid_container">
        {currentMonth.map(
          (item: MonthWithDay | { cal_date: number }, index) => {
            return item && <Card key={index} data={item} />;
          }
        )}
      </div>
    </div>
  );
}

export default trackerGrid;
