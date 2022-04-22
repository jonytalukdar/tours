const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  deleteMe,
  getMe,
  uploadUserPhoto,
} = require('../controllers/authController');

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersControllers');

const {
  authentication,
  restricTo,
  isLoggedIn,
} = require('../middleware/authentication');

const router = express.Router();

//for authentication login and signup
router.post('/signup', signup);
router.post('/login', login);

//for reset and forgot
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

///protect all route after this middleware
router.use(authentication);

//update password
router.patch('/updatePassword', updatePassword);
//update profile
router.patch('/updateProfile', uploadUserPhoto, updateProfile);
//delete me
router.delete('/deleteMe', deleteMe);
//get me
router.get('/me', getMe, isLoggedIn, getSingleUser);

//// protect by admin after this middlware
router.use(restricTo('admin'));

//for user
router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
