import React, { useRef } from 'react';
import { useApiContext } from '../components/context';
import Section from '../components/section';
import './home.css';

export default function Home() {
  const otherCheckboxRef = useRef(null);
  const otherInputRef = useRef(null);

  const { onCreateWorkouts } = useApiContext();

  const handleSubmit = () => {
    //Monday- https://stackoverflow.com/questions/71384018/typing-object-fromentriesnew-formdataform and fix this
    const payload = { workout_type: '', workout_date: '' };
    onCreateWorkouts('1', payload);
  };

  return (
    <Section>
      <fieldset>
        <legend>Record your workout</legend>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <legend>Date:</legend>
            <input
              required
              type="date"
              id="workoutDate"
              name="workoutDate"
              value=""
              min="2022-01-01"
              max="2022-12-31"
            ></input>
            <legend>Workout:</legend>
          </div>
          <div>
            <input
              name="workoutType"
              value="bootcamp"
              type="checkbox"
              id="bootcamp"
            ></input>
            <label htmlFor="bootcamp">Bootcamp</label>
          </div>
          <div>
            <input
              name="workoutType"
              value="football"
              type="checkbox"
              id="football"
            ></input>
            <label htmlFor="football">Football</label>
          </div>
          <div>
            <input
              name="workoutType"
              value="pilates"
              type="checkbox"
              id="pilates"
            ></input>
            <label htmlFor="pilates">Pilates</label>
          </div>
          <div>
            <input
              name="workoutType"
              value="running"
              type="checkbox"
              id="running"
            ></input>
            <label htmlFor="running">Running</label>
          </div>
          <div>
            <input
              name="workoutType"
              value="spinning"
              type="checkbox"
              id="spinning"
            ></input>
            <label htmlFor="spinning">Spinning</label>
          </div>
          <div>
            <input
              name="workoutType"
              value="tennis"
              type="checkbox"
              id="tennis"
            ></input>
            <label htmlFor="tennis">Tennis</label>
          </div>
          <div>
            <input
              name="workoutType"
              value="walking"
              type="checkbox"
              id="walking"
            ></input>
            <label htmlFor="walking">Walking</label>
          </div>
          <div>
            <input
              name="workoutType"
              value="weights"
              type="checkbox"
              id="weights"
            ></input>
            <label htmlFor="weights">Weight training</label>
          </div>
          <div>
            <input
              name="workoutType"
              value="yoga"
              type="checkbox"
              id="yoga"
            ></input>
            <label htmlFor="yoga">Yoga</label>
          </div>
          <div>
            <input
              ref={otherCheckboxRef}
              name="workoutType"
              value="other"
              type="checkbox"
              id="other"
            ></input>
            <label htmlFor="other">Other</label>
            <input
              className="otherInput"
              ref={otherInputRef}
              type="text"
              id="otherValue"
              name="other"
              placeholder="name of activity"
            />
          </div>
        </form>
      </fieldset>
    </Section>
  );
}
