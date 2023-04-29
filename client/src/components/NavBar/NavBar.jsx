import React from 'react';
import {
  MdOutlineFlight,
  MdOutlineLocalHotel,
  MdOutlineDiscount,
  MdOutlineHouse,
} from 'react-icons/md';

import { Link, NavLink, Routes, Route } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='header bg-secondary px-12 pt-12 pb-20'>
      <div className='main-navbar flex justify-between items-center'>
        <div className='logo-wrapper'>
          <h1 className='logo text-[25px] text-textWhite'>
            <strong>Holiday</strong>Central.com
          </h1>
        </div>
        <div className='nav-items flex gap-8 text-textWhite items-center'>
          <li>LKR</li>
          <button className='bg-white text-secondary py-2 px-4 rounded'>
            Login
          </button>
        </div>
      </div>
      <div className='navbar flex items-center mt-7 gap-3'>
        <NavLink
          className='bg-transparent border border-white text-white py-3 px-4 rounded hover:text-secondary hover:bg-white hover:border-transparent gap-3 nav-active'
          to='/'
        >
          <MdOutlineHouse />
        </NavLink>
        <NavLink
          to='/flight-reservations'
          className='border border-white text-white py-2 px-4 rounded hover:text-secondary hover:bg-white hover:border-transparent inline-flex items-center gap-3 nav-active'
        >
          <MdOutlineFlight />
          <span>Flight Reservation</span>
        </NavLink>
        <NavLink
          to='/hotel-reservation'
          className='border border-white text-white py-2 px-4 rounded hover:text-secondary hover:bg-white hover:border-transparent inline-flex items-center gap-3 nav-active'
        >
          <MdOutlineLocalHotel />
          <span>Hotel Reservation</span>
        </NavLink>
        <NavLink
          to='/packages'
          className='border border-white text-white py-2 px-4 rounded hover:text-secondary hover:bg-white hover:border-transparent inline-flex items-center gap-3 nav-active'
        >
          <MdOutlineDiscount />
          <span>Packages</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
