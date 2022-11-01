import React, { useRef } from 'react';
import { useEffect } from 'react';
import Section from '../components/section';

export default function Search() {
  const inputRef = useRef(null);
  //console.log(inputRef.current.value);
  //useEffect(() => {}, [inputRef]);
  return (
    <Section>
      <input ref={inputRef} placeholder="MM/DD/YYYY" />
    </Section>
  );
}
