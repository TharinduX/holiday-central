import React, { useContext, useState, useEffect } from 'react';
import { MdOutlineArrowBack, MdArrowDropDown } from 'react-icons/md';
import Map from '../../components/GoogleMap/Map';
import { SearchContext } from '../../context/SearchContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const FlightCheckout = () => {
  const navigate = useNavigate();
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
  const { agent } = useContext(AuthContext);

  const { data, loading, error } = useFetch(`/api/flights/find/${id}`);
  const { from, to, departure_date, arrival_date, passengers } =
    useContext(SearchContext);

  const [disabled, setDisabled] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setDisabled(true);
      let res = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: agent._id,
          c_first_name: firstName,
          c_last_name: lastName,
          c_email: email,
          c_phone: phoneNo,
          meal_preference: meal,
          seat_preference: seat,
          passengers: passengers,
          booking_type: 'flight',
          booking_date: format(new Date(), 'yyyy-MM-dd'),
          flight_booking_id: id,
          total: data.price * passengers,
        }),
      });

      let resJson = await res.json();
      if (res.status === 201) {
        // Show success message to the user
        toast.success('Booking Added Successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          onClose: () => {
            navigate('/');
          },
        });
        // Navigate to the homepage
      } else {
        setMessage('Some error occured');
        toast.error('Some error occured', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDisabled(false);
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
                <div className='map-wrapper h-[380px] '>
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
                      required
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
                      required
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
                      required
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
                      required
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
                  <div className='price text-md '>
                    x {passengers} Passengers
                  </div>
                  <div className='price text-md '>x1 {meal} Meal</div>
                  <div className='price text-md '>x1 {seat} Seat</div>
                  <div className='price text-3xl font-bold'>
                    LKR {data.price * passengers}
                  </div>
                  <div className='price text-xs '>Tax included</div>
                  {disabled ? (
                    <button
                      disabled
                      className='bg-gray-300 text-white px-6 py-3 rounded-lg w-full mt-4 items-center justify-center flex gap-2'
                    >
                      <svg
                        aria-hidden='true'
                        class='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      <span class='sr-only'>Loading...</span>
                    </button>
                  ) : (
                    <button className='bg-secondary text-white px-6 py-3 rounded-lg w-full mt-4'>
                      Checkout
                    </button>
                  )}
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
