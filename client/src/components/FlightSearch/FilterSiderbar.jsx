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
  setcabinClass,
  flights,
  setDuration,
  duration,
}) => {
  const [loading, setLoading] = useState(true);
  const [airlines, setAirlines] = useState([]);

  //timeout for loading skeleton
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  // get airlines data for filter
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

  //direct or transit filtering
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

  //oneway or return filtering
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

  //cabin class filtering
  const handleCabinChange = (event) => {
    const filter = event.target.name;
    const checked = event.target.checked;
    const checkedBasic =
      filter === 'basic'
        ? checked
        : document.querySelector('input[name="basic"]').checked;
    const checkedEconomy =
      filter === 'economy'
        ? checked
        : document.querySelector('input[name="economy"]').checked;
    const checkedBusiness =
      filter === 'business'
        ? checked
        : document.querySelector('input[name="business"]').checked;

    if (checkedBasic || checkedEconomy || checkedBusiness) {
      const selectedCabin = [];

      if (checkedBasic) {
        selectedCabin.push('basic');
      }
      if (checkedEconomy) {
        selectedCabin.push('economy');
      }
      if (checkedBusiness) {
        selectedCabin.push('business');
      }

      setcabinClass(selectedCabin);
    } else {
      setcabinClass('all');
    }
  };

  //duration min-max
  const min = 60;
  const max = 500;

  //handling the range slider data
  const handleChange = (e) => {
    // console.log('setting level', e.target.value);
    setDuration(e.target.value);
  };

  //formatting the duration
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
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
                <input
                  type='checkbox'
                  name='basic'
                  onChange={handleCabinChange}
                />
                <label className=''>Basic</label>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  name='economy'
                  onChange={handleCabinChange}
                />
                <label className=''>Economy</label>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  name='business'
                  onChange={handleCabinChange}
                />
                <label className=''>Business</label>
              </div>
            </div>
            <hr />
            {min && max && (
              <div className='mt-4 font-semibold'>
                Duration
                <input
                  type='range'
                  id='duration'
                  className='w-full'
                  min={min}
                  max={max}
                  defaultValue={duration}
                  onChange={(e) => console.log(e.target.value)}
                  onMouseUp={handleChange}
                />
                <label htmlFor='duration'>{formatDuration(duration)}</label>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSiderbar;
