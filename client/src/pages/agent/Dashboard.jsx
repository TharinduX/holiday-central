import React from 'react';
import useFetch from '../../hooks/useFetch';

const Dashboard = () => {
  const { data, loading, error } = useFetch(`/api/booking`);
  return (
    <div className='flex flex-col mt-2'>
      {loading ? (
        'loading'
      ) : (
        <div className='overflow-x-auto sm:-my-2'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      First Name
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Last Name
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Phone
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Meal Preference
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Seat Preference
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Departure
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Arrival
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Passengers
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Booking Type
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Booking Date
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Flight ID
                    </th>

                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {data.map((item) => (
                    <tr key={item._id}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item.c_first_name}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.c_last_name}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.c_email}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.c_phone}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.meal_preference}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.seat_preference}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.flight_booking_id.departure_destination.city}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.flight_booking_id.arrival_destination.city}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.passengers}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.booking_type}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.booking_date.substring(0, 10)}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {item.flight_booking_id.flight_number}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <button className='text-red-600 hover:text-red-900'>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
