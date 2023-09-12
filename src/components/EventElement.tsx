import React from 'react';
import '../scss/components/EventElement.scss';
import {Event as EventType} from '../types';

interface EventProps {
  event: EventType;
}

const Event: React.FC<EventProps> = ({event}) => {
  return (
    <div className='event'>
      <p className='event-year'>{event.year}</p>
      <p className='event-text'>{event.event}</p>
    </div>
  );
};

export default Event;
