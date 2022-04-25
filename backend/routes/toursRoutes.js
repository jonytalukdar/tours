const express = require('express');
const {
  getAllTours,
  getSingleTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getToursStats,
  getMonthlyPlan,
  getToursWithIn,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require('../controllers/toursControllers');

const { authentication, restricTo } = require('../middleware/authentication');
const reviewRoutes = require('../routes/reviewRoutes');

const router = express.Router();

router.get('/top-5-cheap', aliasTopTours, getAllTours);
router.get('/stats', getToursStats);
router.get(
  '/monthly-plan/:year',
  authentication,
  restricTo('admin', 'lead-guide', 'guide'),
  getMonthlyPlan
);

//for geo location
router.get('/tour-within/:distance/center/:latlng/unit/:unit', getToursWithIn);
router.get('/distances/:latlng/unit/:unit', getDistances);

router.get('/', getAllTours);
router.post('/', authentication, restricTo('admin', 'lead-guide'), createTour);
router.get('/:id', getSingleTour);

router.patch(
  '/:id',
  authentication,
  restricTo('admin', 'lead-guide'),
  uploadTourImages,
  resizeTourImages,
  updateTour
);
router.delete(
  '/:id',
  authentication,
  restricTo('admin', 'lead-guide'),
  deleteTour
);

router.use('/:tourId/reviews', reviewRoutes);

module.exports = router;
