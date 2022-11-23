import React, { useRef, RefObject } from 'react';
import { useEffect, useState } from 'react';
import { useApiContext, Workout } from '../utils/Context/context';
import { useAuthContext } from '../utils/AuthContext/authContext';

export default function Searchbox() {
  const { token } = useAuthContext();
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const [inputValue, setInputValue] = useState<string>('');
  const { onFilterWorkouts, onGetWorkouts } = useApiContext();

  useEffect(() => {
    const date = inputValue.split('/');
    if (date.length === 2 && token) {
      onFilterWorkouts('1', date[0], date[1], token);
    }
  }, [inputValue]);

  useEffect(() => {
    if (token) {
      onGetWorkouts('1', token);
    }
  }, [token]);

  const debounce = () => {
    const later = function () {
      inputRef.current?.value && setInputValue(inputRef.current.value);
    };

    setTimeout(later, 3000);
  };
  const handleChange = () => {
    console.log('handle change');
    debounce();
  };

  return (
    <input
      onChange={handleChange}
      type="text"
      ref={inputRef}
      placeholder="MM/YYYY"
    />
  );
}
