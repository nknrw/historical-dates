import "./mock.json";

export interface Event {
  id: number;
  year: number;
  event: string;
}

export interface CircleContainerProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface YearRangeProps {
  minYear: number;
  maxYear: number;
}
