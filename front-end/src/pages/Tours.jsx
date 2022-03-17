import React, { useState, useEffect } from 'react';

import { TourItem } from '../components';

const Tours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/tours')
      .then((res) => res.json())
      .then((data) => {
        setTours(data.data);
      });
  }, []);

  return (
    <main className="main">
      <div className="card-container">
        {tours?.map((tour, index) => {
          return <TourItem key={index} tour={tour} />;
        })}
      </div>
    </main>
  );
};

export default Tours;
