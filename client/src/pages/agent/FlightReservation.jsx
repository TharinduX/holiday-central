import React from 'react';
import Search from '../../components/Search/Search';
import FlightCard from '../../components/FlightSearch/FlightCard';

const FlightReservation = () => {
  return (
    <div>
      <div className='grid place-items-center relative '>
        <Search />
      </div>
      <div className='grid grid-cols-4 max-w-[1200px] w-full m-auto gap-3 mt-12 text-gray-400'>
        <div className='bg-white rounded-lg shadow-md h-[500px]'></div>
        <div className='col-span-2 '>
          <FlightCard />
          <FlightCard />
          <FlightCard />
          <FlightCard />
          <FlightCard />
        </div>
        <div className='bg-white rounded-lg shadow-md h-[500px]'></div>
      </div>
    </div>
  );
};

export default FlightReservation;
