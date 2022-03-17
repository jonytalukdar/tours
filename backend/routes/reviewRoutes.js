const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  getTourUserIds,
  getSingleReview,
} = require('../controllers/reviewController');

const { authentication, restricTo } = require('../middleware/authentication');

///protected by authenticated after this middleware
router.use(authentication);

router.get('/', getReviews);
router.post(
  '/',
  authentication,
  restricTo('user'),
  getTourUserIds,
  createReview
);

router.get('/:id', getSingleReview);
router.patch('/:id', restricTo('admin', 'user'), updateReview);
router.delete('/:id', restricTo('admin', 'user'), deleteReview);

module.exports = router;
