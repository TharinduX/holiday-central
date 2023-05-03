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
  height: '300px',
};

const loactions = [
  { id: 1, lat: 6.927079, lng: 79.861244 },
  { id: 2, lat: 19.07609, lng: 72.877426 },
];

const options = {
  strokeColor: '#c20000',
  editable: false,
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div className='animate-spin'>Loading..</div>;
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
