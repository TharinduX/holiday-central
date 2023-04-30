import React from 'react';
import Select from 'react-select';

const FilterSiderbar = () => {
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
        ></Select>
        <hr />
        <div className='mt-4 font-semibold'>Price</div>
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