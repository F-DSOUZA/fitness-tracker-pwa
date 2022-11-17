import React, { useRef, RefObject } from 'react';
import { useEffect, useState } from 'react';
import { useApiContext, Workout } from '../components/context';

export default function Searchbox() {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const [inputValue, setInputValue] = useState<string>('');
  const { onFilterWorkouts, onGetWorkouts } = useApiContext();

  useEffect(() => {
    const date = inputValue.split('/');
    if (date.length === 2) {
      onFilterWorkouts('1', date[0], date[1]);
    }
  }, [inputValue]);

  useEffect(() => {
    onGetWorkouts('1');
  }, []);

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
