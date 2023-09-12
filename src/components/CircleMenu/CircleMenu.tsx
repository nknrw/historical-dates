import gsap from 'gsap';
import React, {useEffect, useRef, useState} from 'react';
import './CircleMenu.scss';

interface CircleContainerProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  minYear: number;
  maxYear: number;
}

const CircleMenu: React.FC<CircleContainerProps> = ({
                                                      totalPages,
                                                      currentPage,
                                                      onPageChange,
                                                      minYear,
                                                      maxYear,
                                                    }) => {
  const [circleElements, setCircleElements] = useState<JSX.Element[]>([]);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const activeButtonsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const minYearRef = useRef<HTMLDivElement | null>(null);
  const maxYearRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const radius = 265;
    const angleIncrement = (2 * Math.PI) / totalPages;
    const centerX = 265;
    const centerY = 265;
    const elementSize = 50;

    const elements = Array.from({length: totalPages}).map((_, index) => {
      const angle = (index - 1) * angleIncrement;
      const x = centerX + radius * Math.cos(angle) - elementSize / 2;
      const y = centerY + radius * Math.sin(angle) - elementSize / 2;

      return (
        <div
          key={index}
          className={`circle-element ${
            currentPage === index + 1 ? 'active' : ''
          }`}
          onClick={() => handlePageChange(index + 1)}
          style={{
            width: `${elementSize}px`,
            height: `${elementSize}px`,
            left: `${x}px`,
            top: `${y}px`,
          }}
          ref={(el) => {
            activeButtonsRefs.current[index] = el;
          }}
        >
          <div className='inner-circle'>
            <span className='text'>{index + 1}</span>
          </div>
        </div>
      );
    });

    setCircleElements(elements);
    rotateToActivePage(currentPage);
  }, [totalPages, currentPage]);

  useEffect(() => {
    if (minYearRef.current && maxYearRef.current) {
      gsap.to(minYearRef.current, {
        duration: 0.5,
        textContent: minYear,
        roundProps: 'textContent',
      });

      gsap.to(maxYearRef.current, {
        duration: 0.5,
        textContent: maxYear,
        roundProps: 'textContent',
      });
    }
  }, [minYear, maxYear]);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    rotateToActivePage(page);
  };

  const rotateToActivePage = (page: number) => {
    if (circleRef.current) {
      const angleIncrement = (2 * Math.PI) / totalPages;
      const angle = (page - 1) * angleIncrement;

      gsap.to(circleRef.current, {rotation: -angle * (180 / Math.PI)});

      if (activeButtonsRefs.current.length > 0) {
        activeButtonsRefs.current.forEach((buttonRef, index) => {
          if (buttonRef) {
            gsap.to(buttonRef, {rotation: angle * (180 / Math.PI)});
          }
        });
      }
    }
  };

  return (
    <div className='circle-menu'>
      <div className='circle-container' ref={circleRef}>
        {circleElements.map((element) => element)}
      </div>
      <div className='year-range'>
        <div className='year-start' ref={minYearRef}></div>
        <div className='year-finish' ref={maxYearRef}></div>
      </div>
    </div>
  );
};

export default CircleMenu;
