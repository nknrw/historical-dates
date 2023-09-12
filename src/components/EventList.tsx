import React from 'react';
import {FreeMode, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/scss/pagination';
import {Event as EventType} from '../types';
import Event from './EventElement';
import '../scss/components/EventList.scss';

interface EventListProps {
  currentPage: number;
  eventsPerPage: number;
  events: EventType[];
}

const EventList: React.FC<EventListProps> = ({
                                               currentPage,
                                               eventsPerPage,
                                               events,
                                             }) => {
  return (
    <div className='event-list'>
      <Swiper
        key={currentPage}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 80,
            freeMode: true,
            grabCursor: true,
            pagination: false,
            slidesOffsetAfter: 0,
          },
        }}
        modules={[FreeMode, Navigation, Pagination]}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        spaceBetween={25}
        slidesPerView={1.75}
        pagination={true}
        slidesOffsetAfter={130}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <Event key={event.id} event={event}/>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='event-list-button prev'></div>
      <div className='event-list-button next'></div>
    </div>
  );
};

export default EventList;
