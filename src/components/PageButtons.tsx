import React from 'react';
import './PageButtons.scss';

interface PageButtonsProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PageButtons: React.FC<PageButtonsProps> = ({
                                                   totalPages,
                                                   currentPage,
                                                   onPageChange,
                                                 }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='page-buttons'>
      <span className='page-indicator'>{`${currentPage.toString().padStart(2, '0')} / ${totalPages.toString().padStart(2, '0')}`}</span>
      <div className='page-buttons-container'>
        <button
          className='page-button page-prev'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        ></button>
        <button className='page-button page-next' onClick={handleNextPage} disabled={currentPage === totalPages}></button>
      </div>
    </div>
  );
};

export default PageButtons;
