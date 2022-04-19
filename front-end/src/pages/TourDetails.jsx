import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  MapBox,
  TourCta,
  TourDescription,
  TourHeader,
  TourPictures,
  TourReviews,
} from '../components';
import { fetchTours } from '../services';

const TourDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { tours, status } = useSelector((state) => state.tour);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch, slug]);

  const tour = tours?.find((tour) => tour.slug === slug);

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {tour && <TourHeader tour={tour} />}
      {tour && <TourDescription tour={tour} />}
      {tour && <TourPictures images={tour.images} />}
      {tour && (
        <MapBox locations={tour.locations} startLocation={tour.startLocation} />
      )}

      {tour && <TourReviews />}
      {tour && <TourCta />}
    </>
  );
};

export default TourDetails;
