import React from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  useLoadScript,
  Polyline,
} from '@react-google-maps/api';

const containerStyle = {
  width: 'auto',
  height: '380px',
};

const options = {
  strokeColor: '#c20000',
  editable: false,
};

const Map = ({ d_lat, d_lng, a_lat, a_lng }) => {
  const loactions = [
    { id: 1, lat: d_lat, lng: d_lng },
    { id: 2, lat: a_lat, lng: a_lng },
  ];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading..</div>;
  return (
    <div className='w-full'>
      <GoogleMap
        id='marker-example'
        mapContainerStyle={containerStyle}
        zoom={3}
        center={loactions[1]}
      >
        {loactions.map((location) => (
          <MarkerF
            position={{ lat: location.lat, lng: location.lng }}
            key={location.id}
          />
        ))}
        <Polyline path={loactions} options={options} />
      </GoogleMap>
    </div>
  );
};

export default Map;
