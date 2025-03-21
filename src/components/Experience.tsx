import React from 'react';
import '@/styles/Experience.css';
import '@/styles/globals.css';

export default function Experience({ ...props }) {
  return (
    <section className="experience">
      <h2 className="experience__title gradient-text">{props.title}</h2>
      <div className="experience__details">
        <span>{props.start}</span>
        <span className="experience__date-line"/>
        <span>{props.end}</span>
        <div className="experience__details-break"></div>
        <span>{props.company}</span>
        <div className="experience__details-break"></div>
        <span>{props.location}</span>
      </div>
      <div className="experience__content" dangerouslySetInnerHTML={{ __html: props.content }} />
    </section>
  );
}