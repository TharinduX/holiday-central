import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useFetch from '../../hooks/useFetch';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FilterSiderbar = ({
  setAirlineQuery,
  setPriceSelect,
  setisDirect,
  setIsReturn,
}) => {
  const [loading, setLoading] = useState(true);
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  useEffect(() => {
    fetch('/api/airlines')
      .then((response) => response.json())
      .then((data) => setAirlines(data))
      .catch((err) => console.log(err));
  }, []);

  const options = [
    { value: 'all', label: 'All' },
    ...airlines.map((airline) => ({ value: airline._id, label: airline.name })),
  ];

  const priceOptions = [
    { value: 'asc', label: 'Price: low to high' },
    { value: 'desc', label: 'Price: high to low' },
  ];

  const handleFilterChange = (event) => {
    const filter = event.target.name;
    const checked = event.target.checked;
    const checkedDirect =
      filter === 'direct'
        ? checked
        : document.querySelector('input[name="direct"]').checked;
    const checkedTransit =
      filter === 'transit'
        ? checked
        : document.querySelector('input[name="transit"]').checked;

    if (checkedDirect && checkedTransit) {
      setisDirect('all');
    } else if (checkedDirect) {
      setisDirect(true);
    } else if (checkedTransit) {
      setisDirect(false);
    } else {
      setisDirect('all');
    }
  };

  const handleTypeChange = (event) => {
    const filter = event.target.name;
    const checked = event.target.checked;
    const checkedOneway =
      filter === 'oneway'
        ? checked
        : document.querySelector('input[name="oneway"]').checked;
    const checkedReturn =
      filter === 'return'
        ? checked
        : document.querySelector('input[name="return"]').checked;

    if (checkedOneway && checkedReturn) {
      setIsReturn('all');
    } else if (checkedOneway) {
      setIsReturn(false);
    } else if (checkedReturn) {
      setIsReturn(true);
    } else {
      setIsReturn('all');
    }
  };

  return (
    <>
      {loading ? (
        <Skeleton count={1} height={600} />
      ) : (
        <div className='bg-white rounded-lg shadow-md mb-auto text-gray-700 p-5'>
          <div className='text-lg font-bold mb-3'>Filters</div>
          <hr />
          <div>
            <div className='mt-4 font-semibold'>Airlines</div>
            <Select
              onChange={setAirlineQuery}
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
              onChange={setPriceSelect}
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
                <input
                  type='checkbox'
                  name='direct'
                  onChange={handleFilterChange}
                />
                <label>Direct</label>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  name='transit'
                  onChange={handleFilterChange}
                />
                <label>Transit</label>
              </div>
            </div>
            <hr />
            <div className='mt-4 font-semibold'>Ticket Type</div>
            <div className='flex flex-col gap-1 mt-3.5 mb-3'>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  name='oneway'
                  onChange={handleTypeChange}
                />
                <label className=''>One-way</label>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  name='return'
                  onChange={handleTypeChange}
                />
                <label className=''>Return</label>
              </div>
            </div>
            <hr />
            <div className='mt-4 font-semibold'>Cabin Class</div>
            <div className='flex flex-col gap-1 mt-3.5 mb-3'>
              <div className='flex gap-2'>
                <input type='checkbox' />
                <label className=''>Basic</label>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' />
                <label className=''>Economy</label>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' />
                <label className=''>Business</label>
              </div>
            </div>
            <hr />
            <div className='mt-4 font-semibold'>Duration</div>
            <input type='range' id='duration' className='w-full' />
            <label htmlFor='duration'>5h 30m</label>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSiderbar;
