const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const crypto = require('crypto');
const multer = require('multer');
const sharp = require('sharp');

//for multer storage
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../front-end/public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const extn = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${extn}`);
//   },
// });

const multerStorage = multer.memoryStorage();

//for multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image, Please upload an image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//upload photo
const uploadUserPhoto = upload.single('photo');

//resize photo
const resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90, force: true })
    .toFile(`../front-end/public/img/users/${req.file.filename}`);

  next();
};

const sendEmail = require('../utils/email');

//create token and send response
const createSendToken = async (user, statusCode, res) => {
  const token = await user.createToken(user._id);
  //set cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXRIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({ status: 'success', data: user, token });
};

//for signup
const signup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

//for login
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //if email and password not exist
  if (!email || !password) {
    return next(new AppError('Please provide an email and password!', 400));
  }

  //check if user is exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('User does not exit', 401));
  }

  const correctPassword = await user.comparePassword(password);

  if (!correctPassword) {
    return next(
      new AppError('Invalid credientials, Incorrect password or email', 401)
    );
  }

  // const token = await user.createToken(user._id);

  // res.cookie('token', token, {
  //   expires: new Date(Date.now() + 300000),
  //   httpOnly: true,
  // });

  // res.status(200).json({ status: 'success', user, token });
  createSendToken(user, 200, res);
});

//forgot password
const forgotPassword = catchAsync(async (req, res, next) => {
  //check for user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email!', 404));
  }

  //genarate token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  ///send user email
  const resetULR = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? please submit your new password and confirm password to: ${resetULR} \n otherwise ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your reset password valid for (only 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'token sent to the email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There is an error sending email please try again letter',
        500
      )
    );
  }
});

//reset password
const resetPassword = catchAsync(async (req, res, next) => {
  //get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  //find the user with token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is not valid or it has expired', 400));
  }

  //update user password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  //create token
  createSendToken(user, 200, res);
});

// update password
const updatePassword = catchAsync(async (req, res, next) => {
  //get user from the collection
  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    return next(new AppError('User does not exit', 401));
  }

  //check the user is exist
  const correctPassword = await user.comparePassword(req.body.currentPassword);

  if (!correctPassword) {
    return next(new AppError('Invalid credientials', 401));
  }

  //update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //User.findByIdAndUpdate does not works here

  //send the jwt token
  createSendToken(user, 201, res);
});

//for filter req.body object
const filterObj = (obj, ...allowAllFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowAllFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

//update profile
const updateProfile = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  //send error if user send password and confirmPassword
  const { password, passwordConfirm } = req.body;
  if (password || passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update, Please use /updatePassword',
        400
      )
    );
  }

  //filter out unwanted fileds value
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  //update user
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  //send response
  res.status(200).json({ status: 'success', data: updatedUser });
});

///delete me
const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({ status: 'success', data: null });
});

//get me
const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
};
