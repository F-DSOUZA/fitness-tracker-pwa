import React, { MutableRefObject, useRef } from 'react';
import { useApiContext } from '../utils/Context/context';
import Section from '../components/section';
import './home.css';
import './search.css';
import { useAuthContext } from '../utils/AuthContext/authContext';

export default function Home() {
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
  //const otherInputRef = useRef(null);
  const { token } = useAuthContext();
  const { onCreateWorkouts } = useApiContext();

  const handleSubmit = (e: React.FormEvent) => {
    console.log('handlesubmit');
    if (formRef.current) {
      const formData = new FormData(formRef?.current);
      if (formData.get('workout_type') === 'other') {
        const other_type = formData.get('other_type') as string;
        formData.set('workout_type', other_type);
      }
      formData.delete('other_type');

      if (token) {
        return onCreateWorkouts('1', formData, token);
      } else {
        console.log('user authenticated, cannot create workout');
      }
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
