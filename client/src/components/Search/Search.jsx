import React, { useState } from 'react';
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
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div className='w-full absolute bottom-[-25px] max-w-[1100px]'>
      <div className='flex justify-end text-cardShaddow mb-3 gap-5'>
        <div className='text-sm flex items-center pr-3 border-r-2 border-[#0077b6] cursor-pointer'>
          One-Way
          <MdArrowDropDown className='search-icon' />
        </div>
        <div className='text-sm flex items-center cursor-pointer'>
          Economy
          <MdArrowDropDown className='search-icon' />
        </div>
      </div>
      <div className='flex search bg-white h-[60px] border-4 border-borderColor w-full rounded-md shadow-lg gap-2'>
        <div className='ml-3 flex justify-between items-stretch w-full'>
          <div className='search-item ml-2 flex gap-2 items-center text-gray-400 w-full'>
            <MdLocationOn className='search-icon' />
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              placeholder='Where from?'
              options={options}
              className='w-full'
              classNamePrefix='customSelect'
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
          <div className='search-item ml-2 flex gap-2 items-center text-gray-400 w-full'>
            <MdLocationOn className='search-icon' />
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              placeholder='Where to?'
              options={options}
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
          <div className='search-item ml-2 flex gap-2 items-center text-gray-400 w-full'>
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
                className='absolute z-10 top-[85px] bg-white radius-md shadow-md'
                minDate={new Date()}
              />
            )}
          </div>
          <div className='search-item ml-2 flex gap-2 items-center text-gray-400  '>
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
