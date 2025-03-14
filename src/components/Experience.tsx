import React from 'react';
import '@/styles/Experience.css';

export default function Experience({ ...props }) {
  return (
    <section className="experience">
      <h2 className="experience__title">{props.title}</h2>
      <span className="experience__start-date">{props.start}</span>
      <span className="experience__date-line"/>
      <span className="experience__end-date">{props.end}</span>
      <span className="experience__company">{props.company}</span>
      <span className="experience__location">{props.location}</span>
      {props.children}
    </section>
  );
}