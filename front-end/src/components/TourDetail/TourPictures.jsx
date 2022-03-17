import React from 'react';

const TourPictures = ({ images }) => {
  return (
    <section className="section-pictures">
      {images?.map((image, index) => {
        return (
          <div className="picture-box">
            <img
              className={`picture-box__img picture-box__img--${index + 1}`}
              src={`/img/tours/${image}`}
              alt="The Park Camper Tour 1"
            />
          </div>
        );
      })}
    </section>
  );
};

export default TourPictures;
