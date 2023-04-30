import React from 'react';
import { MdOutlineArrowBack, MdArrowDropDown } from 'react-icons/md';

const FlightCheckout = () => {
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
              class='w-10 h-10 rounded-full'
              src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
              alt='Rounded avatar'
            ></img>
            <MdArrowDropDown className='text-white text-xl cursor-pointer' />
          </div>
        </div>
      </nav>
      <div className='checkout-body max-w-[1200px] w-full m-auto mt-5'>
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
                    for='nonveg'
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
                    for='veg'
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
                    for='seafood'
                    className='cursor-pointer bg-white shadow-md  peer-checked:bg-secondary select-none p-2 peer-checked:text-white rounded-md'
                  >
                    Seafood
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className='seat-preference-wrapper'>
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
                    for='window'
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
                    for='isle'
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
                    for='middle'
                    className='cursor-pointer bg-white shadow-md  peer-checked:bg-secondary select-none p-2 peer-checked:text-white rounded-md'
                  >
                    Middle Seat
                  </label>
                </div>
              </div>
            </div>
            <div className='text-secondary text-3xl font-bold mb-5'>
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
          <div className='checkout-button bg-white rounded-md p-8 shadow-md'>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCheckout;
