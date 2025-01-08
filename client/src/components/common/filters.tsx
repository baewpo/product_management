import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSearch,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export interface CategoryOption {
  id: number;
  label: string;
}

interface StockOption {
  id: string;
  label: string;
  checked: boolean;
  value: number;
}

interface SidebarProps {
  categoryOptions: CategoryOption[];
  stockOptions: StockOption[];
  onSearch: (
    searchTerm: string,
    priceMin?: number,
    priceMax?: number,
    inStock?: boolean,
    categories?: string[]
  ) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categoryOptions,
  stockOptions,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceMin, setPriceMin] = useState<number | undefined>(0);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
  const [selectedStockOption, setSelectedStockOption] = useState<
    number | undefined
  >(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(Number(e.target.value));
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(Number(e.target.value));
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(
      searchTerm,
      priceMin,
      priceMax,
      selectedStockOption === 1 ? true : undefined,
      selectedCategories.length > 0 ? selectedCategories : undefined
    );
  };

  const handleStockOptionChange = (value: number) => {
    setSelectedStockOption(value);
    onSearch(
      searchTerm,
      priceMin,
      priceMax,
      value === 1 ? true : undefined,
      selectedCategories.length > 0 ? selectedCategories : undefined
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((cat) => cat !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
    onSearch(
      searchTerm,
      priceMin,
      priceMax,
      selectedStockOption === 1 ? true : undefined,
      updatedCategories.length > 0 ? updatedCategories : undefined
    );
  };

  const handleClearPrice = () => {
    setPriceMin(0);
    setPriceMax(undefined);
    onSearch(
      searchTerm,
      undefined,
      undefined,
      selectedStockOption === 1 ? true : undefined,
      selectedCategories.length > 0 ? selectedCategories : undefined
    );
  };

  const handleClearSearch = () => {
    setSearchTerm(""); // Clear the searchTerm state
  };

  return (
    <div className="bg-white rounded-xl border dark:border-slate-700 p-4 lg:p-6">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative sm:flex sm:items-center">
          <input
            className="border-2 border bg-white h-10 px-5 pr-20 w-full rounded-lg text-sm focus:outline-none [&::-webkit-search-cancel-button]:hidden focus:ring-1 focus:ring-grey-dark"
            type="search"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && ( // Render clear button only when searchTerm is not empty
            <button
              type="button"
              className="absolute right-10 mr-4 text-sm font-semibold"
              onClick={handleClearSearch}
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-300 aria-hidden:" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-0 top-2 mr-4 pl-3 border-l-2"
          >
            <FontAwesomeIcon icon={faSearch} className="text-gray-300 aria-hidden:" />
          </button>
        </div>
      </form>

      <hr className="my-6" />

      <div>
        <FontAwesomeIcon icon={faFilter} className="text-black text-2xl aria-hidden:" />
        <span className="text-black text-2xl leading-tight font-bold ml-2">
          Filter
        </span>
      </div>

      <div>
        <div className="flex items-center">
          <h5 className="text-black text-xl leading-tight font-bold mt-6 mb-4">
            Price
          </h5>
          <button
            type="button"
            onClick={handleClearPrice}
            className="text-gray-400 hover:text-gray-600 flex items-center ml-2 text-sm pt-3 "
          >
            <FontAwesomeIcon icon={faTimesCircle} className="h-4 w-4 mr-1" />
            Clear
          </button>
        </div>
        <form onSubmit={handleSearchSubmit} className="max-w-full">
          <div className="flex items-center flex-wrap gap-2 ">
            <div>
              <input
                className="border-2 border bg-white h-8 px-2 rounded-lg text-sm focus:outline-none flex-1 max-w-[5rem] focus:ring-1 focus:ring-grey-dark"
                type="number"
                step="1"
                min="0"
                value={priceMin !== undefined ? priceMin : ""}
                onChange={handlePriceMinChange}
              />
            </div>
            <p className="mx-2 mb-0 text-nowrap font-semibold">To</p>
            <div>
              <input
                className="border-2 border bg-white h-8 px-2 rounded-lg text-sm focus:outline-none flex-1 max-w-[5rem] focus:ring-1 focus:ring-grey-dark"
                type="number"
                step="1"
                min="0"
                value={priceMax !== undefined ? priceMax : ""}
                onChange={handlePriceMaxChange}
              />
            </div>
            <div>
              <button type="submit" onClick={handleSearchSubmit}>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-white bg-grey-dark p-2 px-3 rounded-full"
                />
              </button>
            </div>
          </div>
        </form>
      </div>

      <hr className="my-6" />

      <div className="filter-content">
        <h5 className="text-black text-xl leading-tight font-bold mt-6">
          Stock
        </h5>
        {stockOptions.map((option, index) => (
          <div className="block mt-4" key={option.id}>
            <input
              type="radio"
              name="stock"
              id={option.id}
              checked={selectedStockOption === index}
              onChange={() => handleStockOptionChange(index)}
            />
            <label htmlFor={option.id} className="ml-2">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <div>
        <h5 className="text-black text-xl leading-tight font-bold mt-6">
          Categories
        </h5>
        {categoryOptions.map((option) => (
          <div className="block mt-4" key={option.id}>
            <input
              type="checkbox"
              id={option.id.toString()}
              checked={selectedCategories.includes(option.id.toString())}
              onChange={() => handleCategoryChange(option.id.toString())}
            />
            <label htmlFor={option.id.toString()} className="ml-2">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Sidebar;
