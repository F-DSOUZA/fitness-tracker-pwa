import React from 'react';

type Props = {
  data: Array<Workout | null>;
};

type Workout = {
  workout_type: string;
  workout_date: string;
};

function Table({ data }: Props) {
  console.log(data);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Activity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((activity, index) => (
          <tr key={index}>
            <td>{activity?.workout_date}</td>
            <td>{activity?.workout_type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
