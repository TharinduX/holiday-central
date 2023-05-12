import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FlightReservation from './pages/agent/FlightReservation';
import Dashboard from './pages/agent/Dashboard';
import NotFound from './pages/NotFound';
import Packages from './pages/agent/Packages';
import HotelReservation from './pages/agent/HotelReservation';
import Layout from './pages/Layout';
import FlightCheckout from './pages/agent/FlightCheckout';
import Login from './pages/Login';
import PrivateRoute from './util/PrivateRoute';
import BookingView from './pages/agent/BookingView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='/flight-reservations' element={<FlightReservation />} />
          <Route path='/hotel-reservation' element={<HotelReservation />} />
          <Route path='/packages' element={<Packages />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/flight-checkout/:id' element={<FlightCheckout />} />
        <Route path='/view-booking/:id' element={<BookingView />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
