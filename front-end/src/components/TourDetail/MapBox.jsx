import React from 'react';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapBox = ({ locations, startLocation }) => {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAP_TOKEN,
    scrollZoom: false,
  });

  return (
    <section className="section-map">
      <Map
        // fitBounds={lnglat}
        // fitBoundsOptions={{
        //   padding: { top: 200, bottom: 200, left: 100, right: 100 },
        // }}
        center={startLocation.coordinates}
        zoom={[5]}
        style="mapbox://styles/jonytalukdar/cl0uoz069002b14o3p3jr8xut"
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
      >
        {locations?.map((loc, index) => {
          return (
            <div key={index}>
              <Marker coordinates={loc.coordinates}>
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
            </div>
          );
        })}
      </Map>
    </section>
  );
};

export default MapBox;
