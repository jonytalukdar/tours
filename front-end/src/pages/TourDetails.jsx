import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  MapBox,
  TourCta,
  TourDescription,
  TourHeader,
  TourPictures,
  TourReviews,
} from '../components';

const TourDetails = () => {
  const { slug } = useParams();

  const { tours } = useSelector((state) => state.tour);

  const tour = tours?.find((tour) => tour.slug === slug);

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
