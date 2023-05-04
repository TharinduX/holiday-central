import React, { useContext, useState, useEffect } from 'react';
import { MdOutlineArrowBack, MdArrowDropDown } from 'react-icons/md';
import Map from '../../components/GoogleMap/Map';
import { SearchContext } from '../../context/SearchContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const FlightCheckout = () => {
  const { departure_date } = useContext(SearchContext);
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [flights, setFlights] = useState([]);
  const [meal, setMeal] = useState('');
  const [seat, setSeat] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [message, setMessage] = useState('');

  const { data, loading, error } = useFetch(`/api/flights/${id}`);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: '644fe87240479940be58494e',
          c_first_name: firstName,
          c_last_name: lastName,
          c_email: email,
          c_phone: phoneNo,
          meal_preference: meal,
          seat_preference: seat,
          passengers: 1,
          booking_type: 'flight',
          booking_date: format(new Date(), 'yyyy-MM-dd'),
          flight_booking_id: id,
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNo('');
        setMessage('User created successfully');
      } else {
        setMessage('Some error occured');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='checkout-wrapper'>
      <nav className='header bg-secondary px-12 pt-8 pb-8'>
        <div className='main-navbar flex justify-between items-center'>
          <Link to={'/flight-reservations'}>
            <div className='flex text-white text-xl gap-3 items-center'>
              <MdOutlineArrowBack className='back-button' color='white' />
              <div className='title'>Flight Reservation</div>
            </div>
          </Link>
          <div className='flex avatar-wrapper items-center gap-4'>
            <div className='user-name text-white'>Tharindu</div>
            <img
              className='w-10 h-10 rounded-full'
              src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
              alt='Rounded avatar'
            ></img>
            <MdArrowDropDown className='text-white text-xl cursor-pointer' />
          </div>
        </div>
      </nav>
      {loading ? (
        'Loading...'
      ) : (
        <div className='checkout-body max-w-[1200px] w-full m-auto my-5'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-2 bg-white rounded-lg p-8 shadow-md'>
                <div className='card-wrapper flex justify-between'>
                  <div className='text-secondary text-3xl font-bold mb-5'>
                    Checkout
                  </div>
                  <div className='text-gray-700'>
                    Reservation Status:
                    <span className='text-borderColor'> Payment pending</span>
                  </div>
                </div>
                <div className='map-wrapper h-[300px] '>
                  <Map
                    d_lat={data.departure_destination?.lat}
                    d_lng={data.departure_destination?.lng}
                    a_lat={data.arrival_destination?.lat}
                    a_lng={data.arrival_destination?.lng}
                  />
                </div>
                <div className='flex justify-around divide-x'>
                  <div className='meal-preference-wrapper mb-5'>
                    <div className=' mt-5 text-lg font-bold text-secondary'>
                      Meal Preference
                    </div>
                    <div className='flex gap-5 mt-5'>
                      <div className='flex gap-3'>
                        <input
                          onChange={(e) => {
                            setMeal(e.target.value);
                          }}
                          value='Non Veg'
                          type='radio'
                          id='nonveg'
                          name='meal-radio'
                          className='peer hidden'
                        />
                        <label
                          htmlFor='nonveg'
                          className='cursor-pointer bg-white shadow-md  peer-checked:bg-secondary select-none p-2 peer-checked:text-white rounded-md'
                        >
                          Non-Veg
                        </label>
                      </div>
                      <div className='flex gap-3'>
                        <input
                          onChange={(e) => {
                            setMeal(e.target.value);
                          }}
                          type='radio'
                          value='Veg'
                          id='veg'
                          name='meal-radio'
                          className='peer hidden'
                        />
                        <label
                          htmlFor='veg'
                          className='cursor-pointer bg-white shadow-md  peer-checked:bg-secondary select-none p-2 peer-checked:text-white rounded-md'
                        >
                          Vegetarian
                        </label>
                      </div>
                      <div className='flex gap-3'>
                        <input
                          onChange={(e) => {
                            setMeal(e.target.value);
                          }}
                          value='Seafood'
                          type='radio'
                          id='seafood'
                          name='meal-radio'
                          className='peer hidden'
                        />
                        <label
                          htmlFor='seafood'
                          className='cursor-pointer bg-white shadow-md  peer-checked:bg-secondary select-none p-2 peer-checked:text-white rounded-md'
                        >
                          Seafood
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='seat-preference-wrapper pl-10'>
                    <div className='text-secondary mt-5 text-lg font-bold'>
                      Select a seat
                    </div>
                    <div className='flex gap-5 mt-5 mb-10'>
                      <div className='flex gap-3'>
                        <input
                          onChange={(e) => {
                            setSeat(e.target.value);
                          }}
                          value='Window'
                          type='radio'
                          id='window'
                          name='seat-radio'
                          className='peer hidden'
                        />
                        <label
                          htmlFor='window'
                          className='cursor-pointer bg-white shadow-md  peer-checked:bg-secondary select-none p-2 peer-checked:text-white rounded-md'
                        >
                          Basic Window
                        </label>
                      </div>
                      <div className='flex gap-3'>
                        <input
                          onChange={(e) => {
                            setSeat(e.target.value);
                          }}
                          value='Isle'
                          type='radio'
                          id='isle'
                          name='seat-radio'
                          className='peer hidden'
                        />
                        <label
                          htmlFor='isle'
                          className='cursor-pointer bg-white shadow-md  peer-checked:bg-secondary select-none p-2 peer-checked:text-white rounded-md'
                        >
                          Isle
                        </label>
                      </div>
                      <div className='flex gap-3'>
                        <input
                          onChange={(e) => {
                            setSeat(e.target.value);
                          }}
                          value='Middle Seat'
                          type='radio'
                          id='middle'
                          name='seat-radio'
                          className='peer hidden'
                        />
                        <label
                          htmlFor='middle'
                          className='cursor-pointer bg-white shadow-md  peer-checked:bg-secondary select-none p-2 peer-checked:text-white rounded-md'
                        >
                          Middle Seat
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='mb-4' />
                <div className='text-secondary text-3xl font-bold mb-5 '>
                  Passenger Details
                </div>
                <div className='form-wrapper'>
                  <div className='flex gap-5'>
                    <input
                      className='border p-2 rounded-md w-full'
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                      type='text'
                      name='first_name'
                      placeholder='First Name'
                    />
                    <input
                      className='border p-2 rounded-md w-full'
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                      type='text'
                      name='last_name'
                      placeholder='Last Name'
                    />
                  </div>
                  <div className='flex gap-5 mt-5'>
                    <input
                      className='border p-2 rounded-md w-full'
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      type='text'
                      name='email'
                      placeholder='Email Address'
                    />
                    <input
                      className='border p-2 rounded-md w-full'
                      onChange={(e) => {
                        setPhoneNo(e.target.value);
                      }}
                      value={phoneNo}
                      type='text'
                      name='phone'
                      placeholder='Phone Number'
                    />
                  </div>
                </div>
              </div>
              <div className='checkout-info bg-white rounded-md p-8 shadow-md h-[400px] flex flex-col justify-between w-full'>
                <div className='order-info-wrapper'>
                  <div className='text-md gap-3 justify-end items-center flex w-full'>
                    <img
                      src={data.airline?.logo}
                      alt=''
                      className='w-10 h-10 '
                    />
                    {data.airline?.name}
                    <div className='flex flex-col items-center text-xs border rounded-lg p-0.5 w-[80px] text-secondary border-secondary'>
                      {data.isReturn ? 'Return' : 'One Way'}
                    </div>
                  </div>
                  <hr className='mt-3 mb-3' />
                  <div className='flex p-4'>
                    <div className='flex flex-col justify-center items-center text-gray-600'>
                      <div className='text-sm mb-4'>
                        {data.departure_destination?.code}
                      </div>
                    </div>
                    <div className='flex flex-col items-center justify-center text-gray-600 w-full'>
                      <hr className='w-[80%] h-1 bg-gray-200 border-0 rounded dark:bg-gray-500' />
                      <div className='text-sm uppercase'>
                        {data.isDirect ? 'Direct' : data.stops?.join(' | ')}
                      </div>
                    </div>
                    <div className='flex flex-col justify-center items-center text-gray-600'>
                      <div className='text-sm mb-4'>
                        {data.arrival_destination?.code}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full'>
                  <div className='price text-md '>x2 Passengers</div>
                  <div className='price text-md '>x1 {meal} Meal</div>
                  <div className='price text-md '>x1 {seat} Seat</div>
                  <div className='price text-3xl font-bold'>
                    LKR {data.price}
                  </div>
                  <div className='price text-xs '>Tax included</div>
                  <button className='bg-secondary text-white px-6 py-3 rounded-lg w-full mt-4'>
                    Checkout
                  </button>
                </div>
                <span className='text-sm text-red-600'>
                  {message ? <p>{message}</p> : null}
                </span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FlightCheckout;
