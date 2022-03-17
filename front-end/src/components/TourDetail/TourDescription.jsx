import React from 'react';
import moment from 'moment';

const TourDescription = ({ tour }) => {
  const {
    name,
    description,
    startDates,
    difficulty,
    maxGroupSize,
    ratingsAverage,
    ratingsQuantity,
    guides,
  } = tour;
  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use href="/img/icons.svg#icon-calendar"></use>
              </svg>
              <span className="overview-box__label">Next date</span>
              <span className="overview-box__text">
                {moment.utc(startDates[1]).format('Do MMM YYYY')}
              </span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use href="/img/icons.svg#icon-trending-up"></use>
              </svg>
              <span className="overview-box__label">Difficulty</span>
              <span className="overview-box__text">{difficulty}</span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use href="/img/icons.svg#icon-user"></use>
              </svg>
              <span className="overview-box__label">Participants</span>
              <span className="overview-box__text">{maxGroupSize} people</span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use href="/img/icons.svg#icon-star"></use>
              </svg>
              <span className="overview-box__label">Rating</span>
              <span className="overview-box__text">
                {ratingsAverage} / {ratingsQuantity}
              </span>
            </div>
          </div>

          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            {guides?.map((guide) => {
              return (
                <div key={guide._id} className="overview-box__detail">
                  <img
                    src={`/img/users/${guide.photo}`}
                    alt={guide.role}
                    className="overview-box__img"
                  />
                  <span className="overview-box__label">{guide.role}</span>
                  <span className="overview-box__text">{guide.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">About the {name}</h2>
        <p className="description__text">{description}</p>
      </div>
    </section>
  );
};

export default TourDescription;
