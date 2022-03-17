import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapBox = ({ locations, startLocation }) => {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAP_TOKEN,
    scrollZoom: false,
  });

  return (
    <section className="section-map">
      <Map
        center={startLocation.coordinates}
        zoom={[5]}
        style="mapbox://styles/jonytalukdar/cl0uoz069002b14o3p3jr8xut"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
      >
        {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={startLocation.coordinates} />
        </Layer> */}
        {locations?.map((loc, index) => {
          return (
            <>
              <Marker key={index} coordinates={loc.coordinates}>
                <div className="marker"></div>
              </Marker>
              <Popup
                coordinates={loc.coordinates}
                offset={{
                  'bottom-left': [12, -38],
                  bottom: [0, -38],
                  'bottom-right': [-12, -38],
                }}
              >
                <p>{`Day ${loc.day} ${loc.description}`}</p>
              </Popup>
            </>
          );
        })}
      </Map>
    </section>
  );
};

export default MapBox;
