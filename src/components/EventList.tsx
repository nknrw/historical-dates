import React from 'react';
import {FreeMode, Navigation} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import './EventList.scss';
import { Event as EventType } from '../types'
import Event from './Event';
import PageButtons from './PageButtons';

interface EventListProps {
	currentPage: number;
	eventsPerPage: number;
	events: EventType[]; // Предположим, что у вас есть массив событий
}

const EventList: React.FC<EventListProps> = ({ currentPage, eventsPerPage, events }) => {
	// Рассчитываем индекс первого события на текущей странице
	const startIndex = (currentPage - 1) * eventsPerPage;
	// Отфильтровываем события для отображения на текущей странице
	const displayedEvents = events.slice(startIndex, startIndex + eventsPerPage);

	return (
		<div className="event-list">
			<Swiper
				modules={[FreeMode, Navigation]}
				navigation={true}
				spaceBetween={80}
				freeMode={true}
				slidesPerView={3}
			>
				{events.map((event) => (
					<SwiperSlide key={event.id}>
						<Event key={event.id} event={event} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default EventList;
