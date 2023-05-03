import React, { useState, useEffect } from 'react';
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

const Search = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [airports, setAirports] = useState([]);

  useEffect(() => {
    fetch('/api/airports')
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((err) => console.log(err));
  }, []);

  const options = airports.map((airport) => ({
    value: airport.id,
    label: airport.name + ' (' + airport.code + ')',
  }));

  return (
    <div className='w-full absolute bottom-[-25px] max-w-[1100px]'>
      <div className='flex search bg-white h-[60px] border-4 border-borderColor w-full rounded-md shadow-lg gap-2'>
        <div className='ml-3 flex justify-between items-stretch w-full'>
          <div className='search-item ml-2 flex gap-2 items-center  w-full '>
            <MdLocationOn className='search-icon' />
            <Select
              onChange={setSelectedOption}
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
              onChange={setSelectedOption}
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
          <div className='search-item ml-2 flex gap-2 items-center  w-full'>
            <MdOutlineDateRange className='search-icon' />
            <span
              onClick={() => setOpenDate(!openDate)}
              className='cursor-pointer'
            >{`${format(dates[0].startDate, 'MM/dd/yyyy')} - ${format(
              dates[0].endDate,
              'MM/dd/yyyy'
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className='absolute z-10 top-[50px] bg-white radius-md shadow-md'
                minDate={new Date()}
              />
            )}
          </div>
          <div className='search-item ml-2 flex gap-2 items-center  '>
            <MdPerson2 className='search-icon' />
            <NumericInput
              defaultValue={1}
              min={1}
              max={9}
              className='w-20 h-10 '
            />
          </div>
        </div>
        <div className='search-item flex items-stretch text-gray-500 '>
          <button className='bg-secondary hover:bg-primary px-7 text-white '>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
