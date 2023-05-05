import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import {
  MdLocationOn,
  MdPerson2,
  MdArrowDropDown,
  MdOutlineDateRange,
} from 'react-icons/md';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import NumericInput from 'react-numeric-input';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useFetch from '../../hooks/useFetch';

//old handle click - not working
const Search = ({
  setFlights,
  setFrom,
  setTo,
  setDates,
  dates,
  setPassengers,
  setAirports,
  passengers,
  airports,
  options,
  from,
  to,
  departure_date,
  arrival_date,
}) => {
  const handleClick = async () => {
    if (!from || !to || !departure_date || !arrival_date || !passengers)
      return alert('Please fill all fields');
    await fetch(
      `/api/flights/search?from=${from.value}&to=${to.value}&departure_date=${departure_date}&arrival_date=${arrival_date}&pax=${passengers}`
    )
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((err) => console.log(err));
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  //handling the date range close
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  });
  return (
    <div className='w-full absolute bottom-[-25px] max-w-[1100px]'>
      <div className='flex search bg-white h-[60px] border-4 border-borderColor w-full rounded-md shadow-lg gap-2'>
        <div className='ml-3 flex justify-between items-stretch w-full'>
          <div className='search-item ml-2 flex gap-2 items-center  w-full '>
            <MdLocationOn className='search-icon' />
            <Select
              onChange={setFrom}
              placeholder='Where from?'
              options={options}
              classNamePrefix='slect-airport'
              className='w-full'
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 0,
                  boxShadow: 'none',
                  borderColor: 'none',
                }),
              }}
            />
          </div>
          <div className='search-item ml-2 flex gap-2 items-center  w-full'>
            <MdLocationOn className='search-icon' />
            <Select
              onChange={setTo}
              placeholder='Where to?'
              options={options}
              classNamePrefix='slect-airport'
              className='w-full'
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 0,
                  boxShadow: 'none',
                  borderColor: 'none',
                }),
              }}
            />
          </div>
          <div className='search-item ml-2 flex gap-2 items-center w-full relative'>
            <MdOutlineDateRange className='search-icon' />
            <button
              className='cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
              ref={dropdownRef2}
            >
              {`${format(dates[0].startDate, 'MM/dd/yyyy')} - ${format(
                dates[0].endDate,
                'MM/dd/yyyy'
              )}`}
            </button>
            {isOpen && (
              <div
                className='absolute z-10 top-[50px] bg-white radius-md shadow-md'
                ref={dropdownRef}
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className='w-full'
                  minDate={new Date()}
                />
              </div>
            )}
          </div>
          <div className='search-item ml-2 flex gap-2 items-center  '>
            <MdPerson2 className='search-icon' />
            <NumericInput
              defaultValue={1}
              min={1}
              max={9}
              onChange={setPassengers}
              className='w-20 h-10 '
            />
          </div>
        </div>

        <div className='search-item flex items-stretch text-gray-500 '>
          <button
            className='bg-secondary hover:bg-primary px-7 text-white '
            onClick={handleClick}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
