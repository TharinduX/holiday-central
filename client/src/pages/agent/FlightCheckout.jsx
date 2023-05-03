import React, { useContext } from 'react';
import { MdOutlineArrowBack, MdArrowDropDown } from 'react-icons/md';
import Map from '../../components/GoogleMap/Map';
import { SearchContext } from '../../context/SearchContext';

const FlightCheckout = () => {
  const { departure_date } = useContext(SearchContext);

  console.log(departure_date);

  return (
    <div className='checkout-wrapper'>
      <nav className='header bg-secondary px-12 pt-8 pb-8'>
        <div className='main-navbar flex justify-between items-center'>
          <div className='flex text-white text-xl gap-3 items-center'>
            <MdOutlineArrowBack className='back-button' color='white' />
            <div className='title'>Flight Reservation</div>
          </div>
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
      <div className='checkout-body max-w-[1200px] w-full m-auto my-5'>
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
              <Map />
            </div>
            <div className='flex justify-around divide-x'>
              <div className='meal-preference-wrapper mb-5'>
                <div className=' mt-5 text-lg font-bold text-secondary'>
                  Meal Preference
                </div>
                <div className='flex gap-5 mt-5'>
                  <div className='flex gap-3'>
                    <input
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
                      type='radio'
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
                  type='text'
                  placeholder='First Name'
                />
                <input
                  className='border p-2 rounded-md w-full'
                  type='text'
                  placeholder='Last Name'
                />
              </div>
              <div className='flex gap-5 mt-5'>
                <input
                  className='border p-2 rounded-md w-full'
                  type='text'
                  placeholder='Email Address'
                />
                <input
                  className='border p-2 rounded-md w-full'
                  type='text'
                  placeholder='Phone Number'
                />
              </div>
            </div>
          </div>
          <div className='checkout-info bg-white rounded-md p-8 shadow-md h-[400px] flex flex-col justify-between w-full'>
            <div className='order-info-wrapper'>
              <div className='text-md gap-3 justify-end items-center flex w-full'>
                <img
                  src='https://images.kiwi.com/airlines/64/UL.png'
                  alt=''
                  className='w-10 h-10 '
                />
                Sri Lankan Airlines
              </div>
              <hr className='mt-3 mb-3' />
              <div className='flex p-4'>
                <div className='flex flex-col justify-center items-center text-gray-600'>
                  <div className='font-bold'>18:00</div>
                  <div className='text-sm'>CMB</div>
                </div>
                <div className='flex flex-col items-center justify-center text-gray-600 w-full'>
                  <hr className='w-full h-1 bg-gray-200 border-0 rounded dark:bg-gray-500' />
                  <div className='text-sm'>Direct</div>
                </div>
                <div className='flex flex-col justify-center items-center text-gray-600'>
                  <div className='font-bold'>18:00</div>
                  <div className='text-sm'>CMB</div>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <div className='price text-md '>x2 Passengers</div>
              <div className='price text-md '>x2 Meal</div>
              <div className='price text-3xl font-bold'>LKR 58000</div>
              <div className='price text-xs '>Tax included</div>
              <button className='bg-secondary text-white px-6 py-3 rounded-lg w-full mt-4'>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCheckout;
