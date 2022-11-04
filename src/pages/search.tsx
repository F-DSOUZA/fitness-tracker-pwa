import React from 'react';
import { useEffect, useState } from 'react';
import { CalendarMonth, MonthWithDay } from '../components/calendarMonth';
import { useFilterContext, Workout } from '../components/context';
import Searchbox from '../components/searchbox';
import Section from '../components/section';

export default function Search() {
  const filteredWorkouts = useFilterContext();
  const [renderedList, setRenderedList] = useState<Array<MonthWithDay | null>>(
    []
  );

  //Rui - smarter way of re writing this so that it automatically calls on rerender without having to pass context into useEffect
  const createWorkoutList = () => {
    console.log(filteredWorkouts);
    const returnedWorkouts = filteredWorkouts.map((item: Workout | null) => {
      if (item !== null) {
        const index: string = item.workout_date.split('/', 1)[0];
        const img = CalendarMonth.getImgUrl(item.workout_type);
        return { cal_date: Number(index), img_url: img, ...item };
      }
      return null;
    });
    returnedWorkouts ? setRenderedList(returnedWorkouts) : null;
  };

  useEffect(() => {
    console.log('rerender in useEffect', filteredWorkouts);
    if (filteredWorkouts) {
      createWorkoutList();
    }
  }, [filteredWorkouts]);

  return (
    <Section>
      <Searchbox />
      {renderedList.map((item: MonthWithDay | null) => {
        return item && <p>{item.workout_type}</p>;
      })}
    </Section>
  );
}

//added filtered workouts to useEffect dependencies because useEffect is not triggered in rerender
