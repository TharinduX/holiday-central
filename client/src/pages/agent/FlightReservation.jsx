import React, { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import FlightCard from '../../components/FlightSearch/FlightCard';
import FilterSiderbar from './../../components/FlightSearch/FilterSiderbar';

const FlightReservation = () => {
  const [flights, setFlights] = useState([]);

  return (
    <div>
      <div className='grid place-items-center relative '>
        <Search setFlights={setFlights} />
      </div>
      <div className='grid grid-cols-4 max-w-[1200px] w-full m-auto gap-3 mt-12 text-gray-400'>
        <div className='col-span-3 '>
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))
          ) : (
            <p className='text-center'>No Flights Available</p>
          )}
        </div>
        {flights.length > 0 ? <FilterSiderbar /> : ''}
      </div>
    </div>
  );
};

export default FlightReservation;
