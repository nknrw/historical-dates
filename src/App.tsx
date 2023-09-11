import React, {useEffect, useState} from 'react';
// import 'swiper/css/navigation';
import 'swiper/scss';
import './App.scss';
import CircleMenu from './components/CircleMenu';
import EventsList from './components/EventList';
import PageButtons from './components/PageButtons';
// import YearRange from './components/YearRange';
import data from './mock.json'; // Импорт данных из mock.json
import {Event as EventType} from './types';
import Swiper from 'swiper';

const App: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>(data);
  const [minYear, setMinYear] = useState<number>(0);
  const [maxYear, setMaxYear] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventsPerPage = 5; // Количество событий на странице

  useEffect(() => {
    // Определение отображаемых событий на текущей странице
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const visibleEvents = events.slice(startIndex, endIndex);

    // Сортировка отображаемых событий по увеличению года
    const sortedEvents = visibleEvents.slice().sort((a, b) => a.year - b.year);

    const years = sortedEvents.map((item) => item.year);
    setMinYear(Math.min(...years));
    setMaxYear(Math.max(...years));
  }, [events, currentPage, eventsPerPage]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Определение отображаемых событий на текущей странице
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const visibleEvents = events.slice(startIndex, endIndex);

  return (
    <div className='app'>
      <h1 className='app-heading'>Исторические даты</h1>
      {/* <YearRange minYear={minYear} maxYear={maxYear} /> */}
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
      <EventsList events={visibleEvents} currentPage={currentPage} eventsPerPage={eventsPerPage}/>

    </div>

  );
};

export default App;
