import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface CircularPaginationProps {
  active: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CircularPagination: React.FC<CircularPaginationProps> = ({
  active,
  totalPages,
  onPageChange,
}) => {
  const next = () => {
    if (active === totalPages) return;
    onPageChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    onPageChange(active - 1);
  };

  const generatePaginationItems = () => {
    const items: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`
            ${active === i ? "bg-black text-white" : "bg-white text-black"}
            shadow-md rounded-full flex items-center justify-center w-8 h-8
            focus:outline-none transition duration-300
            hover:bg-gray-300 hover:text-black
          `}
        >
          {i}
        </button>
      );
    }
    return items;
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className={`
          flex items-center gap-2 rounded-full bg-transparent px-2
          ${active === 1 ? "cursor-not-allowed text-gray-300" : "hover:bg-gray-300 hover:text-black"}
        `}
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </button>
      <div className="flex items-center gap-2">{generatePaginationItems()}</div>
      <button
        className={`
          flex items-center gap-2 rounded-full bg-transparent px-2
          ${active === totalPages ? "cursor-not-allowed text-gray-300" : "hover:bg-gray-300 hover:text-black"}
        `}
        onClick={next}
        disabled={active === totalPages}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CircularPagination;
