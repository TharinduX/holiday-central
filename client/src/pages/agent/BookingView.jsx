import React, { useState, useEffect } from 'react';

import { MdOutlineArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useFetch from '../../hooks/useFetch';
import Login from './../Login';
import Map from '../../components/GoogleMap/Map';

const BookingView = () => {
  const id = location.pathname.split('/')[2];
  const { data, loading, error } = useFetch(`/api/booking/${id}`);
  const [skelton, setSkelton] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSkelton(false);
    }, 1000);
  });

  return (
    <div className='checkout-wrapper'>
      <nav className='header bg-secondary px-12 pt-8 pb-8'>
        <div className='main-navbar flex justify-between items-center'>
          <Link to={'/'}>
            <div className='flex text-white text-xl gap-3 items-center'>
              <MdOutlineArrowBack className='back-button' color='white' />
              <div className='title'>Home</div>
            </div>
          </Link>
        </div>
      </nav>
      {skelton ? (
        <div className='checkout-body max-w-[1200px] w-full m-auto my-5'>
          <Skeleton count={1} height={500} />
        </div>
      ) : (
        <div className='checkout-body max-w-[1200px] w-full m-auto my-5'>
          <form>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-2 bg-white rounded-lg p-8 shadow-md'>
                <div className='card-wrapper flex justify-between'>
                  <div className='text-secondary text-3xl font-bold mb-5'>
                    Booking Details
                  </div>
                  <div className='text-gray-700'>
                    Reservation Status:
                    <span className='text-green-600'> Payment Success</span>
                  </div>
                </div>
                <div className='map-wrapper h-[300px] '>
                  <Map
                    d_lat={data?.flight_booking_id?.departure_destination?.lat}
                    d_lng={data?.flight_booking_id?.departure_destination?.lng}
                    a_lat={data?.flight_booking_id?.arrival_destination?.lat}
                    a_lng={data?.flight_booking_id?.arrival_destination?.lng}
                  />
                </div>
              </div>
              <div className='checkout-info bg-white rounded-md p-8 shadow-md h-[500px] flex flex-col justify-between w-full'>
                <div className='order-info-wrapper'>
                  <div className='text-md gap-3 justify-end items-center flex w-full'>
                    <img
                      src={data.flight_booking_id?.airline.logo}
                      alt=''
                      className='w-10 h-10 '
                    />
                    {data.flight_booking_id?.airline.name}
                    <div className='flex flex-col items-center text-xs border rounded-lg p-0.5 w-[80px] text-secondary border-secondary'>
                      {data.isReturn ? 'Return' : 'One Way'}
                    </div>
                  </div>
                  <hr className='mt-3 mb-3' />
                  <div className='flex p-4'>
                    <div className='flex flex-col justify-center items-center text-gray-600'>
                      <div className='text-sm mb-4'>
                        {data.flight_booking_id?.departure_destination?.code}
                      </div>
                    </div>
                    <div className='flex flex-col items-center justify-center text-gray-600 w-full'>
                      <hr className='w-[80%] h-1 bg-gray-200 border-0 rounded dark:bg-gray-500' />
                      <div className='text-sm uppercase'>
                        {data?.flight_booking_id?.isDirect
                          ? 'Direct'
                          : data?.flight_booking_id?.stops.join(' | ')}
                      </div>
                    </div>
                    <div className='flex flex-col justify-center items-center text-gray-600'>
                      <div className='text-sm mb-4'>
                        {data.flight_booking_id?.arrival_destination?.code}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='mt-3 mb-3' />
                <div>
                  <div className='p-name text-xl font-bold'>
                    Name : {`${data.c_first_name} ${data.c_last_name}`}
                  </div>
                  <div className='p-name text-md'>Email : {data.c_email}</div>
                  <div className='p-name text-md'>
                    Contact No : {data.c_phone}
                  </div>
                  <div className='p-name text-md'>
                    Purchased Location : {data?.agent_id?.branch}
                  </div>
                </div>
                <hr className='mt-3 mb-3' />
                <div className='w-full'>
                  <div className='passengers text-md '>
                    x {data.passengers} Passengers
                  </div>
                  <div className='meal text-md '>
                    x1 {data.meal_preference} Meal
                  </div>
                  <div className='seat text-md '>
                    x1 {data.seat_preference} Seat
                  </div>
                  <div className='price text-3xl font-bold'>
                    LKR {data?.total}
                  </div>
                  <div className='price text-xs '>Tax included</div>
                </div>
                <span className='text-sm text-red-600'></span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingView;
