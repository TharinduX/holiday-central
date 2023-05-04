import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const FlightCard = (flight) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  function convertMinutesToHrsMins(minutes) {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${mins}m`;
  }
  return (
    <>
      {loading ? (
        <Skeleton count={1} height={130} />
      ) : (
        <div className=' bg-white rounded-lg shadow-md px-7 py-5 mb-3'>
          <div className='grid grid-cols-4'>
            <div className='col-span-3'>
              <div className='flex gap-3 items-center'>
                <div className='flex flex-col items-center text-xs border rounded-lg p-0.5 w-[10%] text-secondary border-secondary'>
                  {flight.flight.isReturn ? 'Return' : 'One Way'}
                </div>
                <div className='uppercase text-xs'>
                  {flight.flight.cabin_class_avaialble.join(' | ')}
                </div>
              </div>

              <div className='flex justify-between w-full gap-4'>
                <div className='text-xs flex flex-col items-center w-full p-5'>
                  <img
                    src={flight.flight.airline.logo}
                    alt={flight.flight.airline.name}
                    className='w-10 h-10 '
                  />
                  {flight.flight.airline.name}
                </div>
                <div className='flex flex-col justify-center items-center text-gray-600'>
                  <div className='font-bold'>
                    {format(new Date(flight.flight.departure_time), 'HH:mm')}
                  </div>
                  <div className='text-xs'>
                    {flight.flight.departure_destination.code}
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center text-gray-600 w-full'>
                  <hr className='w-full h-1 bg-gray-200 border-0 rounded dark:bg-gray-500' />
                  <div className='text-xs uppercase'>
                    {flight.flight.isDirect
                      ? 'Direct'
                      : flight.flight.stops.join(' | ')}
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center text-gray-600'>
                  <div className='font-bold'>
                    {format(new Date(flight.flight.arrival_time), 'HH:mm')}
                  </div>
                  <div className='text-sm'>
                    {flight.flight.arrival_destination.code}
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center text-gray-400 w-full'>
                  <div className='text-md'>
                    {convertMinutesToHrsMins(flight.flight.total_duration)}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='flex flex-col items-end'>
                <div className='text-md text-gray-300'>
                  {flight.flight.flight_number}
                </div>
                <div className='font-bold text-gray-800 text-2xl'>
                  {flight.flight.price} LKR
                </div>
                <div className='text-sm'>Tax included</div>
                <Link to={`/flight-checkout/${flight.flight._id}`}>
                  <button className='bg-secondary text-white px-10 py-1 rounded-md'>
                    Select
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightCard;
