import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TourItem } from '../components';
import { fetchTours } from '../services';

const Tours = () => {
  const dispatch = useDispatch();
  const { tours, status } = useSelector((state) => state.tour);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

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
