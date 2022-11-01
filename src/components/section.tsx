import React, { ReactNode } from 'react';
import './section.css';

type Props = {
  children: ReactNode;
};

export default function Section(props: Props) {
  return <section className="section">{props.children}</section>;
}
