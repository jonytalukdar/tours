const Review = require('../model/reviewModel');

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('../controllers/handlerFactory');

///middleware for get tour and user ids
const getTourUserIds = (req, res, next) => {
  //allow nested route
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

//function for get all reviews
const getReviews = getAll(Review);
//for get single review
const getSingleReview = getOne(Review);
///function for create review
const createReview = createOne(Review);
//for update review
const updateReview = updateOne(Review);
//for delete review
const deleteReview = deleteOne(Review);

module.exports = {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  getTourUserIds,
  getSingleReview,
};
