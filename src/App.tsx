import React, {useEffect, useState} from 'react';
import 'swiper/scss';
import './App.scss';
import CircleMenu from './components/CircleMenu/CircleMenu';
import EventsList from './components/EventList/EventList';
import PageButtons from './components/PageButtons/PageButtons';
import data from './mock.json';
import {Event as EventType} from './types';

const App: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>(data);
  const [minYear, setMinYear] = useState<number>(0);
  const [maxYear, setMaxYear] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventsPerPage = 5;

  useEffect(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const visibleEvents = events.slice(startIndex, endIndex);
    const sortedEvents = visibleEvents.slice().sort((a, b) => a.year - b.year);
    const years = sortedEvents.map((item) => item.year);
    setMinYear(Math.min(...years));
    setMaxYear(Math.max(...years));
  }, [events, currentPage, eventsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const visibleEvents = events.slice(startIndex, endIndex);

  return (
    <div className='app'>
      <h1 className='app-heading'>Исторические даты</h1>
      <CircleMenu
        totalPages={Math.ceil(events.length / eventsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        minYear={minYear}
        maxYear={maxYear}
      />
      <PageButtons
        totalPages={Math.ceil(events.length / eventsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <EventsList
        events={visibleEvents}
        currentPage={currentPage}
        eventsPerPage={eventsPerPage}
      />
    </div>
  );
};

export default App;
