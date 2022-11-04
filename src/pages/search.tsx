import React, { useRef, RefObject } from 'react';
import { useEffect, useState } from 'react';
import { useApiContext } from '../components/context';
import Section from '../components/section';

export default function Search() {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const { onFilterWorkouts } = useApiContext();

  //useEffect(() => {
  //  //const date = inputValue.split('/');
  //  //if (date.length === 3) {
  //  //  console.log(date);
  //    // onFilterWorkouts(inputValue[0], inputValue[1], inputValue[2]);
  //  }
  //}, [inputValue]);

  const debounce = () => {
    console.log('inside debounce');
    return function executedFunction() {
      const later = function () {
        console.log('inside later fn');
      };

      setTimeout(later, 1000);
      console.log('inside ex fn');
    };
  };

  const handleChange = () => {
    debounce();
    //inputRef.current?.value && setInputValue(inputRef.current?.value);
    //every change, change the state
    //debounce the call to the state
    //when the state changes use useEffect dependent on state to call the context api
    //call a context function when the the reff changes
    //how does handle change work?
  };

  return (
    <Section>
      <input
        onChange={handleChange}
        type="text"
        ref={inputRef}
        placeholder="MM/DD/YYYY"
      />
    </Section>
  );
}

//when the user starts typing call debounce
//debounce returns a  function excecuted function
//excecuted returns a function later that is called within the scope of excecuted function after a timeout
//we want debounce to be called when they start typing as we need to initialize the timer  and start the timeout function

//check rendering and possibly split out input component
