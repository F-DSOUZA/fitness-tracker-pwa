import React, { useEffect } from 'react';
import { CalendarMonth } from '../components/calendarMonth';
import { useApiContext, useTrackerContext } from '../components/context';
import Section from '../components/section';
import Table from '../components/table';
import TrackerGrid from '../components/trackerGrid';

export default function Tracker() {
  const { onGetWorkouts } = useApiContext();
  onGetWorkouts('2');
  console.log('i am rendering again!');
  return (
    <Section>
      <TrackerGrid />
    </Section>
  );
}

//putting 2 hooks together breaks the context
//onGetWorkouts called when useApiContext called
//causes state change in context
//tracker then changes which causes another useTrackerContext to change
//this causes Tracker component to update
//when tracker component updates ApiContext is recalled .......
