import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import FlightReservation from './pages/agent/FlightReservation';
import Dashboard from './pages/agent/Dashboard';
import NotFound from './pages/NotFound';
import Packages from './pages/agent/Packages';
import HotelReservation from './pages/agent/HotelReservation';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/flight-reservations' element={<FlightReservation />} />
        <Route path='/hotel-reservation' element={<HotelReservation />} />
        <Route path='/packages' element={<Packages />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
