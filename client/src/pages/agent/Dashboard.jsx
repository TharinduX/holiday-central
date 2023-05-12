import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { Link, Navigate, redirect } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const response = await axios.get('/api/booking');
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/booking/${id}`);
      setBookings((prevBookings) => {
        const newBookings = prevBookings.filter(
          (booking) => booking._id !== id
        );
        return newBookings;
      });
      toast.success('Item deleted successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col mt-[-30px]'>
      {loading ? (
        <Skeleton count={1} height={130} />
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
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {booking.c_first_name}
                      </td>

                      <td className='px-6  py-4 whitespace-nowrap'>
                        {booking.c_email}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {booking.c_phone}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {booking.meal_preference}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {booking.seat_preference}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {booking.flight_booking_id?.departure_destination?.city}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {booking.flight_booking_id?.arrival_destination?.city}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {booking.passengers}
                      </td>

                      <td className='px-6  py-4 whitespace-nowrap'>
                        {booking.booking_date.substring(0, 10)}
                      </td>
                      <td className='px-6  py-4 whitespace-nowrap'>
                        {booking.flight_booking_id?.flight_number}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex gap-3'>
                          <Link to={`/view-booking/${booking._id}`}>
                            <button className=' text-primary hover:text-secondary'>
                              View
                            </button>
                          </Link>

                          <button
                            className='bg-red-600 text-white hover:bg-red-900 px-2 py-1 rounded-md'
                            onClick={() => handleDelete(booking._id)}
                          >
                            Delete
                          </button>
                        </div>
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
