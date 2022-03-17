const { promisify } = require('util');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

//main authentication
const authentication = catchAsync(async (req, res, next) => {
  let token;

  //check if the token is exist
  const authHeaders = req.headers.authorization;
  if (authHeaders && authHeaders.startsWith('Bearer')) {
    token = authHeaders.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Unauthorized!', 401));
  }

  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check the user exists
  const currentUser = await User.findById({ _id: decoded.id });
  if (!currentUser) {
    return next(new AppError('User does not exist!', 401));
  }

  //if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed the password', 401));
  }

  //grand access to the protected route
  req.user = currentUser;
  next();
});

//restriction
const restricTo = (...roles) => {
  return (req, res, next) => {
    //roles = 'admin','lead-guide'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to action this perform', 403)
      );
    }

    next();
  };
};

module.exports = { authentication, restricTo };
