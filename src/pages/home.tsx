import { off } from 'process';
import React, { MutableRefObject, useRef } from 'react';
import { useApiContext } from '../components/context';
import Section from '../components/section';
import './home.css';

export default function Home() {
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
  const otherInputRef = useRef(null);

  const { onCreateWorkouts } = useApiContext();

  const handleSubmit = (e: React.FormEvent) => {
    console.log('handlesubmit');
    if (formRef.current) {
      const formData = new FormData(formRef?.current);
      for (const pair of formData.entries()) {
        if (pair[1] === 'other') {
          formData.delete(pair[0]);
        }
        if (pair[0] === 'other_type') {
          formData.append('workout_type', pair[1]);
          formData.delete(pair[0]);
        }
        if (!pair[1]) {
          console.log(pair[0]);
          formData.delete(pair[0]);
        }
      }
      for (const pair of formData.entries()) {
        console.log(pair);
      }
      //Rui - how do i type form data FormDate<Workout>
      onCreateWorkouts('1', formData);
    }

    e.preventDefault();
  };

  const inputConfig = [
    { id: 'bootcamp', title: 'Bootcamp' },
    { id: 'football', title: 'Football' },
    { id: 'pilates', title: 'Pilates' },
    { id: 'running', title: 'Running' },
    { id: 'spinning', title: 'Spinning' },
    { id: 'tennis', title: 'Tennis' },
    { id: 'walking', title: 'Walking' },
    { id: 'weights', title: 'Weight Training' },
    { id: 'yoga', title: 'Yoga' },
  ];
  return (
    <Section>
      <fieldset>
        <form
          className="form"
          ref={formRef}
          onSubmit={(e) => handleSubmit(e)}
          name="form"
        >
          <div>
            <legend>Date:</legend>
            <input
              required
              placeholder="dd/mm/yyyy"
              type="text"
              id="workoutDate"
              name="workout_date"
            ></input>
            <legend>Workout:</legend>
          </div>

          {inputConfig.map((item, i) => (
            <div key={i}>
              <input
                name="workout_type"
                value={item.id}
                type="radio"
                id={item.id}
              ></input>
              <label htmlFor="bootcamp">{item.title}</label>
            </div>
          ))}

          <div>
            <input
              name="workout_type"
              value="other"
              type="radio"
              id="other"
            ></input>
            <label htmlFor="other">Other</label>
            <input
              className="otherInput"
              //ref={otherInputRef}
              type="text"
              id="otherValue"
              name="other_type"
              placeholder="name of activity"
            />
          </div>
          <input type="submit" />
        </form>
      </fieldset>
    </Section>
  );
}
