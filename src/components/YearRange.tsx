import React, { useEffect, useRef } from 'react';
import './YearRange.scss';
import gsap from 'gsap';

interface YearRangeProps {
	minYear: number;
	maxYear: number;
}

const YearRange: React.FC<YearRangeProps> = ({ minYear, maxYear }) => {
	const minYearRef = useRef<HTMLDivElement | null>(null);
	const maxYearRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (minYearRef.current && maxYearRef.current) {
			gsap.to(minYearRef.current, {
				duration: 0.5, // Длительность анимации (в секундах)
				textContent: minYear, // Конечное значение числа
				roundProps: 'textContent',
			});

			gsap.to(maxYearRef.current, {
				duration: 0.5, // Длительность анимации (в секундах)
				textContent: maxYear, // Конечное значение числа
				roundProps: 'textContent',
			});
		}
	}, [minYear, maxYear]);

	return (
		<div className="year-range">
			<div className='year-start' ref={minYearRef}></div>
			<div className='year-finish' ref={maxYearRef}></div>
		</div>
	);
};

export default YearRange;
