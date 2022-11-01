import React, { useEffect, useState } from 'react';
import { useApiContext } from '../components/context';
import Section from '../components/section';
import TrackerGrid from '../components/trackerGrid';
import * as FaIcons from 'react-icons/fa';
import './tracker.css';

export default function Tracker() {
  const { onFilterWorkouts } = useApiContext();

  const [page, setPage] = useState<number>(0);
  const filter = () => {
    //page is indexed not per array in  url
    const monthIndex = (page + 1).toString().padStart(2, '0');
    onFilterWorkouts('1', monthIndex, '2022');
  };

  useEffect(() => {
    filter();
  }, []);

  return (
    <Section>
      <div className="container">
        <button
          className="button_hidden"
          onClick={() => {
            setPage(page > 0 ? page - 1 : page);
            filter();
          }}
        >
          <FaIcons.FaBars />
        </button>
        <TrackerGrid page={page} />
        <button
          onClick={() => {
            setPage(page < 11 ? page + 1 : page);
            filter();
          }}
        >
          <FaIcons.FaBars />
        </button>
      </div>
    </Section>
  );
}

//putting 2 hooks together breaks the context
//onGetWorkouts called when useApiContext called
//causes state change in context
//tracker then changes which causes another useTrackerContext to change
//this causes Tracker component to update
//when tracker component updates ApiContext is recalled .......
