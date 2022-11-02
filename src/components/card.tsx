import React from 'react';
import './card.css';
import { MonthWithDay } from '../components/calendarMonth';

type Props = {
  data: MonthWithDay | { cal_date: number };
};

function Card({ data }: Props) {
  return (
    <div className="card_container">
      {'workout_type' in data ? (
        <>
          <p>{data.cal_date}</p>
          <img src={data.img_url} />
          <h3 className="card_details">{data.workout_type}</h3>
        </>
      ) : (
        <p>{data.cal_date}</p>
      )}
    </div>
  );
}

export default Card;
