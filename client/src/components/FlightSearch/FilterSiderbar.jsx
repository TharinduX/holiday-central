import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const FilterSiderbar = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/airlines`)
      .then((response) => response.json())
      .then((data) => setAirlines(data))
      .catch((err) => console.log(err));
  }, []);

  const options = airlines.map((airline) => ({
    value: airline.name,
    label: airline.name,
  }));

  const priceOptions = [
    { value: 'asc-price', label: 'Price: low to high' },
    { value: 'desc-price', label: 'Price: high to low' },
  ];

  return (
    <div>
      <div className='text-lg font-bold mb-3'>Filters</div>
      <hr />
      <div>
        <div className='mt-4 font-semibold'>Airlines</div>
        <Select
          placeholder='Select airline'
          className='mt-2'
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: 0,
              boxShadow: 'none',
              borderColor: 'none',
            }),
          }}
          options={options}
        ></Select>
        <hr />
        <div className='mt-4 font-semibold'>Price</div>
        <Select
          className='mt-2'
          isSearchable={false}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: 0,
              boxShadow: 'none',
              borderColor: 'none',
            }),
          }}
          options={priceOptions}
        ></Select>

        <hr />
        <div className='mt-4 font-semibold'>Stops</div>
        <div className='flex flex-col gap-1 mt-3.5 mb-3'>
          <div className='flex gap-2'>
            <input type='checkbox' />
            <label className=''>Direct</label>
          </div>
          <div className='flex gap-2'>
            <input type='checkbox' />
            <label className=''>1 Stop</label>
          </div>
          <div className='flex gap-2'>
            <input type='checkbox' />
            <label className=''>2+ Stops</label>
          </div>
        </div>
        <hr />
        <div className='mt-4 font-semibold'>Duration</div>
        <input type='range' id='duration' className='w-full' />
        <label htmlFor='duration'>5h 30m</label>
      </div>
    </div>
  );
};

export default FilterSiderbar;
