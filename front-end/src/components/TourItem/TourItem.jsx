import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TourItem = ({ tour }) => {
  const {
    name,
    imageCover,
    difficulty,
    duration,
    summary,
    startLocation,
    maxGroupSize,
    price,
    ratingsAverage,
    ratingsQuantity,
    startDates,
    slug,
    locations,
  } = tour;
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            src={`img/tours/${imageCover}`}
            alt="Tour 1"
            className="card__picture-img"
          />
        </div>

        <h3 className="heading-tertirary">
          <span>{name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">
          {difficulty} {duration}-day tour
        </h4>
        <p className="card__text">{summary}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>{startLocation.description}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-calendar"></use>
          </svg>
          <span>{moment.utc(startDates[0]).format('Do MMM YYYY')}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-flag"></use>
          </svg>
          <span>{locations.length} stops</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-user"></use>
          </svg>
          <span>{maxGroupSize} people</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">${price}</span>
          <span className="card__footer-text"> per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{ratingsAverage}</span>
          <span className="card__footer-text"> rating ({ratingsQuantity})</span>
        </p>
        <Link to={`/tour/${slug}`} className="btn btn--green btn--small">
          Details
        </Link>
      </div>
    </div>
  );
};

export default TourItem;
