import React, { useEffect, useState } from 'react';
import { useApiContext } from '../utils/Context/context';
import Section from '../components/section';
import TrackerGrid from '../components/trackerGrid';
import * as FaIcons from 'react-icons/fa';
import './tracker.css';
import { useAuthContext } from '../utils/AuthContext/authContext';

export default function Tracker() {
  const { onFilterWorkouts } = useApiContext();
  const { token } = useAuthContext();

  const [page, setPage] = useState<number>(0);
  const filterWorkouts = () => {
    //page is indexed not per array in  url
    const monthIndex = (page + 1).toString().padStart(2, '0');
    if (token) {
      onFilterWorkouts('1', monthIndex, '2022', token);
    } else {
      console.log('user not authenticated, cannot return workouts');
    }
  };

  useEffect(() => {
    filterWorkouts();
  }, [page]);

  return (
    <Section>
      <div className="container">
        <div className="chevron">
          <FaIcons.FaChevronCircleLeft
            onClick={() => {
              setPage(page > 0 ? page - 1 : page);
            }}
          />
        </div>
        <TrackerGrid page={page} />
        <div className="chevron">
          <FaIcons.FaChevronCircleRight
            onClick={() => {
              setPage(page < 11 ? page + 1 : page);
            }}
          />
        </div>
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
