import React from 'react';
import { Workout } from './context';
import './card.css';
import { MonthWithDay } from '../components/calendarMonth';

type Props = {
  data: MonthWithDay | { cal_date: number };
};

function Card({ data }: Props) {
  return (
    <div className="card_container">
      <p className="card_date">{data.cal_date}</p>
      {'workout_type' in data ? (
        <h3 className="card_details">{data.workout_type}</h3>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Card;
