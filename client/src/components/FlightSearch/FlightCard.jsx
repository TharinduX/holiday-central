import React from 'react';

const FlightCard = () => {
  return (
    <div className=' bg-white rounded-lg shadow-md px-7 py-5 mb-3'>
      <div className='grid grid-cols-4'>
        <div className='col-span-3'>
          <div className='flex flex-col items-center text-xs border rounded-lg p-0.5 w-[10%] text-secondary border-secondary'>
            Return
          </div>
          <div className='flex justify-between w-full gap-4'>
            <div className='text-xs flex flex-col items-center w-full'>
              <img
                src='https://images.kiwi.com/airlines/64/UL.png'
                alt=''
                className='w-10 h-10 '
              />
              Sri Lankan Airlines
            </div>
            <div className='flex flex-col justify-center items-center text-gray-600'>
              <div className='font-bold'>18:00</div>
              <div className='text-sm'>CMB</div>
            </div>
            <div className='flex flex-col items-center justify-center text-gray-600 w-full'>
              <hr class='w-full h-1 bg-gray-200 border-0 rounded dark:bg-gray-500' />
              <div className='text-sm'>Direct</div>
            </div>
            <div className='flex flex-col justify-center items-center text-gray-600'>
              <div className='font-bold'>18:00</div>
              <div className='text-sm'>CMB</div>
            </div>
            <div className='flex flex-col justify-center items-center text-gray-400 w-full'>
              <div className='text-md'>6h 25m</div>
            </div>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='flex flex-col items-end'>
            <div className='font-bold text-gray-800 text-lg'>58,000</div>
            <div className='text-sm'>Tax included</div>
            <button className='bg-secondary text-white px-10 py-1 rounded-md'>
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
