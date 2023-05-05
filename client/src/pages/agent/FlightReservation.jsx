import React, { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import FlightCard from '../../components/FlightSearch/FlightCard';
import FilterSiderbar from './../../components/FlightSearch/FilterSiderbar';
import { format } from 'date-fns';
import axios from 'axios';

const FlightReservation = () => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  // get data for query
  const [flights, setFlights] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const departure_date = format(dates[0].startDate, 'yyyy-MM-dd');
  const arrival_date = format(dates[0].endDate, 'yyyy-MM-dd');
  const [passengers, setPassengers] = useState(1);
  const [airports, setAirports] = useState([]);
  const [airlineQuery, setAirlineQuery] = useState([]);
  const [priceSelect, setPriceSelect] = useState('asc');
  const [isDirect, setisDirect] = useState('all');
  const [isReturn, setIsReturn] = useState('all');
  const [cabinClass, setcabinClass] = useState([]);
  const [duration, setDuration] = useState([]);

  // get airports data for filter
  useEffect(() => {
    fetch('/api/airports')
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((err) => console.log(err));
  }, []);

  const options = airports.map((airport) => ({
    value: airport._id,
    label: airport.name + ' (' + airport.code + ')',
  }));

  //flights filtering
  useEffect(() => {
    if (from && to) {
      const getFlightResults = async () => {
        try {
          const url = `/api/flights?from=${from.value}&to=${
            to.value
          }&departure_date=${departure_date}&arrival_date=${arrival_date}&pax=${passengers}&airline=${
            airlineQuery.value || 'all'
          }&sortBy=price:${
            priceSelect.value || 'asc'
          }&isDirect=${isDirect}&isReturn=${isReturn}&class=${cabinClass}&duration=${duration}`;

          const res = await fetch(url)
            .then((response) => response.json())
            .then((data) => setFlights(data))
            .catch((err) => console.log(err));
        } catch (err) {
          console.log(stops);
        }
      };
      getFlightResults();
    }
  }, [
    from,
    to,
    departure_date,
    arrival_date,
    passengers,
    airlineQuery,
    priceSelect,
    isDirect,
    isReturn,
    cabinClass,
    duration,
  ]);

  return (
    <div>
      <div className='grid place-items-center relative '>
        <Search
          setFlights={setFlights}
          setFrom={setFrom}
          setTo={setTo}
          setDates={setDates}
          dates={dates}
          setPassengers={setPassengers}
          setAirports={setAirports}
          airports={airports}
          options={options}
          passengers={passengers}
          from={from}
          to={to}
          departure_date={departure_date}
          arrival_date={arrival_date}
        />
      </div>
      <div className='grid grid-cols-4 max-w-[1200px] w-full m-auto gap-3 mt-12 text-gray-400'>
        <div className='col-span-3 '>
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))
          ) : (
            <p className='text-center'>No Flights Available</p>
          )}
        </div>
        <FilterSiderbar
          setAirlineQuery={setAirlineQuery}
          setPriceSelect={setPriceSelect}
          setisDirect={setisDirect}
          isDirect={isDirect}
          setIsReturn={setIsReturn}
          setcabinClass={setcabinClass}
          flights={flights}
          setDuration={setDuration}
          duration={duration}
        />
      </div>
    </div>
  );
};

export default FlightReservation;
